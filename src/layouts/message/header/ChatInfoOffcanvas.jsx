import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Avatar from '../../../components/avatar/Avatar';
import CreateGroupModal from '../../header/CreateGroupModal';

const ChatInfoOffcanvas = ({ show, handleClose, user,handleShowManager  }) => {
    const [showMember, setShowMember] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [showFile, setShowFile] = useState(false);
    const [showSecurity, setShowSecurity] = useState(false);
    const [showManager, setShowManager] = useState(false)

    const handleShowManagerModal = ()=>{
        setShowManager(true)
      
    }

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

  

    return (
        <Offcanvas show={show} onHide={handleClose} style={{ width: '350px' }} placement="end" backdrop="static">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Thông tin hội thoại</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <div className="Offcanva-tong">
                        <div className="Offcanva-top">
                            <Avatar />
                            <div className="Offcanva-name">
                                <h5>Hoàng Anh</h5>
                                <Button><i className="bi bi-pencil-square"></i></Button>
                            </div>
                            <div className="Offcanva-btn-top">
                                <div className="item">
                                    <Button><i className="bi bi-bell"></i></Button>
                                    <span>Tắt thông <br /> báo</span>
                                </div>
                                <div className="item">
                                    <Button> <i className="bi bi-pin-angle"></i></Button>
                                    <span>Ghim hội <br /> thoại</span>
                                </div>
                                <div className="item">
                                    <Button onClick={handleShowManagerModal}> <i className="bi bi-person-add"></i></Button>
                                    <span>Tạo nhóm <br /> trò chuyện</span>
                                </div>
                                <CreateGroupModal show={showManager} handleClose={() => setShowManager(false)} />
                                <div className="item">
                                    <Button onClick={handleShowManager} ><i className="bi bi-gear"></i></Button>
                                    <span>Quản lí <br /> Công cộng</span>
                                </div>
                            </div>
                        </div>
                        <div className="Offcanva-center1">
                            <Button className="Offcanva-img-mp4-file-link" onClick={() => setShowMember(!showMember)} >
                                <h6>Thành viên</h6>
                                <Button ><i className={`bi bi-caret-down-fill ${showMember ? 'rotate' : ''}`}></i></Button>
                            </Button>
                            {showMember && (
                                <Button className="Offcanva-center">
                                    <div className="Offcanva-btn-center">
                                        <Button><i className="bi bi-people"></i></Button>
                                        <span>17 nhóm chung</span>
                                    </div>
                                </Button>
                            )}

                            <Button className="Offcanva-img-mp4-file-link" onClick={() => setShowContent(!showContent)} >
                                <h6>Ảnh/Video</h6>
                                <Button ><i className={`bi bi-caret-down-fill ${showContent ? 'rotate' : ''}`}></i></Button>
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
                                <Button >
                                    <i className={`bi bi-caret-down-fill ${showFile ? "rotate" : ""}`}></i>
                                </Button>
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
                                <Button ><i className={`bi bi-caret-down-fill ${showSecurity ? 'rotate' : ''}`}></i></Button>
                            </Button>

                            {showSecurity && (
                                <div className="Offcanva-footer-cs">
                                    <Button className="Offcanva-btn-footer-cs">
                                        <i className="bi bi-trash3"></i>
                                        <span>Xóa lịch sử trò chuyện</span>
                                    </Button>
                                    <Button className="Offcanva-btn-footer-cs">
                                        <i className="bi bi-arrow-right-square"></i>
                                        <span>Rời nhóm</span>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default ChatInfoOffcanvas;
