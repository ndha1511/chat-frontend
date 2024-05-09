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
import { reRenderFriendReques } from '../../redux/reducers/renderReducer';
import Swal from 'sweetalert2';
import { reRenderGroup } from '../../redux/reducers/groupReducer';
import RandomBackgroundImage from '../RandomBackgroundImage/RandomBackgroundImage';
import SimpleBar from 'simplebar-react';


const AccountInfor = ({ show, onClose, handleBack, user, addFriend, closeBack }) => {
    const userCurrent = useSelector((state) => state.userInfo.user);
    const friends = useSelector((state) => state.friend.friendsAccepted);
    const [isFriend, setIsFriend] = useState(false)
    const reRender = useSelector((state) => state.render.renderFriendReques);
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
    useEffect(() => {
        // setIsFriend(true)

    }, [reRender])
    // console.log(reRender)
    const viewSendMessage = async () => {
        try {
            const response = await getRoomBySenderIdAndReceiverId(userCurrent.email, user.email);
            console.log(userCurrent.email, user)
            const chatInfo = {
                user,
                roomId: response.roomId
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
    const unFriend = async () => {


        const emailSender = userCurrent.email
        const emailRe = user.email
        const request = {
            senderId: emailSender,
            receiverId: emailRe
        }
        try {
            const response = await unFriendRequest(request);
            // dispatch(reRenderFriendReques())
            dispatch(reRenderGroup())
            onClose();
            Swal.fire({
                html: `Bạn đã hủy kết bạn với ${user.email}.`,
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
        <Modal className='container-account-infor' show={show} onHide={onClose} size="md" centered>
            <Modal.Header closeButton className='modal-header-cs'>
                {closeBack !== 2 && (<button variant="outline-secondary" className='btn-hearder' onClick={handleBack}><Icon icon='zi-chevron-left-header' size={25} /></button>)}
                <Modal.Title style={{ fontWeight: 600 }} >Thông Tin Cá Nhân</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body-cs'>
                <SimpleBar style={{ maxHeight: '85vh',  }}>
                    <div className="profile-modal">
                        <div className="profile-background">
                            <RandomBackgroundImage />
                        </div>
                        <div className="profile-avatar">
                            <Avatar user={user} width={80} height={80} />
                            <h5 className="text-center mt-2">{user && user.name ? user.name : ""}</h5>
                            <button><Icon icon='zi-edit-text' size={20} /></button>
                        </div>
                        <div className='btn-account-infor'>
                            {isFriend ?
                                <button className='btn-add-call' onClick={addFriend} >Gọi điện</button>
                                : <button className='btn-add-call' onClick={addFriend} >Kết bạn</button>

                            }

                            <button className='btn-message' variant="primary" onClick={viewSendMessage}>Nhắn tin</button>
                        </div>
                        <div className='backgroundColor'></div>
                        <div className="user-info">
                            <h6>Thông tin cá nhân</h6>
                            <ListGroup variant="flush">
                                <ListGroup.Item>{`Giới tính: ${user && user.gender ? "Nam" : "Nữ"}`}</ListGroup.Item>
                                <ListGroup.Item>Ngày sinh: {user && user.dob ? user.dob : ""}</ListGroup.Item>
                                <ListGroup.Item>{`Email: ${user && user.email ? user.email : ""}`}</ListGroup.Item>
                                <ListGroup.Item></ListGroup.Item>
                            </ListGroup>
                        </div>
                        <div className='ft-css'>
                            <button className='btn-unfriend' onClick={addFriend} ><Icon style={{ marginLeft: 10, marginRight: 10 }} icon='zi-members' size={22} /> Nhóm chung</button>
                            <button className='btn-unfriend' onClick={addFriend} ><Icon style={{ marginLeft: 10, marginRight: 10 }} icon='zi-ban' size={20} /> Chặn cuộc gọi</button>
                            <button className='btn-unfriend' onClick={addFriend} ><Icon style={{ marginLeft: 10, marginRight: 10 }} icon='zi-warning' size={20} /> Báo xấu</button>
                            {isFriend && (
                                <button className='btn-unfriend' onClick={unFriend} ><Icon style={{ marginLeft: 10, marginRight: 10 }} icon='zi-delete' size={20} /> Hủy kết bạn</button>
                            )}
                        </div>
                    </div>
                </SimpleBar>




            </Modal.Body>

        </Modal>
    );
};

export default AccountInfor;
