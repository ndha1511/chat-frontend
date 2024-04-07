import { arrayToDateTime } from "../../../utils/DateTimeHandle";
import BaseMessage from "../BaseMessage";
import { useSelector } from "react-redux";
function MessageError(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);
    return (
        <BaseMessage message={props.message} isSender={userCurrent.email === props.message.senderId}>
            <div className="mess-file" style={{ position: "relative" }}>
                <div className="mess-ct">
                    <i className="bi bi-bug text-danger"></i>
                    <div className="mess-text">
                        <div><h6 className="text-danger">Lỗi không thể gửi tin</h6></div>
                    </div>
                </div>
             

                <span>{`${arrayToDateTime(props.message.sendDate).getHours()}:${arrayToDateTime(props.message.sendDate).getMinutes()}`}</span>
            </div>
        </BaseMessage>
    );
}

export default MessageError;