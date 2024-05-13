// MessageText.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BaseMessage from '../BaseMessage';
import './MessageAudioVideoCall.scss';
import Icons from '../../icons/Icons';
import { Icon } from 'zmp-ui';

function MessageVideoCall(props) {
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
            <div className='d-flex mess-hover-call' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
                <div className="d-flex  mess-text-call" style={{ backgroundColor: userCurrent.email === props.message.senderId ? '#e5efff' : 'white' }} >
                    <div className='text'>
                        <h5 style={getStyleForContent(props.message.content)}>Bạn đã hủy </h5>
                        <div className='call' >
                            <Icon style={{color:'#72808e'}}  icon='zi-video-solid' />
                           <div style={{marginLeft:-8,marginTop:-13, marginRight:8}}>  <Icons type="iconCall" size={14} fillColor='red' /></div>
                            <span>Cuộc gọi thoại</span>
                        </div>

                    </div>
                    <div className='btn-call'><button style={{ backgroundColor: userCurrent.email === props.message.senderId ? '#e5efff' : 'white' }} >GỌI LẠI</button></div>

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
export default MessageVideoCall;
