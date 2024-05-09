import React, { useEffect } from 'react';
import { Modal, ListGroup, Button } from 'react-bootstrap';
import "./ProfileModal.scss"; // Đảm bảo file SCSS được chỉnh sửa để phù hợp
import Avatar from '../avatar/Avatar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'zmp-ui';
import RandomBackgroundImage from '../RandomBackgroundImage/RandomBackgroundImage';
import SimpleBar from 'simplebar-react';

const ProfileModal = ({ show, onClose, friend, onOpenChangePassword, onOpenUpdateModal }) => {
    let user = useSelector((state) => state.userInfo.user);
    if (friend) {
        user = friend
    }
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
                <SimpleBar style={{ maxHeight: '80vh', }}>
                    <div className="profile-modal">
                        <div className="profile-background">
                            <RandomBackgroundImage />
                        </div>
                        <div className="profile-avatar">
                            <Avatar user={user} width={70} height={70} />
                            <h5 className="text-center mt-2">{user && user.name ? user.name : ""}</h5>
                            <button><Icon icon='zi-edit-text' size={20} /></button>
                        </div>
                        <div className='backgroundColor'></div>
                        <div className="user-info">
                            <h6>Thông tin cá nhân</h6>
                            <ListGroup variant="flush">
                                <ListGroup.Item>{`Giới tính: ${user && user.gender ? "Nam" : "Nữ"}`}</ListGroup.Item>
                                <ListGroup.Item>Ngày sinh: {user && user.dob ? user.dob : ""}</ListGroup.Item>
                                <ListGroup.Item>{`Email: ${user && user.email ? user.email : ""}`}</ListGroup.Item>
                            </ListGroup>
                        </div>
                    </div>
                </SimpleBar>
            </Modal.Body>
            <Modal.Footer className='modal-f'>
                <button className='btn-update-infor' onClick={onOpenUpdateModal}>Cập nhật thông tin</button>
                <button className='btn-update-pass' onClick={onOpenChangePassword}>Thay Đổi Mật Khẩu</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProfileModal;
