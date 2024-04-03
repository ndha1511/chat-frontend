import { useEffect, useState } from "react";
import "./Login.scss";
import { login } from "../../services/LoginService";
import { useNavigate } from "react-router-dom";
import { Modal, Spinner } from "react-bootstrap";
import { getUserByEmail } from "../../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../redux/reducers/userReducer";
function Login() {
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const user = useSelector((state) => state.userInfo.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if(user) navigate("/chat");
    }, [])
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        if (!formData.get('email') || !formData.get('password')) {
            setErr("vui lòng nhập đầy đủ dữ liệu");
            return;
        }
        const email = formData.get('email');
        const password = formData.get('password');
        try {
            setShow(true);
            const token = await login(email, password);
            localStorage.setItem("token", JSON.stringify(token));
            const userInfo = await getUserByEmail(email);
            localStorage.setItem("user", JSON.stringify(userInfo));
            setShow(false);
            dispatch(setUserInfo(userInfo));
            navigate("/chat");
        } catch (error) {
            setShow(false);
            setErr("Email hoặc mật khẩu không chính xác");
            localStorage.clear();
        }
    }
    return (
        <div className="d-flex container-fluid 
        justify-content-center
        align-items-center
        p-4
        wrapper-login">
            <div className="col-md-6 col-12 col-sm-12 col-lg-4 content d-flex justify-content-center align-items-center p-4">
                <div className="header">
                    <h3>Đăng nhập</h3>
                </div>
                <form className="col-12" onSubmit={handleSubmit}>
                    <div className="form-row align-items-center">
                        <div className="col-12">
                            <label className="sr-only" htmlFor="inlineFormInputGroup"></label>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">@</div>
                                </div>
                                <input type="email" name="email" className="form-control" id="inlineFormInputGroup" placeholder="Email" />
                            </div>
                        </div>
                        <div className="col-12">
                            <label className="sr-only" htmlFor="inlineFormInputGroup1"></label>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="bi bi-lock"></i></div>
                                </div>
                                <input type="password" name="password" className="form-control" id="inlineFormInputGroup1" placeholder="Mật khẩu" />
                            </div>
                        </div>
                        {
                            err !== "" ? <span className="text-danger">{err}</span> : <></>
                        }
                        <div className="col-12 mt-5">
                            <button type="submit" className="btn btn-primary mb-2 w-100">Đăng nhập</button>
                        </div>
                    </div>
                </form>
                <div className="footer">
                    <div className="w-100 d-flex justify-content-center">
                        <a href="/auth/forgot-password">Quên mật khẩu</a>
                    </div>
                    <div className="mt-5 w-100 d-flex justify-content-center">
                        <span>Bạn chưa có tài khoản ?</span>
                    </div>
                    <div className="w-100 d-flex justify-content-center">
                        <a href="/chat">Đăng ký ngay</a>
                    </div>

                </div>
            </div>
            <Modal show={show} className="modal-custom">
                <Modal.Body>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Login;