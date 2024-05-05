import Draggable from "react-draggable";
import "./AudioCallDragable.scss";
import Avatar from "../avatar/Avatar";
import { acceptCallRequest, rejectCallRequest } from "../../services/MessageService";


function VideoCallDragable(props) {

    const accept = async () => {
        props.setLocalPeer();
        props.setLocalStream({video: true, audio: true});
        try {
            await acceptCallRequest(props.message.id);
            props.sendCall();
            props.hiddenDragable();
        } catch (error) {
            console.log(error);
        }
    }

    const reject = async () => {
        try {
            await rejectCallRequest(props.message.id);
            props.hiddenDragable();
        } catch (error) {
            console.log(error);
        }
    }


    return (

        <Draggable defaultPosition={{
            x: 0,
            y: 0
        }}
        >
            <div style={{
                position: "fixed",
                bottom: "0",
                right: "0",
                zIndex: 999,
                cursor: "pointer"
            }}>
                <audio controls autoPlay loop style={{ display: "none" }}>
                    <source src="assets/mp3/nhac_chuong.mp3" type="audio/mpeg" />
                </audio>
                <div className="draggable-window">
                    <button style={{
                        position: "fixed", top: 0, right: 0,
                        backgroundColor: "#fff",
                        border: "none",
                        fontSize: 24
                    }} onClick={props.hiddenDragable}><i className="bi bi-x-lg"></i></button>
                    <Avatar user={props.callerInfo} />
                    <h6>{props.callerInfo.name}</h6>
                    <span>Cuộc gọi đến</span>
                    <div className="group-btn-audio-call">
                        <button onClick={reject}
                            className="btn-audio-call btn-reject"><i className="bi bi-telephone-fill"></i></button>
                        <button onClick={accept}
                            className="btn-audio-call btn-accept"><i className="bi bi-camera-video-fill"></i></button>
                    </div>
                </div>
            </div>
        </Draggable>

    );
}

export default VideoCallDragable;

