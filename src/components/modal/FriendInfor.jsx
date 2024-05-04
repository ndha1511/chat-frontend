import React, { useEffect } from 'react';
import { Modal, ListGroup, Button } from 'react-bootstrap';
import "./ProfileModal.scss"; // Đảm bảo file SCSS được chỉnh sửa để phù hợp
import Avatar from '../avatar/Avatar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getRoomBySenderIdAndReceiverId } from '../../services/RoomService';
import { setChatInfo } from '../../redux/reducers/messageReducer';

const FriendInfor = ({ show, onClose, handleBack,user,addFriend, closeModal,friend }) => {
    const userCurrent = useSelector((state) => state.userInfo.user);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const viewSendMessage = async () => {
        try {
            const response = await getRoomBySenderIdAndReceiverId(userCurrent.email, user.email);
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
        finally{
            onClose()
        }
    }
    return (
        <Modal show={show} onHide={onClose} size="md" centered>
            <Modal.Header closeButton className='modal-header-cs'>
                <Modal.Title>Thông Tin Cá Nhân</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body-cs'>
                <div className="profile-modal">
                    <div className="profile-background">
                        <img
                            src="https://i.pinimg.com/736x/4f/31/2a/4f312aa213541fed49e46896076b8e40.jpg"
                            alt="Ảnh bìa"
                            className="img-fluid"
                        />
                    </div>
                    <div className="profile-avatar">
                        <Avatar user={friend} width={70} height={70} />
                        <h5 className="text-center mt-2">{friend && friend.name ? friend.name : ""}</h5>
                        <i className="bi bi-pencil"></i>
                    </div>
                    <div className='btn-account-infor'>
                        <Button variant="outline-primary" onClick={addFriend} >Gọi điện</Button>
                        <Button variant="primary" onClick={viewSendMessage}>Nhắn tin</Button>
                    </div>
                    <div className="user-info">
                        <h6>Thông tin cá nhân</h6>
                        <ListGroup variant="flush">
                            <ListGroup.Item>{`Giới tính: ${friend && friend.gender ? "Nam" : "Nữ"}`}</ListGroup.Item>
                            <ListGroup.Item>Ngày sinh: {friend && friend.dob ? friend.dob : ""}</ListGroup.Item>
                            <ListGroup.Item>{`Email: ${friend && friend.email ? friend.email : ""}`}</ListGroup.Item>
                        </ListGroup>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className='modal-f'>

            </Modal.Footer>
        </Modal>
    );
};

export default FriendInfor;
