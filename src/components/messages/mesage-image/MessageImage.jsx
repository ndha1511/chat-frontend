import { useSelector } from "react-redux";
import BaseMessage from "../BaseMessage";
import "./MessageImage.scss";
import { emojis } from "../../../configs/button-group-icon-config";

function MessageImage(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);
    const emojisArr = emojis;
    const fileInfo = props.message.content;

    return (
        <BaseMessage message={props.message} isSender={userCurrent.email === props.message.senderId}
            lastMessage={props.lastMessage ? true : false}>
            <div style={{ position: "relative", padding: 10 }}>
                <img src={fileInfo.filePath}
                    style={{ maxHeight: "500px", maxWidth: "300px", borderRadius: "10px" }}
                />
                <button className="btn-icon-custom">👍</button>
            </div>
        </BaseMessage>
    );
}

export default MessageImage;