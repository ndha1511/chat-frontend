
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './register.module.scss'; 
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faMobileScreenButton, faUser, faVenusMars, faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import { register } from '../../services/RegisterService';

const cx = classNames.bind(styles);

function Register() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState(0);
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        if (password !== confirmpassword) {
            // this.setState({ error: "Mật khẩu và nhập lại mật khẩu không khớp." });
            return;
        }
    
      
        try {
            await register({ phoneNumber, name, gender, dateOfBirth, password,confirmpassword });
        console.log("Đăng ký thành công!");
        } catch (error) {
          
            console.error("Đăng ký không thành công:", error.message);
            // this.setState({ error: "Đăng ký không thành công." });
        }
    }

    return (
        <div className={cx("wrapper")}>
            <form  className={cx("box-register")}>
                <h1 style={{textAlign:'center'}} >Đăng ký</h1>
                <div className={cx("register-content")}>
                    <label htmlFor='phoneNumber'>
                        <FontAwesomeIcon className={cx("icon")}   icon={faMobileScreenButton} />
                        <input id='phoneNumber' placeholder='Số điện thoại' onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                    </label>
                    <label htmlFor='name'>
                        <FontAwesomeIcon className={cx("icon")} icon={faUser} />
                        <input id='name' placeholder='Tên' onChange={(e) => setName(e.target.value)} value={name} />
                    </label>
                    <label htmlFor='gender'>
                        <FontAwesomeIcon className={cx("icon")} icon={faVenusMars} />
                        <select id='gender' onChange={(e) => setGender(parseInt(e.target.value))} value={gender}>
                            <option value="">Giới tính</option>
                            <option value="0">Nam</option>
                            <option value="1">Nữ</option>
                       
                        </select>
                    </label>
                    <label htmlFor='dob'>
                        <FontAwesomeIcon className={cx("icon")} icon={faBirthdayCake} />
                        <input id='dob' type='date' onChange={(e) => setDateOfBirth(e.target.value)} value={dateOfBirth} />
                    </label>
                    <label htmlFor='password'>
                        <FontAwesomeIcon className={cx("icon")} icon={faLock} />
                        <input id='password' placeholder='Mật khẩu' type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                    </label>
                    <label htmlFor='Confirm password'>
                        <FontAwesomeIcon className={cx("icon")} icon={faLock} />
                        <input id='confirmpassword' placeholder='Nhập lại mật khẩu' type='password' onChange={(e) => setconfirmpassword(e.target.value)} value={confirmpassword} />
                    </label>
                    <button type="submit" onClick={handleSubmit}>Đăng ký</button>
                </div>
            </form>
            <p>Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link></p>
        </div>
    );
}

export default Register;
