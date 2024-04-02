import { useState } from "react";
import ButtonGroup from "../../components/buttons/button-group/ButtonGroup";
import Search from "../../components/search/Search";
import { friendIcon } from "../../configs/button-group-icon-config";
import { Button, Modal } from "react-bootstrap";
import "./Header.scss";


function Header() {
    const [showModalAddFriend, setShowModalAddFriend] = useState(false);
    const [userSearch, setUserSearch] = useState({});
    const [invalid, setInvalid] = useState("");
    const buttons = friendIcon;

    const handleClose = () => setShowModalAddFriend(false);

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
            <Modal show={showModalAddFriend} onHide={handleClose} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontWeight: 'bold', fontSize: 25 }}>Thêm bạn</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-custom">
                    <div>
                        <label htmlFor='searchFriend'>
                            <input type="email" id='searchFriend' placeholder='Email' />
                        </label>
                        <span className="text-danger">Invalid Email</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className="modal-button-custom">
                        Hủy
                    </Button>
                    <Button variant="primary" className="modal-button-custom" onClick={searchUser}>
                        Tìm kiếm
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal create group */}
        </div>
    );
}

export default Header;