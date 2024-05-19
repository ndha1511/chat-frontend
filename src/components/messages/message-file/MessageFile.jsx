import { useSelector } from "react-redux";
import BaseMessage from "../BaseMessage";
import "./MessageFile.scss";
import React, { useEffect, useState } from "react";
import { arrayToDateTime } from "../../../utils/DateTimeHandle";
import { downFile } from "../../../services/FileService";
import { Dropdown } from 'react-bootstrap';
import { emojis } from "../../../configs/button_group_icon_config";
import { formatFileSize } from "../../../utils/FormatFileSize";



function MessageFile(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);
    const fileInfo = props.message.content;
    const originalName = fileInfo.filename + '.' + fileInfo.fileExtension;
    const [showContent, setShowContent] = useState(false);
    const [selectedEmojis, setSelectedEmojis] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const [emojiCount, setEmojiCount] = useState(0);
    const [progress, setProgress] = useState({
        bytesUpload: 0,
        percentUpload: ""
    });
    const bytesUpload = useSelector(state => state.message.bytesUpload);

    useEffect(() => {
        if (bytesUpload.length > 0) {
            const item = bytesUpload.findIndex(val => val.id === props.message.id);
            if (item !== -1) {
                const bytesTransferred = bytesUpload[item].bytesTransferred;
                const percentUpload = (bytesTransferred / props.message.content.size) * 100;

                setProgress({
                    bytesUpload: bytesTransferred,
                    percentUpload: percentUpload + '%',
                });
            }
        }
    }, [bytesUpload]);

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

    const downloadFile = async () => {

        try {
            console.log("click here");
            const response = await downFile(fileInfo.fileKey);
            const blob = new Blob([response], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileInfo.fileKey);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log(error);
        }
    }
    const handleClearEmojis = () => {
        setSelectedEmojis([]);
        setEmojiCount(0);
        setShowContent(false); // Tự động đóng menu sau khi xóa
    };

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
    return (
        <BaseMessage message={props.message} isSender={userCurrent.email === props.message.senderId}
            showAvatar={props.showAvatar}
            lastMessage={props.lastMessage ? true : false}>
            {props.message.messageStatus === "SENDING" ?
                <div className="mess-file" style={{ backgroundColor: "#fff" }} >
                    <div className="mess-ct">
                        <i className={`bi bi-filetype-${fileInfo.fileExtension}`} style={{ fontSize: 30 }}></i>
                        <div className="mess-text">
                            <div><h6>{originalName}</h6></div>
                            <div className="d-flex flex-column">
                                <div>
                                    <span>{formatFileSize(progress.bytesUpload)} / </span>
                                    <span>{formatFileSize(fileInfo.size)}</span>
                                </div>
                                <div className="progress-custom">
                                    <div className="progress-bar" style={{ width: progress.percentUpload }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span>{`${arrayToDateTime(props.message.sendDate).getHours()}:${arrayToDateTime(props.message.sendDate).getMinutes()}`}</span>
                </div>
                :
                <div className="mess-file " onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={downloadFile}>
                    <div className="mess-ct">
                        <i className={`bi bi-filetype-${fileInfo.fileExtension}`} style={{ fontSize: 30 }}></i>
                        <div className="mess-text">
                            <div><h6>{originalName}</h6></div>
                            <div> <span>{formatFileSize(fileInfo.size)}</span></div>
                        </div>
                        <div className="btn-down">
                            <button ><i className="bi bi-box-arrow-in-down"></i></button>
                        </div>
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
                                        <div className='btn-icon-custom-file'>
                                            <img style={{ width: 14, height: 14, }} src='./assets/icons/like.png' />
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

                    <span>{`${arrayToDateTime(props.message.sendDate).getHours()}:${arrayToDateTime(props.message.sendDate).getMinutes()}`}</span>


                </div>
            }
        </BaseMessage>
    );

    console.log(isHovered)
}

export default MessageFile;