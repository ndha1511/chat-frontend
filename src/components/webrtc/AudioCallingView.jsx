import Draggable from "react-draggable";
import Avatar from "../avatar/Avatar";

function AudioCallingView() {
    return (
        <div style={{
            position: "fixed",
            zIndex: 999,
            cursor: "pointer"
        }}>
            <Draggable defaultPosition={{
                x: 0,
                y: 0
            }}
            >
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
                        <button onClick={reject}
                            className="btn-audio-call btn-reject"><i className="bi bi-telephone-fill"></i></button>
                        <button onClick={accept}
                            className="btn-audio-call btn-accept"><i className="bi bi-telephone-fill"></i></button>
                    </div>
                </div>
            </Draggable>
        </div>
    );
}
export default AudioCallingView;