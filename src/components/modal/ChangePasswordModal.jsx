import React, { useState } from 'react';
import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import './ChangePasswordModal.scss'; // Import file CSS/SCSS cho modal nếu có
import { changePassword } from '../../services/Password';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../redux/reducers/userReducer';
import { useNavigate } from 'react-router-dom';

const ChangePasswordModal = ({ show, onClose, handleBack }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [err, setErr] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);
    const user = useSelector((state) => state.userInfo.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const updatePassword = async () => {
        if (oldPassword === "" || newPassword === "" || confirmNewPassword === "") {
            setErr("vui lòng nhập đầy đủ thông tin");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setErr("mật khẩu nhập lại không chính xác");
            return;
        }

        setErr("");
        setShowSpinner(true);
        try {
            const data = {
                email: user.email,
                oldPassword,
                newPassword,
                confirmNewPassword
            }
            await changePassword(data);
            setShowSpinner(false);
            localStorage.clear();
            dispatch(setUserInfo(null));
            alert("Đã đổi mật khẩu thành công");
            navigate("/auth/login");
            

        } catch (error) {
            console.log(error);
            setErr("Mật khẩu cũ không chính xác");
            setShowSpinner(false);
        }

    }
    return (
        <Modal show={show} onHide={onClose} size='md' centered>

            <Modal.Header closeButton className='modal-header-cs'>
                <Button variant="outline-secondary" className='btn-hearder' onClick={handleBack}><i className="bi bi-caret-left"></i></Button>
                <Modal.Title>Thay Đổi Mật Khẩu</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body-cs'>
                <div className='change-password-modal'>
                    <Form>
                        <Form.Group controlId="oldPassword" className='m-3'>
                            <Form.Label>Nhập mật khẩu cũ:</Form.Label>
                            <Form.Control type="password" placeholder="Nhập mật khẩu cũ" onChange={(e) => setOldPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="confirmNewPassword" className='m-3'>
                            <Form.Label>Nhập mật khẩu mới:</Form.Label>
                            <Form.Control type="password" placeholder="Nhập lại mật khẩu mới" onChange={(e) => setNewPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="newPassword" className='m-3'>
                            <Form.Label>Nhập lại mật khẩu mới:</Form.Label>
                            <Form.Control type="password" placeholder="Nhập mật khẩu mới" onChange={(e) => setConfirmNewPassword(e.target.value)} />
                        </Form.Group>
                        {err && <span className='text-danger m-3'>{err}</span>}
                    </Form>
                    <Modal show={showSpinner} className="modal-custom">
                        <Modal.Body>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Modal.Body>
                    </Modal>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Đóng</Button>
                <Button variant="primary" onClick={updatePassword}>Cập Nhật Mật Khẩu</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangePasswordModal;
