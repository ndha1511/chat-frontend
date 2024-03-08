import { useEffect, useState } from 'react';
import styles from './Chats.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { checkLogin } from '../../services/LoginService';
import { getRoomsBySenderId } from '../../services/RoomService';

const cx = classNames.bind(styles);



function Chats() {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userLogin = checkLogin();
        if(userLogin) {
           getRoomsBySenderId(userLogin.id).then((resp) => {
                setRooms(() => [...rooms, ...resp]);
           }).catch(() => navigate('/'))
        }
        else navigate('/login');
    }, [])
    return ( 
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <button>Tất cả</button>
                <button>Chưa đọc</button>
            </div>
            <div className={cx("chats")}>
                {rooms.length > 0 ? rooms.map((value, index) => (
                    <button key={index}>
                        <img src={value.avatar} alt='avatar' width={60} height={60}/>
                        <div className={cx("chat")}>
                            <div className={cx("chat_info")}>
                                <span>{value.receivernName}</span>
                                <p>{value.time}</p>
                            </div>
                            <div className={cx("chat_text")}>
                                <span>{value.mySend ? 'Bạn: ' + value.newMessage : value.newMessage}</span>
                            </div>
                        </div>
                    </button>
                )):
                <div>Bạn chưa có tin nhắn nào, hãy kết bạn để chat thêm với nhiều người</div>}
            </div>
        </div>
    );
}

export default Chats;