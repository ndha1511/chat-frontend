import React, { useState } from 'react';
// import {useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './register.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faMobileScreenButton, faUser, faVenusMars, faBirthdayCake, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register, sendOtp, verifyOtp } from '../../services/RegisterService';

const cx = classNames.bind(styles);

function Register() {


    const RegisterSchema = Yup.object().shape({
        phoneNumber: Yup.string()
        .matches(/^(0[1-9]{9})$/, 'Số điện thoại phải bắt đầu bằng số 0 và gồm đúng 10 chữ số')
        .required('Số điện thoại là bắt buộc'),
        name: Yup.string().required('Tên là bắt buộc'),
        email: Yup.string().required('Email bắt buộc nhập là bắt buộc'),
        gender: Yup.string().required('Giới tính là bắt buộc'),
        dateOfBirth: Yup.date().required('Ngày sinh là bắt buộc'),
        password: Yup.string().required('Mật khẩu là bắt buộc'),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
            .required('Nhập lại mật khẩu là bắt buộc'), 
    });

    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [err, setErr] = useState('');
    const [showVerificationForm, setShowVerificationForm] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');



    const handleSubmit = async (values) => {
        setSubmitting(true);
        setShowVerificationForm(true)
        const data = { ...values, gender: Number(values.gender) }
        setErr(''); // Đặt lại thông báo lỗi
        try {
            await sendOtp(data);
            console.log('Đăng ký thành công, vui lòng xác thực email của bạn!');

        } catch (error) {
            console.error('Đăng ký không thành công:', error.message);
            setErr('Đăng ký không thành công: ' + error.message);
        }
        setSubmitting(false);
    };


    const handleVerificationSubmit = async (e) => {

        e.preventDefault();
        try {
            // Thực hiện xác minh OTP bằng mã vừa nhập
            const otpValidRequest = { otp: verificationCode, email };
            const response = await verifyOtp(otpValidRequest);


            // Kiểm tra kết quả xác minh OTP từ server
            if (response === 'valid') {
                // Nếu OTP hợp lệ, chuyển hướng đến trang đăng ký và chuyền thông tin email qua `state`
                navigate('/login');
            } else {
                // Nếu OTP không hợp lệ, hiển thị thông báo lỗi tương ứng
                setErr('Mã xác thực không hợp lệ. Vui lòng kiểm tra lại.');
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            setErr('Đã xảy ra lỗi khi xác thực mã. Vui lòng thử lại sau.');
        }
        console.log(verificationCode); // Giả sử đã xác thực mã thành công
    };

    return (
        <div className="d-flex container-fluid 
        justify-content-center
        align-items-center
        p-4
        wrapper-login">
          
                <Formik
                    initialValues={{
                        phoneNumber: '',
                        email: '',
                        name: '',
                        gender: 0,
                        dateOfBirth: '',
                        password: '',
                        confirmpassword: '',
                    }}
                    validationSchema={RegisterSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, handleChange, values, touched, errors }) => (
                        <div className="col-md-6 col-12 col-sm-12 col-lg-4 content d-flex justify-content-center align-items-center p-1 px-4">
                            <div className="header">
                                <h3>Đăng ký</h3>
                            </div>
                            {!showVerificationForm ?(
                                <Form className={cx("col-12")}>

                                <div className={cx("register-content")}>
                                    <label htmlFor='phoneNumber'>
                                        <FontAwesomeIcon className={cx("icon")} icon={faMobileScreenButton} />
                                        <Field type="text" id='phoneNumber' name="phoneNumber" placeholder='Số điện thoại' />
                                        <ErrorMessage name="phoneNumber" component="div" className={cx("error")} />
                                    </label>
                                    <label htmlFor='email'>
                                        <FontAwesomeIcon className={cx("icon")} icon={faEnvelope} />
                                        <Field onChange={(e) => { handleChange(e); setEmail(e.target.value) }} type="email" id='email' name="email" placeholder='Email' />
                                        <ErrorMessage name="email" component="div" className={cx("error")} />
                                    </label>
                                    <label htmlFor='name'>
                                        <FontAwesomeIcon className={cx("icon")} icon={faUser} />
                                        <Field type="text" id='name' name="name" placeholder='Tên' />
                                        <ErrorMessage name="name" component="div" className={cx("error")} />
                                    </label>
                                    <label htmlFor='gender'>
                                        <FontAwesomeIcon className={cx("icon")} icon={faVenusMars} />
                                        <Field as="select" id='gender' name="gender">
                                            <option value="">Giới tính</option>
                                            <option value="0">Nam</option>
                                            <option value="1">Nữ</option>
                                        </Field>
                                        <ErrorMessage name="gender" component="div" className={cx("error")} />
                                    </label>
                                    <label htmlFor='dob'>
                                        <FontAwesomeIcon className={cx("icon")} icon={faBirthdayCake} />
                                        <Field type='date' id='dob' name="dateOfBirth" />
                                        <ErrorMessage name="dateOfBirth" component="div" className={cx("error")} />
                                    </label>
                                    <label htmlFor='password'>
                                        <FontAwesomeIcon className={cx("icon")} icon={faLock} />
                                        <Field type='password' id='password' name="password" placeholder='Mật khẩu' />
                                        <ErrorMessage name="password" component="div" className={cx("error")} />
                                    </label>
                                    <label htmlFor='confirmpassword'>
                                        <FontAwesomeIcon className={cx("icon")} icon={faLock} />
                                        <Field type='password' id='confirmpassword' name="confirmpassword" placeholder='Nhập lại mật khẩu' />
                                        <ErrorMessage name="confirmpassword" component="div" className={cx("error")} />
                                    </label>
                                    <button type="submit" disabled={isSubmitting}>Đăng ký</button>
                                </div>
                            </Form>
                            
                            ):(
                                <form className={cx('formXn')} onSubmit={handleVerificationSubmit}>
                                <input
                                    type="text"
                                    placeholder="Nhập mã xác thực"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    required
                                />
                                <button type="submit">Xác nhận</button>
                            </form>
                            )}
                            
                            <p>Bạn đã có tài khoản? <Link to="/auth/login">Đăng nhập ngay</Link></p>
                        </div>
                    )}
                </Formik>
                
          
           
                
           
           
        </div>
    );
}

export default Register;
