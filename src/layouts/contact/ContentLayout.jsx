import { useEffect, useState } from "react";
import Avatar from "../../components/avatar/Avatar";
import "./ContentLayout.scss"
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { deleteFriend } from "../../redux/reducers/friendReducer";
import { acceptFriendRequest, rejectFriendRequest } from "../../services/FriendService";
import ContentListFriend from "./ContentListFriend";
import ContentListGroup from "./ContentListGroup";
import Swal from "sweetalert2";
import { setChatInfo } from "../../redux/reducers/messageReducer";
import { getRoomBySenderIdAndReceiverId } from "../../services/RoomService";
import MessageLayout from "../message/MessageLayout";
import { reRender } from "../../redux/reducers/renderReducer";
import { reRenderGroup } from "../../redux/reducers/groupReducer";


function ContentLayout(props) {
    const friends = useSelector((state) => state.friend.friends); 
    const sendFriend = useSelector((state) => state.friend.friends);  // người gửi lời mời kết bạn
    const user = useSelector((state) => state.userInfo.user);
    const renderFriendReques = useSelector((state) => state.render.renderFriendReques)
    const dispatch = useDispatch();
    const contactIndex = useSelector(state => state.renderView.contactIndex);
    const [numOfInvite, setNumOfInvite] = useState(0);
    const [showSenderFriendLayout,setShowSenderFriendLayout]=useState(true)
    const [showMessageLayout, setShowMessageLayout] = useState(false);
    console.log(friends)
    console.log(user.email)
    useEffect(() => {
        setNumOfInvite(friends.length);
    }, [friends,contactIndex])
    useEffect(() => {
       
    }, [renderFriendReques])

  
    const handleShowMessageLayout = () => {
        setShowMessageLayout(true);
        setShowSenderFriendLayout(false);
    };
    const viewSendMessage = async () => {
        try {
            const response = await getRoomBySenderIdAndReceiverId(user.email, friends[0].user.email);
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
        finally{
            // onClose()
        }
    }
    const rejectFriendRequestAction = async (friend) => {
        try {
            await rejectFriendRequest({
                senderId: user.email,
                receiverId: friend.user.email
            })
            alert("đã từ chối lời  mời kết bạn với" + friend.user.name);
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                html: `đã từ chối lời  mời kết bạn với  ${friend.user.name }<br/><b>(2s)</b>`,
                timer: 3000, // Đặt thời gian tổng cộng là 4 giây để đảm bảo đếm ngược từ 2 -> 0
                timerProgressBar: false,
                showConfirmButton: true,
                willOpen: () => {
                    let counter = 2;
                    const timerInterval = setInterval(() => {
                        Swal.update({
                            html: `đã từ chối lời  mời kết bạn với  ${friend.user.name }<br/><b>(${counter}s)</b>`,
                        });
                        counter--;
                        if (counter < 0) {
                            clearInterval(timerInterval);
                            Swal.close(); // Đóng thông báo khi hết thời gian
                        }
                    }, 1000);
                }
            });
            dispatch(deleteFriend(friend));
        } catch (error) {
            console.log(error);
        }
    }

    const acceptFriendRequestAction = async (friend) => {
        try {
            await acceptFriendRequest({
                senderId: user.email,
                receiverId: friend.user.email
            })
            dispatch(reRender())
            // viewSendMessage()
            dispatch(reRenderGroup())
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                html: `bạn và  ${friend.user.name } đã trở thành bạn bè<br/><b>(2s)</b>`,
                timer: 3000, // Đặt thời gian tổng cộng là 4 giây để đảm bảo đếm ngược từ 2 -> 0
                timerProgressBar: false,
                showConfirmButton: true,
                willOpen: () => {
                    let counter = 2;
                    const timerInterval = setInterval(() => {
                        Swal.update({
                            html: `bạn và  ${friend.user.name } đã trở thành bạn bè<br/><b>(${counter}s)</b>`,
                        });
                        counter--;
                        if (counter < 0) {
                            clearInterval(timerInterval);
                            Swal.close(); // Đóng thông báo khi hết thời gian
                        }
                    }, 1000);
                }
            });
            dispatch(deleteFriend(friend));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        {showSenderFriendLayout && ( 
        
        contactIndex === 0 ? <ContentListFriend backButton = {props.backButton}/> : contactIndex === 1 ? <ContentListGroup backButton = {props.backButton}/> :
            <div className="d-flex tong" >
                <div className=" d-flex w-100 border column ml-6 p-3 top " >
                    {props.backButton}
                    <i className="bi bi-envelope-open-fill" style={{ color: "#67ACE3", }}  ></i>
                    <span className="d-flex " style={{ fontWeight: '500', marginLeft: '10px' }}>Lời mời kết bạn</span>

                </div>
                <div className="d-flex center" >
                    <div className="txt-top">
                        <h6>Lời mời kết bạn {numOfInvite}</h6>
                    </div>
                    <div className="ketBan">
                        {friends.map((friend, index) => {
                            return <div className="thongTin" key={index}>
                                <div className="d-flex top-cs">
                                    <Avatar width={50} height={50} user={friend.user} />
                                    <div className="center-cs">
                                        <h6>{friend.user.name}</h6>
                                    </div>
                                    <div>
                                        <Button variant="outline-primary"  ><i className="bi bi-chat-dots"></i></Button>
                                    </div>
                                </div>
                                <div className="txt">
                                    <textarea placeholder={`${friend.message}`} readOnly />
                                </div>
                                <div className="btn-ft">
                                    <Button variant="outline-primary" onClick={() => rejectFriendRequestAction(friend)}>Từ chối</Button>
                                    <Button variant="primary" onClick={() => acceptFriendRequestAction(friend)}>Đồng ý</Button>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
          
        )}
         {showMessageLayout && <MessageLayout />}
        </>

    );
}

export default ContentLayout;