// MessageText.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BaseMessage from '../BaseMessage';
import { Dropdown } from 'react-bootstrap';
import './MessageText.scss';
import { emojis } from '../../../configs/button_group_icon_config';
import { arrayToDateTime } from '../../../utils/DateTimeHandle';

function MessageText(props) {
    const [isHovered, setIsHovered] = useState(false);
    const userCurrent = useSelector((state) => state.userInfo.user);
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

    function getStyleForContent(content) {
        if (content === '👍') {
            return { fontSize: '30px' }; // Thay đổi kích thước phông chữ khi nội dung là 👍
        }
        return {}; // Trả về một object style rỗng nếu không phải là 👍
    }

    return (

        <BaseMessage
            message={props.message}
            isSender={userCurrent.email === props.message.senderId}
            lastMessage={props.lastMessage ? true : false}
        // showHidden={isHovered}
        >
            <div className='d-flex mess-hover' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
                <div className="d-flex  mess-text" >
                    <div className='text'> <pre style={getStyleForContent(props.message.content)}>{props.message.content}</pre></div>
                    <span>{`${arrayToDateTime(props.message.sendDate).getHours()}:${arrayToDateTime(props.message.sendDate).getMinutes()}`}</span>
                    {selectedEmojis.length > 0 && (
                        <div className='btn-icon-custom-s'>
                            {selectedEmojis.slice(0, 3).map(emoji => (
                                <span key={emoji}>{emoji}</span>
                            ))}
                            {emojiCount > 0 && <span> {emojiCount}</span>}
                        </div>
                    )}


                    {isHovered && (
                        <div onMouseEnter={() => setShowContent(true)} onMouseLeave={() => setShowContent(false)}>
                            <Dropdown show={showContent}>
                                <Dropdown.Toggle id="dropdown-basic" as={CustomToggle}>
                                    <div className='btn-icon-custom'>
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
