import Draggable from "react-draggable";
import Avatar from "../avatar/Avatar";

function CallRequestDragable(props) {

    return (
        <div style={{
            position: "fixed",
            zIndex: 999,
            cursor: "pointer"
        }}>
            <audio controls autoPlay loop style={{ display: "none" }}>
                <source src="assets/mp3/nhac_cho.mp3" type="audio/mpeg" />
            </audio>
            <Draggable
            >
                <div className="draggable-window">

                    <Avatar />
                    <span>Đang đổ chuông</span>

                    <div className="footer-audio-call">
                        <div className="group-btn-audio-call">
                            <button onClick={props.hiddenDragable}
                                className="btn-audio-call btn-reject"><i className="bi bi-telephone-fill"></i></button>
                        </div>
                    </div>

                </div>
            </Draggable>
        </div>
    );
}

export default CallRequestDragable;