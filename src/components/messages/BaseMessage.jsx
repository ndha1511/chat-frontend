import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./BaseMessage.scss";
import ButtonGroup from "../buttons/button-group/ButtonGroup";
import { btnCT } from "../../configs/button_group_icon_config";
import { Button, Dropdown, Form, ListGroup, Modal } from "react-bootstrap";
import { deleteMessage, revokeMessage } from "../../services/MessageService";
import { pushMessage, reRenderMessge } from "../../redux/reducers/messageReducer";
import Avatar from "../avatar/Avatar";
import { getUserByEmail } from "../../services/UserService";
import FowardModal from "../modal/foward-modal/FowardModal";
import { Icon } from "zmp-ui";
import Icons from "../icons/Icons";
import AccountInfor from "../modal/AccountInfor";
import HelloMessage from "../modal/HelloMessage";
import { getUserGroupById } from "../../services/GroupService";
import { arrayToDateTime } from "../../utils/DateTimeHandle";




function BaseMessage(props) {
    const [hiddenBtn, setHiddenBtn] = useState(false);
    const user = useSelector((state) => state.userInfo.user);
    const dispatch = useDispatch();
    const chatInfo = useSelector(state => state.message.chatInfo);
    const [userAcccount, setUserAccount] = useState();
    const [showFowardModal, setShowFowardModal] = useState(false);
    const [showAccountInfor, setShowAccountInfor] = useState(false);
    const [showHelloMessageModal, setShowHelloMessageModal] = useState(false)
    const handleShowHelloMessageModal = () => {
        setShowAccountInfor(false);
        setShowHelloMessageModal(true)

    }
    const handleShowAccountInforModal = () => {
        setShowHelloMessageModal(false);
        setShowAccountInfor(true);
    }
    const closeFowardModal = () => {
        setShowFowardModal(false);
    }
    const openFowardModal = () => {
        setShowFowardModal(true);
    }
    // const buttons = btnCT;
    const [statusMessage, setStatusMessage] = useState("");

    const checkStatusMessage = () => {
        const status = props.message.messageStatus;
        switch (status) {
            case "SENDING": return "Đang gửi";
            case "SENT": return "Đã gửi";
            case "SEEN": return "Đã xem";
            case "ERROR": return "Lỗi";
            default: return "";
        }
    }

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <span

            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="" // Thêm class cho avatar dropdown
        >
            {children}
        </span>
    ));
    const handleDeleteMessage = async () => {
        try {

            const messageId = props.message.id;
            const senderId = user.email
            const receiverId = props.message.receiverId
            const reques = {
                messageId,
                senderId,
                receiverId
            }
            console.log(senderId)
            await revokeMessage(reques);
            dispatch(reRenderMessge());
            console.log("Tin nhắn đã được thu hồi thành công");
        } catch (error) {
            console.error("Xảy ra lỗi khi thu hồi tin nhắn", error);

        }
    }
    const hanldeUserGroup = async () => {
        if (chatInfo.room?.roomType === "GROUP_CHAT") {
            try {
                const rep = await getUserByEmail(props.message.senderId);
                console.log(props.message.senderId)
                setUserAccount(rep)
                setShowAccountInfor(true);
            } catch (error) {

            }

        } else {
            setUserAccount(chatInfo.user)
            setShowAccountInfor(true);
        }
    }

    const handleTime = () => {
        const messageType = props.message.messageType;
        switch (messageType) {
            case 'AUDIO_CALL':
            case 'VIDEO_CALL':
            case 'IMAGE':
            case 'VIDEO':
                return true;
            default: return false;
        }
    }
    console.log(props.message.messageStatus)
    const btnCT = [
        { item: <i className="bi bi-quote" style={{ transform: 'scaleX(-1) scaleY(-1)', fontSize: 22, }}></i>, },

        { item: <Icon onClick={openFowardModal} icon="zi-share-solid" size={18} /> },

        {
            item: <Dropdown>
                <Dropdown.Toggle as={CustomToggle} >
                    <Icon style={{ marginTop: -5, color: '' }} icon="zi-more-horiz-solid" size={20} />
                </Dropdown.Toggle>

                <Dropdown.Menu className="d-flex-right custom-dropdown-menu-cs">

                    <Dropdown.Item><i className="bi bi-clipboard-check pe-3 "></i>Coppy tin nhắn</Dropdown.Item>
                    <Dropdown.Item ><i className="bi bi-pin-angle pe-3" ></i>Ghim tin nhắn</Dropdown.Item>
                    <Dropdown.Item ><i className="bi bi-star pe-3"></i>Đánh dấu tin nhắn</Dropdown.Item>
                    <Dropdown.Item ><i className="bi bi-download pe-3"></i>Lưu về máy</Dropdown.Item>
                    <Dropdown.Divider />
                    {
                        user.email === props.message.senderId && props.message.messageStatus !== "ERROR" && (
                            <Dropdown.Item style={{ color: 'red' }} onClick={handleDeleteMessage} >
                                <i className="bi bi-arrow-counterclockwise pe-3"></i>Thu hồi tin nhắn
                            </Dropdown.Item>
                        )
                    }
                    <Dropdown.Item style={{ color: 'red' }}  ><i className="bi bi-trash pe-3"></i>Xóa ở phía tôi</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        }

    ]

    const senderUser = {
        avatar: props.message.senderAvatar,
        name: props.message.senderName
    }


    return (
        <div onMouseEnter={() => setHiddenBtn(true)}
            onMouseLeave={() => setHiddenBtn(false)}
            className="d-flex w-100 " style={{
                flexDirection: props.isSender && props.message.messageType !== "SYSTEM" ? "row" : "row-reverse",
                alignItems: props.message.messageType === "SYSTEM" ? "center" : "flex-end", justifyContent: props.message.messageType === "SYSTEM" ? "center" : "flex-end", position: 'relative'
            }}>
            {hiddenBtn && props.message.messageStatus !== "REVOKED" && props.message.messageStatus !== "ERROR" && props.message.messageType !== "SYSTEM" && (
                <div className="hidden" style={{ display: "block", marginBottom: "20px", position: 'relative' }}>
                    <div className="hoverText" style={{ backgroundColor: '#dde8ec', borderRadius: 5, border: 'none', }}>
                        <ButtonGroup buttons={btnCT}
                            className="btn-hover"
                            width={30}
                            height={25}
                            hoverColor="#dde8ec"
                            textHoverColor="blue"
                            fontSize={18}
                            borderRadius={5}
                            color='red'
                            color1='#7589a3'
                        />
                    </div>
                </div>
            )}

            {props.children}
            {!props.isSender && props.message.messageType !== "SYSTEM" &&
                <div onClick={() => { hanldeUserGroup(); }} style={{ padding: 10 }}>
                    <Avatar user={senderUser} width={40} height={40} />
                </div>}

            {
                props.lastMessage ?
                    <div className="m-2 status-message1" >
                        {handleTime()=== true ? <div className="m-2 status-time">
                            <span>{`${arrayToDateTime(props.message.sendDate).getHours()}:${arrayToDateTime(props.message.sendDate).getMinutes()}`}</span>
                        </div> : <></>}
                        <div className=" status-message">
                            <div style={{ marginTop: -10, marginRight: 6 }}> <Icons type='iconTic' size={18} fillColor='white' /></div>
                            <span>  {checkStatusMessage()}</span>
                        </div>

                    </div>

                    : <></>
            }

            <FowardModal show={showFowardModal} handleClose={closeFowardModal} message={props.message} />
            {showAccountInfor && <AccountInfor show={showAccountInfor} onClose={() => { setShowAccountInfor(false) }} closeBack={2} user={userAcccount} addFriend={handleShowHelloMessageModal} />}
            {showHelloMessageModal && <HelloMessage show={showHelloMessageModal} user={userAcccount} onClose={() => setShowHelloMessageModal(false)} handleBack={handleShowAccountInforModal} />}

        </div>
    );
}

export default BaseMessage;