import { useState } from "react";
import "./BaseMessage.scss";

function BaseMessage(props) {
    const [hiddenBtn, setHiddenBtn] = useState(false);
    return (
        <div onMouseEnter={() => setHiddenBtn(true)} 
            onMouseLeave={() => setHiddenBtn(false)}
        className="d-flex w-100 " style={{ flexDirection: props.isSender ? "row" : "row-reverse", alignItems: "flex-end",justifyContent:"flex-end"}}>
            <div className="hidden" style={{ display: hiddenBtn ? "block": "none"}}>
                <div className="">
                    <p>List button here</p>
                </div>
            </div>

                {props.children}
                {
                    props.lastMessage ?
                        <div className="m-2">
                            <p>status message</p>
                        </div> : <></>
                }
     
        </div>
    );
}

export default BaseMessage;