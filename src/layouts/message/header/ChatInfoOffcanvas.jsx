import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Avatar from '../../../components/avatar/Avatar';
import { useSelector } from 'react-redux';

import MemberOffcanvas from './MemberOffcanvas';

import { leaveGroup, removeGroup } from '../../../services/GroupService';
import VerifyModal from '../../../components/dialogs/verify-dialog/VerifyModal';
import UpdateGroupModal from '../../header/UpdateGroupModal';
import { Icon } from 'zmp-ui';


const ChatInfoOffcanvas = ({ show, handleClose, handleShowManager }) => {
    const memberList = useSelector(state => state.members.members);
    const [showMember, setShowMember] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [showFile, setShowFile] = useState(false);
    const [showSecurity, setShowSecurity] = useState(false);
    const [showManager, setShowManager] = useState(false)
    const [showMemBerOcv, setShowMemBerOcv] = useState(false)
    const chatInfo = useSelector(state => state.message.chatInfo);
    const user = useSelector((state) => state.userInfo.user);
    // const [members, setMembers] = useState(memberList)
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const handleCloseRemoveModal = () => setShowRemoveModal(false);
    const handleShowRemoveMoadl = () => setShowRemoveModal(true);

    const handleCloseModal = () => setShowVerifyModal(false);
    const handleShow = () => setShowVerifyModal(true);

    const handleShowManagerModal = () => {
        setShowManager(true)

    }
    const handleCloseMemBerOcv = () => {
        setShowMemBerOcv(() => false);
        // console.log(showMemBerOcv)
    }

    const handleShowMemBerOcv = () => {
        setShowMemBerOcv(true)
    }
    const groupChat = chatInfo.user
    // console.log(groupChat);
    // console.log(groupChat.members)
    // Prepare images, files, and any other state or handlers that are solely related to this offcanvas
    const images = [
        'https://bizweb.dktcdn.net/100/438/408/files/meme-meo-cute-yody-vn-1.jpg?v=1690276113335',
        'https://bizweb.dktcdn.net/100/438/408/files/meme-meo-cute-yody-vn-1.jpg?v=1690276113335',
        'https://bizweb.dktcdn.net/100/438/408/files/meme-meo-cute-yody-vn-1.jpg?v=1690276113335',
        'https://bizweb.dktcdn.net/100/438/408/files/meme-meo-cute-yody-vn-1.jpg?v=1690276113335',
        'https://bizweb.dktcdn.net/100/438/408/files/meme-meo-cute-yody-vn-1.jpg?v=1690276113335',
        'https://bizweb.dktcdn.net/100/438/408/files/meme-meo-cute-yody-vn-1.jpg?v=1690276113335',
        'https://bizweb.dktcdn.net/100/438/408/files/meme-meo-cute-yody-vn-1.jpg?v=1690276113335',
        'https://bizweb.dktcdn.net/100/438/408/files/meme-meo-cute-yody-vn-1.jpg?v=1690276113335',
        'https://bizweb.dktcdn.net/100/438/408/files/meme-meo-cute-yody-vn-1.jpg?v=1690276113335',
        'https://bizweb.dktcdn.net/100/438/408/files/meme-meo-cute-yody-vn-1.jpg?v=1690276113335',
    ];
    const files = [
        { name: "document1.docx", size: "885B", date: "04/11/2024" },
        { name: "summary.pdf", size: "1.2MB", date: "05/11/2024" },
        { name: "presentation.pptx", size: "2.5MB", date: "06/11/2024" },
        { name: "budget.xlsx", size: "932KB", date: "07/11/2024" },
    ];

    const handleLeaveGroup = () => {
        handleShow();

    }

    // useEffect(()=>{setMembers(memberList)},[memberList])
    const leaveAction = async () => {
        const request = {
            memberId: user.email,
            groupId: chatInfo.roomId
        }
        try {
            await leaveGroup(request);
            handleClose();
        } catch (error) {
            console.log(error);
        }
    }
    const handleRemoveGroup = () => {
        handleShowRemoveMoadl();
    }

    // giải tán nhóm
    const removeAction = async () => {
        const request = {
            ownerId: user.email,
            groupId: chatInfo.roomId
        }
        try {
            await removeGroup(request);
            handleClose();
        } catch (error) {
            console.log(error);
        }

    }
    console.log(showMember);

    return (
        <Offcanvas  show={show} onHide={handleClose} style={{ width: '350px' }} placement="end" backdrop={true} >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Thông tin hội thoại</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="Offcanva-tong">
                    <div className="Offcanva-top">
                        <Avatar user={groupChat} />
                        <div className="Offcanva-name">
                            <h5>{groupChat.name}</h5>
                            <Button><Icon size={18} icon="zi-edit-text" /></Button>
                        </div>
                        <div className="Offcanva-btn-top">
                            <div className="item">
                                <Button><i className="bi bi-bell"></i></Button>
                                <span>Tắt thông <br /> báo</span>
                            </div>
                            <div className="item">
                                <Button>  <Icon size={23} icon="zi-pin" /></Button>
                                <span>Ghim hội <br /> thoại</span>
                            </div>
                            <div className="item">
                                <Button onClick={handleShowManagerModal}> <Icon size={23} icon="zi-add-member" /></Button>
                                <span>Thêm <br /> thành viên</span>
                            </div>
                            <UpdateGroupModal show={showManager} handleClose={() => setShowManager(false)}
                                groupName={groupChat.name}
                            // selectedMembers={groupChat.members}
                            />
                            {
                                user.email === chatInfo.user.owner ? <div className="item">
                                    <Button onClick={handleShowManager} ><i className="bi bi-gear"></i></Button>
                                    <span>Quản lí <br /> nhóm</span>
                                </div> : <></>
                            }

                        </div>
                    </div>
                    <div className="Offcanva-center1">
                        <Button className="Offcanva-img-mp4-file-link" onClick={() => setShowMember(!showMember)} >
                            <h6>Thành viên</h6>
                            <i  className={`bi bi-caret-right-fill ${showMember ? 'rotate' : ''}`}></i>
                        </Button>
                        
                        {showMember && (
                            <Button onClick={handleShowMemBerOcv} className="Offcanva-center">
                                <div className="Offcanva-btn-center">
                                    <Icon style={{color:'black'}} size={28} icon="zi-members" />
                                    <span>{memberList.length} thành viên</span>

                                </div>
                            </Button>

                        )}
                        
                        <MemberOffcanvas show={showMemBerOcv} handleClose={handleCloseMemBerOcv} />
                        <Button className="Offcanva-img-mp4-file-link" onClick={() => setShowContent(!showContent)} >
                            <h6>Ảnh/Video</h6>
                            <i  className={`bi bi-caret-right-fill ${showContent ? 'rotate' : ''}`}></i>
                        </Button>
                        {showContent && (
                            <div className="Offcanva-center1-content">
                                <div className="Offcanva-center1-content-img">
                                    {images.slice(0, 8).map((image, index) => (
                                        <img key={index} src={image} alt={`Ảnh ${index + 1}`} />
                                    ))}
                                </div>
                                <div className="Offcanva-center1-content-btn">
                                    <Button >Xem tất cả</Button>
                                </div>
                            </div>
                        )}
                            
                        <Button className="Offcanva-img-mp4-file-link" onClick={() => setShowFile(!showFile)}  >
                            <h6>File</h6>

                            <i  className={`bi bi-caret-right-fill ${showFile ? "rotate" : ""}`}></i>

                        </Button>
                        {showFile && (
                            <div className="file">
                                {files.slice(0, 3).map((file, index) => (
                                    <div className="Offcanva-center1-content-file" key={index}>
                                        <i className="bi bi-filetype-pdf"></i>
                                        <div className="mess-text">
                                            <div><h6>{file.name}</h6></div>
                                            <div><span>{file.size}</span></div>
                                        </div>
                                        <span>{file.date}</span>
                                    </div>
                                ))}
                                <div className="Offcanva-center1-content-btn">
                                    <Button >Xem tất cả</Button>
                                </div>

                            </div>

                        )}
                            
                        <Button className="Offcanva-img-mp4-file-link" onClick={() => setShowSecurity(!showSecurity)} >
                            <h6>Thiết lập bảo mật</h6>
                            <i  className={`bi bi-caret-right-fill ${showSecurity ? 'rotate' : ''}`}></i>
                        </Button>

                        {showSecurity && (
                            <div className="Offcanva-footer-cs">
                                <Button className="Offcanva-btn-footer-cs">
                                    <i className="bi bi-trash3"></i>
                                    <span>Xóa lịch sử trò chuyện</span>
                                </Button>
                                {groupChat.owner === user.email ?
                                    <Button className="Offcanva-btn-footer-cs" onClick={handleRemoveGroup}>
                                        <i className="bi bi-arrow-right-square"></i>
                                        <span>Giải tán nhóm</span>
                                    </Button>
                                    :
                                    <Button className="Offcanva-btn-footer-cs" onClick={handleLeaveGroup}>
                                        <i className="bi bi-arrow-right-square"></i>
                                        <span>Rời nhóm</span>
                                    </Button>
                                }
                                <VerifyModal content="Bạn có chắc chắn muốn rời nhóm" show={showVerifyModal}
                                    handleClose={handleCloseModal}
                                    action={leaveAction}
                                />
                                <VerifyModal content="Bạn có chắc chắn giải tán nhóm" show={showRemoveModal}
                                    handleClose={handleCloseRemoveModal}
                                    action={removeAction}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </Offcanvas.Body>

        </Offcanvas>
        
    );
};

export default ChatInfoOffcanvas;
