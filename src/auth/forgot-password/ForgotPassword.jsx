import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { claimOtpByEmail, resetPassword, validOtpForResetPassword } from "../../services/Password";

function ForgotPassword() {
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const user = useSelector((state) => state.userInfo.user);
    const [step, setStep] = useState(1);
    const [emailGlobal, setEmailGlobal] = useState("");
    const [otpGlobal, setOtpGlobal] = useState("");
    const [showRs, setShowRs] = useState(false);

    const claimOtp = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        if (!formData.get('email')) {
            setErr("vui lòng nhập email của bạn");
            return;
        }
        const email = formData.get('email');
        const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if(!pattern.test(email)) {
            setErr("email không hợp lệ");
            return;
        }
        try {
            setShow(true);
            const request = {
                email
            }
            await claimOtpByEmail(request);
            setShow(false);
            setErr("");
            setEmailGlobal(email);
            setStep(prev => prev + 1);
        } catch (error) {
            setShow(false);
            setErr("email này chưa đăng ký tài khoản");
            
        }
    }

    const verifyOtp = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        if (!formData.get('otp')) {
            setErr("vui lòng nhập mã xác thực được gửi tới gmail của bạn");
            return;
        }
        const otp = formData.get('otp');
        const regex = /^\d{6}$/;
        if(!regex.test(otp)) {
            setErr("mã xác thực không hợp lệ");
            return;
        }
        try {
            setShow(true);
            const request = {
                otp,
                email: emailGlobal
            }
            await validOtpForResetPassword(request);
            setShow(false);
            setErr("");
            setOtpGlobal(otp);
            setStep(prev => prev + 1);
        } catch (error) {
            setShow(false);
            setErr("mã xác thực không chính xác");
            
        }
    }

    const resetPassword1 = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        if (!formData.get('newPassword') || !formData.get('confirmNewPassword')) {
            setErr("vui lòng nhập đầy đủ thông tin");
            return;
        }
        const newPassword = formData.get('newPassword');
        const confirmNewPassword = formData.get('confirmNewPassword');
        if(newPassword.length < 6) {
            setErr("mật khẩu phải có từ 6 ký tự trở lên");
            return;
        }
        if(newPassword !== confirmNewPassword) {
            setErr("mật khẩu nhập lại không khớp");
            return;
        }
        try {
            setShow(true);
            const request = {
                otp: otpGlobal,
                email: emailGlobal,
                newPassword,
                confirmNewPassword
            }
            await resetPassword(request);
            setShow(false);
            setErr(""); 
            setShowRs(true);
        } catch (error) {
            setShow(false);
            setErr("xảy ra lỗi không xác định");
            
        }
    }

    const prevLogin = () => {
        setShowRs(false);
        navigate("/auth/login");
    }
    return (
        <div className="d-flex container-fluid 
        justify-content-center
        align-items-center
        p-4
        wrapper-login">
            <div className="col-md-6 col-12 col-sm-12 col-lg-4 content d-flex justify-content-center align-items-center p-4">
                <div className="header">
                    {step === 1 && <h3>Quên mật khẩu</h3>}
                    {step === 2 && <h3>Xác thực</h3>}
                    {step === 3 && <h3>Đặt lại mật khẩu</h3>}
                </div>
                {step === 1 && <form className="col-12" onSubmit={claimOtp} >
                    <div className="form-row align-items-center">
                        <div className="col-12">
                            <label className="sr-only" htmlFor="inlineFormInputGroup"></label>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">@</div>
                                </div>
                                <input type="text" name="email" className="form-control" id="inlineFormInputGroup" placeholder="Email" />
                            </div>
                        </div>
                        {
                            err !== "" ? <span className="text-danger">{err}</span> : <></>
                        }
                        <div className="col-12 mt-5">
                            <button type="submit" className="btn btn-primary mb-2 w-100">Nhận mã xác thực</button>
                        </div>
                    </div>
                </form>}
                {
                    step === 2 && 
                    <form className="col-12" onSubmit={verifyOtp} >
                    <div className="form-row align-items-center">
                        <div className="col-12">
                            <label className="sr-only" htmlFor="inlineFormInputGroup"></label>
                            <input type="text" name="otp" className="form-control" id="inlineFormInputGroup" placeholder="Nhập mã xác thực" />
                          
                        </div>
                        {
                            err !== "" ? <span className="text-danger">{err}</span> : <></>
                        }
                        <div className="col-12 mt-5">
                            <button type="submit" className="btn btn-primary mb-2 w-100">Xác thực mã</button>
                        </div>
                    </div>
                </form>
                }

                {
                    step === 3 && 
                    <form className="col-12" onSubmit={resetPassword1} >
                    <div className="form-row align-items-center">
                        <div className="col-12">
                            <label className="sr-only" htmlFor="inlineFormInputGroup"></label>
                            <input type="text" name="newPassword" className="form-control" id="inlineFormInputGroup" placeholder="Nhập mật khẩu mới" />
                          
                        </div>
                        <div className="col-12">
                            <label className="sr-only" htmlFor="inlineFormInputGroup2"></label>
                            <input type="text" name="confirmNewPassword" className="form-control" id="inlineFormInputGroup2" placeholder="Xác nhận mật khẩu" />
                          
                        </div>
                        {
                            err !== "" ? <span className="text-danger">{err}</span> : <></>
                        }
                        <div className="col-12 mt-5">
                            <button type="submit" className="btn btn-primary mb-2 w-100">Hoàn tất</button>
                        </div>
                    </div>
                </form>
                }
                <div className="footer">
                
                
                </div>
            </div>
            <Modal show={show} className="modal-custom" >
                <Modal.Body>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Modal.Body>
            </Modal>
            <Modal show={showRs} centered>
                <Modal.Body>
                    <h3>Mật khẩu đã được cập nhật</h3>
                    <Button onClick={prevLogin}>Trở lại trang đăng nhập</Button>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ForgotPassword;