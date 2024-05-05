import Draggable from "react-draggable";
import Avatar from "../avatar/Avatar";

import { closeCall } from "../../services/MessageService";
import { useState } from "react";

function AudioCallingView(props) {

    const [mute, setMute] = useState(false);


    const stopCall = async () => {
        if (props.localStream) {
            props.localStream.getAudioTracks().forEach(track => track.stop());
        }
        await closeCall(props.message.id);
        props.hiddenDragable();
    }

    const toggleMute = () => {
        setMute(prevMute => !prevMute);
        if (props.localStream) {
            props.localStream.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled; // Toggle the enabled state of the audio track
            });
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
                zIndex: 999,
                cursor: "pointer"
            }}>
                <div className="draggable-window">
                    <button style={{
                        position: "fixed", top: 0, right: 0,
                        backgroundColor: "#fff",
                        border: "none",
                        fontSize: 24
                    }} onClick={props.hiddenDragable}><i className="bi bi-x-lg"></i></button>
                    <Avatar user={props.callerInfo} />
                    <h6>{props.callerInfo.name}</h6>
                    <div className="group-btn-audio-call">
                        <button onClick={stopCall}
                            className="btn-audio-call btn-reject"><i className="bi bi-telephone-fill"></i>
                        </button>
                        <button onClick={toggleMute}
                            className="btn-audio-call btn-accept">{!mute ? <i className="bi bi-mic"></i> : <i className="bi bi-mic-mute"></i>}
                        </button>
                    </div>
                </div>
            </div>
        </Draggable>
    );
}
export default AudioCallingView;