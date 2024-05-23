// MessageText.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BaseMessage from '../BaseMessage';
import { Dropdown } from 'react-bootstrap';
import './MessageText.scss';
import { emojis } from '../../../configs/button_group_icon_config';
import { arrayToDateTime } from '../../../utils/DateTimeHandle';
import confetti from 'canvas-confetti';
import { getUserGroupById } from '../../../services/GroupService';

function MessageText(props) {
    const [isHovered, setIsHovered] = useState(false);
    const userCurrent = useSelector((state) => state.userInfo.user);
    const [showContent, setShowContent] = useState(false);
    const [selectedEmojis, setSelectedEmojis] = useState([]);
    const [emojiCount, setEmojiCount] = useState(0);
    const [hoveredEmoji, setHoveredEmoji] = useState(null);
    const [showMenu, setShowMenu] = useState(true);
    const chatInfo = useSelector(state => state.message.chatInfo);

    const handleSelectEmoji = (emoji) => {
        setHoveredEmoji(null);
        setEmojiCount(prevCount => prevCount + 1);
        setSelectedEmojis(prevEmojis => {
            if (!prevEmojis.includes(emoji)) {
                const newEmojis = [...prevEmojis, emoji];
                launchHeartEmojiConfetti();  // Gọi hiệu ứng pháo bông khi thêm mới emoji
                return newEmojis;
            }
            return prevEmojis;
        });
        setShowContent(false);
        setShowMenu(false)
    };
    const handleClearEmojis = () => {
        setSelectedEmojis([]);
        setEmojiCount(0);
        setShowContent(false); // Tự động đóng menu sau khi xóa
        setHoveredEmoji(null);
    };

    const scrollToMessage = (id) => {
        props.scrollToMessage(id, props.currentPage);
    }


    const hanldeHoverLike = () => {
        setShowContent(true);
        setShowMenu(true);
    }
    const handleDisplayLike = () => {
        if (emojiCount > 0) {
            setIsHovered(true);
            setShowMenu(false)
        } else {
            setIsHovered(false);
            setShowMenu(false)
        }

    }
    const launchHeartEmojiConfetti = () => {
        // Bắn ra chính xác 15 emoji ❤️
        for (let i = 0; i < 15; i++) {
            confetti({
                particleCount: 1,
                spread: 60,
                shapes: ['❤️'], // Sử dụng emoji ❤️ làm hình dạng
                colors: ['#ff0000'],
                disableForReducedMotion: true // Tắt hiệu ứng khi hệ thống yêu cầu giảm chuyển động
            });
        }
    };

    const displayMsgParent = () => {
        const msgType = props.message.messagesParent.messageType;
        const msgParent = props.message.messagesParent;
        switch (msgType) {
            case "TEXT":
                return <p>{msgParent.content}</p>;
            case "FILE":
                return <div className="d-flex align-items-center">
                    <i className={`bi bi-filetype-${msgParent.content.fileExtension}`} style={{ fontSize: 30 }}></i>
                    <div className="mess-text">
                        <div>{msgParent.content.filename}</div>
                    </div>
                </div>;
            case "IMAGE":
                return <div className="d-flex align-items-center">
                    <img src={msgParent.content.filePath} width={60} height={60} alt={msgParent.content.filename}></img>
                    <span className="p-2">Hình ảnh</span>
                </div>;
            case "VIDEO":
                return <div className="d-flex align-items-center">
                    <video width="50" height="50">
                        <source src={msgParent.content.filePath} type="video/mp4" />
                    </video>
                    <span className="p-2">Video</span>
                </div>;
            case "AUDIO":
                return;
            default:
                return "";
        }
    }
    return (

        <BaseMessage
            message={props.message}
            isSender={userCurrent.email === props.message.senderId}
            lastMessage={props.lastMessage ? true : false}
            showAvatar={props.showAvatar}
        // showHidden={isHovered}
        >
            <div className='d-flex mess-hover' style={{
                marginTop: userCurrent.email === props.message.senderId ? 15 : 3,
                marginBottom: emojiCount > 0 ? 16 : 3

            }}
            
                onMouseEnter={() => setIsHovered(true)} onMouseLeave={handleDisplayLike} >
                <div className="d-flex  mess-text" style={{ backgroundColor: userCurrent.email === props.message.senderId ? '#e5efff' : 'white' }} >
                    {props.message.messagesParent ? <div onClick={() => scrollToMessage(props.message.messagesParent)} style={{ cursor: "pointer" }}>
                        <div className="d-flex p-2" style={{ backgroundColor: userCurrent.email === props.message.senderId ? '#c7e0ff' : '#f0f0f0', margin: 5, width: "100%", borderRadius: 5 }}>
                            <div className="d-flex flex-column w-100" style={{
                                borderLeft: "2px solid blue",
                                paddingLeft: 5
                            }}>
                                <div>

                                    <div><span>{props.message.messagesParent.senderName}</span></div>
                                    {displayMsgParent()}
                                </div>
                            </div>
                        </div>
                        <div className='text'> <pre >{props.message.content}</pre></div>
                        <span>{`${arrayToDateTime(props.message.sendDate).getHours()}:${arrayToDateTime(props.message.sendDate).getMinutes()}`}</span>
                    </div> :
                        <div>
                            {chatInfo.room?.roomType === "GROUP_CHAT"   && userCurrent.email !== props.message.senderId ? <span>{props.message.senderName}</span> : <></>}
                            <div className='text'> <pre >{props.message.content}</pre></div>
                            <span>{`${arrayToDateTime(props.message.sendDate).getHours()}:${arrayToDateTime(props.message.sendDate).getMinutes()}`}</span></div>}
                    {selectedEmojis.length > 0 && (
                        <div className='btn-icon-custom-s'>
                            {selectedEmojis.slice(0, 3).map(emoji => (
                                <span style={{ fontSize: 19 }} key={emoji}>{emoji}</span>
                            ))}
                            {emojiCount > 0 && <span style={{ fontSize: 13 }}> {emojiCount}</span>}
                        </div>
                    )}


                    {isHovered && (
                        <div onMouseEnter={hanldeHoverLike} onMouseLeave={() => setShowContent(false)}>

                            <Dropdown show={showContent} className='drop-message_text'   >
                                <Dropdown.Toggle as={CustomToggle}>
                                    <div className='btn-icon-custom'>
                                        {selectedEmojis.length > 0 ? selectedEmojis[selectedEmojis.length - 1] : <img style={{ width: 14, height: 14, }} src='./assets/icons/like.png' />}
                                    </div>
                                </Dropdown.Toggle>
                                {showMenu && (
                                    <Dropdown.Menu className='dropd-menu'>
                                        <div className="btn-emoji">
                                            {emojis.map((emoji, index) => (
                                                <div
                                                    className={`emoji-wrapper ${hoveredEmoji === emoji.icon ? 'hovered' : ''}`}
                                                    key={index}
                                                    onMouseEnter={() => setHoveredEmoji(emoji.icon)}
                                                    onMouseLeave={() => setHoveredEmoji(null)}
                                                >
                                                    <Dropdown.Item
                                                        className="emoji-item"
                                                        onClick={() => handleSelectEmoji(emoji.icon)}
                                                    >
                                                        {emoji.icon}
                                                    </Dropdown.Item>
                                                </div>
                                            ))}
                                            {selectedEmojis.length > 0 && (
                                                <Dropdown.Item className='emoji-item' onClick={handleClearEmojis}>
                                                    <i className="bi bi-x-lg"></i>
                                                </Dropdown.Item>
                                            )}
                                        </div>
                                    </Dropdown.Menu>
                                )}
                            </Dropdown>

                        </div>
                    )}
                </div>

            </div>
        </BaseMessage>

    );
}

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href="/"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        className="" // Thêm class cho avatar dropdown
    >
        {children}
    </a>
));
export default MessageText;
