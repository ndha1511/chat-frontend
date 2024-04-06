// MessageText.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BaseMessage from '../BaseMessage';
import './MessageText.scss';

function MessageText(props) {
    const [isHovered, setIsHovered] = useState(false);
    const userCurrent = useSelector((state) => state.userInfo.user);

    return (
    
            <BaseMessage
                isSender={userCurrent.email === props.message.senderId}
                lastMessage={props.lastMessage ? true : false}
                showHidden={isHovered}
            >
                <div className='d-flex mess-hover' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
                    <div className="d-flex  mess-text" style={{ position: "relative" }}>
                       <div className='text'> <p>aaaaaâaaaaaaaaaaaaaâaaaaaaaaaaaaaâaaaaaaaaaaaaaâaaaaaaaaaaaaaâaaaaaaaaaaaaaâaaaaaaaaaaaaaâaaaaaaaaaaaaaâaaaaaaaaaaaaaâaaaaaaaaaaaaaaaaaaaaâaaaaaaaaaaaaaâaaaaaaaaaaaaaaaaaaaaâaaaaaaaaaaaaaâaaaaaaaaaaaaaaaaaaaaâaaaaaaaaaaaaaâaaaaaaaaaaaaaâaaaaaaaaa</p></div>
                        <span>2:29</span>
                        {isHovered && (
                        <div className="like-button">
                            <button className="btn-icon-custom">👍</button>
                        </div>
                    )}
                    </div>
                   
                </div>
            </BaseMessage>
     
    );
}

export default MessageText;
