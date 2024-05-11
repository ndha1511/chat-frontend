import React, { useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import "./BoxChat.scss";
import { displayDateTime } from "../../utils/DateTimeHandle";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail } from "../../services/UserService";
import { setChatInfo, setMessages } from "../../redux/reducers/messageReducer";
import { seenMessage } from "../../services/ChatService";
import { updateRoom } from "../../redux/reducers/renderRoom";
import { getGroupById } from "../../services/GroupService";
import { Dropdown } from "react-bootstrap";
import { Icon } from "zmp-ui";
import { reRenderMember } from "../../redux/reducers/renderOffcanvas";

function BoxChat(props) {
    const [hiddenButton, setHiddenButton] = useState(true);
    const [date, setDate] = useState(displayDateTime(props.room.time));
    const dispatch = useDispatch();
    const chatInfor = useSelector(state => state.message.chatInfo);
    const renderChatInfor = useSelector(state => state.message.renderChatInfor);

    const user = {
        name: props.room.name,
        id: props.room.senderId,
        avatar: props.room.avatar
    }

    const mouseEnter = () => {
        setHiddenButton(false);
    }
    const mouseLeave = () => {
        setHiddenButton(true);
    }

    const pushChatMessage = async () => {
        dispatch(setMessages([]));
        try {
            // console.log(props.room.receiverId)
            if (props.room.roomType === "GROUP_CHAT") {
                const response = await getGroupById(props.room.receiverId);
                const userData = {
                    name: response.groupName,
                    email: response.id,
                    ...response
                }
                const chatInfo = {
                    user: userData,
                    roomId: props.room.roomId,
                    room: props.room
                };

                dispatch(setChatInfo(chatInfo));
                const request = {
                    roomId: props.room.roomId,
                    senderId: props.room.senderId,
                    receiverId: props.room.receiverId
                }

                const newRoom = {
                    ...props.room,
                    numberOfUnreadMessage: 0,
                    id: props.room.objectId
                }
                dispatch(updateRoom(newRoom));
                seenMessage(request);


            } else {
                const response = await getUserByEmail(props.room.receiverId);
                // console.log(response);
                const chatInfo = {
                    user: { ...response },
                    roomId: props.room.roomId,
                    room: props.room
                };
                dispatch(setChatInfo(chatInfo));
                const request = {
                    roomId: props.room.roomId,
                    senderId: props.room.senderId,
                    receiverId: props.room.receiverId
                }
                const newRoom = {
                    ...props.room,
                    numberOfUnreadMessage: 0,
                    id: props.room.objectId
                }
                dispatch(updateRoom(newRoom));
                seenMessage(request);

            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const updateChatInfo = async () => {
            if (Object.keys(chatInfor).length > 0) {
                if (props.room.roomId === chatInfor.roomId) {
                    if (props.room.roomType === "GROUP_CHAT") {
                        const response = await getGroupById(props.room.receiverId);
                        const userData = {
                            name: response.groupName,
                            email: response.id,
                            ...response
                        }
                        const chatInfo = {
                            user: userData,
                            roomId: props.room.roomId,
                            room: props.room
                        };

                        dispatch(setChatInfo(chatInfo));
                    } else {
                        const response = await getUserByEmail(props.room.receiverId);
                        console.log(response);
                        const chatInfo = {
                            user: { ...response },
                            roomId: props.room.roomId,
                            room: props.room
                        };
                        dispatch(setChatInfo(chatInfo));
                    }

                }
            }
        }
        updateChatInfo();
    }, [renderChatInfor])



    const onpenMoreMenu = (event) => {
        event.stopPropagation(); // Ngăn chặn sự kiện click truyền ra khỏi button ở bên trong
        console.log('Inner button clicked');
    }
    useEffect(() => {
        setDate(displayDateTime(props.room.time));
        const intervalId = setInterval(() => {
            setDate(displayDateTime(props.room.time));
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [props.room.time])
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <span

            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="" // Thêm class cho avatar dropdown
        >
            {children}
        </span>
    ));
    return (

        <div className="row d-flex w-100 wrapper-boxchat" onClick={pushChatMessage} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <div className="col-2">
                <Avatar user={user} />
            </div>
            <div className="col-6" style={{ marginLeft: 10 }}>
                <div className="row" style={{ height: 30 }}>
                    <span className="start truncate-text" style={{
                        fontSize: "18px",
                        fontWeight: props.room.numberOfUnreadMessage > 0 ? "bold" : "normal"
                    }}>
                        {props.room.name}
                    </span>
                </div>
                <div className="row fixed-msg" style={{ width: "70%" }}>
                    <span className="start truncate-text"
                        style={{
                            color: props.room.numberOfUnreadMessage > 0 ? "black" : "gray",
                            fontSize: "14px"
                        }}
                    >{
                            props.room.roomType === "SINGLE_CHAT" ?
                                props.room.sender ? `Bạn: ${props.room.latestMessage}` : `${props.room.latestMessage}` :
                                props.room.sender ? `Bạn: ${props.room.latestMessage}` : `${props.room.latestMessage}`
                        }</span>
                </div>
            </div>
            <div className="col-4 d-flex justify-content-end" style={{ flexDirection: "column" }}>
                <div className="row">
                    {hiddenButton ? <span className="end fixed" style={{ height: 30, fontSize: "14px", color: "gray", marginLeft: 10 }}>
                        {date}
                    </span> :
                        <div className="btn-more" data-bs-toggle="tooltip" title="Thêm" style={{
                            width: 40,
                            height: 30,
                        }} onClick={onpenMoreMenu}>
                            <Dropdown>
                                <Dropdown.Toggle as={CustomToggle} >
                                    <Icon style={{ marginTop: -5, color: '' }} icon="zi-more-horiz-solid" size={20} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="d-flex-right custom-dropdown-menu-box-chat">

                                    <Dropdown.Item>Ghim hội thoại</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item>Đánh dấu chưa đọc</Dropdown.Item>
                                    <Dropdown.Item>Phân loại</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item >Thêm vào nhóm</Dropdown.Item>
                                    <Dropdown.Item >Tắt thông báo</Dropdown.Item>
                                    <Dropdown.Item >Ẩn trò chuyện </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item style={{ color: 'red' }}  >Xóa hội thoại</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>


                            </div>}
                </div>
                {
                    props.room.numberOfUnreadMessage > 0 ?
                        <div className="d-flex row fixed-number-msg" style={{ justifyContent: "flex-end" }}>
                            <span className="" style={{
                                fontSize: "12px",
                                width: 20,
                                height: 20,
                                textAlign: "center",
                                alignContent: "center",
                                paddingLeft: 5,
                                paddingRight: 5,
                                borderRadius: "15px",
                                backgroundColor: "red",
                                color: "white",
                            }}>{props.room.numberOfUnreadMessage > 5 ? "5+" : props.room.numberOfUnreadMessage}</span>
                        </div> : <></>
                }
            </div>
        </div>

    );
}


export default BoxChat;