import { useSelector } from "react-redux";
import BaseMessage from "../BaseMessage";

function MessageText(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);
    return (
        <BaseMessage 
            isSender={userCurrent.email === props.message.senderId}
            lastMessage={props.lastMessage ? true : false}
        >
            <div><p>hihi</p></div>
        </BaseMessage>
    );
}

export default MessageText;