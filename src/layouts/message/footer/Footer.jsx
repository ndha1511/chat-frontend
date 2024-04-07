import { useSelector } from "react-redux";
import ButtonGroup from "../../../components/buttons/button-group/ButtonGroup";
import { useDispatch } from "react-redux";
import "./Footer.scss";
import { sendMessageToUser } from "../../../services/ChatService";
import { useState } from "react";
import { pushMessage } from "../../../redux/reducers/messageReducer";
import { reRenderRoom } from "../../../redux/reducers/renderRoom";



function Footer(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);
    const messages = useSelector(state => state.message.messages);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); 
    const chatInfo = useSelector(state => state.message.chatInfo);
    const [textContent, setTextContent] = useState("");
    const dispatch = useDispatch();
    const emoji_string = "😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🤩 🥳 🙂‍ 😏 😒 🙂‍ 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😮 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔 🤭 🤫 🤥 😶 😶 😐 😑 😬 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 😵 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 ☠️ 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾";
    const emojis = emoji_string.split(" ");
    


    const changeFile = async (event) => {
       if(event.target.files) {
        const fileList = event.target.files;
        const selectedFile = fileList[0];
        const fileName = selectedFile.name;

        const fileExtension = fileName.split('.').pop();
        const fileType = checkExtensionFile(fileExtension);
        const request = new FormData();
        request.append("senderId", userCurrent.email);
        request.append("receiverId", chatInfo.user.email);
        request.append("messageType", fileType);
        request.append("fileContent", selectedFile);
        request.append("hiddenSenderSide", false);
        try {
            const msg = await sendMessageToUser(request);
            dispatch(pushMessage(msg));
            dispatch(reRenderRoom());
        } catch (error) {
            console.error(error);
        }
       }
    }

    const insertEmoji = (emoji) => {
        // setTextContent(textContent + emoji);
        setShowEmojiPicker(false); // Đóng menu emoji sau khi chọn
        const textarea = document.getElementById('input-msg');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const textBefore = textContent.substring(0, start);
        const textAfter  = textContent.substring(end, textContent.length);
        setTextContent(textBefore + emoji + textAfter);
        
        // Đặt lại focus cho textarea và di chuyển con trỏ đến sau emoji vừa chèn
        setTimeout(() => {
            textarea.focus();
            const position = start + emoji.length;
            textarea.setSelectionRange(position, position);
        }, 0);
    };

    const renderEmojiPicker = () => {
        return showEmojiPicker && (
            <div className="emoji-picker">
                {emojis.map((emoji, index) => (
                    <button key={index} onClick={() => insertEmoji(emoji)}>{emoji}</button>
                ))}
            </div>
        );
    };
    
    const actionChatIcon = [
        {
            
            item: <img src="/assets/icons/sticker-icon.png" alt="sticker" width={20} height={20} onClick={() => setShowEmojiPicker(!showEmojiPicker)} />,
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
            <div className="d-flex w-100" style={{ paddingLeft: 15, height: "45%", alignItems: "center", position:'relative' }}>
                <ButtonGroup handle={handleButton} buttons={actionChatIcon} className="btn-hover"
                    marginRight={15}
                    width={40} height={40}
                    hoverColor="#f0f0f0"
                />
                {renderEmojiPicker()}
            </div>
            <div className="d-flex w-100" style={{ height: "45%", borderTop: "1px solid gray" }}>
                <label htmlFor="input-msg" style={{ width: "80%" }} className="border">
                    <textarea onChange={changeMessageContent} id="input-msg" value={textContent}  placeholder={`Nhập tin nhắn gửi tới ${props.user.name}`} className="input-message w-100" />
                </label>
                <button onClick={sendMessage}>Gửi</button>
            </div>
        
     
        </div>
        
    );
}

export default Footer;

