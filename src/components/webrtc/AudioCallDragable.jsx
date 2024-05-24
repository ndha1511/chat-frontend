import Draggable from "react-draggable";
import "./AudioCallDragable.scss";
import Avatar from "../avatar/Avatar";
import { acceptCallRequest, rejectCallRequest } from "../../services/MessageService";
import { useDispatch, useSelector } from "react-redux";
import { setDragableAudioCall, setDragableCallQuestion } from "../../redux/reducers/dragableReducer";
import { reRenderRoom } from "../../redux/reducers/renderRoom";
import { reRenderMessge } from "../../redux/reducers/messageReducer";
import { sendCall, setLocalPeer, setLocalStream } from "../../configs/WebRTCConfig";
import { Icon } from "zmp-ui";
import { Modal } from "react-bootstrap";


function AudioCallDragable(props) {
    const user = useSelector((state) => state.userInfo.user);
    const messageCall = useSelector((state) => state.message.messageCall);
    const windowSize = useSelector(state => state.render.windowSize);

    const dispatch = useDispatch();

    const accept = async () => {
        setLocalPeer();
        await setLocalStream({ video: false, audio: true });
        try {
            await acceptCallRequest(messageCall.id);
            sendCall(messageCall, user);
            dispatch(setDragableCallQuestion(false));
            dispatch(setDragableCallQuestion(false));
            dispatch(setDragableAudioCall(true));
            dispatch(reRenderRoom());
            dispatch(reRenderMessge());
        } catch (error) {
            console.log(error);
        }
    }

    const reject = async () => {
        try {
            await rejectCallRequest(messageCall.id);
            dispatch(setDragableCallQuestion(false));
        } catch (error) {
            console.log(error);
        }
    }


    return (

        windowSize.width > 768 ? <Draggable defaultPosition={{
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
                <div className="draggable-window-receive">
                    <button style={{
                        position: "fixed", top: 0, right: 0,
                        backgroundColor: "#fff",
                        border: "none",
                        fontSize: 24
                    }} onClick={() => dispatch(setDragableCallQuestion(false))}><i className="bi bi-x-lg"></i></button>
                    <Avatar user={props.callerInfo} />
                    <h6>{props.callerInfo.name}</h6>
                    <span>Cuộc gọi đến</span>
                    <div className="group-btn-audio-call-receive">
                        <button onClick={reject}
                            className="btn-audio-call-receive btn-reject-receive"><i className="bi bi-telephone-fill"></i></button>
                        <button onClick={accept}
                            className="btn-audio-call-receive btn-accept-receive"><i className="bi bi-telephone-fill"></i></button>
                    </div>
                </div>
            </div>
        </Draggable>
            :
            <Modal show={true} size="md" centered>
                <Modal.Body style={{ padding: 0, height: 'auto', }} >
                <audio controls autoPlay loop style={{ display: "none" }}>
                        <source src="assets/mp3/nhac_cho.mp3" type="audio/mpeg" />
                    </audio>
                <div className="draggable-window-receive" style={{width:'100%' }}>
                    <Avatar user={props.callerInfo} />
                    <h6>{props.callerInfo.name}</h6>
                    <span>Cuộc gọi đến</span>
                    <div className="group-btn-audio-call-receive">
                        <button onClick={reject}
                            className="btn-audio-call-receive btn-reject-receive"><i className="bi bi-telephone-fill"></i></button>
                        <button onClick={accept}
                            className="btn-audio-call-receive btn-accept-receive"><i className="bi bi-telephone-fill"></i></button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>

    );
}

export default AudioCallDragable;

