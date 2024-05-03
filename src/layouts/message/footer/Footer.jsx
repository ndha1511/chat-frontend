import { useSelector } from "react-redux";
import ButtonGroup from "../../../components/buttons/button-group/ButtonGroup";
import { useDispatch } from "react-redux";
import "./Footer.scss";
import { sendImgaeGroup, sendMessageToUser } from "../../../services/ChatService";
import { useEffect, useRef, useState } from "react";
import { pushMessage, reRenderMessge, setChatInfo, setScrollEnd } from "../../../redux/reducers/messageReducer";
import { reRenderRoom } from "../../../redux/reducers/renderRoom";
import { getRoomBySenderIdAndReceiverId } from "../../../services/RoomService";



function Footer(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);
    const fileInputRef = useRef(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const chatInfo = useSelector(state => state.message.chatInfo);
    const [isActive, setIsActive] = useState(false);
    const [textContent, setTextContent] = useState("");
    const dispatch = useDispatch();
    const emojiPickerRef = useRef(null);
    const stickerIconRef = useRef(null);
    const emoji_string = "😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🤩 🥳 🙂‍ 😏 😒 🙂‍ 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😮 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔 🤭 🤫 🤥 😶 😶 😐 😑 😬 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 😵 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 ☠️ 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾";
    const emojis = emoji_string.split(" ");



    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target) && !stickerIconRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [emojiPickerRef, stickerIconRef]);


    // const changeMessageContent = (event) => {
    //     setTextContent(event.target.value);
    //     if (!isActive) setIsActive(true);
    // };
    // trường hợp 2 user chưa có chat room
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
            if (event.target.files.length > 1) {
                try {
                    const fileList = event.target.files;
                    const request = new FormData();
                    for (let i = 0; i < fileList.length; i++) {
                        const file = fileList[i];
                        const filename = file.name;
                        const fileExtension = filename.split(".").pop();

                        if (checkExtensionFile(fileExtension) !== "IMAGE") {
                            alert("Bạn chỉ có thể upload nhiều file ảnh cùng lúc");
                            fileInputRef.current.value = null;
                            return;
                        }

                        // Thêm từng file vào FormData
                        request.append("filesContent", file);
                    }

                    request.append("senderId", userCurrent.email);
                    request.append("receiverId", chatInfo.user.email);
                    request.append("messageType", "IMAGE_GROUP");
                    request.append("messageStatus", "SENDING");
                    const msg = await sendImgaeGroup(request);
                    dispatch(pushMessage(msg));
                    dispatch(reRenderRoom());
                    findRoomId();
                    fileInputRef.current.value = null;
                } catch (error) {
                    console.error(error);
                    fileInputRef.current.value = null;
                }

            } else {
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
                    dispatch(reRenderMessge());
                    dispatch(reRenderRoom());
                    findRoomId();
                    fileInputRef.current.value = null;
                } catch (error) {
                    console.error(error);
                    fileInputRef.current.value = null;
                }
            }



        }
    }

    const insertEmoji = (emoji) => {
        // setTextContent(textContent + emoji);
        // setShowEmojiPicker(false); // Đóng menu emoji sau khi chọn
        const textarea = document.getElementById('input-msg');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const textBefore = textContent.substring(0, start);
        const textAfter = textContent.substring(end, textContent.length);
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
            <div className="emoji-picker" ref={emojiPickerRef}>
                {emojis.map((emoji, index) => (
                    <button key={index} onClick={() => insertEmoji(emoji)}>{emoji}</button>
                ))}
            </div>
        );
    };

    const actionChatIcon = [
        {

            item: <img ref={stickerIconRef} src="/assets/icons/sticker-icon.png" alt="sticker" width={20} height={20} onClick={() => setShowEmojiPicker(!showEmojiPicker)} />,
            title: "Gửi sticker"

        },
        {
            item: <label htmlFor="image" style={{ cursor: "pointer" }}>
                <input ref={fileInputRef} id="image" type="file" accept="image/*" style={{ display: "none" }} onChange={changeFile} multiple />
                <i className="bi bi-image" style={{ fontSize: 20 }}></i>
            </label>,
            title: "Gửi hình ảnh"
        },
        {

            item: <label htmlFor="attachFile" style={{ cursor: "pointer" }}>
                <input id="attachFile" type="file" style={{ display: "none" }} onChange={changeFile} multiple />
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
                setTextContent("");
                const msg = await sendMessageToUser(request);
                dispatch(pushMessage(msg));
                dispatch(reRenderMessge());
                dispatch(reRenderRoom());
                dispatch(setScrollEnd())
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
        // if (!isActive) setIsActive(true);
    }
    const handleFocus = () => {
        setIsActive(true);
    };

    const handleBlur = () => {
        if (textContent.trim() === '') {
            setIsActive(false);
        }
    };

    const chatField = ()  => { return <div className="d-flex w-100" style={{ height: "100%", flexDirection: 'column' }}>
        <div className="d-flex w-100" style={{ paddingLeft: 15, height: "45%", alignItems: "center", position: 'relative' }}>
            <ButtonGroup handle={handleButton} buttons={actionChatIcon} className="btn-hover"
                marginRight={15}
                width={40} height={40}
                hoverColor="#f0f0f0"
            />
            {renderEmojiPicker()}
        </div>
        <div className={`d-flex w-100 ${isActive ? "border-top-success" : "border-top-gray"}`} style={{ height: "45%" }}>
            <label htmlFor="input-msg" style={{ width: "100%" }} className="">
                <textarea
                    onChange={changeMessageContent}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault(); // Ngăn chặn việc xuống dòng khi nhấn Enter
                            sendMessage(); // Gửi tin nhắn khi nhấn Enter
                        }
                    }}
                    id="input-msg"
                    value={textContent}
                    placeholder={`Nhập tin nhắn gửi tới ${props.user.name}`}
                    className="input-message w-100"
                />
            </label>
            <button className="btn btn-primary btn-send" onClick={sendMessage}>
                Gửi
            </button>
        </div>
    </div>
    }

    const groupRemoved = () => {
        return <div lassName="d-flex w-100" style={{ height: "100%", flexDirection: 'column' }}>
            <p>Nhóm này đã giải tán</p>
        </div>
    }

    const groupNotPermission = () => {
        return <div lassName="d-flex w-100" style={{ height: "100%", flexDirection: 'column' }}>
        <p>Chỉ trưởng nhóm hoặc phó nhóm mới có thể gửi tin nhắn</p>
    </div>
    }

    const groupNotMember = () => {
        return <div lassName="d-flex w-100" style={{ height: "100%", flexDirection: 'column' }}>
        <p>Bạn không phải thành viên của nhóm này</p>
    </div>
    }

    const renderFooter = () => {
        if (chatInfo.room?.roomType === "GROUP_CHAT") {
            if (chatInfo.user.groupStatus === "INACTIVE") {
                return groupRemoved();
            }
            if (chatInfo.user.sendMessagePermission !== "PUBLIC" &&
                (userCurrent.email !== chatInfo.user.owner && !chatInfo.user.admins.includes(userCurrent.email))) {
                return groupNotPermission();
            }
            if(!chatInfo.user.members.includes(userCurrent.email)) {
                return groupNotMember();
            }
            return chatField();
        } else {
            return chatField();
        }

    }

    return renderFooter();
}

export default Footer;

