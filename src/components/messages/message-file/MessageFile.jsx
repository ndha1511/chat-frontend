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
    const [hoveredEmoji, setHoveredEmoji] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
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

    const hanldeHoverLike = () => {
        setShowContent(true);
        setShowMenu(true);
    }
    const handleDisplayLike = () => {
        if (emojiCount > 0) {
            setIsHovered(true);
            setShowMenu(false)
        } else {
            setIsHovered(false);
            setShowMenu(false)
        }

    }
    const handleSelectEmoji = (emoji) => {
        setEmojiCount(prevCount => prevCount + 1);
        setSelectedEmojis(prevEmojis => {
            if (!prevEmojis.includes(emoji)) {
                return [...prevEmojis, emoji];
            }
            return prevEmojis;
        });
        setShowContent(false); // Tự động đóng menu sau khi chọn emoji
        setShowMenu(false)
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




    return (
        <BaseMessage message={props.message} isSender={userCurrent.email === props.message.senderId}
            showAvatar={props.showAvatar}
            lastMessage={props.lastMessage ? true : false}>
            {props.message.messageStatus === "SENDING" ?
                <div className="mess-file-s" style={{ backgroundColor: "#fff" }} >
                    <div className="mess-ct-file">
                        <i className={`bi bi-filetype-${fileInfo.fileExtension}`} style={{ fontSize: 30 }}></i>
                        <div className="mess-text-file">
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
                <div className="mess-file-s" onMouseEnter={() => setIsHovered(true)} onMouseLeave={handleDisplayLike}>
                    <div className="mess-ct-file">
                        <i className={`bi bi-filetype-${fileInfo.fileExtension}`} style={{ fontSize: 30 }}></i>
                        <div className="mess-text-file">
                            <div><h6>{originalName}</h6></div>
                            <div> <span>{formatFileSize(fileInfo.size)}</span></div>
                        </div>
                        <div className="btn-down">
                            <button ><i className="bi bi-box-arrow-in-down"></i></button>
                        </div>
                        {selectedEmojis.length > 0 && (
                            <div className='btn-icon-custom-file-s'>
                                {selectedEmojis.slice(0, 3).map(emoji => (
                                    <span style={{ fontSize: 19 }} key={emoji}>{emoji}</span>
                                ))}
                                {emojiCount > 0 && <span style={{ fontSize: 13 }}> {emojiCount}</span>}
                            </div>
                        )}
                    </div>
                    {isHovered && (
                        <div onMouseEnter={hanldeHoverLike} onMouseLeave={() => setShowContent(false)}>

                            <Dropdown show={showContent} className='drop-message_text'   >
                                <Dropdown.Toggle as={CustomToggle}>
                                    <div className='btn-icon-custom-file'>
                                        {selectedEmojis.length > 0 ? selectedEmojis[selectedEmojis.length - 1] : <img style={{ width: 14, height: 14, }} src='./assets/icons/like.png' />}
                                    </div>
                                </Dropdown.Toggle>
                                {showMenu && (
                                    <Dropdown.Menu className='dropd-menu-file'>
                                        <div className="btn-emoji">
                                            {emojis.map((emoji, index) => (
                                                <div
                                                    className={`emoji-wrapper ${hoveredEmoji === emoji.icon ? 'hovered' : ''}`}
                                                    key={index}
                                                    onMouseEnter={() => setHoveredEmoji(emoji.icon)}
                                                    onMouseLeave={() => setHoveredEmoji(null)}
                                                >
                                                    <Dropdown.Item
                                                        className="emoji-item"
                                                        onClick={() => handleSelectEmoji(emoji.icon)}
                                                    >
                                                        {emoji.icon}
                                                    </Dropdown.Item>
                                                </div>
                                            ))}
                                            {selectedEmojis.length > 0 && (
                                                <Dropdown.Item className='emoji-item' onClick={handleClearEmojis}>
                                                    <i className="bi bi-x-lg"></i>
                                                </Dropdown.Item>
                                            )}
                                        </div>
                                    </Dropdown.Menu>
                                )}
                            </Dropdown>

                        </div>
                    )}
                    <span>{`${arrayToDateTime(props.message.sendDate).getHours()}:${arrayToDateTime(props.message.sendDate).getMinutes()}`}</span>
                </div>
            }
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

export default MessageFile;
