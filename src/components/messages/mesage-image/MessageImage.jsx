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
        <BaseMessage message={props.message} isSender={userCurrent.email === props.message.senderId} lastMessage={props.lastMessage ? true : false} showAvatar={props.showAvatar}>
            {messageStatus === "SENDING" ? (
                <div style={{ position: "relative", padding: 10 }}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVf3Y4C59D3Y_SOFpvOnqh64ON-yo7CkaXOJGflrjqAA&s"
                        style={{ maxHeight: "800px", maxWidth: "300px", borderRadius: "10px" }}
                    />
                </div>
            ) : (
                <div style={{ position: "relative", padding: 10, marginBottom: emojiCount > 0 ? 15 : 0 }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={handleDisplayLike}>
                    <div className="img-message"><img src={fileInfo.filePath} style={{ maxHeight: "500px", maxWidth: "45vh", borderRadius: "10px", }} /></div>
                    {selectedEmojis.length > 0 && (
                        <div className='btn-icon-custom-img-s'>
                            {selectedEmojis.slice(0, 3).map(emoji => (
                                <span style={{ fontSize: 20 }} key={emoji}>{emoji}</span>
                            ))}
                            {emojiCount > 0 && <span style={{ fontSize: 12, color: 'rgb(154, 150, 150)' }}>{emojiCount}</span>}
                        </div>
                    )}
                    {isHovered && (
                        <div onMouseEnter={hanldeHoverLike} onMouseLeave={() => setShowContent(false)}>

                            <Dropdown show={showContent} className='drop-message-img' >

                                <Dropdown.Toggle as={CustomToggle}>
                                    <div className='btn-icon-custom-img'>
                                        {selectedEmojis.length > 0 ? selectedEmojis[selectedEmojis.length - 1] : <img style={{ width: 14, height: 14, }} src='./assets/icons/like.png' />}
                                    </div>
                                </Dropdown.Toggle>

                                {showMenu && (
                                    <Dropdown.Menu className='dropd-menu-img'>
                                        <div className="btn-emoji-img">
                                            {emojis.map((emoji, index) => (
                                                <div

                                                >
                                                    <Dropdown.Item
                                                        className="emoji-item-img"
                                                        onClick={() => handleSelectEmoji(emoji.icon)}
                                                    >
                                                        {emoji.icon}
                                                    </Dropdown.Item>
                                                </div>
                                            ))}
                                            {selectedEmojis.length > 0 && (
                                                <Dropdown.Item className='emoji-item-img' onClick={handleClearEmojis}>
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