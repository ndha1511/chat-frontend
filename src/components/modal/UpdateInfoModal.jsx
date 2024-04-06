import { useEffect, useRef, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail, updateUser } from "../../services/UserService";
import { setUserInfo } from "../../redux/reducers/userReducer";


function UpdateInfoModal({ show, onClose, handleBack }) {

    const user = useSelector((state) => state.userInfo.user);
    const navigate = useNavigate();
    const [showSpinner, setShowSpinner] = useState(false);
    const [err, setErr] = useState("");
    const formRef = useRef(null);
    const dispatch = useDispatch();
    const [currentGender, setCurrentGender] = useState(user.gender);
    useEffect(() => {
        if (!user) navigate("/auth/login");
    });

    const handleUpdate = () => {
        formRef.current.click();
    }

    const submitForm = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const email = user.email;
        const gender = Number(formData.get('gender'));
        const dob = formData.get('dob');
        const request = {
            name,
            email,
            gender,
            dob
        }
        setShowSpinner(true);
        try {
            await updateUser(request);
            const newUser =  await getUserByEmail(user.email);
            localStorage.setItem('user', JSON.stringify(newUser));
            dispatch(setUserInfo(newUser));
            setShowSpinner(false);
            setErr("");
            alert("cập nhật thành công");
        } catch (error) {
            console.log(error);
            setErr("cập nhật không thành công")
            setShowSpinner(false);
        }
    }
    return (
        <Modal show={show} onHide={onClose} size="md" centered> 
            <Modal.Header closeButton className='modal-header-cs'>
                <Button variant="outline-secondary" className='btn-hearder' onClick={handleBack}><i className="bi bi-caret-left"></i></Button>
                <Modal.Title>Thông Tin Cá Nhân</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body-cs' style={{ height: "350px" }}>
                <Modal show={showSpinner} className="modal-custom">
                    <Modal.Body>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Modal.Body>
                </Modal>
                <div className="profile-modal">
                    <form onSubmit={submitForm} id="myForm">
                        <div class="mb-3 p-2">
                            <label for="name" className="form-label">Tên hiển thị</label>
                            <input type="text" className="form-control" id="name" name="name" defaultValue={user.name} />
                        </div>

                        <div className="user-info">
                            <h6>Thông tin cá nhân</h6>
                            <div class="mb-3 d-flex align-items-center" style={{ height: "40px", width: "150px", justifyContent: "space-between" }}>
                                <div>
                                    <input type="radio" name="gender" id="gender" value={1} checked={currentGender ? true : false} onChange={() => {setCurrentGender(1)}} />
                                    <label for="gender" className="form-label">Nam</label>
                                </div>
                                <div>
                                    <input type="radio" name="gender" id="gender" value={0} checked={!currentGender ? true : false} onChange={() => {setCurrentGender(0)}} />
                                    <label for="gender" className="form-label">Nữ</label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="name" className="form-label">Tên hiển thị</label>
                                <input type="date" className="form-control" id="dob" name="dob" defaultValue={user.dob} />
                            </div>
                        </div>
                        {err && <span className="text-danger">{err}</span>}
                        <button type="submit" ref={formRef} style={{ display: "none" }}></button>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={onClose}>Hủy</Button>
                <Button type="button" onClick={handleUpdate}>Cập nhật</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateInfoModal;