import { useState } from "react";
import "./BaseMessage.scss";

function BaseMessage(props) {
    const [hiddenBtn, setHiddenBtn] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const checkStatusMessage = () => {
        const status = props.message.messageStatus;
        switch (status) {
            case "SENDING": return "Đang gửi";
            case "SENT": return "Đã gửi";
            case "SEEN": return "Đã xem";
            case "ERROR": return "Lỗi";
            default: return "";
        }
    }
    return (
        <div onMouseEnter={() => setHiddenBtn(true)} 
            onMouseLeave={() => setHiddenBtn(false)}
        className="d-flex w-100 " style={{ flexDirection: props.isSender ? "row" : "row-reverse", alignItems: "flex-end",
        justifyContent:"flex-end", position: "relative"}}>
            <div className="hidden" style={{ display: hiddenBtn ? "block": "none"}}>
                <div className="">
                    <p>List button here</p>
                </div>
            </div>

                {props.children}
                {
                    props.lastMessage ?
                        <div className="m-2" style={{ position: "absolute", bottom: -60, padding: 10 }}>
                            <p>{checkStatusMessage()}</p>
                        </div> : <></>
                }
     
        </div>
    );
}

export default BaseMessage;