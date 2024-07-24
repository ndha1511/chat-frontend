import { useEffect, useState } from "react";
import Avatar from "../../../components/avatar/Avatar";
import ButtonGroup from "../../../components/buttons/button-group/ButtonGroup";
import ButtonIcon from "../../../components/buttons/button-icon/ButtonIcon";
import { useDispatch, useSelector } from "react-redux";
import "./Header.scss"
import ChatInfoOffcanvas from "./ChatInfoOffcanvas";
import GroupManagerOffcanvas from "./GroupManagerOffcanvas";
import { callRequest } from "../../../services/MessageService";

import { setMessageCall, setMessageSearch } from "../../../redux/reducers/messageReducer";

import { Icon } from "zmp-ui"
import Icons from "../../../components/icons/Icons";
import { getUserGroupById } from "../../../services/GroupService";

import AccountInfor from "../../../components/modal/AccountInfor";
import ChatInfoOffcanvasFriend from "./ChatInfoOffcanvasFriend";

import { closePeer, closeStream, setLocalPeer, setLocalStream } from "../../../configs/WebRTCConfig";
import { setDragableCallRequest } from "../../../redux/reducers/dragableReducer";
import HelloMessage from "../../../components/modal/HelloMessage";
import GroupInfor from "../../../components/modal/GroupInfor";
import UpdateGroupModal from "../../header/UpdateGroupModal";
import { setShowSearchMessage } from "../../../redux/reducers/renderLayoutReducer";
import Swal from "sweetalert2";



function Header(props) {
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [isHovered, setIsHovered] = useState(false);
    const [showManager, setShowManager] = useState(false);
    const chatInfo = useSelector(state => state.message.chatInfo);
    const userCurrent = useSelector((state) => state.userInfo.user);
    const showSearchMessage = useSelector((state) => state.renderView.showSearchMessage);
    const [showHelloMessageModal, setShowHelloMessageModal] = useState(false)
    const reRenderOffcanvas = useSelector(state => state.members.showOffcanvas)
    const [showGroup, setShowGroup] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showInfor, setshowInfor] = useState(false)
    const [listMember, setListMember] = useState([])
    const dispatch = useDispatch();

    const clearSearch = () => {
        dispatch(setMessageSearch({
            messages: [],
            show: false,
            loading: false,
            totalPages: 0,
        }));
    }
    const handleShowHelloMessageModal = () => {
        setshowInfor(false);
        setShowHelloMessageModal(true)

    }
    const handleShowAccountInfor = () => {
        setshowInfor(true);
        setShowHelloMessageModal(false)
    }

    useEffect(() => {
        setShow(false);
    }, [reRenderOffcanvas])

    const memberList = async () => {
        const rep = await getUserGroupById(chatInfo.user.id);
        setListMember(rep);
    }
    console.log(listMember)
    const hanldeUserGroup = async () => {

        if (chatInfo.room?.roomType === "GROUP_CHAT") {
            try {
                await memberList();
                setShowGroup(true);
            } catch (error) {

            }

        } else {
            setshowInfor(true);
        }
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
            item: <Icon icon='zi-search' size={25} />,
            title: "Tìm kiếm tin nhắn"
        },
        {
            item: <i style={{ fontSize: 19 }} className="bi bi-telephone"></i>,
            title: "Cuộc gọi thoại"
        },
        {
            item: <Icons type="video1" size={25} />,
            title: "Gọi video"
        },
        {

            item: <><i style={{ fontSize: 19 }} className="bi bi-square-half"></i></>,

            title: "Thông tin hội thoại"
        }
    ]
    const chatIconGroup = [
        {
            item: <Icon onClick={() => { setShowCreateModal(true) }} icon='zi-add-member' size={25} />,
            title: "Thêm thành viên"
        },
        {
            item: <Icon icon='zi-search' size={25} />,
            title: "Tìm kiếm tin nhắn"
        },
        {
            item: <Icons type="video1" size={25} />,
            title: "Gọi video"
        },
        {

            item: <><i style={{ fontSize: 19 }} className="bi bi-square-half"></i></>,

            title: "Thông tin hội thoại"
        }
    ]
    const buttons = chatIcon;

    const clickButtonRightGroup = async (index) => {
        switch (index) {
            case 0: break;
            case 1:
                if (showSearchMessage) {
                    clearSearch();
                }
                dispatch(setShowSearchMessage(!showSearchMessage));
                break;
            case 2:
                const dataVideo = {
                    senderId: userCurrent?.email,
                    receiverId: chatInfo?.user?.id,
                    messageType: "VIDEO_CALL"
                }

                // call api
                const mediaVideo = { video: true, audio: true };
                await handleCallRequest(dataVideo, mediaVideo);
                break;
            case 3:
                handleShow();
                break;
            default: break;

        }
    }

    const clickButtonRight = async (index) => {
        switch (index) {
            case 0:
                if (showSearchMessage) {
                    clearSearch();
                }
                dispatch(setShowSearchMessage(!showSearchMessage));
                break;
            case 1:
                const data = {
                    senderId: userCurrent?.email,
                    receiverId: chatInfo?.user?.email,
                    messageType: "AUDIO_CALL"
                }

                // call api
                const media = { video: false, audio: true };
                await handleCallRequest(data, media);
                break;
            case 2:
                const dataVideo = {
                    senderId: userCurrent?.email,
                    receiverId: chatInfo?.user?.email,
                    messageType: "VIDEO_CALL"
                }
                // call api
                const mediaVideo = { video: true, audio: true };
                await handleCallRequest(dataVideo, mediaVideo);
                break;
            case 3:
                // open offcanvas for user info 
                handleShow1();
                break;
            default: break;

        }
    }

    const handleCallRequest = async (data, media) => {
        try {
            setLocalPeer();
            await setLocalStream(media);
            dispatch(setDragableCallRequest(true));
            const response = await callRequest(data);
            dispatch(setMessageCall(response));
            

        } catch (error) {
            closePeer();
            closeStream();
            dispatch(setDragableCallRequest(false));
            const status = error.response.status;
            switch(status) {
                case 410:
                    Swal.fire({
                        html: `Người nhận hiện không muốn nhận cuộc gọi.`,
                        timer: 1500, // Đặt thời gian tự đóng là 2000 mili giây
                        timerProgressBar: true,
                        showConfirmButton: false,
                        customClass: {
                            htmlContainer: 'my-custom-html' ,
                        }     ,
                        width: '250px',
                        padding: 0,
                    });
                    break;
                case 411:
                    Swal.fire({
                        html: `Người nhận không muốn nhận cuộc gọi từ người lạ.`,
                        timer: 1500, // Đặt thời gian tự đóng là 2000 mili giây
                        timerProgressBar: true,
                        showConfirmButton: false,
                        customClass: {
                            htmlContainer: 'my-custom-html' ,
                        }     ,
                        width: '250px',
                        padding: 0,
                    });
                    break;
                default:
                    break;
            }

        }
    }

    const renderRight = () => {
        if (chatInfo.room?.roomType === "GROUP_CHAT") {
            if (chatInfo?.user.groupStatus === "INACTIVE") {
                return <></>;
            }
            if (!chatInfo?.user.members.includes(userCurrent.email)) {
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
                <button style={{ border: 'none', backgroundColor: 'white' }} onClick={hanldeUserGroup}><Avatar user={chatInfo.user} /></button>
                <div className="d-flex" style={{
                    marginLeft: 10,
                    alignItems: "center",

                }} onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <span
                        style={{ fontWeight: 'bold' }}

                    >
                        {chatInfo.user.name}
                    </span>
                    {isHovered && (
                        <div style={{ marginLeft: 6 }}> <ButtonIcon
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

            {show && <ChatInfoOffcanvas
                show={show}
                handleClose={handleClose}
                user={chatInfo.user}
                handleShowManager={handleShowManager}
            />}
            {/* Hiển thị Offcanvas 2 */}
            {/* Using the new GroupManagerOffcanvas */}
            {showManager && <GroupManagerOffcanvas
                show={showManager}
                handleClose={handleCloseManager}
            />}
            {/* Hiển thị Offcanvas 3 */}
            {show1 && <ChatInfoOffcanvasFriend
                show={show1}
                handleClose={handleClose1}
                user={props.user}
                handleShowManager={handleShowManager}
            />}
            {/* Modal accontInfor */}
            {
                showInfor && <AccountInfor show={showInfor} onClose={() => setshowInfor(false)} user={chatInfo.user} closeBack={2} addFriend={handleShowHelloMessageModal} />

            }
            {
                showHelloMessageModal && <HelloMessage show={showHelloMessageModal} user={chatInfo.user} onClose={() => setShowHelloMessageModal(false)} handleBack={handleShowAccountInfor} />

            }
            {showGroup && <GroupInfor show={showGroup} onClose={() => setShowGroup(false)} user={chatInfo.user} listMember={listMember} />}
            <UpdateGroupModal show={showCreateModal} handleClose={() => setShowCreateModal(false)}
                groupName={chatInfo.user.name}
            // selectedMembers={groupChat.members}
            />
        </div>
    );
}

export default Header;