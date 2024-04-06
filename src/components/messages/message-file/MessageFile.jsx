import { useSelector } from "react-redux";
import BaseMessage from "../BaseMessage";
import "./MessageFile.scss";
import { useState } from "react";


function MessageFile(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);
 

    return (
        <BaseMessage isSender={userCurrent.email === props.message.senderId}
            lastMessage={props.lastMessage ? true : false}>
            <div className="mess-file" style={{ position: "relative" }}>
                <div className="mess-ct">
                    <img src="https://i.pinimg.com/736x/74/b1/10/74b110781d66cd3b501bc85c469f93be.jpg" alt="" />
                    <div className="mess-text">
                        <div><h6>aspanspanlication</h6></div>
                        <div> <span>885B</span></div>
                    </div>
                    <div className="btn-down">
                        <button ><i className="bi bi-box-arrow-in-down"></i></button>
                    </div>
                </div>
             

                <span>20:20</span>
                <button className="btn-icon-custom">👍</button>
            </div>
        </BaseMessage>
    );
}

export default MessageFile;