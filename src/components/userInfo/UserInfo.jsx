import { useState } from "react";
import { getRoomBySenderIdAndReceiverId } from "../../services/RoomService";
import { extractName, getColorForName } from "../../utils/ExtractUsername";
import { getDataFromLocalStorage } from "../../utils/LocalStorageHandle";
import styles from "./UserInfo.module.scss";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { setChatInfo } from "../../redux/reducers/messageReducer";
import { reRenderRoom } from "../../redux/reducers/renderRoom";

const cx = classNames.bind(styles);

function UserInfo({ user, closeModel = () => { } }) {
    const [room, setRoom] = useState({});
    const dispatch = useDispatch();
    const getRoom = () => {
        const userSender = getDataFromLocalStorage("user");
        if (userSender) {
            getRoomBySenderIdAndReceiverId(userSender.id, user.id)
                .then(resp => {
                    dispatch(setChatInfo(resp));
                    dispatch(reRenderRoom(resp.roomId));
                    closeModel();
                })
                .catch(err => {
                    console.log(err);
                    dispatch(setChatInfo({
                        ...user,
                        receiverId: user.id
                    }));
                    closeModel();
                })

        }
    }
    return (
        <div className={cx("wrapper")}>
            <div className={cx("heading")}>
                <div className={cx("info")}>
                    <button className={cx("avatar")} style={{ backgroundColor: getColorForName(user.name) }}>
                        {user.avatar ?
                            <img src={user.avatar} alt='avatar' /> :
                            <span>{extractName(user.name)}</span>
                        }
                    </button>
                    <h3>{user.name}</h3>
                </div>
                <div className={cx("action")}>
                    <button>Thêm bạn bè</button>
                    <button onClick={getRoom}>Nhắn tin</button>
                </div>
            </div>
            <div></div>
            <div></div>
        </div>
    );
}

export default UserInfo;