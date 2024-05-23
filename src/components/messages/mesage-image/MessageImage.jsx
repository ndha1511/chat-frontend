import { useSelector } from "react-redux";
import BaseMessage from "../BaseMessage";
import "./MessageImage.scss";
import { emojis } from "../../../configs/button_group_icon_config";
import { arrayToDateTime } from '../../../utils/DateTimeHandle';
import { Dropdown } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";



function MessageImage(props) {

    const fileInfo = props.message.content;
    const userCurrent = useSelector((state) => state.userInfo.user);
    const messageStatus = props.message.messageStatus;
    const [isHovered, setIsHovered] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [selectedEmojis, setSelectedEmojis] = useState([]);
    const [emojiCount, setEmojiCount] = useState(0);
    const [showMenu, setShowMenu] = useState(true);
    const windowSize = useSelector(state => state.render.windowSize);
    const [hoveredEmoji, setHoveredEmoji] = useState(null);


    const handleSelectEmoji = (emoji) => {
        setEmojiCount(prevCount => prevCount + 1);
        setSelectedEmojis(prevEmojis => {
            if (!prevEmojis.includes(emoji)) {
                const newEmojis = [...prevEmojis, emoji];
                launchHeartEmojiConfetti();  // Gọi hiệu ứng pháo bông khi thêm mới emoji
                return newEmojis;
            }
            return prevEmojis;
        });
        setShowMenu(false)
    };
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
    const handleClearEmojis = () => {
        setSelectedEmojis([]);
        setEmojiCount(0);
        setShowContent(false); // Tự động đóng menu sau khi xóa
    };

  


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
    return (
        <BaseMessage message={props.message} isSender={userCurrent.email === props.message.senderId} lastMessage={props.lastMessage ? true : false}>
            {messageStatus === "SENDING" ? (
                <div style={{  padding: 10 }}>
                    <div className="image-sending">
                        <div className="spiner-custom"></div>
                    </div>
                </div>
            ) : (
                <div className={`d-flex justify-content-end ${windowSize.width <= 768 ? "col-6" : ""}`} style={{position:'relative',
                    marginBottom: emojiCount>0 && userCurrent.email === props.message.senderId ? 10:'',
                  padding: 10, cursor: "pointer" }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <img src={fileInfo.filePath} style={{ maxWidth: "100%", maxHeight: "400px",borderRadius: "10px",  }} />
                    {selectedEmojis.length > 0 && (
                        <div className='btn-icon-custom-img-s'>
                            {selectedEmojis.slice(0, 3).map(emoji => (
                                <span key={emoji}>{emoji}</span>
                            ))}
                            {emojiCount > 0 && <span>{emojiCount}</span>}
                        </div>
                    )}
                   {isHovered && (
                        <div onMouseEnter={hanldeHoverLike} onMouseLeave={() => setShowContent(false)}>

                            <Dropdown show={showContent} className='drop-message-img'>
                                <Dropdown.Toggle as={CustomToggle}>
                                    <div className='btn-icon-custom-img'>
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
            )}
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

export default MessageImage;