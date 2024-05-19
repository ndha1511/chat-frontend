import BaseMessage from "../BaseMessage";
import { useSelector } from 'react-redux';
import { arrayToDateTime } from '../../../utils/DateTimeHandle';

function MessageVideo(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);
    const fileInfo = props.message.content;
    const messageStatus = props.message.messageStatus;
    return (
        <BaseMessage
            message={props.message}
            isSender={userCurrent.email === props.message.senderId}
            lastMessage={props.lastMessage ? true : false} showAvatar={props.showAvatar}
        >
            {messageStatus === "SENDING" ? (<div style={{ position: "relative", padding: 10 }}>
                <div className="image-sending">
                    <div className="spiner-custom"></div>
                </div>
            </div>) :
                <div className="col-6" style={{ marginRight: 8, display: 'flex', flexDirection: 'column', cursor: "pointer", maxWidth: "300px" }}>
                    <video controls style={{maxHeight: "400px"}}>
                        <source src={fileInfo.filePath} type="video/mp4" />
                    </video>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>

                    </div>
                </div>}

        </BaseMessage>
    );
}

export default MessageVideo;