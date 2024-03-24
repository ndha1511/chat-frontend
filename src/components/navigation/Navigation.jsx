import { faAddressBook, faComment } from '@fortawesome/free-regular-svg-icons';
import styles from './Navigation.module.scss';
import classNames from 'classnames/bind';
import { faGear, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkLogin } from '../../services/LoginService';
import { extractName, getColorForName } from '../../utils/ExtractUsername';

const cx = classNames.bind(styles);

const items_top = [
    { tippyText: 'Tin nhắn', icon: faComment },
    { tippyText: 'Danh bạ', icon: faAddressBook },
    { tippyText: 'Cuộc họp', icon: faVideo },
]
const items_bot = [
    { tippyText: 'Cài đặt', icon: faGear }
]

function Navigation() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [colorAvatar, setColorAvatar] = useState('');
    const handleNavigate = (value) => {
        switch(value.tippyText) {
            case 'Tin nhắn': 
                navigate('/');
                break;
            case 'Danh bạ':
                navigate('/content1');
                break;

        }

    }
    useEffect(() => {
        const userLogin = checkLogin();
        if(userLogin) {
            setUser(userLogin);
            setColorAvatar(() => getColorForName(userLogin.name));
        }
        else navigate('/login');
    }, []);
    return <div className={cx("wrapper")}>
        
        <div className={cx("items")}>
            
            <button className={cx("avatar")} style={{backgroundColor: colorAvatar}}>
                {user.avatar ? 
                    <img src={user.avatar} alt='avatar' /> :
                    <span>{extractName(user.name)}</span>
                }
            </button>
            {items_top.map((value, index) => (
                <button key={index} className={cx("item")} onClick={() => {handleNavigate(value)}}>
                    <FontAwesomeIcon icon={value.icon}/>
                </button>
            ))}
        </div>
        <div className={cx("items")}>
            {items_bot.map((value, index) => (
                <button key={index} className={cx("item")}>
                    <FontAwesomeIcon icon={value.icon}/>
                </button>
            ))}
        </div>
    </div>;
}

export default Navigation;