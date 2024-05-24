import { useEffect, useRef, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail, updateUser } from "../../services/UserService";
import { setUserInfo } from "../../redux/reducers/userReducer";
import Swal from "sweetalert2";


function UpdateInfoModal({ show, onClose, handleBack }) {

    const user = useSelector((state) => state.userInfo.user);
    const gender = user && user.gender ? user.gender : "";
    const navigate = useNavigate();
    const [showSpinner, setShowSpinner] = useState(false);
    const [err, setErr] = useState("");
    const formRef = useRef(null);
    const dispatch = useDispatch();
    const [currentGender, setCurrentGender] = useState(gender);
    useEffect(() => {
        if (!user) navigate("/auth/login");
    });

    const handleUpdate = () => {
        formRef.current.click();
    }

    const submitForm = async (event) => {
        event.preventDefault();
        const avatar =user.avatar;
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const email = user.email;
        const gender = Number(formData.get('gender'));
        const dob = formData.get('dob');
        const request = {
            avatar,
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
            Swal.fire({
                html: `Cập nhật thành công.`,
                timer: 1500, // Đặt thời gian tự đóng là 1500 mili giây
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    htmlContainer: 'my-custom-html',
                }
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                html: `cập nhật không thành công.`,
                timer: 1500, // Đặt thời gian tự đóng là 1500 mili giây
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    htmlContainer: 'my-custom-html',
                }
            });
            setShowSpinner(false);
        }
    }
    const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };
    return (
        <Modal show={show} onHide={onClose} size="md" centered> 
            <Modal.Header closeButton className='modal-header-cs'>
                <Button variant="outline-secondary" className='btn-hearder' onClick={handleBack}><i className="bi bi-chevron-down" style={{  transform: 'rotate(90deg)', fontSize:17 }}></i></Button>
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
                            <input type="text" className="form-control" id="name" name="name" defaultValue={user && user.name ? user.name : "" } />
                        </div>

                        <div className="user-info">
                            <h6>Thông tin cá nhân</h6>
                            <div class="mb-3 d-flex align-items-center" style={{ height: "40px", width: "150px",marginTop:15, justifyContent: "space-between" }}>
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
                                <label for="name" className="form-label">Ngày sinh</label>
                                <input type="date" className="form-control" id="dob" name="dob" defaultValue={formatDateForInput(user && user.dob ? user.dob : "")} />
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