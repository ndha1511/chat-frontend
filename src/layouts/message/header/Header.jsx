import { useState } from "react";
import Avatar from "../../../components/avatar/Avatar";
import ButtonGroup from "../../../components/buttons/button-group/ButtonGroup";
import ButtonIcon from "../../../components/buttons/button-icon/ButtonIcon";
import { useDispatch, useSelector } from "react-redux";
import "./Header.scss"
import ChatInfoOffcanvas from "./ChatInfoOffcanvas";
import GroupManagerOffcanvas from "./GroupManagerOffcanvas";
import { callRequest } from "../../../services/MessageService";

import { setMessageCall } from "../../../redux/reducers/messageReducer";
import FriendInfor from "../../../components/modal/FriendInfor";
import { Icon } from "zmp-ui"
import Icons from "../../../components/icons/Icons";


function Header(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isHovered, setIsHovered] = useState(false);
    const [showManager, setShowManager] = useState(false);
    const chatInfo = useSelector(state => state.message.chatInfo);
    const userCurrent = useSelector((state) => state.userInfo.user);

    const dispatch = useDispatch();

    const [showInfor, setshowInfor] = useState(false)

    console.log(props.user)
    const handleShowProfile = () => {
        // setFriend(item)
        setshowInfor(true)

    }


    const handleShowManager = () => {
        setShowManager(true);
        handleClose()
    };
    const handleCloseManager = () => {
        setShowManager(false);
    };

    const chatIcon = [
        {
            item:  <Icon icon='zi-search' size={25}/>,
            title: "Tìm kiếm tin nhắn"
        },
        {
            item: <i style={{fontSize:19}} className="bi bi-telephone"></i>,
            title: "Cuộc gọi thoại"
        },
        {
            item: <Icons type="video1"  size={25} />,
            title: "Gọi video"
        },
        {

            item: <><i style={{fontSize:19}} className="bi bi-square-half"></i></>,

            title: "Thông tin hội thoại"
        }
    ]
    const chatIconGroup = [
        {
            item:  <Icon icon='zi-search' size={25}/>,
            title: "Tìm kiếm tin nhắn"
        },
        {
            item: <Icons type="video1"  size={25} />,
            title: "Gọi video"
        },
        {

            item: <><i style={{fontSize:19}} className="bi bi-square-half"></i></>,

            title: "Thông tin hội thoại"
        }
    ]
    const buttons = chatIcon;

    const clickButtonRightGroup = (index) => {
        switch (index) {
            case 0: break;
            case 1:
                break;
            case 2:
                handleShow();
                break;
            default: break;

        }
    }

    const clickButtonRight = (index) => {
        switch (index) {
            case 0: break;
            case 1:
                const data = {
                    senderId: userCurrent.email,
                    receiverId: chatInfo.user.email,
                    messageType: "AUDIO_CALL"
                }
                props.showDragableRequest();
                // call api
                handleCallRequest(data);
                break;
            case 2:
                break;
            case 3:
                // open offcanvas for user info 
                break;
            default: break;

        }
    }

    const handleCallRequest = async (data) => {
        props.setLocalPeer();
        props.setLocalStream({ video: false, audio: true });
        try {
            const response = await callRequest(data);
            dispatch(setMessageCall(response));

        } catch (error) {
            console.log(error);
        }
    }

    const renderRight = () => {
        if (chatInfo.room?.roomType === "GROUP_CHAT") {
            if (chatInfo.user.groupStatus === "INACTIVE") {
                return <></>;
            }
            if (!chatInfo.user.members.includes(userCurrent.email)) {
                return <></>;
            }
            return <div className="action">
                <ButtonGroup buttons={chatIconGroup} className="btn-hover" width={40} height={40} hoverColor="#f0f0f0" handle={clickButtonRightGroup} />
            </div>
        } else {
            return <div className="action">
                <ButtonGroup buttons={buttons} className="btn-hover" width={40} height={40} hoverColor="#f0f0f0" handle={clickButtonRight} />
            </div>
        }
    }

    return (
        <div className="d-flex w-100 p-3 pb-5 pt-4" style={{
            height: "100%",
            justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f0f0"
        }}>
            <div className="d-flex" style={{ alignItems: "center" }}>
                <button style={{ border: 'none', backgroundColor: 'white' }} onClick={handleShowProfile}><Avatar user={props.user} /></button>
                <div className="d-flex" style={{
                    marginLeft: 10,
                    alignItems: "center",

                }} onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <span
                        style={{ fontWeight: 'bold' }}

                    >
                        {props.user.name}
                    </span>
                    {isHovered && (
                        <div style={{marginLeft:6}}> <ButtonIcon
                            title="Chỉnh sửa"
                            className="btn-hover"
                            hoverColor="#f0f0f0"
                            borderRadius={50}
                        >
                            <Icon icon="zi-edit-text" size={20} />
                        </ButtonIcon></div>
                    )}
                </div>
            </div>
            {renderRight()}


            {/* Hiển thị Offcanvas 1 */}

            <ChatInfoOffcanvas
                show={show}
                handleClose={handleClose}
                user={props.user}
                handleShowManager={handleShowManager}
            />
            {/* Hiển thị Offcanvas 2 */}
            {/* Using the new GroupManagerOffcanvas */}
            <GroupManagerOffcanvas
                show={showManager}
                handleClose={handleCloseManager}
            />

            {/* Modal accontInfor */}
            <FriendInfor show={showInfor} onClose={() => setshowInfor(false)} friend={props.user} />

        </div>
    );
}

export default Header;