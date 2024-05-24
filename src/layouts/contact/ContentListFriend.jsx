import { Button, Dropdown } from "react-bootstrap";
import "./ContentLayout.scss"
import React, { useEffect, useState } from "react";
import Avatar from "../../components/avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "../../components/modal/ProfileModal";
import { setChatInfo } from "../../redux/reducers/messageReducer";
import { getRoomBySenderIdAndReceiverId } from "../../services/RoomService";
import MessageLayout from "../message/MessageLayout";
import { blockUser, getUserByEmail, unblockUser } from "../../services/UserService";
import { setUserInfo } from "../../redux/reducers/userReducer";
import Swal from "sweetalert2";
import { reRenderGroup } from "../../redux/reducers/groupReducer";
import { unFriendRequest } from "../../services/FriendService";


function ContentListFriend(props) {
    const friends = useSelector((state) => state.friend.friendsAccepted);
    const [show, setshow] = useState(false)
    const [friend, setFriend] = useState({})
    const userCurrent = useSelector((state) => state.userInfo.user);
    const [showListFriend, setShowListFriend] = useState(true)
    const [showMessageLayout, setShowMessageLayout] = useState(false);
    const rederMessageLayout = useSelector(state => state.render.renderMessageLayout);
    const userBlocks = userCurrent.blockUsers;

    const handleShowMessageLayout = () => {
        setShowMessageLayout(true);
        setShowListFriend(false);
    };

    useEffect(() => {
        setShowMessageLayout(false);
        setShowListFriend(true);
    }, [rederMessageLayout])
    const handleShowProfile = (item) => {
        setFriend(item)
        setshow(true)

    }
    const dispatch = useDispatch();
    const viewSendMessage = async (user) => {
        try {
            const response = await getRoomBySenderIdAndReceiverId(userCurrent.email, user.email);
            console.log(userCurrent.email, user.email)
            const chatInfo = {
                user,
                roomId: response.roomId,
                room: response
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


    const handleBlock = async (block) => {
        try {
            const data = {
                senderId: userCurrent.email,
                blockId: block.email
            }
            const response = await blockUser(data);
            const userUpdate = await getUserByEmail(userCurrent.email);
            localStorage.setItem("user", JSON.stringify(userUpdate));
            dispatch(setUserInfo(userUpdate));
            Swal.fire({
                html: `Chặn thành công.`,
                timer: 1500, // Đặt thời gian tự đóng là 1500 mili giây
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    htmlContainer: 'my-custom-html',
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    const handleUnblock = async (unblock) => {
        try {
            const data = {
                senderId: userCurrent.email,
                blockId: unblock.email
            }
            const response = await unblockUser(data);
            const userUpdate = await getUserByEmail(userCurrent.email);
            localStorage.setItem("user", JSON.stringify(userUpdate));
            dispatch(setUserInfo(userUpdate));
            Swal.fire({
                html: `Bỏ chặn thành công.`,
                timer: 1500, // Đặt thời gian tự đóng là 1500 mili giây
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    htmlContainer: 'my-custom-html',
                }
            });
        } catch (error) {
            console.log(error);
        }
    };
    const unFriend = async (item) => {

        const emailSender = userCurrent.email
        const emailRe = item.email
        const request = {
            senderId: emailSender,
            receiverId: emailRe
        }
        try {
            const response = await unFriendRequest(request);
            dispatch(reRenderGroup())
            Swal.fire({
                html: `Bạn đã hủy kết bạn với ${item.email}.`,
                timer: 1500, // Đặt thời gian tự đóng là 2000 mili giây
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    htmlContainer: 'my-custom-html' ,
                }     
            });
        } catch (error) {
            console.error("Error sending friend request:", error);
            alert("Không thể gửi yêu cầu kết bạn.");
        }
    }
    return (
        <>
            {showListFriend && (
                <>
                    <div className="d-flex tong" >

                        <div className=" d-flex w-100 border column ml-6 p-3 top " >
                            {props.backButton}
                            <i className="bi bi-person-lines-fill" style={{ color: "#67ACE3", fontSize: 25 }}  ></i>
                            <span className="d-flex " style={{ fontWeight: '500', marginLeft: '10px' }}>Danh sách bạn bè</span>
                        </div>

                        <div className="d-flex listFriend-center" >
                            <div className="txt-top">
                                <h6 style={{ marginTop: 10 }}>Bạn bè ({friends.length})</h6>
                            </div>
                            <div className="loc">
                                <div className="loc-top">
                                    <div className="search">
                                        <i className="bi bi-search"></i>
                                        <input type="text" placeholder="Tìm bạn" />
                                    </div>
                                    <div className="menu1">
                                        <Dropdown className="">
                                            <Dropdown.Toggle as={CustomToggle}>

                                                <div style={{ width: 700, display: 'flex', justifyContent: 'space-between' }}>
                                                    <div style={{ display: "flex", }}>
                                                        <i className="bi bi-arrow-down-up"></i>
                                                        <span style={{ marginLeft: 15 }} >A-Z</span>
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
                                                        <span style={{ marginLeft: 10 }} >A-Z</span>
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
                                    {friends.map((item) => (
                                        <div onClick={() => viewSendMessage(item)} className="loc-center-s">
                                            <div className="loc-center-item">
                                                <Avatar user={item} />
                                                <h6>{item.name}</h6>
                                            </div>
                                            <div>
                                                <Dropdown className="">
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic" as={CustomToggle}>
                                                        <button><i className="bi bi-three-dots"></i></button>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu className="list-item" >
                                                        <Dropdown.Item onClick={(e) => {handleShowProfile(item); e.stopPropagation()}} >Xem thông tin</Dropdown.Item>
                                                        <Dropdown.Item >Phân loại </Dropdown.Item>
                                                        <Dropdown.Item >Đặt tên gợi nhớ</Dropdown.Item>
                                                        {userBlocks && userBlocks.includes(item.email) ?
                                                            <Dropdown.Item onClick={(e) => { handleUnblock(item); e.stopPropagation() }}>Bỏ chặn</Dropdown.Item> :
                                                            <Dropdown.Item onClick={(e) => { handleBlock(item); e.stopPropagation() }}>Chặn người này</Dropdown.Item>}
                                                        <Dropdown.Item onClick={(e)=>{unFriend(item);e.stopPropagation()}} >Xóa bạn</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <ProfileModal show={show} onClose={() => setshow(false)} friend={friend} />



                    </div>
                </>
            )}
            {showMessageLayout && <MessageLayout backButton={props.backButton} />}

        </>

    );

}
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href="/"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick(e);
        }}
        className="dropdown-menu1" // Thêm class cho avatar dropdown
    >
        {children}
    </a>
));
export default ContentListFriend;