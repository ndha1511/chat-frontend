import React from 'react';
import { Modal, ListGroup, Button } from 'react-bootstrap';
import "./ProfileModal.scss"; // Đảm bảo file SCSS được chỉnh sửa để phù hợp

const ProfileModal = ({ show, onClose, onOpenChangePassword }) => {
    return (
        <Modal show={show} onHide={onClose} size="md" centered>
            <Modal.Header closeButton>
                <Modal.Title>Thông Tin Cá Nhân</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="profile-modal">
                    <div className="profile-background">
                        <img
                            src="https://seotrends.com.vn/wp-content/uploads/2023/05/anh-meo-buon-1-1.jpg"
                            alt="Ảnh bìa"
                            className="img-fluid"
                        />
                    </div>
                    <div className="profile-avatar">
                        <img
                            src="https://bizweb.dktcdn.net/100/438/408/files/hinh-anh-meo-hai-huoc-yodyvn2.jpg?v=1694069335855"
                            alt="Ảnh cá nhân"
                            className="img-fluid rounded-circle"
                        />
                        <h5 className="text-center mt-2">Tên Người Dùng</h5>
                        <i className="bi bi-pencil"></i>
                    </div>
                    
                    <div className="user-info">
                        <h6>Thông tin cá nhân</h6>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Giới tính: Nam</ListGroup.Item>
                            <ListGroup.Item>Ngày sinh: 22/05/2024</ListGroup.Item>
                            <ListGroup.Item>Điện thoại: 0961263780</ListGroup.Item>
                        </ListGroup>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={onClose}>Đóng</Button>
                <Button variant="primary" onClick={onOpenChangePassword}>Thay Đổi Mật Khẩu</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProfileModal;
