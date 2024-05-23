import Draggable from "react-draggable";
import Avatar from "../avatar/Avatar";

import { closeCall } from "../../services/MessageService";
import { useEffect, useState } from "react";
import { closeStream, localStream } from "../../configs/WebRTCConfig";
import { setDragableAudioCall } from "../../redux/reducers/dragableReducer";
import { useDispatch, useSelector } from "react-redux";
import { getColorForName } from "../../utils/ExtractUsername";
import { Icon } from "zmp-ui";

function AudioCallingView(props) {

    const [mute, setMute] = useState(false);
    const dispatch = useDispatch();
    const messageCall = useSelector((state) => state.message.messageCall);
    const windowSize = useSelector(state => state.render.windowSize);
    const chatInfo = useSelector(state => state.message.chatInfo);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        const dialogWidth = 300; // Chiều rộng cố định của hộp thoại
        const windowWidth = windowSize.width;
        setPosition({
            x: (windowWidth - dialogWidth) / 2, // Căn giữa hộp thoại theo chiều ngang của cửa sổ
            y: windowSize.height / 2 - 100 // Giữ nguyên vị trí của chiều cao
        });
    }, [windowSize]);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCounter(pre =>pre +1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [])

    
    // Tính số giờ, phút và giây từ biến đếm
    const hours = Math.floor(counter / 3600);
    const minutes = Math.floor((counter % 3600) / 60);
    const seconds = counter % 60;

    // Format giờ, phút và giây để luôn hiển thị hai chữ số
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    
    function adjustColor(color, amount) {
        return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
    }
    const baseColor = chatInfo.user ? getColorForName(chatInfo.user?.name) : '#FFFFFF'; // Màu trắng là màu mặc định
    const lighterColor = adjustColor(baseColor, 40); // Làm sáng màu lên một chút
    const darkerColor = adjustColor(baseColor, -40); // Làm tối màu đi một chút
    function hexToRgb(hex) {
        hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
    }

    const stopCall = async () => {
        closeStream();
        await closeCall(messageCall.id);
        dispatch(setDragableAudioCall(false));
    }

    const toggleMute = () => {
        setMute(prevMute => !prevMute);
        if (localStream) {
            localStream.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled; // Toggle the enabled state of the audio track
            });
        }
    }
    return (

        <Draggable defaultPosition={position}
        >
            <div style={{
                position: "fixed",
                zIndex: 999,
                cursor: "col-resize"
            }}>
                <div className="draggable-window">
                    <div className="header-audio-call">
                        <div>
                            <img src="/assets/icons/iconCall.png" style={{ width: 28, height: 28, marginRight: 10, marginTop: -7 }} alt="" />
                            <span>Zalo Call - {props.callerInfo.name}</span>
                        </div>
                        <div onClick={() => dispatch(setDragableAudioCall(false))}>
                            <Icon icon="zi-close" />
                        </div>
                    </div>
                    <div className="content-audio-call" style={{
                        height: "100%",
                        backgroundImage: chatInfo.user?.avatar ?
                            `linear-gradient(-45deg,rgba(199, 194, 194, 0.6), rgba(226, 218, 218, 0.7),rgba(169, 149, 149, 0.6)), url(${chatInfo.user.avatar}), linear-gradient(90deg, rgba(${hexToRgb(lighterColor)}, 1) 0%, rgba(${hexToRgb(baseColor)}, 1) 50%, rgba(${hexToRgb(darkerColor)}, 1) 100%)` :
                            `linear-gradient(90deg, rgba(${hexToRgb(lighterColor)}, 0.6) 0%, rgba(${hexToRgb(baseColor)}, 0.6) 50%, rgba(${hexToRgb(darkerColor)}, 0.6) 100%)`,
                        backgroundSize: 'cover', // Set the size for each background
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}>
                        {/* time call */}
                        <div className="time-call">
                            <span>{formattedHours>0 ?formattedHours:''}{formattedMinutes}:{formattedSeconds}</span>
                        </div>
                        <Avatar user={props.callerInfo}  width={80} height={80} />
                        <h6>{props.callerInfo.name}</h6>
                    </div>
                    <div className="footer-audio-call">
                        <div className="group-btn-audio-call">
                            <button className="btn-audio-call-footer">
                                <Icon style={{ color: '#4f4f4f' }} icon='zi-video-solid' />
                                <Icon style={{ color: '#4f4f4f' }} icon='zi-chevron-up' />
                            </button>
                            <button onClick={stopCall}
                                className="btn-audio-call1 btn-reject">
                                <i className="bi bi-telephone-fill"></i>
                            </button>
                            <button className="btn-audio-call-footer">
                                <div onClick={toggleMute}>
                                    {!mute ? <i style={{ color: 'white', fontSize: 18 }} className="bi bi-mic"></i> : <i style={{ color: 'white', fontSize: 18 }} className="bi bi-mic-mute"></i>}
                                </div>
                                <Icon style={{ color: 'white' }} icon='zi-chevron-up' />
                            </button>

                        </div>
                        <div >
                            <button className="btn-setting" >
                                <Icon style={{ color: 'white' }} icon='zi-setting' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    );
}
export default AudioCallingView;