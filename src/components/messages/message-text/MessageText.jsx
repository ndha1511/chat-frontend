// MessageText.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BaseMessage from '../BaseMessage';
import { Dropdown } from 'react-bootstrap';
import './MessageText.scss';
import { emojis } from '../../../configs/button_group_icon_config';
import { arrayToDateTime } from '../../../utils/DateTimeHandle';
import confetti from 'canvas-confetti';

function MessageText(props) {
    const [isHovered, setIsHovered] = useState(false);
    const userCurrent = useSelector((state) => state.userInfo.user);
    const [showContent, setShowContent] = useState(false);
    const [selectedEmojis, setSelectedEmojis] = useState([]);
    const [emojiCount, setEmojiCount] = useState(0);
    const [hoveredEmoji, setHoveredEmoji] = useState(null);
    const [showMenu, setShowMenu] = useState(true);


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
    return (

        <BaseMessage
            message={props.message}
            isSender={userCurrent.email === props.message.senderId}
            lastMessage={props.lastMessage ? true : false}
            showAvatar={props.showAvatar}
        // showHidden={isHovered}
        >
            <div className='d-flex mess-hover' style={{ marginTop: userCurrent.email === props.message.senderId ? 15 : 3,
                marginBottom: emojiCount>0?16:3

            }}
             onMouseEnter={() => setIsHovered(true)} onMouseLeave={handleDisplayLike} >
                <div className="d-flex  mess-text" style={{ backgroundColor: userCurrent.email === props.message.senderId ? '#e5efff' : 'white' }} >
                    <div className='text'> <pre >{props.message.content}</pre></div>
                    <span>{`${arrayToDateTime(props.message.sendDate).getHours()}:${arrayToDateTime(props.message.sendDate).getMinutes()}`}</span>
                    {selectedEmojis.length > 0 && (
                        <div className='btn-icon-custom-s'>
                            {selectedEmojis.slice(0, 3).map(emoji => (
                                <span style={{ fontSize: 19 }} key={emoji}>{emoji}</span>
                            ))}
                            {emojiCount > 0 && <span style={{fontSize:13}}> {emojiCount}</span>}
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
