import { useSelector } from "react-redux";
import ButtonGroup from "../../../components/buttons/button-group/ButtonGroup";
import { actionChatIcon } from "../../../configs/button-group-icon-config";
import { useDispatch } from "react-redux";
import "./Footer.scss";
import { sendMessageToUser } from "../../../services/ChatService";
import { useState } from "react";
import { pushMessage } from "../../../redux/reducers/messageReducer";
import { reRenderRoom } from "../../../redux/reducers/renderRoom";



function Footer(props) {
    const buttons = actionChatIcon;
    const userCurrent = useSelector((state) => state.userInfo.user);
    const messages = useSelector(state => state.message.messages);
    const chatInfo = useSelector(state => state.message.chatInfo);
    const [textContent, setTextContent] = useState("");
    const dispatch = useDispatch();
    const sendMessage = async () => {
        if(textContent !== "") {
            try {
                const request = new FormData();
                request.append("senderId", userCurrent.email);
                request.append("receiverId", chatInfo.user.email);
                request.append("textContent", textContent);
                request.append("messageType", "TEXT");
                request.append("hiddenSenderSide", false);
                const msg = await sendMessageToUser(request);
                dispatch(pushMessage(msg));
                dispatch(reRenderRoom());
            } catch (error) {
                console.log(error);
            }
        }
        return;
    }

    const changeMessageContent = (e) => {
        setTextContent(e.target.value);
    }
    return (
        <div className="d-flex w-100" style={{ height: "100%", flexDirection: 'column' }}>
            <div className="d-flex w-100" style={{ paddingLeft: 15, height: "45%", alignItems: "center" }}>
                <ButtonGroup buttons={buttons} className="btn-hover"
                    marginRight={15}
                    width={40} height={40}
                    hoverColor="#f0f0f0"
                />
            </div>
            <div className="d-flex w-100" style={{ height: "45%", borderTop: "1px solid gray" }}>
                <label htmlFor="input-msg" style={{ width: "80%"  }} className="border">
                    <textarea onChange={changeMessageContent} placeholder={`Nhập tin nhắn gửi tới ${props.user.name}`} id="input-msg" className="input-message w-100"/>
                </label>
                <button onClick={sendMessage}>Gửi</button>
            </div>
        </div>
    );
}

export default Footer;