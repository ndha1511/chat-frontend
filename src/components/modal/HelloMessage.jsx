import React, { useEffect, useState } from 'react';
import { Modal, ListGroup, Button } from 'react-bootstrap';
import "./ProfileModal.scss"; // Đảm bảo file SCSS được chỉnh sửa để phù hợp
import Avatar from '../avatar/Avatar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendFriendRequest } from '../../services/ChatService';

const HelloMessage = ({ show, onClose,user,handleBack }) => {
    const userSender = useSelector((state) => state.userInfo.user);
    const [txt,setTxt] = useState("")
    const navigate = useNavigate();

    const addFriend = async () => {
        console.log(txt)
        
        const emailSender = userSender.email
        const emailRe = user.email
        const request ={
            message:txt,
            senderId: emailSender,
            receiverId: emailRe
        }
        try {
            const response = await sendFriendRequest(request);
            alert(response);
        } catch (error) {
            console.error("Error sending friend request:", error);
            alert("Không thể gửi yêu cầu kết bạn.");
        }
    }

    return (
        <Modal show={show} onHide={onClose} size="md" centered>
            <Modal.Header closeButton className='modal-header-cs'>
            <Button variant="outline-secondary" className='btn-hearder' onClick={handleBack}><i className="bi bi-caret-left"></i></Button>
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
                        <Avatar user={user} width={70} height={70}/>
                        <h5 className="text-center mt-2">{user && user.name ? user.name : ""}</h5>
                        <i className="bi bi-pencil"></i>
                    </div>
                    
                    <div className="bd-text">
                        <textarea id='txtMess' onChange={(e)=>setTxt(e.target.value)}  placeholder='hãy nói theo cách của bạn' ></textarea>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className='modal-f'>
                <Button variant="outline-primary" onClick={handleBack} >Thông tin</Button>
                <Button variant="primary" onClick={addFriend} >Kết bạn</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default HelloMessage;
