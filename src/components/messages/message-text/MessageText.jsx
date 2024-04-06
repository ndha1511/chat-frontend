// MessageText.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BaseMessage from '../BaseMessage';
import './MessageText.scss';
import { arrayToDateTime } from '../../../utils/DateTimeHandle';

function MessageText(props) {
    const [isHovered, setIsHovered] = useState(false);
    const userCurrent = useSelector((state) => state.userInfo.user);

    return (
    
            <BaseMessage
                message={props.message}
                isSender={userCurrent.email === props.message.senderId}
                lastMessage={props.lastMessage ? true : false}
                showHidden={isHovered}
            >
                <div className='d-flex mess-hover' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
                    <div className="d-flex  mess-text" style={{ position: "relative" }}>
                       <div className='text'> <p>{props.message.content}</p></div>
                        <span>{`${arrayToDateTime(props.message.sendDate).getHours()}:${arrayToDateTime(props.message.sendDate).getMinutes()}`}</span>
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
