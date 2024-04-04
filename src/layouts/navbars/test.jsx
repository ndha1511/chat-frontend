import { useSelector } from "react-redux";
import Avatar from "../../components/avatar/Avatar";
import ButtonGroup from "../../components/buttons/button-group/ButtonGroup";
import ButtonIcon from "../../components/buttons/button-icon/ButtonIcon";
import { navbarIcon } from "../../configs/button-group-icon-config";
import "./Navbar.scss";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
function Navbar() {
    const buttons = navbarIcon;
    const user = useSelector((state) => state.userInfo.user);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    useEffect(() => {
        if (!user) navigate("/auth/login");
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                // Đóng menu nếu click bên ngoài
                setIsOpen(false);
            }
        }

        // Đăng ký sự kiện click ngoài menu
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Hủy đăng ký sự kiện khi component unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    })
    const clickButtonSetting = () => {
        setIsOpen(true);
    }
    return (
        <nav className="bg-info navbar-vertical">
            <div>
                <div className="d-flex justify-content-center align-items-center m-2 mb-4 mt-4">
                    <Avatar user={user} title={user && user.name ? user.name : ""} />
                </div>
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
                    clickButton={clickButtonSetting}
                >
                    <i className="bi bi-gear" style={{ fontSize: "25px" }}></i>
                </ButtonIcon>
            </div>
            {isOpen && (
                <div ref={menuRef} className="menu-setting">
                    <h1>Hehe</h1>
                </div>
            )}
        </nav>

    );
}

export default Navbar;