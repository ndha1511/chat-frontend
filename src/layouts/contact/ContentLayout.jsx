import { useEffect, useState } from "react";
import Avatar from "../../components/avatar/Avatar";
import "./ContentLayout.scss"
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { deleteFriend } from "../../redux/reducers/friendReducer";
import { acceptFriendRequest, rejectFriendRequest } from "../../services/FriendService";


function ContentLayout() {
    const friends = useSelector((state) => state.friend.friends);
    const user = useSelector((state) => state.userInfo.user);
    const dispatch = useDispatch();
    
    const [numOfInvite, setNumOfInvite] = useState(0);

    useEffect(() => {
        setNumOfInvite(friends.length);
    }, [friends])
    
    const rejectFriendRequestAction = async (friend) => {
        try {
            await rejectFriendRequest({
                senderId: user.email,
                receiverId: friend.user.email
            })
            alert("đã từ chối kết bạn với" + friend.user.name);
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
            alert("bạn và " + friend.user.name + " đã trở thành bạn bè");
            dispatch(deleteFriend(friend));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="d-flex tong" >
            <div className=" d-flex w-100 border column ml-6 p-3 top " >
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
                            <Avatar width={50} height={50} user={friend.user}/>
                            <div className="center-cs">
                                <h6>{friend.user.name}</h6>
                            </div>
                            <div>
                                <Button variant="outline-primary"  ><i className="bi bi-chat-dots"></i></Button>
                            </div>
                        </div>
                        <div className="txt">
                            <textarea placeholder={`${friend.message}`} readOnly/>
                        </div>
                        <div className="btn-ft">
                            <Button variant="outline-primary"  onClick={() => rejectFriendRequestAction(friend)}>Từ chối</Button>
                            <Button variant="primary" onClick={() => acceptFriendRequestAction(friend)}>Đồng ý</Button>
                        </div>
                    </div>
                    })}
                </div>
            </div>
        </div>
    );
}

export default ContentLayout;