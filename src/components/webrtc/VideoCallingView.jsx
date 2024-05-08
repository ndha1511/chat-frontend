import Draggable from "react-draggable";
import { closeCall } from "../../services/MessageService";
import { useState } from "react";
import { closeStream, localStream } from "../../configs/WebRTCConfig";
import { useDispatch, useSelector } from "react-redux";
import { setDragableAudioCall } from "../../redux/reducers/dragableReducer";

function VideoCallingView(props) {
    console.log(props.remoteStreams);

    const dispatch = useDispatch();
    const messageCall = useSelector((state) => state.message.messageCall);
    const [mute, setMute] = useState(false);
    const [showCamera, setShowCamera] = useState(true);
    const stopCall = async () => {
        closeStream();
        await closeCall(messageCall.id);
        dispatch(setDragableAudioCall(false));
    }

    const toggleMute = () => {
        setMute(prevMute => !prevMute);
        if (localStream) {
            localStream.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled; // Toggle the enabled state of the audio track
            });
        }
    }
    const toggleCamera = () => {
        setShowCamera(prevShowCamera =>!prevShowCamera);
        if (localStream) {
            localStream.getVideoTracks().forEach(track => {
                track.enabled = !track.enabled; // Toggle the enabled state of the video track
            });
        }
    }
    return (
        <Draggable defaultPosition={{
            x: 0,
            y: 0
        }}>
            <div style={{
                position: "fixed",
                bottom: 0,
                right: 0,
                zIndex: 999,
                cursor: "pointer"
            }}>
                <div className="video-call" style={{
                    width: 1000,
                    height: 650,
                    backgroundColor: "#fff",
                    border: "1px solid gray",
                    borderRadius: "5px",
                }}>
                    <div className="header-video-call">
                        <button><i className="bi bi-arrows-angle-contract"></i></button>
                    </div>
                    <div className="center-video-call">
                        <div className="remote-video">
                            {props.remoteStreams.map((stream, index) => {
                                return <video key={index} ref={(ref) => {
                                    if (ref && stream) {
                                        ref.srcObject = stream;
                                    }
                                }} autoPlay muted></video>
                            })}
                        </div>
                        <div className="local-video">
                            <video ref={(ref) => {
                                if (ref && localStream) {
                                    ref.srcObject = localStream;
                                }
                            }} autoPlay muted
                            ></video>
                        </div>
                    </div>
                    <div className="footer-video-call">
                        <button
                            onClick={toggleCamera}
                            className="btn-audio-call btn-accept">{showCamera ? <i className="bi bi-camera-video"></i> : <i className="bi bi-camera-video-off"></i>}</button>
                        <button
                            className="btn-audio-call btn-reject"
                            onClick={stopCall}><i className="bi bi-telephone-fill"></i></button>
                        <button
                            onClick={toggleMute}
                            className="btn-audio-call btn-accept">{!mute ? <i className="bi bi-mic"></i> : <i className="bi bi-mic-mute"></i>}
                            </button>
                    </div>
                </div>
            </div>
        </Draggable>

    );
}

export default VideoCallingView;