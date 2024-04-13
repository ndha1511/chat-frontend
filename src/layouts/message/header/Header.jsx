import { useState } from "react";
import Avatar from "../../../components/avatar/Avatar";
import ButtonGroup from "../../../components/buttons/button-group/ButtonGroup";
import ButtonIcon from "../../../components/buttons/button-icon/ButtonIcon";
import Button from 'react-bootstrap/Button';
import "./Header.scss"
import ChatInfoOffcanvas from "./ChatInfoOffcanvas";
import GroupManagerOffcanvas from "./GroupManagerOffcanvas";

function Header(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showManager, setShowManager] = useState(false);
    const handleShowManager = () => {
        setShowManager(true);
        handleClose()
    };
    const handleCloseManager = () => {
        setShowManager(false);
    };
 
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

            item: <><i className="bi bi-square-half" onClick={handleShow}></i></>,

            title: "Thông tin hội thoại"
        }
    ]
    const buttons = chatIcon;

    return (
        <div className="d-flex w-100 p-3 pb-5 pt-4" style={{
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
            {/* Hiển thị Offcanvas 1 */}
            
            <ChatInfoOffcanvas
                show={show}
                handleClose={handleClose}
                user={props.user}
                handleShowManager={handleShowManager}
            />
             {/* Hiển thị Offcanvas 2 */}
              {/* Using the new GroupManagerOffcanvas */}
            <GroupManagerOffcanvas
                show={showManager}
                handleClose={handleCloseManager}
            />
        </div>
    );
}

export default Header;