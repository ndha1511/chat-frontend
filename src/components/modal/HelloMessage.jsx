import React, { useEffect, useState } from 'react';
import { Modal, ListGroup, Button } from 'react-bootstrap';
import "./ProfileModal.scss"; // Đảm bảo file SCSS được chỉnh sửa để phù hợp
import Avatar from '../avatar/Avatar';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendFriendRequest } from '../../services/ChatService';
import { reRenderFriendReques } from '../../redux/reducers/renderReducer';
import { Icon } from 'zmp-ui';
import Swal from 'sweetalert2';
import RandomBackgroundImage from '../RandomBackgroundImage/RandomBackgroundImage';

const HelloMessage = ({ show, onClose, user, handleBack }) => {  //user là nguoi nhan
    const userSender = useSelector((state) => state.userInfo.user);
    const [txt, setTxt] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const addFriend = async () => {
        console.log(txt)

        const emailSender = userSender.email
        const emailRe = user.email
        const request = {
            message: txt,
            senderId: emailSender,
            receiverId: emailRe
        }
        try {
            const response = await sendFriendRequest(request);
            onClose();
            dispatch(reRenderFriendReques())
            Swal.fire({
                html: `Bạn đã gửi lời mời  kết bạn với ${user.email}`,
                timer: 1500, // Đặt thời gian tự đóng là 2000 mili giây
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    htmlContainer: 'my-custom-html' ,
                }     
            });
        } catch (error) {
            console.error("Error sending friend request:", error);
            Swal.fire({
                html: `Không thể gửi yêu cầu kết bạn.`,
                timer: 1500, // Đặt thời gian tự đóng là 2000 mili giây
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    htmlContainer: 'my-custom-html' ,
                }     
            });
        }
    }

    return (
        <Modal show={show} onHide={onClose} size="md" centered>
            <Modal.Header closeButton className='modal-header-cs'>
                <button variant="outline-secondary" className='btn-hearder' onClick={handleBack}><Icon icon='zi-chevron-left-header' size={25} /></button>
                <Modal.Title style={{ fontWeight: 600 }}  >Thông Tin Cá Nhân</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body-cs'>
                <div className="profile-modal">
                    <div className="profile-background">
                    <RandomBackgroundImage />
                    </div>
                    <div className="profile-avatar">
                        <Avatar user={user} width={70} height={70} />
                        <h5 className="text-center mt-2">{user && user.name ? user.name : ""}</h5>
                        <button><Icon icon='zi-edit-text' size={20} /></button>
                    </div>

                    <div className="bd-text">
                        <textarea id='txtMess' onChange={(e) => setTxt(e.target.value)} placeholder='hãy nói theo cách của bạn' ></textarea>
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
