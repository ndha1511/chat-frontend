import { useState } from "react";
import "./BaseMessage.scss";

function BaseMessage(props) {
    const [hiddenBtn, setHiddenBtn] = useState(false);
    return (
        <div onMouseEnter={() => setHiddenBtn(true)} 
            onMouseLeave={() => setHiddenBtn(false)}
        className="d-flex" style={{ flexDirection: props.isSender ? "row" : "row-reverse", alignItems: "flex-end"}}>
            <div className="hidden" style={{ display: hiddenBtn ? "block": "none"}}>
                <div>
                    <p>List button here</p>
                </div>
            </div>
            <div className="d-flex" style={{ flexDirection: "column", alignItems: "flex-end" }}>
                {props.children}
                {
                    props.lastMessage ?
                        <div className="m-2">
                            <p>status message</p>
                        </div> : <></>
                }
            </div>
        </div>
    );
}

export default BaseMessage;