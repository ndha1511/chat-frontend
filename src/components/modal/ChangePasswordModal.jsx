import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import './ChangePasswordModal.scss'; // Import file CSS/SCSS cho modal nếu có

const ChangePasswordModal = ({ show, onClose,handleBack }) => {
    return (
        <Modal show={show} onHide={onClose}>
            
            <Modal.Header closeButton>
                <Button variant="outline-secondary" className='btn-hearder'  onClick={handleBack}><i className="bi bi-caret-left"></i></Button>
                <Modal.Title>Thay Đổi Mật Khẩu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div className='change-password-modal'>
               <Form>
                    <Form.Group controlId="oldPassword">
                        <Form.Label>Mật khẩu cũ:</Form.Label>
                        <Form.Control type="password" placeholder="Nhập mật khẩu cũ" />
                    </Form.Group>
                    <Form.Group controlId="newPassword">
                        <Form.Label>Mật khẩu mới:</Form.Label>
                        <Form.Control type="password" placeholder="Nhập mật khẩu mới" />
                    </Form.Group>
                    <Form.Group controlId="confirmNewPassword">
                        <Form.Label>Nhập lại mật khẩu mới:</Form.Label>
                        <Form.Control type="password" placeholder="Nhập lại mật khẩu mới" />
                    </Form.Group>
                </Form>
               </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Đóng</Button>
                <Button variant="primary">Cập Nhật Mật Khẩu</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangePasswordModal;
