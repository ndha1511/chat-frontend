// MessageText.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BaseMessage from '../BaseMessage';
import '../message-text/MessageText.scss';
import { emojis } from '../../../configs/button-group-icon-config';
import ButtonGroup from '../../buttons/button-group/ButtonGroup';
import { arrayToDateTime } from '../../../utils/DateTimeHandle';

function MessageRevoked(props) {
    const [isHovered, setIsHovered] = useState(false);
    const userCurrent = useSelector((state) => state.userInfo.user);
    const [showContent, setShowContent] = useState(false);
    const buttons = emojis.map(item => {
        return {
            item: item.icon
        }
    });


    return (

        <BaseMessage
            message={props.message}
            isSender={userCurrent.email === props.message.senderId}
            lastMessage={props.lastMessage ? true : false}
        >
            <div className='d-flex mess-hover' >
                <div className="d-flex  mess-text-cs" style={{ position: "relative" }}>
                    <div className='text-cs'> <p>Tin nhắn đã được thu hồi</p></div>
                    <span>{`${arrayToDateTime(props.message.sendDate).getHours()}:${arrayToDateTime(props.message.sendDate).getMinutes()}`}</span>
                </div>

            </div>
        </BaseMessage>

    );
}

export default MessageRevoked;
