import { useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import "./BoxChat.scss";
import { displayDateTime } from "../../utils/DateTimeHandle";
import { useDispatch } from "react-redux";
import { getUserById } from "../../services/UserService";
import { setChatInfo } from "../../redux/reducers/messageReducer";
import { litmitString } from "../../utils/StringHandle";

function BoxChat(props) {
    const [hiddenButton, setHiddenButton] = useState(true);
    const [date, setDate] = useState(displayDateTime(props.room.time));
    const dispatch = useDispatch();

    const user = {
        name: props.room.name,
        id: props.room.senderId,
        avatar: props.room.avatar
    }

    const mouseEnter = () => {
        setHiddenButton(false);
    }
    const mouseLeave = () => {
        setHiddenButton(true);
    }

    const pushChatMessage = async () => {
        try {
            const response = await getUserById(props.room.receiverId);
            const chatInfo = {
                user: {...response},
                roomId: props.room.roomId
            };
            dispatch(setChatInfo(chatInfo));
        } catch (error) {
            console.log(error);
        }
    }

    const onpenMoreMenu = (event) => {
        event.stopPropagation(); // Ngăn chặn sự kiện click truyền ra khỏi button ở bên trong
        console.log('Inner button clicked');
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(displayDateTime(props.room.time));
        }, 60000);

        return () => {
            clearInterval(intervalId);
        };
    }, [])
    return (

        <div className="row d-flex w-100 wrapper-boxchat" onClick={pushChatMessage} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <div className="col-2">
                <Avatar user={user} />
            </div>
            <div className="col-5" style={{ marginLeft: 10 }}>
                <div className="row" style={{ height: 30 }}>
                    <span className="start" style={{
                        fontSize: "18px",
                        fontWeight: props.room.numberOfUnreadMessage > 0 ? "bold" : "normal"
                    }}>
                        {litmitString(props.room.name)}
                    </span>
                </div>
                <div className="row">
                    <span className="start fixed-msg"
                        style={{
                            color: props.room.numberOfUnreadMessage > 0 ? "black" : "gray",
                            fontSize: "14px"
                        }}
                    >{
                            props.room.roomType === "SINGLE_CHAT" ?
                                props.room.sender ? `Bạn: ${props.room.latestMessage}` : `${props.room.latestMessage}` :
                                props.room.sender ? `Bạn: ${props.room.latestMessage}` : `${props.room.latestMessage}`
                        }</span>
                </div>
            </div>
            <div className="col-4 d-flex justify-content-end" style={{ flexDirection: "column" }}>
                <div className="row">
                    {hiddenButton ? <span className="end fixed" style={{ height: 30, fontSize: "14px", color: "gray", marginLeft: 10 }}>
                        {date}
                    </span> :
                        <div className="btn-more" data-bs-toggle="tooltip" title="Thêm" style={{
                            width: 40,
                            height: 30,
                        }} onClick={onpenMoreMenu}><i className="bi bi-three-dots"></i></div>}
                </div>
                {
                    props.room.numberOfUnreadMessage > 0 ?
                        <div className="row" style={{ justifyContent: "flex-end" }}>
                            <span className="center" style={{
                                fontSize: "14px",
                                width: 30,
                                paddingLeft: 5,
                                paddingRight: 5,
                                borderRadius: "15px",
                                backgroundColor: "red",
                                color: "white"
                            }}>{props.room.numberOfUnreadMessage > 5 ? "5+" : props.room.numberOfUnreadMessage}</span>
                        </div> : <></>
                }
            </div>
        </div>

    );
}

export default BoxChat;