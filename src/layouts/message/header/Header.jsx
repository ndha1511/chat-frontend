import { useState } from "react";
import Avatar from "../../../components/avatar/Avatar";
import ButtonGroup from "../../../components/buttons/button-group/ButtonGroup";
import ButtonIcon from "../../../components/buttons/button-icon/ButtonIcon";
// import { chatIcon } from "../../../configs/button-group-icon-config";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./Header.scss"

function Header(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showFile, setShowFile] = useState(false);
    const [showSecurity, setShowSecurity] = useState(false);
    const [showMember, setShowMember] = useState(false);
    const [showManager, setShowManager] = useState(false)



    const [showContent, setShowContent] = useState(false);

    const handleToggleContent = () => {
        setShowContent(!showContent);
    };
    const handleShowManger = () => {
        setShowManager(true)
        setShow(false)
    }

    const chatIcon = [
        {
            item: <i className="bi bi-search"></i>,
            title: "Tìm kiếm tin nhắn"
        },
        {
            item: <i className="bi bi-telephone"></i>,
            title: "Cuộc gọi thoại"
        },
        {
            item: <i className="bi bi-camera-video"></i>,
            title: "Gọi video"
        },
        {

            item: <>
                <Button variant="primary" onClick={handleShow} >
                    <i className="bi bi-square-half"></i>
                </Button>

            </>,

            title: "Thông tin hội thoại"
        }
    ]
    const buttons = chatIcon;
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
        <div className="d-flex w-100 p-3" style={{
            height: "100%",
            justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f0f0"
        }}>
            <div className="d-flex" style={{ alignItems: "center" }}>
                <Avatar user={props.user} />
                <div className="d-flex" style={{
                    marginLeft: 10,
                    alignItems: "center",
                }}>
                    <span style={{ fontWeight: "bold" }}>{props.user.name}</span>
                    <ButtonIcon
                        title="Chỉnh sửa"
                        className="btn-hover"
                        hoverColor="#f0f0f0"
                        borderRadius={50}
                    ><i className="bi bi-pencil-square"></i></ButtonIcon>
                </div>
            </div>
            <div className="action">
                <ButtonGroup buttons={buttons} className="btn-hover" width={40} height={40} hoverColor="#f0f0f0" />
            </div>
            {/* Hiển thị Offcanvas */}
            <Offcanvas show={show} onHide={handleClose} style={{ width: '350px', margin: 0 }} placement="end" backdrop="static">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{ textAlign: 'center' }}>Thông tin hội thoại</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body >
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
                                    <Button> <i className="bi bi-person-add"></i></Button>
                                    <span>Tạo nhóm <br /> trò chuyện</span>
                                </div>
                                <div className="item">
                                    <Button onClick={handleShowManger} ><i className="bi bi-gear"></i></Button>
                                    <span>Quản lí <br /> Công cộng</span>
                                </div>
                            </div>
                        </div>
                        {/* <div className="Offcanva-center">
                            <div className="Offcanva-btn-center">
                                <Button><i className="bi bi-clock"></i></Button>
                                <span>Danh sách nhắc hẹn</span>
                            </div>
                            <div className="Offcanva-btn-center">
                                <Button><i className="bi bi-people"></i></Button>
                                <span>17 nhóm chung</span>
                            </div>
                        </div> */}
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



            <Offcanvas show={showManager} onHide={() => setShowManager(false)} style={{ width: '350px', margin: 0 }} placement="end" backdrop="static">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{ textAlign: 'center' }}>Quản lý nhóm</Offcanvas.Title>
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
                            <input type="checkbox" />
                        </div>
                        <div className="ql-content1">
                            <h6>Chế độ phê duyệt thành viên mới <i className="bi bi-question-circle"></i></h6>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="memberApprovalSwitch" />
                            </div>
                        </div>
                        <div className="ql-content1">
                            <h6>Đánh dấu tin nhắn từ trưởng/phó nhóm<i className="bi bi-question-circle"></i></h6>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="memberApprovalSwitch" />
                            </div>
                        </div>
                        <div className="ql-content1">
                            <h6> Cho phép thành viên mới đọc tin nhắn gần nhất <i className="bi bi-question-circle"></i></h6>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="memberApprovalSwitch" />
                            </div>
                        </div>
                        <div className="ql-content1">
                            <h6> Cho phép dùng link tham gia nhóm <i className="bi bi-question-circle"></i></h6>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="memberApprovalSwitch" />
                            </div>
                        </div>
                        <div className="ql-content1">
                            <h6> zalo.me/g/lgzaaa <i className="bi bi-question-circle"></i></h6>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="memberApprovalSwitch" />
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
        </div>
    );
}

export default Header;