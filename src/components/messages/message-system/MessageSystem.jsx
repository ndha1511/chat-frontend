import BaseMessage from "../BaseMessage";

function MessageSystem(props) {
    return (
        <BaseMessage
            message={props.message}
            lastMessage={props.lastMessage ? true : false}
            showAvatar={props.showAvatar}
        // showHidden={isHovered}
        >
            <div>
                <p className="" style={{ width: 200, textAlign: "center", color: "gray"}}>{props.message.content}</p>
            </div>
        </BaseMessage>
    );
}

export default MessageSystem;