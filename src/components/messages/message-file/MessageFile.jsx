import { useSelector } from "react-redux";
import BaseMessage from "../BaseMessage";
import "./MessageFile.scss";
import { useState } from "react";
import { arrayToDateTime } from "../../../utils/DateTimeHandle";
import { downFile } from "../../../services/FileService";


function MessageFile(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);
    const fileInfo = props.message.content;
    const originalName = fileInfo.filename + '.' + fileInfo.fileExtension;

    const downloadFile = async () => {
        try {
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
 

    return (
        <BaseMessage message={props.message} isSender={userCurrent.email === props.message.senderId}
            lastMessage={props.lastMessage ? true : false}>
            <div className="mess-file" style={{ position: "relative" }} onClick={downloadFile}>
                <div className="mess-ct">
                    <img src="https://i.pinimg.com/736x/74/b1/10/74b110781d66cd3b501bc85c469f93be.jpg" alt="" />
                    <div className="mess-text">
                        <div><h6>{originalName}</h6></div>
                        <div> <span>885B</span></div>
                    </div>
                    <div className="btn-down">
                        <button ><i className="bi bi-box-arrow-in-down"></i></button>
                    </div>
                </div>
             

                <span>{`${arrayToDateTime(props.message.sendDate).getHours()}:${arrayToDateTime(props.message.sendDate).getMinutes()}`}</span>
                <button className="btn-icon-custom">👍</button>
            </div>
        </BaseMessage>
    );
}

export default MessageFile;