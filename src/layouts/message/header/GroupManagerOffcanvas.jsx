import React, { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { updateSendMessagePermission } from '../../../services/GroupService';

function GroupManagerOffcanvas({ show, handleClose }) {
    const chatInfo = useSelector(state => state.message.chatInfo);
    const user = useSelector((state) => state.userInfo.user);
    const [isSendMsg, setIsSendMsg] = useState(false);

    useEffect(() => {
        if(chatInfo.user.sendMessagePermission === "PUBLIC")
            setIsSendMsg(true);
        else
            setIsSendMsg(false);
    });

    const handleChangeIsSendMsg = async () => {
        setIsSendMsg(!isSendMsg);
        
    }
    useEffect(() => {
        const updatePermission = async () => {
            const request = {
                ownerId: user.email,
                groupId: chatInfo.roomId,
                sendMessagePermission: "ONLY_ADMIN"
            };
    
            try {
                if (!isSendMsg) {
                    await updateSendMessagePermission(request);
                } else {
                    request.sendMessagePermission = "PUBLIC";
                    await updateSendMessagePermission(request);
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        updatePermission();
    }, [isSendMsg]);
    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" style={{ width: '350px' }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Quản lý nhóm</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body >
                    <div className="ql-body">
                        <h6>Cho phép các thành viên trong nhóm:</h6>
                        <div className="ql-content">
                            <span>Thay đổi tên & ảnh đại diện của nhóm</span>
                            <input type="checkbox" />
                        </div>
                        <div className="ql-content">
                            <span>Ghim tin nhắn, ghi chú, bình chọn lên đầu hội thoại</span>
                            <input type="checkbox" />
                        </div>
                        <div className="ql-content">
                            <span>Tạo mới ghi chú, nhắc hẹn</span>
                            <input type="checkbox" />
                        </div>
                        <div className="ql-content">
                            <span>Tạo mới bình chọn</span>
                            <input type="checkbox" />
                        </div>
                        <div className="ql-content">
                            <span>Gửi tin nhắn</span>
                            <input type="checkbox" checked={isSendMsg} onChange={handleChangeIsSendMsg}/>
                        </div>
                        <div className="ql-content1">
                            <h6>Chế độ phê duyệt thành viên mới <i className="bi bi-question-circle"></i></h6>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="memberApprovalSwitch" />
                            </div>
                        </div>
                        <div className="ql-content1">
                            <h6>Đánh dấu tin nhắn từ trưởng/phó nhóm<i className="bi bi-question-circle"></i></h6>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="memberApprovalSwitch" />
                            </div>
                        </div>
                        <div className="ql-content1">
                            <h6> Cho phép thành viên mới đọc tin nhắn gần nhất <i className="bi bi-question-circle"></i></h6>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="memberApprovalSwitch" />
                            </div>
                        </div>
                        <div className="ql-content1">
                            <h6> Cho phép dùng link tham gia nhóm <i className="bi bi-question-circle"></i></h6>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="memberApprovalSwitch" />
                            </div>
                        </div>
                        <div className="ql-content1">
                            <h6> zalo.me/g/lgzaaa <i className="bi bi-question-circle"></i></h6>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="memberApprovalSwitch" />
                            </div>
                        </div>
                        <div className="ql-btn">
                            <button >
                                <i className="bi bi-people"></i>
                                <span>Chăn khỏi nhóm</span>
                            </button>
                            <button>
                                <i className="bi bi-key"></i>
                                <span>Trưởng và phó phòng</span>
                            </button>
                        </div>
                    </div>
                </Offcanvas.Body>
        </Offcanvas>
    );
}

export default GroupManagerOffcanvas;
