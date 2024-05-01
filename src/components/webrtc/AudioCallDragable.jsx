import Draggable from "react-draggable";
import "./AudioCallDragable.scss";
import Avatar from "../avatar/Avatar";

function AudioCallDragable(props) {


    return (
        <div style={{
            position: "fixed",
            bottom: "0",
            right: "0",
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
                    <Avatar/>
                    <h6>HoangAnh</h6>
                    <span>Cuộc gọi đến</span>
                    <div className="group-btn-audio-call">
                        <button onClick={props.hiddenDragable} 
                                className="btn-audio-call btn-reject"><i className="bi bi-telephone-fill"></i></button>
                        <button className="btn-audio-call btn-accept"><i className="bi bi-telephone-fill"></i></button>
                    </div>
                </div>
            </Draggable>
        </div>
    );
}

export default AudioCallDragable;

