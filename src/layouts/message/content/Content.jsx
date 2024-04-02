import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessageByRoomId } from "../../../services/MessageService";
import { setMessages } from "../../../redux/reducers/messageReducer";
import MessageText from "../../../components/messages/message-text/MessageText";
import "./Content.scss";
import { Spinner } from "react-bootstrap";

function Content(props) {

    const messages = useSelector(state => state.message.messages);
    const userCurrent = useSelector((state) => state.userInfo.user);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        const getMessages = async () => {
            try {
                const response = await getMessageByRoomId(props.roomId);
                dispatch(setMessages(response.messages.reverse()));
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getMessages();
    }, [props.roomId]);

    return (
        <div className="d-flex content-chat" style={{ backgroundColor: "crimson", height: "100%" }}>
            {loading ? <div className="loading"><Spinner animation="border" variant="info" /></div> :
             messages.map((message, index) => {
                return messages.length === index + 1 ? <div 
                className={`message ${message.senderId === userCurrent.id ? "message-right" : "message-left"}`}> 
                <MessageText message={message} key={index} lastMessage={true}/>  </div>:
                <div
                className={`message ${message.senderId === userCurrent.id ? "message-right" : "message-left"}`}
                > <MessageText message={message} key={index}/> </div>
            })
            }
           
        </div>
    );
}

export default Content;