import { useState } from "react";
import Avatar from "../avatar/Avatar";
import "./BoxChat.scss";
import ButtonIcon from "../buttons/button-icon/ButtonIcon";

function BoxChat(props) {
    const [hiddenButton, setHiddenButton] = useState(true);

    const mouseEnter = () => {
        setHiddenButton(false);
    }
    const mouseLeave = () => {
        setHiddenButton(true);
    }
    return (

        <div className="row d-flex w-100 wrapper" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <div className="col-2">
                <Avatar />
            </div>
            <div className="col-7" style={{ marginLeft: 10 }}>
                <div className="row">
                    <span className="start">User name</span>
                </div>
                <div className="row">
                    <span className="start">Message</span>
                </div>
            </div>
            <div className="col-2">
                <div className="row d-flex justify-content-end">
                    {hiddenButton ? <span className="end" style={{ height: 30 }}>2days</span> : 
                    <div data-bs-toggle="tooltip" title="Thêm"  className="btn-more" style={{ 
                        width: 40,
                        height: 30,
                     }}><i className="bi bi-three-dots"></i></div>}
                </div>
                <div className="row">
                    <span className="end">1</span>
                </div>
            </div>
        </div>

    );
}

export default BoxChat;