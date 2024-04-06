import { useState } from "react";
import ButtonGroup from "../../components/buttons/button-group/ButtonGroup";
import Search from "../../components/search/Search";
import { useSelector } from 'react-redux';
import { friendIcon } from "../../configs/button-group-icon-config";
import { Button, Modal } from "react-bootstrap";
import "./Header.scss";
import Avatar from "../../components/avatar/Avatar";



function Header() {
    const [showModalAddFriend, setShowModalAddFriend] = useState(false);
    const [showModalAddGroup, setShowModalAddGroup] = useState(false);
    const [userSearch, setUserSearch] = useState({});
    const [invalid, setInvalid] = useState("");
    const buttons = friendIcon;
    const user = useSelector((state) => state.userInfo.user);

    const handleCloseAddFriend = () => setShowModalAddFriend(false);
    const handleCloseAddGroup = () => setShowModalAddGroup(false);

    const searchUser = async () => {
        try {

        } catch (error) {

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
            default: break;
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
                        <span className="text-danger">Invalid Email</span>
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

            {/* Modal create group */}
            <Modal show={showModalAddGroup} onHide={handleCloseAddGroup} className="md-G" scrollable={true} centered>
                <Modal.Header className="md-h" closeButton>
                    <Modal.Title style={{ fontWeight: 'bold', fontSize: 20 }}>Tạo nhóm</Modal.Title>

                </Modal.Header>
                <Modal.Body className="md-bd">
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