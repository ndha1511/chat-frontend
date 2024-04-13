import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./BaseMessage.scss";
import ButtonGroup from "../buttons/button-group/ButtonGroup";
import { btnCT } from "../../configs/button-group-icon-config";
import { Button, Dropdown, Form, ListGroup, Modal } from "react-bootstrap";
import { deleteMessage, revokeMessage } from "../../services/MessageService";
import { pushMessage } from "../../redux/reducers/messageReducer";

function BaseMessage(props) {
    const [hiddenBtn, setHiddenBtn] = useState(false);
    const user = useSelector((state) => state.userInfo.user);
    const dispatch = useDispatch();
    // const buttons = btnCT;
    const [statusMessage, setStatusMessage] = useState("");

    const checkStatusMessage = () => {
        const status = props.message.messageStatus;
        switch (status) {
            case "SENDING": return "Đang gửi";
            case "SENT": return "Đã gửi";
            case "SEEN": return "Đã xem";
            case "ERROR": return "Lỗi";
            default: return "";
        }
    }

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href="/"
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="avatar-dropdown" // Thêm class cho avatar dropdown
        >
            {children}
        </a>
    ));
    const handleDeleteMessage = async () => {
        try {
            
            const messageId = props.message.id;
            const senderId = user.email
            const receiverId = props.message.receiverId
            const reques ={
                messageId,
                senderId,
                receiverId
            }
            console.log(senderId)
            await revokeMessage(reques);
            dispatch(pushMessage(false));
            console.log("Tin nhắn đã được thu hồi thành công");
        } catch (error) {
            console.error("Xảy ra lỗi khi thu hồi tin nhắn", error);
          
        }
    }
    
    const btnCT = [
        { item: <i className="bi bi-quote" style={{ transform: 'scaleX(-1) scaleY(-1)', }}></i>, },
        { item: <i className="bi bi-reply-fill" style={{ transform: 'scaleX(-1) ', }}></i>, },

        {
            item: <Dropdown>
                <Dropdown.Toggle as={CustomToggle} >
                    <i className="bi bi-three-dots"> </i>
                </Dropdown.Toggle>

                <Dropdown.Menu className="d-flex-right custom-dropdown-menu-cs">

                    <Dropdown.Item><i className="bi bi-clipboard-check pe-3 "></i>Coppy tin nhắn</Dropdown.Item>
                    <Dropdown.Item ><i className="bi bi-pin-angle pe-3" ></i>Ghim tin nhắn</Dropdown.Item>
                    <Dropdown.Item ><i className="bi bi-star pe-3"></i>Đánh dấu tin nhắn</Dropdown.Item>
                    <Dropdown.Item ><i className="bi bi-download pe-3"></i>Lưu về máy</Dropdown.Item>
                    <Dropdown.Divider  />
                    {
                        user.email === props.message.senderId && props.message.messageStatus !== "ERROR" && (
                            <Dropdown.Item style={{color:'red'}} onClick={handleDeleteMessage} >
                                <i className="bi bi-arrow-counterclockwise pe-3"></i>Thu hồi tin nhắn
                            </Dropdown.Item>
                        )
                    }
                    <Dropdown.Item style={{color:'red'}}  ><i className="bi bi-trash pe-3"></i>Xóa ở phía tôi</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        }

    ]


    return (
        <div onMouseEnter={() => setHiddenBtn(true)}
            onMouseLeave={() => setHiddenBtn(false)}
            className="d-flex w-100 " style={{ flexDirection: props.isSender ? "row" : "row-reverse", alignItems: "flex-end", justifyContent: "flex-end", position: 'relative' }}>
         {hiddenBtn && props.message.messageStatus !== "REVOKED" && props.message.messageStatus !== "ERROR"&& (
            <div className="hidden" style={{ display: "block", marginBottom: "20px", position: 'relative' }}>
                <div style={{ backgroundColor: '#f0f0f0', borderRadius: 5, border: '0.5px solid gainsboro' }}>
                    <ButtonGroup buttons={btnCT}
                        className="btn-hover"
                        width={25}
                        height={25}
                        hoverColor="#f0f0f0"
                        textHoverColor="blue"
                        fontSize={18}
                        borderRadius={5}
                    />
                </div>
            </div>
        )}

            {props.children}
            {
                props.lastMessage ?
                    <div className="m-2" style={{ position: "absolute", bottom: -60, padding: 10 }}>
                        <p>{checkStatusMessage()}</p>
                    </div> : <></>
            }



        </div>
    );
}

export default BaseMessage;