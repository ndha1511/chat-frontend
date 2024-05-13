// MessageText.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BaseMessage from '../BaseMessage';
import './MessageAudioVideoCall.scss';
import Icons from '../../icons/Icons';
import { Icon } from 'zmp-ui';

function MessageAudioCall(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);
    return (
        <BaseMessage
            message={props.message}
            isSender={userCurrent.email === props.message.senderId}
            lastMessage={props.lastMessage ? true : false}
        >
            <div className='d-flex mess-hover-call'  >
                <div className="d-flex  mess-text-call" style={{ backgroundColor: userCurrent.email === props.message.senderId ? '#e5efff' : 'white' }} >
                    <div className='text'>
                        <h5 >Bạn đã hủy </h5>
                        <div className='call' >
                            <Icon style={{ color: '#72808e' }} icon='zi-call-solid' />
                            <div style={{ marginLeft: -12, marginTop: -10, marginRight: 10 }}>  <Icons type="iconCall" size={14} fillColor='red' /></div>
                            <span>Cuộc gọi thoại</span>
                        </div>
                    </div>
                    <div className='btn-call'><button style={{ backgroundColor: userCurrent.email === props.message.senderId ? '#e5efff' : 'white' }} >GỌI LẠI</button></div>

                </div>

            </div>
        </BaseMessage>

    );
}
export default MessageAudioCall;
