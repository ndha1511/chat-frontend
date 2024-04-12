import { useState } from "react";
import ButtonGroup from "../../components/buttons/button-group/ButtonGroup";
import Search from "../../components/search/Search";
import { useSelector } from 'react-redux';
import { friendIcon } from "../../configs/button-group-icon-config";
import { Button, Modal } from "react-bootstrap";
import "./Header.scss";
import Avatar from "../../components/avatar/Avatar";
import { getUserByEmail } from "../../services/UserService";
import AccountInfor from "../../components/modal/AccountInfor";
import { sendFriendRequest } from "../../services/ChatService";
import HelloMessage from "../../components/modal/HelloMessage";
import ProfileModal from "../../components/modal/ProfileModal";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";



function Header() {
    const [showModalAddFriend, setShowModalAddFriend] = useState(false);
    const [showModalAddGroup, setShowModalAddGroup] = useState(false);
    const [showAccountInforModal, setShowAccountInforModal] = useState(false)
    const [showHelloMessageModal, setShowHelloMessageModal] = useState(false)
    const [userSearch, setUserSearch] = useState({});
    const [invalid, setInvalid] = useState("");
    const buttons = friendIcon;
    const user = useSelector((state) => state.userInfo.user);

    const handleCloseAddFriend = () => setShowModalAddFriend(false);
    const handleCloseAddGroup = () => setShowModalAddGroup(false);
    const handleCloseAccountInfor = () => setShowAccountInforModal(false)
 
    const handleCloseShowHelloMessageModal = () => setShowHelloMessageModal(false)
    const handleShowModalAddFriend = () => {
        handleCloseAccountInfor();
        setShowModalAddFriend(true)
    }
    const handleShowHelloMessageModal = () => {
        handleCloseAccountInfor()
        setShowHelloMessageModal(true)
      
    }
    const handleShowAccountInfor = () => {
        handleCloseShowHelloMessageModal()
        setShowAccountInforModal(true)
      
    }

    const searchUser = async () => {
        const email = document.getElementById('searchFriend').value;
        if (!email) {
            setInvalid("Vui lòng nhập email.");
            return;
        }
        try {
            const result = await getUserByEmail(email);
            setUserSearch(result);
            setInvalid(""); // Nếu tìm thấy người dùng, xóa thông báo lỗi
            setShowAccountInforModal(true)
            setShowModalAddFriend(false)
        } catch (error) {
            console.error("Error searching user:", error);
            setInvalid("Không tìm thấy người dùng hoặc có lỗi xảy ra.");
        }
    }

    const showModal = (index) => {
        switch (index) {
            case 0:
                setShowModalAddFriend(true);
                break;
            case 1:
                setShowModalAddGroup(true);
                break;
            case 1:
                setShowAccountInforModal(true);
                break;
            case 2:
                setShowHelloMessageModal(true);
                break;
            default: break;
        }
    }
    const addFriend = async () => {
        const email = user.email

        console.log(email)
        try {
            const response = await sendFriendRequest(email);
            alert(response.data);
        } catch (error) {
            console.error("Error sending friend request:", error);
            alert("Không thể gửi yêu cầu kết bạn.");
        }
    }
    return (
        <div className="d-flex w-100">
            <Search placeholder="Tìm kiếm" />
            <ButtonGroup buttons={buttons}
                className="btn-hover"
                hoverColor="#f0f0f0"
                width={40}
                height={40}
                showModal={showModal}
            />

            {/* Modal add friend */}
            <Modal show={showModalAddFriend} onHide={handleCloseAddFriend} scrollable={true} centered>
                <Modal.Header className="md-h" closeButton>
                    <Modal.Title style={{ fontWeight: 'bold', fontSize: 20 }}>Thêm bạn</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-custom">
                    <div>
                        <label htmlFor='searchFriend'>
                            <input type="email" id='searchFriend' placeholder='Email' />
                        </label>
                        {invalid && <span className="text-danger">{invalid}</span>}
                        {/* Kết quả tìm kiếm hoặc thông báo lỗi */}
                        {userSearch && <div>{userSearch.name}</div>}
                    </div>
                </Modal.Body>
                <Modal.Footer className="md-f">
                    <Button variant="secondary" onClick={handleCloseAddFriend} className="modal-button-custom">
                        Hủy
                    </Button>
                    <Button variant="primary" className="modal-button-custom" onClick={searchUser}>
                        Tìm kiếm
                    </Button>
                </Modal.Footer>
            </Modal>
            <AccountInfor show={showAccountInforModal} onClose={handleCloseAccountInfor} handleBack={handleShowModalAddFriend} user={userSearch} addFriend={handleShowHelloMessageModal} />
            <HelloMessage show={showHelloMessageModal} onClose={handleCloseShowHelloMessageModal} handleBack={handleShowAccountInfor} user={userSearch} />
            {/* Modal create group */}
            <Modal show={showModalAddGroup} onHide={handleCloseAddGroup}  className="md-G" centered scrollable={true}>
                <Modal.Header className="md-h" closeButton>
                    <Modal.Title style={{ fontWeight: 'bold', fontSize: 20 }}>Tạo nhóm</Modal.Title>

                </Modal.Header>
                <Modal.Body className="md-bd" style={{ maxHeight: 500}} >
                    <div className="body-top" >
                        <div className="name">
                            <i class="bi bi-camera"></i>
                            <input className="ip-name" type="text" id="name" placeholder="Nhập tên nhóm" />
                        </div>
                        <div className="search">
                            <i className="bi bi-search"></i>
                            <input type="text" placeholder="Nhập tên, Email" />
                        </div>
                    </div>
                    <div className="body-center">
                        <table className="table table-hover">
                            <tr className="tr-create-group">
                                <td><input type="checkbox"/></td>
                                <td><Avatar/></td>
                                <td>hehe</td>
                            </tr>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer className="md-f">
                    <Button variant="secondary" onClick={handleCloseAddGroup} className="modal-button-custom">
                        Hủy
                    </Button>
                    <Button variant="primary" className="modal-button-custom" onClick={() => setShowModalAddGroup(true)}>
                        Tạo nhóm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Header;