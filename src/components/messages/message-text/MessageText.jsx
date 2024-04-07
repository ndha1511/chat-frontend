// MessageText.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BaseMessage from '../BaseMessage';
import './MessageText.scss';
import { emojis } from '../../../configs/button-group-icon-config';
import ButtonGroup from '../../buttons/button-group/ButtonGroup';
import { arrayToDateTime } from '../../../utils/DateTimeHandle';

function MessageText(props) {
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
            showHidden={isHovered}
        >
            <div className='d-flex mess-hover' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
                <div className="d-flex  mess-text" style={{ position: "relative" }}>
                    <div className='text'> <p>{props.message.content}</p></div>
                    <span>{`${arrayToDateTime(props.message.sendDate).getHours()}:${arrayToDateTime(props.message.sendDate).getMinutes()}`}</span>
                    {isHovered && (
                        <div className="like-button" onMouseEnter={() => setShowContent(true)}
                            onMouseLeave={() => setShowContent(false)}>
                            <button className="btn-icon-custom">👍</button>
                        </div>

                    )}

                    {/* {showContent && (
                        <div className='btn-emoji'>
                            <ButtonGroup buttons={buttons}
                                className="btn-hover"
                                width={50}
                                height={45}
                                backgroundActive="#6495ed"
                                hoverColor="#87cefa"
                                active={0}
                                textHoverColor="blue"
                                fontSize={18}
                                backgroundColor="grey"
                                borderRadius={20}

                            />
                        </div>
                    )}   */}
                </div>

            </div>
        </BaseMessage>

    );
}

export default MessageText;
