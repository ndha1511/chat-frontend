import { useDispatch, useSelector } from "react-redux";
import { Icon } from "zmp-ui";
import { setMessageReply } from "../../../redux/reducers/messageReducer";

function ReplyMessageFooter(props) {
    const dispatch = useDispatch();
    const userCurrent = useSelector((state) => state.userInfo.user);
    const getName = () => {
        if(props.messageReply.senderId === userCurrent.email) return "";
        else return props.messageReply.senderName;
    }
    const displayMsgParent = () => {
        const msgType = props.messageReply.messageType;
        switch (msgType) {
            case "TEXT":
                return <p>{props.messageReply.content}</p>;
            case "FILE":
                return <div className="d-flex align-items-center">
                    <i className={`bi bi-filetype-${props.messageReply.content.fileExtension}`} style={{ fontSize: 30 }}></i>
                    <div className="mess-text">
                        <div>{props.messageReply.content.filename}</div>
                    </div>
                </div>;
            case "IMAGE":
                return <div className="d-flex align-items-center">
                    <img src={props.messageReply.content.filePath} width={60} height={60} alt={props.messageReply.content.filename}></img>
                    <span className="p-2">Hình ảnh</span>
                </div>;
            case "VIDEO":
                return <div className="d-flex align-items-center">
                    <video width="50" height="50">
                        <source src={props.messageReply.content.filePath} type="video/mp4" />
                    </video>
                    <span className="p-2">Video</span>
                </div>;
            case "AUDIO":
                return;
            default:
                return "";
        }
    }
    return (
        <div className="d-flex p-3" style={{backgroundColor: "#f0f0f0", margin: 5, width: "98%", borderRadius: 5}}>
            <div className="d-flex flex-column w-100" style={{
                borderLeft: "4px solid blue",
                paddingLeft: 5
            }}>
                <div>
                    <i className="bi bi-quote" style={{ transform: 'scaleX(-1) scaleY(-1)', fontSize: 18, }}></i>
                    <span>Trả lời <strong>{getName()}</strong></span>
                </div>
                <div>
                    {displayMsgParent()}
                </div>
            </div>
            <button onClick={() => {dispatch(setMessageReply({}))}} style={{backgroundColor: "transparent", border: "none", height: 20}}>
                <Icon icon="zi-close"/>
            </button>
        </div>
    )
}

export default ReplyMessageFooter;