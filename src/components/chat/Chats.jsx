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
    const isRender = useSelector((state) => state.room.renderResult);
    const [totalPageRoom, setTotalPageRoom] = useState(1);
    const [currentRoom, setCurrentRoom] = useState(0);
    const [active, setActive] = useState(isRender.roomId);

    useEffect(() => {
        if (userLogin) {
            getRoomsBySenderId(userLogin.id).then((resp) => {
                setRooms(() => resp.roomResponses);
                setTotalPageRoom(resp.totalPage);
                setActive(isRender.roomId);
            }).catch((err) => console.log(err));
        }
        else navigate('/login');
    }, [isRender])

    

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
                {rooms.length > 0 ? rooms.map((value, index) => (
                    <button key={index} onClick={() => {dispatch(setChatInfo(value)); setActive(value.roomId)}}
                        style={{
                            backgroundColor: active === value.roomId ? "gainsboro" : ""
                        }}
                    >
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
                                <span style={{fontWeight: value.numberOfUnreadMessage > 0 ? "bold" : "normal"}}>{value.name}</span>
                                <p>{arrayToDateTime(value.time).toDateString()}</p>
                            </div>
                            <div className={cx("chat_text")}>
                                <span style={{color: value.numberOfUnreadMessage > 0 ? 'black' : 'gray'}}>{value.sender ? (value.latestMessage.length > 30 ? 'Bạn: ' + value.latestMessage.slice(0, 30) + '...' : 'Bạn: ' + value.latestMessage) : 
                                (value.latestMessage.length > 30 ? value.latestMessage.slice(0, 30) + '...' :  value.latestMessage)
                                }</span>
                                {
                                    value.numberOfUnreadMessage > 0 ? 
                                    <span style={{color: 'black', 
                                    width: 20, 
                                    height: 20, 
                                    backgroundColor: 'red',
                                    padding: 1,
                                    borderRadius: "50%"
                                }}>{value.numberOfUnreadMessage <= 99 ? value.numberOfUnreadMessage : "N" }</span>
                                    : <></>
                                }
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