import Draggable from "react-draggable";
import Avatar from "../avatar/Avatar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function CallRequestDragable(props) {
    const [receiver, setReceiver] = useState(props.receiver);
    const windowSize = useSelector(state => state.render.windowSize);


    return (
        <Draggable
            defaultPosition={{
                x: windowSize.width > 768 ? windowSize.width/2 : windowSize.width/7.5,
                y: windowSize.height/3.5
            }}
        >
            <div style={{
                position: "fixed",
                zIndex: 999,
                cursor: "pointer"
            }}>
                <audio controls autoPlay loop style={{ display: "none" }}>
                    <source src="assets/mp3/nhac_cho.mp3" type="audio/mpeg" />
                </audio>
                <div className="draggable-window">

                    <Avatar user={receiver.user} />
                    <h5>{receiver.name}</h5>
                    <span>Đang đổ chuông</span>

                    <div className="footer-audio-call">
                        <div className="group-btn-audio-call">
                            <button onClick={props.hiddenDragable}
                                className="btn-audio-call btn-reject"><i className="bi bi-telephone-fill"></i></button>
                        </div>
                    </div>

                </div>
            </div>
        </Draggable>
    );
}

export default CallRequestDragable;