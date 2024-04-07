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
            <video width="350" height="500" controls >
                <source src={fileInfo.filePath} type="video/mp4" />
            </video>
        </BaseMessage>
    );
}

export default MessageVideo;