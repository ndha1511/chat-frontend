// MessageText.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BaseMessage from '../BaseMessage';
import './MessageAudioVideoCall.scss';
import { setDragableCallRequest } from '../../../redux/reducers/dragableReducer';
import { setLocalPeer, setLocalStream } from '../../../configs/WebRTCConfig';
import { callRequest } from '../../../services/MessageService';
import { setMessageCall } from '../../../redux/reducers/messageReducer';

function MessageVideoCall(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);

    const windowSize = useSelector(state => state.render.windowSize);

    const dispatch = useDispatch();
    const chatInfo = useSelector(state => state.message.chatInfo);

    const time = props.message.content.duration;
    // Tính số giờ, phút và giây từ biến đếm
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    // Format giờ, phút và giây để luôn hiển thị hai chữ số
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const callStatus = props.message.content.callStatus;
    const handleCallStatus = () => {
        const audioCallStatus = callStatus;
        if (userCurrent.email === props.message.senderId) {
            switch (audioCallStatus) {
                case 'START':
                    return 'Đã gọi';
                case 'REJECT':
                    return {
                        title: 'Người nhận từ chối',
                        text: 'Cuộc gọi thoại',
                        icon: './assets/iconCall/iconVideoCall/call-reject.svg'
                    };
                case 'CANCEL':
                    return {
                        title: 'Bạn đã hủy',
                        text: 'Cuộc gọi thoại',
                        icon: './assets/iconCall/iconVideoCall/call-cancel.svg'
                    };
                case 'CALLING':
                case 'MISSED':
                case 'END':
                    return {
                        title: 'Cuộc gọi thoại đi',
                        text: `${formattedHours > 0 ? formattedHours + ' giờ' : ''}${formattedMinutes > 0 ? formattedMinutes + ' phút' : ''}${formattedSeconds + ' giây'}`,
                        icon: './assets/iconCall/iconVideoCall/call-me.svg' 
                    };
                default: return '';

            }
        }
        switch (audioCallStatus) {
            case 'START':
                return 'Đã gọi';
            case 'REJECT':
                return {
                    title: 'Bạn đã từ chối',
                    text: 'Cuộc gọi thoại',
                    icon: './assets/iconCall/iconVideoCall/call-reject.svg' 
                };
            case 'CANCEL':
                return {
                    title: 'Bạn đã hủy',
                    text: 'Cuộc gọi thoại',
                    icon: './assets/iconCall/iconVideoCall/cancel-audio-call.svg' 
                };
            case 'MISSED':
                return {
                    title: 'Bạn bị nhỡ',
                    text: 'Cuộc gọi thoại',
                    icon: './assets/iconCall/iconVideoCall/call-reject.svg' 
                };
            case 'CALLING':
            case 'END':
                return {
                    title: 'Cuộc gọi thoại đến',
                    text: `${formattedHours > 0 ? formattedHours + ' giờ' : ''}${formattedMinutes > 0 ? formattedMinutes + ' phút' : ''}${formattedSeconds + ' giây'}`,
                    icon: './assets/iconCall/iconVideoCall/call-you.svg' 
                };
            default: return '';

        }
    };
    const reCall = () => {
        console.log("heheh")
        let data = {}
        if (chatInfo.room.roomType !== "GROUP_CHAT") {
            data = {
                senderId: userCurrent?.email,
                receiverId: chatInfo?.user?.email,
                messageType: "AUDIO_CALL"
            }
        } else {
            data = {
                senderId: userCurrent?.email,
                receiverId: chatInfo?.user?.id,
                messageType: "AUDIO_CALL"
            }
        }
        dispatch(setDragableCallRequest(true));
        // call api
        const media = { video: true, audio: true };
        handleCallRequest(data, media);
    }

    const handleCallRequest = async (data, media) => {
        setLocalPeer();
        await setLocalStream(media);
        try {
            const response = await callRequest(data);
            dispatch(setMessageCall(response));

        } catch (error) {
            console.log(error);
        }
    }
    return (

        <BaseMessage
            message={props.message}
            isSender={userCurrent.email === props.message.senderId}
            lastMessage={props.lastMessage ? true : false}
            showAvatar={props.showAvatar}

        >
                 <div className='d-flex mess-hover-call ' style={{ width: windowSize.width > 768 ? 180 : 160 }}  >
                <div className="d-flex  mess-text-call" style={{ backgroundColor: userCurrent.email === props.message.senderId ? '#e5efff' : 'white' }} >
                    <div className='text'>
                        <h5 >{handleCallStatus().title}</h5>
                        <div className='call' >
                            <img src={`${handleCallStatus().icon}`} style={{ width: 25, height: 25, marginRight: 10 }} ></img>
                            <span>{handleCallStatus().text}</span>
                        </div>

                    </div>
                    <div className='btn-call'><button onClick={() => reCall()} style={{ backgroundColor: userCurrent.email === props.message.senderId ? '#e5efff' : 'white' }} >GỌI LẠI</button></div>

                </div>

            </div>
        </BaseMessage>

    );
}


export default MessageVideoCall;
