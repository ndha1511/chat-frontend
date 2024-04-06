import { useSelector } from "react-redux";
import BaseMessage from "../BaseMessage";
import "./MessageImage.scss";
import { emojis } from "../../../configs/button-group-icon-config";

function MessageImage(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);
    const emojisArr = emojis;

    return (
        <BaseMessage isSender={userCurrent.email === props.message.senderId}
            lastMessage={props.lastMessage ? true : false}>
            <div style={{ position: "relative", padding: "10px", justifyContent: "flex-end"}}>
                <img src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"
                    style={{ maxHeight: "600px", maxWidth: "400px", borderRadius: "10px" }}
                />
                <button className="btn-icon-custom">👍</button>
            </div>
        </BaseMessage>
    );
}

export default MessageImage;