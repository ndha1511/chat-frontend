import React, { useEffect } from 'react';
import { Modal, ListGroup, Button } from 'react-bootstrap';
import "./ProfileModal.scss"; // Đảm bảo file SCSS được chỉnh sửa để phù hợp
import Avatar from '../avatar/Avatar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfileModal = ({ show, onClose, onOpenChangePassword, onOpenUpdateModal }) => {
    const user = useSelector((state) => state.userInfo.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) navigate("/auth/login");
    })
    return (
        <Modal show={show} onHide={onClose} size="md" centered>
            <Modal.Header closeButton className='modal-header-cs'>
                <Modal.Title>Thông Tin Cá Nhân</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body-cs'>
                <div className="profile-modal">
                    <div className="profile-background">
                        <img
                            src="https://seotrends.com.vn/wp-content/uploads/2023/05/anh-meo-buon-1-1.jpg"
                            alt="Ảnh bìa"
                            className="img-fluid"
                        />
                    </div>
                    <div className="profile-avatar">
                        <Avatar user={user} width={70} height={70}/>
                        <h5 className="text-center mt-2">{user && user.name ? user.name : ""}</h5>
                        <i className="bi bi-pencil"></i>
                    </div>
                    
                    <div className="user-info">
                        <h6>Thông tin cá nhân</h6>
                        <ListGroup variant="flush">
                            <ListGroup.Item>{`Giới tính: ${user && user.gender ? "Nam" : "Nữ"}`}</ListGroup.Item>
                            <ListGroup.Item>Ngày sinh: {user && user.dob ? user.dob : "" }</ListGroup.Item>
                            <ListGroup.Item>{`Email: ${user && user.email ? user.email : ""}`}</ListGroup.Item>
                        </ListGroup>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={onOpenUpdateModal}>Cập nhật thông tin</Button>
                <Button variant="primary" onClick={onOpenChangePassword}>Thay Đổi Mật Khẩu</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProfileModal;
