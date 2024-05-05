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
import { iceServers } from "../../full-layout/FullLayout";

function Header(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showManager, setShowManager] = useState(false);
    const chatInfo = useSelector(state => state.message.chatInfo);
    const userCurrent = useSelector((state) => state.userInfo.user);
    const dispatch = useDispatch();

    const handleShowManager = () => {
        setShowManager(true);
        handleClose()
    };
    const handleCloseManager = () => {
        setShowManager(false);
    };

    const chatIcon = [
        {
            item: <i className="bi bi-search"></i>,
            title: "Tìm kiếm tin nhắn"
        },
        {
            item: <i className="bi bi-telephone"></i>,
            title: "Cuộc gọi thoại"
        },
        {
            item: <i className="bi bi-camera-video"></i>,
            title: "Gọi video"
        },
        {

            item: <><i className="bi bi-square-half"></i></>,

            title: "Thông tin hội thoại"
        }
    ]
    const chatIconGroup = [
        {
            item: <i className="bi bi-search"></i>,
            title: "Tìm kiếm tin nhắn"
        },
        {
            item: <i className="bi bi-camera-video"></i>,
            title: "Gọi video"
        },
        {

            item: <><i className="bi bi-square-half"></i></>,

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
                <Avatar user={props.user} />
                <div className="d-flex" style={{
                    marginLeft: 10,
                    alignItems: "center",
                }}>
                    <span style={{ fontWeight: "bold" }}>{props.user.name}</span>
                    <ButtonIcon
                        title="Chỉnh sửa"
                        className="btn-hover"
                        hoverColor="#f0f0f0"
                        borderRadius={50}
                    ><i className="bi bi-pencil-square"></i></ButtonIcon>
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
        </div>
    );
}

export default Header;