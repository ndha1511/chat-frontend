import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Form } from "react-bootstrap";
import Avatar from "../../components/avatar/Avatar";
import ButtonGroup from "../../components/buttons/button-group/ButtonGroup";
import ButtonIcon from "../../components/buttons/button-icon/ButtonIcon";
import { navbarIcon } from "../../configs/button_group_icon_config";
import "./Navbar.scss";

import React, { useEffect, useState } from "react";
import ProfileModal from "../../components/modal/ProfileModal";
import ChangePasswordModal from "../../components/modal/ChangePasswordModal";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "../../redux/reducers/userReducer";
import UpdateInfoModal from "../../components/modal/UpdateInfoModal";
import { setShowSearchMessage, setViewIndedx } from "../../redux/reducers/renderLayoutReducer";
import { reRenderMessageLayout } from "../../redux/reducers/renderReducer";
import { disconnect } from "../../configs/SocketConfig";
import SimpleBar from "simplebar-react";
import { Icon } from "zmp-ui";
import { getUserByEmail, unblockUser, updateUser } from "../../services/UserService";
import { setChatInfo } from "../../redux/reducers/messageReducer";


function Navbar() {
    const buttons = navbarIcon;
    const navigate = useNavigate();
    const user = useSelector((state) => state.userInfo.user);
    const friends = useSelector((state) => state.friend.friends); 
    const rooms = useSelector((state) => state.room.rooms);
    const viewIndex = useSelector((state) => state.renderView.viewIndex);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [isBlocked, setIsBlocked] = useState(user?.notReceiveMessageToStranger ? user.notReceiveMessageToStranger : false); // Quản lý trạng thái của công tắc
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleCloseProfileModal = () => setShowProfileModal(false);
    const [showBlockedMenu, setShowBlockedMenu] = useState(false);
    const [announce, setAnnounce] = useState(0);
    const [icon, setIcon] = useState(false);
    const dispatch = useDispatch();
    const blockUsers = useSelector((state) => state.userInfo.blockUsers);

    const handleShowChangePasswordModal = () => {
        setShowChangePasswordModal(true);
        handleCloseProfileModal();
    };

    const handleBlockedMenuClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setShowBlockedMenu(!showBlockedMenu);
        setIcon(!icon)
    };
    const handleToggleChange = async (event) => {
        event.stopPropagation();
        let dob = user.dob;
        if(dob === "null" || dob === "") {
            dob = null;
        }
        const newUser = await updateUser({
            ...user,
            dob,
            notReceiveMessageToStranger: !isBlocked
        });
        dispatch(setUserInfo(newUser));
        localStorage.setItem("user", JSON.stringify(newUser));
        setIsBlocked(!isBlocked);
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
    const handleShowChangeProfileModal = () => {
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
        disconnect();
        dispatch(setChatInfo({}));
        navigate('/auth/login');

    }

    const clickButton = (index) => {
        switch (index) {
            case 0:
                dispatch(setViewIndedx(0));
                dispatch(setShowSearchMessage(false));
                break;
            case 1:
                dispatch(setViewIndedx(1));
                dispatch(reRenderMessageLayout());
                dispatch(setShowSearchMessage(false));
                break;
            default:
                alert("Tính năng sẽ sớm ra mắt");
                break;

        }
    }
    useEffect(() => {
        if (!user) navigate("/auth/login");
    })


    useEffect(()=>{
        setAnnounce(0);
        const tong = () =>{
            var sum = 0;
            rooms.forEach((room) => {
                if (room.numberOfUnreadMessage > 0) {
                     sum += room.numberOfUnreadMessage;
                }
            });
            if(sum > 5) {
                setAnnounce(5);
            } else {
                setAnnounce(sum);
            }
            
            
        }
        tong() 
    },[rooms])

    const unblock = async (item) => {
        try {
            const data = {
                senderId: user.email,
                blockId: item.email
            }
            const response = await unblockUser(data);
            const userUpdate = await getUserByEmail(user.email);
            localStorage.setItem("user", JSON.stringify(userUpdate));
            dispatch(setUserInfo(userUpdate));
            alert(response);
        } catch (error) {
            console.log(error);
        }
    }

   


    return (
        <nav className="bg-info navbar-vertical" >
            <div className="d-flex flex-column justify-content-between navbar-backgroup-color h-100">
                <div>
                    <div className="d-flex justify-content-center align-items-center m-2  mb-4 mt-4 ">
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
                    {/* Modal  */}
                    {showProfileModal && <ProfileModal show={showProfileModal} onClose={handleCloseProfileModal} onOpenChangePassword={handleShowChangePasswordModal} onOpenUpdateModal={changeUpdateModal} />}
                    {showChangePasswordModal && <ChangePasswordModal show={showChangePasswordModal} onClose={handleCloseChangePasswordModal} handleBack={handleShowChangeProfileModal} />}
                    {showUpdateModal && <UpdateInfoModal show={showUpdateModal} onClose={closeUpdateModal} handleBack={handleShowChangeProfileModal} />}
                    <div  style={{ position:'relative'}}>
                       <div className="announce-message" > <span >{announce !== 0 ? announce:''}{announce>=5?(<span style={{fontWeight:500}}>+</span>):''}</span></div>
                       <div className="announce-contact" > <span >{friends.length !== 0 ? friends.length :''}{friends.length>=5?(<span style={{fontWeight:500}}>+</span>):''}</span></div>
                        <ButtonGroup buttons={buttons} vertical
                            handle={clickButton}
                            className="btn-hover"
                            width={68}
                            height={65}
                            backgroundActive="#006EDC"
                            hoverColor="#0082E5"
                            active={viewIndex}
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
                        hoverColor="#0082E5"

                    >
                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle1} >
                                <i className="bi bi-gear" style={{ fontSize: "27px", color: 'white' }}></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>

                                <Dropdown.Item onClick={(e) => handleBlockedMenuClick(e)}>Danh sách chặn <Icon style={{ marginLeft: 85, transform: icon ? 'rotate(90deg)' : '' }} icon='zi-chevron-right' size={25} /></Dropdown.Item>
                                {showBlockedMenu && (
                                    <SimpleBar style={{ height: 100, marginBottom: 10 }}>
                                        <span style={{ fontSize: 11, fontWeight: 500, marginLeft: 12, }}>* Những người không thể nhắn tin cho bạn</span>
                                        {blockUsers.map((item) => (
                                            <div key={item.email} style={{
                                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                padding: "2px 5px 2px 12px", marginTop: 5, backgroundColor: "rgb(247, 247, 247)"
                                            }}>
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                    <Avatar user={item} width={20} height={20} />
                                                    <span style={{ marginLeft: 10, marginTop: -4, fontSize: 13 }}>{item.name}</span>
                                                </div>
                                                <button onClick={() => unblock(item)} className="btn-chan">Bỏ chặn</button>
                                            </div>
                                        ))}

                                    </SimpleBar>

                                )}
                                <Dropdown.Item onClick={handleToggleChange}>
                                    <div className="d-flex">
                                        <span className="me-3">Chặn tin nhắn từ người lạ</span>
                                        <Form.Check
                                            type="switch"
                                            id="block-messages-switch"
                                            checked={isBlocked} // Liên kết với trạng thái
                                            onChange={handleToggleChange} // Cập nhật trạng thái khi thay đổi
                                            className="form-switch"
                                        />
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Item >Cài đặt</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item style={{ color: 'red' }}  >Đăng xuất</Dropdown.Item>
                                <Dropdown.Item  >Thoát</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
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
const CustomToggle1 = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href="/"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        className="setting-dropdown" // Thêm class cho avatar dropdown
    >
        {children}
    </a>
));


export default Navbar;
