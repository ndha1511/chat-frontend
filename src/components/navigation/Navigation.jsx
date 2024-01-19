import { faAddressBook, faComment } from '@fortawesome/free-regular-svg-icons';
import styles from './Navigation.module.scss';
import classNames from 'classnames/bind';
import { faGear, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

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
    return <div className={cx("wrapper")}>
        
        <div className={cx("items")}>
            <button className={cx("avatar")}>
                <img src='https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg' alt='avatar' />
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