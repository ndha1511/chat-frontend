import { Dropdown } from "react-bootstrap";
import "./ContentLayout.scss"
import React, { useEffect, useState } from "react";
import Avatar from "../../components/avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { setChatInfo } from "../../redux/reducers/messageReducer";
import { getRoomBySenderIdAndReceiverId } from "../../services/RoomService";
import MessageLayout from "../message/MessageLayout";
import { getGroupById, leaveGroup, removeGroup } from "../../services/GroupService";
import VerifyModal from "../../components/dialogs/verify-dialog/VerifyModal";
import { reRenderGroup } from "../../redux/reducers/groupReducer";
import Swal from "sweetalert2";

function ContentListGroup(props) {
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href="/"
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="dropdown-menu1" // Thêm class cho avatar dropdown
        >
            {children}
        </a>
    ));
    const groups = useSelector((state) => state.group.groups);
    const userCurrent = useSelector((state) => state.userInfo.user);
    const [showListGroup, setShowListGroup] = useState(true)
    const [showMessageLayout, setShowMessageLayout] = useState(false);
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const rederMessageLayout = useSelector(state => state.render.renderMessageLayout)
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const chatInfor = useSelector(state => state.message.chatInfo);
    const handleCloseRemoveModal = () => setShowRemoveModal(false);
    const handleCloseModal = () => setShowVerifyModal(false);
    const [itemGroup,setItemGroup] = useState();
    
    const [chatInfo, setChatInfo] = useState(chatInfor);
    const handleShowMessageLayout = () => {
        setShowMessageLayout(true);
        setShowListGroup(false);
    };
    console.log(groups.length)
    useEffect(() => {
        setShowMessageLayout(false);
        setShowListGroup(true);
    }, [rederMessageLayout])
    const dispatch = useDispatch();
    const viewSendMessage = async (id) => {
        console.log(id)
        try {
            const response = await getGroupById(id);
            const res = await getRoomBySenderIdAndReceiverId(userCurrent.email, id);
            console.log(response)
            const userData = {
                name: response.groupName,
                email: response.id,
                ...response
            }
            const chatInfo = {
                user: userData,
                roomId: response.id,
                room: res
            };
            dispatch(setChatInfo(chatInfo));
            handleShowMessageLayout();
            return response;

        } catch (error) {
            const chatInfo = {
            };
            dispatch(setChatInfo(chatInfo));
        }
        finally {
            // onClose()
        }
    }
    const handleLeaveGroup = (item) => {
        setItemGroup(item);
        handleShow();   
        

    }
    const handleShow = () => setShowVerifyModal(true);
    const leaveAction = async () => {
        const request = {
            memberId: userCurrent.email,
            groupId: itemGroup.id
        }
        try {
            await leaveGroup(request);
            Swal.fire({
                html: `Bạn đã rời khỏi nhóm.`,
                timer: 1500, // Đặt thời gian tự đóng là 1500 mili giây
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    htmlContainer: 'my-custom-html',
                },
                width: '130px',
                padding: 0, 
            });
            dispatch(reRenderGroup())
        } catch (error) {
            console.log(error);
        }
    }
    const removeAction = async () => {
        const request = {
            ownerId: userCurrent.email,
            groupId: itemGroup.id
        }
        try {
            await removeGroup(request);
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            {showListGroup && (
                <>
                    <div className="d-flex tong" >
                        <div className=" d-flex w-100 border column ml-6 p-3 top " >
                            {props.backButton}
                            <i className="bi bi-people-fill" style={{ color: "#67ACE3", fontSize: 25 }}  ></i>
                            <span className="d-flex " style={{ fontWeight: '500', marginLeft: '10px' }}>Danh sách nhóm</span>
                        </div>
                        <div className="d-flex listFriend-center" >
                            <div className="txt-top">
                                <h6 style={{ marginTop: 10 }}>Nhóm ({groups.length})</h6>
                            </div>
                            <div className="loc">
                                <div className="loc-top">
                                    <div className="search">
                                        <i className="bi bi-search"></i>
                                        <input type="text" placeholder="Tìm bạn" />
                                    </div>
                                    <div className="menu1">
                                        <Dropdown className="">
                                            <Dropdown.Toggle variant="success" id="dropdown-basic" as={CustomToggle}>
                                                <div style={{ width: 700, display: 'flex', justifyContent: 'space-between' }}>
                                                    <div style={{ display: "flex", }}>
                                                        <i className="bi bi-arrow-down-up"></i>
                                                        <span style={{ marginLeft: 15 }}>A-Z</span>
                                                    </div>
                                                    <i className="bi bi-caret-down-fill"></i>
                                                </div>

                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="list-item">
                                                <Dropdown.Item href="#/action-1">Hành động 1</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Hành động 2</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Hành động 3</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="menu1">
                                        <Dropdown className="">
                                            <Dropdown.Toggle variant="success" id="dropdown-basic" as={CustomToggle}>

                                                <div style={{ width: 700, display: 'flex', justifyContent: 'space-between' }}>
                                                    <div style={{ display: "flex", }}>
                                                        <i className="bi bi-arrow-down-up"></i>
                                                        <span style={{ marginLeft: 15 }} >A-Z</span>
                                                    </div>
                                                    <i className="bi bi-caret-down-fill"></i>
                                                </div>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="list-item" >
                                                <Dropdown.Item href="#/action-1">Hành động 1</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Hành động 2</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Hành động 3</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="loc-center">
                                    {groups.map((item, index) => (

                                        <div onClick={() => { viewSendMessage(item.id) }} className="loc-center-s" key={index}>
                                            <div className="loc-center-item">
                                                <Avatar user={{
                                                    avatar: item.avatar,
                                                    name: item.groupName
                                                }} />
                                                <h6>{item.groupName}</h6>
                                            </div>
                                            <div>
                                                <Dropdown className="" onClick={(e) => { e.stopPropagation() }}>
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic" as={CustomToggle}>
                                                        <button  ><i className="bi bi-three-dots"></i></button>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu className="list-item" >
                                                        <Dropdown.Item onClick={()=>{handleLeaveGroup(item)}}  >Rời nhóm</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {showMessageLayout && <MessageLayout backButton={props.backButton} />}
            <VerifyModal content="Bạn có chắc chắn muốn rời nhóm" show={showVerifyModal}
                    handleClose={handleCloseModal}
                    action={leaveAction}
                />
        </>
    );
}

export default ContentListGroup;