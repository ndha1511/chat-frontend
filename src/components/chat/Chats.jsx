import { useEffect, useState } from 'react';
import styles from './Chats.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { checkLogin } from '../../services/LoginService';
import { getRoomsBySenderId } from '../../services/RoomService';
import { extractName, getColorForName } from '../../utils/ExtractUsername';
import { getUserById } from '../../services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { setChatInfo } from '../../redux/reducers/messageReducer';

const cx = classNames.bind(styles);



function Chats() {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();
    const [roomInfo, setRoomInfo] = useState([]);
    const dispatch = useDispatch();
    const userLogin = checkLogin();
    const isRender = useSelector((state) => state.render.renderResult);

    useEffect(() => {
        if (userLogin) {
            getRoomsBySenderId(userLogin.id).then((resp) => {
                setRooms(() => resp);
            }).catch((err) => console.log(err));
        }
        else navigate('/login');
    }, [])

    useEffect(() => {
        rooms.forEach((room) => {
            if (room.roomType === "SINGLE_CHAT") {
                getUserById(room.receiverId)
                    .then(resp => {
                        const roomData = { ...room, ...resp };
                        setRoomInfo((prev) => [...prev, roomData]);
                    })
                    .catch(err => { console.log(err); return; })
            }
        });
    }, [rooms])

    function arrayToDateTime(arr) {
        // Kiểm tra xem mảng có ít nhất 6 phần tử không (năm, tháng, ngày, giờ, phút, giây)
        if (arr.length < 6) {
            console.error("Mảng phải chứa ít nhất 6 phần tử (năm, tháng, ngày, giờ, phút, giây)");
            return null;
        }
    
        // Lấy các giá trị từ mảng
        var year = arr[0];
        var month = arr[1];
        var day = arr[2];
        var hours = arr[3];
        var minutes = arr[4];
        var seconds = arr[5];
    
        // Tạo đối tượng ngày tháng từ các giá trị
        var dateTime = new Date(year, month - 1, day, hours, minutes, seconds); // Lưu ý: Tháng trong JavaScript bắt đầu từ 0
    
        return dateTime;
    }
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <button>Tất cả</button>
                <button>Chưa đọc</button>
            </div>
            <div className={cx("chats")}>
                {roomInfo.length > 0 ? roomInfo.map((value, index) => (
                    <button key={index} onClick={() => dispatch(setChatInfo(value))}>
                        {value.avatar !== null ? <img src={value.avatar} alt='avatar' width={50} height={50} /> :
                            <div style={{
                                backgroundColor: getColorForName(value.name),
                                width: 50,
                                height: 50,
                                borderRadius: "50%",
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>{extractName(value.name)}</div>
                        }

                        <div className={cx("chat")}>
                            <div className={cx("chat_info")}>
                                <span>{value.name}</span>
                                <p>{arrayToDateTime(value.time).toDateString()}</p>
                            </div>
                            <div className={cx("chat_text")}>
                                {console.log(value.id, userLogin.id)}
                                <span>{value.sender ? 'Bạn: ' + value.latestMessage : value.latestMessage}</span>
                            </div>
                        </div>
                    </button>
                )) :
                    <div>Bạn chưa có tin nhắn nào, hãy kết bạn để chat thêm với nhiều người</div>}
            </div>
        </div>
    );
}

export default Chats;