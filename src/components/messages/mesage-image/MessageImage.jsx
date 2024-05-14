import { useSelector } from "react-redux";
import BaseMessage from "../BaseMessage";
import "./MessageImage.scss";
import { emojis } from "../../../configs/button_group_icon_config";
import { arrayToDateTime } from '../../../utils/DateTimeHandle';
import { Dropdown } from 'react-bootstrap';
import React, { useState } from "react";



function MessageImage(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);

    const fileInfo = props.message.content;
    const messageStatus = props.message.messageStatus;
    const [isHovered, setIsHovered] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [selectedEmojis, setSelectedEmojis] = useState([]);
    const [emojiCount, setEmojiCount] = useState(0);

    const handleSelectEmoji = (emoji) => {
        setEmojiCount(prevCount => prevCount + 1);
        setSelectedEmojis(prevEmojis => {
            if (!prevEmojis.includes(emoji)) {
                return [...prevEmojis, emoji];
            }
            return prevEmojis;
        });
        setShowContent(false); // Automatically close the menu after selection
    };
    const handleClearEmojis = () => {
        setSelectedEmojis([]);
        setEmojiCount(0);
        setShowContent(false); // Tự động đóng menu sau khi xóa
    };
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

    return (
        <BaseMessage message={props.message} isSender={userCurrent.email === props.message.senderId} lastMessage={props.lastMessage ? true : false}>
            {messageStatus === "SENDING" ? (
                <div style={{ position: "relative", padding: 10 }}>
                    <div className="image-sending">
                        <div className="spiner-custom"></div>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-end col-6" style={{ position: "relative", padding: 10 }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <img src={fileInfo.filePath} style={{ maxWidth: "100%", borderRadius: "10px" }} />
                    {selectedEmojis.length > 0 && (
                        <div className='btn-icon-custom-s'>
                            {selectedEmojis.slice(0, 3).map(emoji => (
                                <span key={emoji}>{emoji}</span>
                            ))}
                            {emojiCount > 0 && <span>{emojiCount}</span>}
                        </div>
                    )}
                    {/* {isHovered && (
                    <div className="" onMouseEnter={() => setShowContent(true)} onMouseLeave={() => setShowContent(false)}>
                        <Dropdown show={showContent}>
                            <Dropdown.Toggle id="dropdown-basic" as={CustomToggle}>
                                <div className='btn-icon-custom-img'>
                                    {selectedEmojis.length > 0 ? selectedEmojis[selectedEmojis.length - 1] : '👍'}
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='dropd-menu'>
                                <div className="btn-emoji">
                                    {emojis.map((emoji, index) => (
                                        <Dropdown.Item className='emoji-item' key={index} onClick={() => handleSelectEmoji(emoji.icon)}>
                                            {emoji.icon}
                                        </Dropdown.Item>
                                    ))}
                                    {selectedEmojis.length > 0 && (
                                        <Dropdown.Item className='emoji-item' onClick={handleClearEmojis}>
                                            <i className="bi bi-x-lg"></i>
                                        </Dropdown.Item>
                                    )}
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                )} */}

                </div>
            )}
        </BaseMessage>
    );
}

export default MessageImage;