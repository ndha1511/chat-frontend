import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { login } from '../../services/LoginService';
import { getUserInfo } from '../../services/UserService';

const cx = classNames.bind(styles);
function Login() {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const [disabledButton, setDissabledButton] = useState(true);
    const handleLogin = () => {
       
        login(phoneNumber, password).then((response) => {
            const token = response;
            localStorage.setItem("token", JSON.stringify(token));
            getUserInfo(phoneNumber).then((resp) => {
                localStorage.setItem("user", JSON.stringify(resp));
                navigate("/");
            }).catch(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setErr("số điện thoại hoặc mật khẩu không chính xác");
                return;
            });
        }).catch(() => {
            setErr("số điện thoại hoặc mật khẩu không chính xác");
            return;
        })
    }


    useEffect(() => {
        const isDisabledButton = () => {
            if(phoneNumber.trim().length < 10 || password.trim().length < 6) {
                setDissabledButton(true);
            } else 
                setDissabledButton(false);
    
        }
        isDisabledButton();
    }, [phoneNumber, password]);
    return (
        <div className={cx("wrapper")}>
            <div style={{ marginBottom: 10 }}>
                <h1>Đăng nhập</h1>
            </div>
            <div className={cx("box-login")}>
                <div className={cx("login-header")}>
                    <div><button>Với mã QR</button></div>
                    <div><button>Với mật khẩu</button></div>
                </div>
                <div className={cx("login-content")}>
                    <label htmlFor='phoneNumber'>
                        <div><FontAwesomeIcon icon={faMobileScreenButton} /></div>
                        <input id='phoneNumber' placeholder='Số điện thoại' onChange={(event) => {
                            setPhoneNumber(event.target.value); 
                           
                        }}/>
                    </label>
                    <label htmlFor='password'>
                        <div><FontAwesomeIcon icon={faLock} /></div>
                        <input id='password' placeholder='Mật khẩu' type='password' onChange={(event) => {
                            setPassword(event.target.value);
                            
                        }}/>
                    </label>
                    <span style={{color: 'red'}}>{err}</span>
                    <button onClick={handleLogin} disabled={disabledButton}>Đăng nhập</button>
                    <Link to='/login/#' style={{marginTop: 20}}>Quên mật khẩu?</Link>
                </div>
            </div>
            <div style={{ marginTop: 10 }}>
                <p>Bạn chưa có tài khoản? <Link to={"/register"}>Đăng ký ngay</Link></p>
            </div>
        </div>
    );
}

export default Login;