import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Form, ListGroup, Modal } from "react-bootstrap";
import Avatar from "../../components/avatar/Avatar";
import ButtonGroup from "../../components/buttons/button-group/ButtonGroup";
import ButtonIcon from "../../components/buttons/button-icon/ButtonIcon";
import { navbarIcon } from "../../configs/button-group-icon-config";
import "./Navbar.scss";

import React, { useEffect, useState } from "react";
import ProfileModal from "../../components/modal/ProfileModal";
import ChangePasswordModal from "../../components/modal/ChangePasswordModal";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "../../redux/reducers/userReducer";
import UpdateInfoModal from "../../components/modal/UpdateInfoModal";

function Navbar() {
    const buttons = navbarIcon;
    const navigate = useNavigate();
    const user = useSelector((state) => state.userInfo.user);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleCloseProfileModal = () => setShowProfileModal(false);
    const dispatch = useDispatch();
    const handleShowChangePasswordModal = () => {
        // setShowUpdateModal(false);
        setShowChangePasswordModal(true);
        handleCloseProfileModal(); // Đóng modal thông tin cá nhân khi mở modal thay đổi mật khẩu
    };

    const changeUpdateModal = () => {
        setShowUpdateModal(true);
        handleCloseProfileModal();
    }
    const handleShowProfileModal = () => setShowProfileModal(true);
    // Hàm để đóng modal thay đổi mật khẩu
    const handleCloseChangePasswordModal = () => {
        setShowChangePasswordModal(false);
    };
    const handleShowChangeProfileModal =()=>{
        handleCloseChangePasswordModal();
        setShowProfileModal(true);
        setShowUpdateModal(false);
    }

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
    }

    const logout = () => {
        localStorage.clear();
        dispatch(setUserInfo(null));
        navigate('/auth/login');

    }
    useEffect(() => {
        if (!user) navigate("/auth/login");
    })

    return (
        <nav className="bg-info navbar-vertical">
            <div className="d-flex flex-column justify-content-between h-100">
                <div>
                    <div className="d-flex justify-content-center align-items-center m-2  mb-4 mt-4">
                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle}>
                                <Avatar user={user} title={user && user.name ? user.name : ""} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="dropdown-menu-right custom-dropdown-menu">
                                <h6>{user && user.name ? user.name : ""}</h6>
                                <Dropdown.Item href="#/settings">Nâng cấp tài khoản</Dropdown.Item>
                                <Dropdown.Item onClick={handleShowProfileModal}>Hồ sơ của bạn</Dropdown.Item>
                                <Dropdown.Item href="#/settings">Cài đặt</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={logout}>Đăng xuất</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    {/* Modal để hiển thị hồ sơ */}               
                        <ProfileModal show={showProfileModal} onClose={handleCloseProfileModal} onOpenChangePassword={handleShowChangePasswordModal} onOpenUpdateModal={changeUpdateModal} />
                        <ChangePasswordModal show={showChangePasswordModal} onClose={handleCloseChangePasswordModal} handleBack={handleShowChangeProfileModal} />
                        <UpdateInfoModal show={showUpdateModal} onClose={closeUpdateModal} handleBack={handleShowChangeProfileModal}/>
                    <div>
                        <ButtonGroup buttons={buttons} vertical
                            className="btn-hover"
                            width={68}
                            height={65}
                            backgroundActive="#6495ed"
                            hoverColor="#87cefa"
                            active={0}
                            textHoverColor="blue"
                        />
                    </div>
                </div>

                <div className="footer">
                    <ButtonIcon
                        className="btn-hover"
                        width={68}
                        height={65}
                        title="Cài đặt"
                        hoverColor="#87cefa"

                    >
                        <i className="bi bi-gear" style={{ fontSize: "25px" }}></i>
                    </ButtonIcon>
                </div>
            </div>
        </nav>
    );
}

// Tùy chỉnh Dropdown.Toggle để sử dụng component Avatar
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


export default Navbar;
