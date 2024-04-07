import { useSelector } from "react-redux";
import BaseMessage from "../BaseMessage";
import "./MessageImage.scss";
import { emojis } from "../../../configs/button-group-icon-config";


function MessageImage(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);
    const emojisArr = emojis;
    const fileInfo = props.message.content;
    const messageStatus = props.message.messageStatus;
    


    return (
        <BaseMessage message={props.message} isSender={userCurrent.email === props.message.senderId}
            lastMessage={props.lastMessage ? true : false}>
            {messageStatus === "SENDING" ? <div style={{ position: "relative", padding: 10 }}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVf3Y4C59D3Y_SOFpvOnqh64ON-yo7CkaXOJGflrjqAA&s"
                    style={{ maxHeight: "1000px", maxWidth: "500px", borderRadius: "10px" }}
                />
                <button className="btn-icon-custom">👍</button>
            </div> :
                <div style={{ position: "relative", padding: 10 }}>
                    <img src={fileInfo.filePath}
                        style={{ maxHeight: "1000px", maxWidth: "500px", borderRadius: "10px" }}
                    />
                    <button className="btn-icon-custom">👍</button>
                </div>}
        </BaseMessage>
    );
}

export default MessageImage;