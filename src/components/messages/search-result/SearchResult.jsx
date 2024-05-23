import { displayDateTime } from "../../../utils/DateTimeHandle";
import Avatar from "../../avatar/Avatar";

function SearchResult({ message }) {
    const user = {
        name: message.senderName,
        avatar: message.senderAvatar
    }
    return (
        <div className="d-flex w-100 pb-3 align-items-center justify-content-between"
            style={{height: '100%'}}
        >
            <div className="d-flex align-items-center">
                <Avatar width={40} height={40} user={user} />
                <div className="d-flex flex-column align-items-start px-2">
                    <span>{message.senderName}</span>
                    <span>Content message</span>
                </div>
            </div>
            <div className="d-flex">
                <span style={{fontSize: 14, color: "gray"}}>{displayDateTime(message.sendDate)}</span>
            </div>
        </div>
    )
}

export default SearchResult;