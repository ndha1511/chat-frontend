import BaseMessage from "../BaseMessage";
import { useSelector } from 'react-redux';

function MessageVideo(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);
    const fileInfo = props.message.content;
    return (
        <BaseMessage
            message={props.message}
            isSender={userCurrent.email === props.message.senderId}
            lastMessage={props.lastMessage ? true : false}
        >
            <video controls  style={{ maxWidth: "40vh", padding: 10 }}>
                <source src={fileInfo.filePath} type="video/mp4" />
            </video>
        </BaseMessage>
    );
}

export default MessageVideo;