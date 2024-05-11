import React, { useEffect, useState } from 'react';
import { Modal, ListGroup, Button } from 'react-bootstrap';
import "./ProfileModal.scss"; // Đảm bảo file SCSS được chỉnh sửa để phù hợp
import Avatar from '../avatar/Avatar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getRoomBySenderIdAndReceiverId } from '../../services/RoomService';
import { setChatInfo } from '../../redux/reducers/messageReducer';
import { Icon } from 'zmp-ui';
import { unFriendRequest } from '../../services/FriendService';
import Swal from 'sweetalert2';
import { reRenderGroup } from '../../redux/reducers/groupReducer';
import SimpleBar from 'simplebar-react';
import { getUserGroupById } from '../../services/GroupService';


const GroupInfor = ({ show, onClose, user, listMember }) => {
    const userCurrent = useSelector((state) => state.userInfo.user);
    const friends = useSelector((state) => state.friend.friendsAccepted);
    const [isFriend, setIsFriend] = useState(false)
 
    const chatInfo = useSelector(state => state.message.chatInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) navigate("/auth/login");

    }, [])
    useEffect(() => {
        friends.map((friend) => {
            if (friend.email === user.email) {
                setIsFriend(true)
            }
        })

    }, [user])
    const viewSendMessage = async () => {
        try {
            const response = await getRoomBySenderIdAndReceiverId(userCurrent.email, user.email);
            console.log(userCurrent.email, user)
            const chatInfo = {
                user,
                roomId: response.roomId,
                room: response
            };
            dispatch(setChatInfo(chatInfo));
            return response;

        } catch (error) {
            const chatInfo = {
                user,
                roomId: ""
            };
            dispatch(setChatInfo(chatInfo));
        }
        finally {
            onClose()
        }
    }



    return (
        <Modal className='container-account-infor' show={show} onHide={onClose} size="md" centered>
            <Modal.Header closeButton className='modal-header-cs'>
                <Modal.Title style={{ fontWeight: 600 }} >Thông tin nhóm</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body-cs'>
                <SimpleBar style={{ maxHeight: '85vh', }}>
                    <div className="profile-modal">
                        <div className="profile-avatar-group">
                            <Avatar user={user} width={80} height={80} />
                            <h5 className="text-center mt-2">{user && user.name ? user.name : ""}</h5>
                            <button><Icon icon='zi-edit-text' size={20} /></button>
                        </div>
                        <div className='btn-account-infor-group'>
                            <button className='btn-message' variant="primary" onClick={viewSendMessage}>Nhắn tin</button>
                        </div>
                        <div className='backgroundColor-group'></div>
                        <div className="user-info-group">
                            <h6>Thành viên ({chatInfo.user.numberOfMembers})</h6>
                            <div className='member-group'>
                                {listMember.map(member => (
                                       <Avatar user={member}  width={40} height={40} />
                                ))}
                            
                            
                            </div>


                        </div>
                        <div className='backgroundColor-group'></div>
                        <div className='ft-css'>
                            <button className='btn-unfriend'  ><Icon style={{ marginLeft: 10, marginRight: 10 }} icon='zi-link' size={22} /> Link tham gia nhóm</button>
                            <button className='btn-unfriend'  ><Icon style={{ marginLeft: 10, marginRight: 10 }} icon='zi-setting' size={20} /> Quản lý nhóm</button>
                            <button className='btn-unfriend' style={{ color: 'red' }} ><Icon style={{ marginLeft: 10, marginRight: 10 }} icon='zi-leave' size={20} /> Rời nhóm</button>
                        </div>
                    </div>
                </SimpleBar>




            </Modal.Body>

        </Modal>
    );
};

export default GroupInfor;
