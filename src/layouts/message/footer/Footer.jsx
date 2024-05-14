import { useSelector } from "react-redux";
import ButtonGroup from "../../../components/buttons/button-group/ButtonGroup";
import { useDispatch } from "react-redux";
import "./Footer.scss";
import { sendImgaeGroup, sendMessageToUser } from "../../../services/ChatService";
import { useEffect, useRef, useState } from "react";
import { pushMessage, setChatInfo, setScrollEnd } from "../../../redux/reducers/messageReducer";
import { reRenderRoom } from "../../../redux/reducers/renderRoom";
import { getRoomBySenderIdAndReceiverId } from "../../../services/RoomService";
import { Icon } from "zmp-ui"
import Icons from "../../../components/icons/Icons";
import { setViewIndedx } from "../../../redux/reducers/renderLayoutReducer";


function Footer(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);
    const fileInputRef = useRef(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const chatInfo = useSelector(state => state.message.chatInfo);
    const [isActive, setIsActive] = useState(false);
    const [isActive1, setIsActive1] = useState(false);
    const [textContent, setTextContent] = useState("");
    const dispatch = useDispatch();
    const emojiPickerRef = useRef(null);
    const stickerIconRef = useRef(null);
    const emoji_string = "😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🤩 🥳 🙂‍ 😏 😒 🙂‍ 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😮 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔 🤭 🤫 🤥 😶 😶 😐 😑 😬 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 😵 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 ☠️ 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾";
    const emojis = emoji_string.split(" ");



    useEffect(() => {
        function handleClickOutside(event) {
            // Kiểm tra xem emojiPickerRef.current đã tồn tại và event.target không nằm trong emojiPickerRef.current
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
            // Kiểm tra xem stickerIconRef.current đã tồn tại và event.target không nằm trong stickerIconRef.current
            if (stickerIconRef.current && !stickerIconRef.current.contains(event.target)) {
                // Thêm code xử lý khi click ra ngoài cho phần stickerIconRef.current ở đây
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
            try {
                const fileList = event.target.files;
                for (let i = 0; i < fileList.length; i++) {
                    const file = fileList[i];
                    const filename = file.name;
                    const fileExtension = filename.split('.').pop();
                    const fileType = checkExtensionFile(fileExtension);
                    const request = new FormData();
                    request.append("senderId", userCurrent.email);
                    request.append("receiverId", chatInfo.user.email);
                    request.append("messageType", fileType);
                    request.append("fileContent", file);
                    request.append("hiddenSenderSide", false);
                    request.append("senderName", userCurrent.name);
                    const msg = await sendMessageToUser(request);
                    dispatch(pushMessage(msg));
                    dispatch(setScrollEnd());
                }

                dispatch(setViewIndedx(0));
                fileInputRef.current.value = null;
            } catch (error) {
                console.error(error);
                fileInputRef.current.value = null;
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

            item: <div onClick={() => setShowEmojiPicker(!showEmojiPicker)}><Icons type='Sticker' size={25} /></div>,
            title: "Gửi sticker"

        },
        {
            item: <label htmlFor="image" style={{ cursor: "pointer" }}>
                <input ref={fileInputRef} id="image" type="file" accept="image/*" style={{ display: "none" }} onChange={changeFile} multiple />
                <Icon icon='zi-photo' />
            </label>,
            title: "Gửi hình ảnh"
        },
        {

            item: <label htmlFor="attachFile" style={{ cursor: "pointer" }}>
                <input id="attachFile" type="file" style={{ display: "none" }} onChange={changeFile} multiple />
                <Icon icon="zi-link" />
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
                request.append("senderName", userCurrent.name);
                setTextContent("");
                const msg = await sendMessageToUser(request);

                if(chatInfo.roomId === ''){
                    const chatInfor = {...chatInfo,roomId:msg.roomId}
                    dispatch(setChatInfo(chatInfor))
                }
                dispatch(pushMessage(msg));
                
                dispatch(setScrollEnd())
                // findRoomId();
                dispatch(setViewIndedx(0));

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
        setIsActive1(e.target.value.trim() !== '');
    }
    const handleFocus = () => {
        setIsActive(true);
        setIsActive1(textContent.trim() !== '');
    };

    const handleBlur = () => {
        if (textContent.trim() === '') {
            setIsActive(false);
            setIsActive1(false);
        }
    };

    const chatField = () => {
        return <div className="d-flex w-100" style={{ height: "100%", flexDirection: 'column' }}>
            <div className="d-flex w-100" style={{ paddingLeft: 15, height: "40%", alignItems: "center", position: 'relative', borderTop: '1px solid rgb(200, 220, 220)' }}>
                <ButtonGroup handle={handleButton} buttons={actionChatIcon} className="btn-hover"
                    marginRight={15}
                    width={40} height={40}
                    hoverColor="#f0f0f0"
                />
                {renderEmojiPicker()}
            </div>
            <div className={`d-flex w-100 ${isActive ? "border-top-success" : "border-top-gray"}`} style={{ height: "54%", alignItems: 'center' }}>
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
                <button className="btn-smile" onClick={() => { setShowEmojiPicker(!showEmojiPicker); }} ><i className="bi bi-emoji-smile"></i></button>
                {isActive1 ? null : <button className="btn-send" onClick={sendLike} style={{ paddingBottom: 4 }}><Icons type="like" fillColor="#F7CE6C" size={28} /></button>}
                {isActive1 ? (
                    <button className=" btn-send" onClick={sendMessage}>
                        <Icon icon='zi-send-solid' size={30} />
                    </button>
                ) : null}
            </div>
        </div>
    }
    const sendLike = () => {
        const likeMessage = "👍";
        const request = new FormData();
        request.append("senderId", userCurrent.email);
        request.append("receiverId", chatInfo.user.email);
        request.append("textContent", likeMessage);
        request.append("messageType", "TEXT");
        request.append("hiddenSenderSide", false);
        request.append("senderName", userCurrent.name);

        // Gửi tin nhắn ngay lập tức
        try {
            const sendMessageAsync = async () => {
                const msg = await sendMessageToUser(request);
                dispatch(pushMessage(msg));
                dispatch(setScrollEnd());
                findRoomId();
            };
            sendMessageAsync();
        } catch (error) {
            console.log(error);
        }
    };

    const groupRemoved = () => {
        return <div className="d-flex w-100" style={{ height: "100%", flexDirection: 'column' }}>
            <p>Nhóm này đã giải tán</p>
        </div>
    }

    const groupNotPermission = () => {
        return <div className="d-flex w-100" style={{ height: "100%", flexDirection: 'column' }}>
            <p>Chỉ trưởng nhóm hoặc phó nhóm mới có thể gửi tin nhắn</p>
        </div>
    }

    const groupNotMember = () => {
        return <div className="d-flex w-100" style={{ height: "100%", flexDirection: 'column' }}>
            <p>Bạn không phải thành viên của nhóm này</p>
        </div>
    }



    const renderFooter = () => {
        if (chatInfo.room?.roomType === "GROUP_CHAT") {
            if (chatInfo?.user.groupStatus === "INACTIVE") {
                return groupRemoved();
            }
            if (!chatInfo?.user.members.includes(userCurrent.email)) {
                return groupNotMember();
            }
            if (chatInfo?.user.sendMessagePermission !== "PUBLIC" &&
                (userCurrent.email !== chatInfo?.user.owner && !chatInfo?.user.admins.includes(userCurrent.email))) {
                return groupNotPermission();
            }

            return chatField();
        } else {
            return chatField();
        }

    }

    return renderFooter();
}

export default Footer;

