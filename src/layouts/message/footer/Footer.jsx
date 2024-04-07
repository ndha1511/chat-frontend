import { useSelector } from "react-redux";
import ButtonGroup from "../../../components/buttons/button-group/ButtonGroup";
import { useDispatch } from "react-redux";
import "./Footer.scss";
import { sendMessageToUser } from "../../../services/ChatService";
import { useState } from "react";
import { pushMessage, setChatInfo } from "../../../redux/reducers/messageReducer";
import { reRenderRoom } from "../../../redux/reducers/renderRoom";
import { getRoomBySenderIdAndReceiverId } from "../../../services/RoomService";



function Footer(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);
    const messages = useSelector(state => state.message.messages);
    const chatInfo = useSelector(state => state.message.chatInfo);
    const [textContent, setTextContent] = useState("");
    const dispatch = useDispatch();
    const emoji_string = "😀 😃 😄 😁 😆 😅 😂 🤣 🥲 🥹 ☺️ 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🥸 🤩 🥳 🙂‍↕️ 😏 😒 🙂‍↔️ 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😮‍💨 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🫣 🤗 🫡 🤔 🫢 🤭 🤫 🤥 😶 😶‍🌫️ 😐 😑 😬 🫨 🫠 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 😵‍💫 🫥 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾";
    const emojis = emoji_string.split(" ");

    const findRoomId = async () => {
        if (chatInfo.roomId === "") {
            try {
                const response = await getRoomBySenderIdAndReceiverId(userCurrent.email, chatInfo.user.email);
                const dataChatDispatch = {
                    user: chatInfo.user,
                    roomId: response.roomId
                }
                dispatch(setChatInfo(dataChatDispatch));
            } catch (error) {
                console.log(error);
            }

        }
        return;
    }

    const changeFile = async (event) => {
        if (event.target.files) {

            try {
                const fileList = event.target.files;
                const selectedFile = fileList[0];
                let fileName = "";
                if (selectedFile.name)
                    fileName = selectedFile.name;
                const fileExtension = fileName.split('.').pop();
                const fileType = checkExtensionFile(fileExtension);
                const request = new FormData();
                request.append("senderId", userCurrent.email);
                request.append("receiverId", chatInfo.user.email);
                request.append("messageType", fileType);
                request.append("fileContent", selectedFile);
                request.append("hiddenSenderSide", false);
                const msg = await sendMessageToUser(request);
                dispatch(pushMessage(msg));
                dispatch(reRenderRoom());
                findRoomId();
            } catch (error) {
                console.error(error);
            }
        }
    }

    const actionChatIcon = [
        {
            item: <img src="/assets/icons/sticker-icon.png" alt="sticker" width={20} height={20} />,
            title: "Gửi sticker"

        },
        {
            item: <label htmlFor="image" style={{ cursor: "pointer" }}>
                <input id="image" type="file" accept="image/*" style={{ display: "none" }} onChange={changeFile} />
                <i className="bi bi-image" style={{ fontSize: 20 }}></i>
            </label>,
            title: "Gửi hình ảnh"
        },
        {

            item: <label htmlFor="attachFile" style={{ cursor: "pointer" }}>
                <input id="attachFile" type="file" style={{ display: "none" }} onChange={changeFile} />
                <i className="bi bi-paperclip" style={{ fontSize: 20 }}></i>
            </label>,
            title: "Đính kèm file"
        }
    ]

    const checkExtensionFile = (fileExtension) => {
        const videoType = /mp4|mov|avi|mkv|wmv|flv|webm|mpg|mpeg|3gp/;
        if (videoType.test(fileExtension)) return "VIDEO";
        const imageType = /jpg|jpeg|png|gif|bmp|svg/;
        if (imageType.test(fileExtension)) return "IMAGE";
        return "FILE";
    }
    const sendMessage = async () => {
        if (textContent !== "") {
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
                findRoomId();
            } catch (error) {
                console.log(error);
            }
        }
        return;
    }

    const handleButton = () => {
    }

    const changeMessageContent = (e) => {
        setTextContent(e.target.value);
    }
    return (
        <div className="d-flex w-100" style={{ height: "100%", flexDirection: 'column' }}>
            <div className="d-flex w-100" style={{ paddingLeft: 15, height: "45%", alignItems: "center" }}>
                <ButtonGroup handle={handleButton} buttons={actionChatIcon} className="btn-hover"
                    marginRight={15}
                    width={40} height={40}
                    hoverColor="#f0f0f0"
                />
            </div>
            <div className="d-flex w-100" style={{ height: "45%", borderTop: "1px solid gray" }}>
                <label htmlFor="input-msg" style={{ width: "80%" }} className="border">
                    <textarea onChange={changeMessageContent} placeholder={`Nhập tin nhắn gửi tới ${props.user.name}`} id="input-msg" className="input-message w-100" />
                </label>
                <button onClick={sendMessage}>Gửi</button>
            </div>
        </div>
    );
}

export default Footer;