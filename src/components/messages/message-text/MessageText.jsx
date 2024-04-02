import { useSelector } from "react-redux";
import BaseMessage from "../BaseMessage";

function MessageText(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);
    return (
        <BaseMessage 
            isSender={userCurrent.id === props.message.senderId}
            lastMessage={props.lastMessage ? true : false}
        >
            <div>{props.message.content}</div>
        </BaseMessage>
    );
}

export default MessageText;