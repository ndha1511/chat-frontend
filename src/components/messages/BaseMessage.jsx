import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./BaseMessage.scss";
import ButtonGroup from "../buttons/button-group/ButtonGroup";
import { btnCT } from "../../configs/button_group_icon_config";
import { Button, Dropdown, Form, ListGroup, Modal } from "react-bootstrap";
import { deleteMessage, revokeMessage } from "../../services/MessageService";
import { pushMessage, reRenderMessge, setMessageReply } from "../../redux/reducers/messageReducer";
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
    const [showAvatar, setShowAvatar] = useState(false);
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
            case "SENDING": return <div className=" status-message">
                <span>Đang gửi</span>
            </div>;
            case "SENT": return <div className=" status-message">
                <div style={{ marginTop: -10, marginRight: 6 }}> <Icons type='iconTic' size={18} fillColor='white' /></div>
                <span>Đã gửi</span>
            </div>;
            case "SEEN": return <div className=" status-message">
                <div style={{ marginTop: -10, marginRight: 6 }}><Icons type='doubleTick' size={18} fillColor='white' /></div>
                <span>Đã xem</span>
            </div>;
            case "ERROR": return "Lỗi";
            case "RECEIVED": return <div className=" status-message">
                <div style={{ marginTop: -10, marginRight: 6 }}><Icons type='doubleTick' size={18} fillColor='white' /></div>
                <span>Đã nhận</span>
            </div>;
            default: return "";
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAvatar(true);
        }, 60000); // 60,000 milliseconds = 1 minute

        // Clean up the timer if the component unmounts
        return () => clearTimeout(timer);
    }, []);

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
    const btnCT = [
        { item: <i className="bi bi-quote" style={{ transform: 'scaleX(-1) scaleY(-1)', fontSize: 22, }}></i>, title: "Trả lời" },

        { item: <Icon icon="zi-share-solid" size={18} />, title: "Chia sẻ" },

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
            </Dropdown>,
            title: "Thêm"
        }

    ]

    const senderUser = {
        avatar: props.message.senderAvatar,
        name: props.message.senderName
    }

    const handleMessage = (index) => {
        switch (index) {
            case 0:
                dispatch(setMessageReply(props.message));
                break;
            case 1:
                openFowardModal();
                break;
            default:
                break;
        }
    }

    return (
        <div onMouseEnter={() => setHiddenBtn(true)}
            onMouseLeave={() => setHiddenBtn(false)}
            className={`d-flex w-100  ${handleTime() ? "mb-3" : ""}  `} style={{
                flexDirection: props.isSender && props.message.messageType !== "SYSTEM" ? "row" : "row-reverse",
                alignItems: props.message.messageType === "SYSTEM" ? "center" : "flex-start", justifyContent: props.message.messageType === "SYSTEM" ? "center" : "flex-end", position: 'relative',
            }}>
            {hiddenBtn && props.message.messageStatus !== "REVOKED" && props.message.messageStatus !== "ERROR" && props.message.messageType !== "SYSTEM"
                && props.message.messageType !== "AUDIO_CALL" && props.message.messageType !== "VIDEO_CALL" && (
                    <div className="hidden d-flex align-items-end" style={{ marginBottom: "20px", position: 'relative', height: "100%" }}>
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
                                handle={handleMessage}
                            />
                        </div>
                    </div>
                )}
            {props.children}
            {!props.isSender && props.message.messageType !== "SYSTEM" && props.showAvatar ?
                <div onClick={() => { hanldeUserGroup(); }}>
                    <Avatar user={senderUser} width={40} height={40} />
                </div>
                :
                !props.isSender &&
                <div style={{ width: 40, padding: 10 }}>

                </div>
            }

            {
                props.lastMessage ?
                    <div className="m-2 status-message1" >
                        {handleTime() === true ? <div className="m-2 status-time">
                            <span>{`${arrayToDateTime(props.message.sendDate).getHours()}:${arrayToDateTime(props.message.sendDate).getMinutes()}`}</span>
                        </div> : <></>}
                        {checkStatusMessage()}

                    </div>

                    : <div className="m-2 status-message1" style={{ paddingLeft: 60 }}  >
                        {handleTime() === true ? <div className="m-2 status-time">
                            <span>{`${arrayToDateTime(props.message.sendDate).getHours()}:${arrayToDateTime(props.message.sendDate).getMinutes()}`}</span>
                        </div> : <></>}

                    </div>
            }

            <FowardModal show={showFowardModal} handleClose={closeFowardModal} message={props.message} />
            {showAccountInfor && <AccountInfor show={showAccountInfor} onClose={() => { setShowAccountInfor(false) }} closeBack={2} user={userAcccount} addFriend={handleShowHelloMessageModal} />}
            {showHelloMessageModal && <HelloMessage show={showHelloMessageModal} user={userAcccount} onClose={() => setShowHelloMessageModal(false)} handleBack={handleShowAccountInforModal} />}

        </div>
    );
}

export default BaseMessage;