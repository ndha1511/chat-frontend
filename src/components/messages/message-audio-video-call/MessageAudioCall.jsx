// MessageText.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BaseMessage from '../BaseMessage';
import './MessageAudioVideoCall.scss';
import Icons from '../../icons/Icons';
import { Icon } from 'zmp-ui';

function MessageAudioCall(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);
    const callStatus = props.message.content.callStatus;
    const handleCallStatus = () => {
        const audioCallStatus = callStatus;
        if (userCurrent.email === props.message.senderId) {
            switch (audioCallStatus) {
                case 'START':
                    return 'Đã gọi';
                case 'CALLING':
                    return 'Đang gọi';
                case 'REJECT':
                    return 'Người nhận từ chối';
                case 'CANCEL':
                    return 'Bạn đã hủy';
                case 'MISSED':
                    return 'Cuộc gọi thoại đi';
                case 'END':
                    return 'Cuộc gọi thoại đi';
                default: return '';

            }
        }
        switch (audioCallStatus) {
            case 'START':
                return 'Đã gọi';
            case 'CALLING':
                return 'Đang gọi';
            case 'REJECT':
                return 'Đã từ chối';
            case 'CANCEL':
                return 'Đã hủy';
            case 'MISSED':
                return 'Bạn bị nhỡ';
            case 'END':
                return 'Cuộc gọi thoại đến';
            default: return '';

        }
    };
    const handleIconCall = () => {
        const audioCallStatus = callStatus;
        if (userCurrent.email === props.message.senderId) {
            switch (audioCallStatus) {
                case 'START':
                    return 'zi-call-solid';
                case 'CALLING':
                    return 'zi-call-solid';
                case 'REJECT':
                    return 'zi-call-solid';
                case 'CANCEL':
                    return 'zi-call-solid';
                case 'MISSED':
                    return 'zi-call-solid';
                case 'END':
                    return 'zi-call-solid';
                default: return '';
            }
        }
        switch (audioCallStatus) {
            case 'START':
                return 'zi-call-solid';
            case 'CALLING':
                return 'zi-call-solid';
            case 'REJECT':
                return 'zi-call-solid';
            case 'CANCEL':
                return 'zi-call-solid';
            case 'MISSED':
                return 'zi-call-solid';
            case 'END':
                return 'zi-call-solid';
            default: return '';
        }
    };

    const time = props.message.content.duration;
    // Tính số giờ, phút và giây từ biến đếm
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    // Format giờ, phút và giây để luôn hiển thị hai chữ số
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return (
        <BaseMessage
            message={props.message}
            isSender={userCurrent.email === props.message.senderId}
            lastMessage={props.lastMessage ? true : false}
        >
            <div className='d-flex mess-hover-call'  >
                <div className="d-flex  mess-text-call" style={{ backgroundColor: userCurrent.email === props.message.senderId ? '#e5efff' : 'white' }} >
                    <div className='text'>
                        <h5 >{handleCallStatus()}</h5>
                        <div className='call' >
                            <Icon style={{ color: '#72808e' }} icon={`${handleIconCall()}`} />
                            <div style={{ marginLeft: -12, marginTop: -10, marginRight: 10 }}>  <Icons type="iconCall" size={14} fillColor='red' /></div>
                            <span>{formattedHours > 0 ? formattedHours + ' giờ' : ''}{formattedMinutes > 0 ? formattedMinutes + ' phút' : ''}{formattedSeconds + ' giây'}</span>
                        </div>
                    </div>
                    <div className='btn-call'><button style={{ backgroundColor: userCurrent.email === props.message.senderId ? '#e5efff' : 'white' }} >GỌI LẠI</button></div>

                </div>

            </div>
        </BaseMessage>

    );
}
export default MessageAudioCall;
