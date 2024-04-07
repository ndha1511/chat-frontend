import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessageByRoomId } from "../../../services/MessageService";
import { setMessages } from "../../../redux/reducers/messageReducer";
import MessageText from "../../../components/messages/message-text/MessageText";
import MessageFile from "../../../components/messages/message-file/MessageFile";
import "./Content.scss";
import { Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import MessageImage from "../../../components/messages/mesage-image/MessageImage";

function Content(props) {

    const messages = useSelector(state => state.message.messages);
    const [messageState, setMessagesSate] = useState([]);
    const userCurrent = useSelector((state) => state.userInfo.user);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch();

    const renderMessage = (message, index, isLatest = false) => {
        const messageType = message.messageType;
        switch (messageType) {
            case "TEXT":
                return <MessageText message={message} key={index} lastMessage={isLatest && message.senderId === userCurrent.email ? true : false} />
            case "FILE":
                return <MessageFile message={message} key={index} lastMessage={isLatest && message.senderId === userCurrent.email ? true : false}/>;
            case "IMAGE":
                return <MessageImage message={message} key={index} lastMessage={isLatest && message.senderId === userCurrent.email ? true : false} />
            default: break;
        }
    }

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await getMessageByRoomId(userCurrent.email, props.roomId);
                // dispatch(setMessages(response.messages.reverse()));
                setMessagesSate(() => response.messages.reverse());
                setLoading(true);
            } catch (error) {
                console.log(error);
            }
        }
        getMessages();
    }, [props.roomId, messages]);

    return (
        <div id="scrollableDiv" className="d-flex content-chat w-100 " style={{ backgroundColor: "crimson", height: "100%" }}>

             {loading ?<InfiniteScroll
                dataLength={messageState.length}
                style={{ display: "flex", flexDirection: "column-reverse", paddingBottom: "30px" }} //To put endMessage and loader to the top.
                inverse={true}
                hasMore={true && !disabled}
                loader={<h4 className="p-5">Loading...</h4>}
                scrollableTarget="scrollableDiv"
            >
                {messageState.map((message, index) => {
                    return index === 0 ? <div key={index}
                    className={`message ${message.senderId === userCurrent.email ? "message-right" : "message-left"}`}>
                    {renderMessage(message, index, true)}  </div> :
                    <div key={index}
                        className={`message ${message.senderId === userCurrent.email ? "message-right" : "message-left"}`}
                    > {renderMessage(message, index)} </div>
                })}
            </InfiniteScroll> : <></>}
            </div>
    );
}

export default Content;