// MessageText.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BaseMessage from '../BaseMessage';
import { emojis } from '../../../configs/button_group_icon_config';
import "./MessageRevoked.scss"
import { arrayToDateTime } from '../../../utils/DateTimeHandle';

function MessageRevoked(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);
    return (

        <BaseMessage
            message={props.message}
            isSender={userCurrent.email === props.message.senderId}
            lastMessage={props.lastMessage ? true : false} showAvatar={props.showAvatar}
        >
            <div className='d-flex mess-hover-sssss' style={{margin:10}} >
                <div className="d-flex  mess-text-cs" style={{ position: "relative" }}>
                    <div className='text-cs'> <p>Tin nhắn đã được thu hồi</p></div>
                    <span>{`${arrayToDateTime(props.message.sendDate).getHours()}:${arrayToDateTime(props.message.sendDate).getMinutes()}`}</span>
                </div>

            </div>
        </BaseMessage>

    );
}

export default MessageRevoked;
