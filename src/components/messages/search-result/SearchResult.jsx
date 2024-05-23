import { useDispatch } from "react-redux";
import { displayDateTime } from "../../../utils/DateTimeHandle";
import Avatar from "../../avatar/Avatar";
import { setMessageSearchCurrent } from "../../../redux/reducers/messageReducer";

function SearchResult({ message }) {
    const dispatch = useDispatch();
    const user = {
        name: message.senderName,
        avatar: message.senderAvatar
    }
    const scrollToMessage = () => {
        dispatch(setMessageSearchCurrent(message));
    }
    return (
        <div className="col-12 d-flex pb-3 align-items-center justify-content-between"
            style={{ height: '100%' }}
            onClick={scrollToMessage}
        >
            <div className="d-flex align-items-center w-100">
                <div className="d-flex col-2">
                    <Avatar width={40} height={40} user={user} />
                </div>

                <div className="d-flex flex-column align-items-start px-2 col-8" style={{ height: "100%"}} >
                    <span style={{ fontWeight: "bold" }}>{message.senderName}</span>
                    {message.messageType !== "TEXT" ? 
                    <div className="d-flex flex-column align-items-start">
                        <span className="truncate-text" style={{ maxWidth: 200 }}>{message.content.filename + "." + message.content.fileExtension}</span>
                        <span>{message.messageType}</span>
                    </div>:
                    <span className="truncate-text" style={{ maxWidth: 200 }}>{message.content}</span>}
                </div>
            </div>
            <div className="d-flex col-2" >
                <span style={{ fontSize: 14, color: "gray" }}>{displayDateTime(message.sendDate)}</span>
            </div>
        </div>
    )
}

export default SearchResult;