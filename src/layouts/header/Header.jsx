import { useEffect, useState } from "react";
import ButtonGroup from "../../components/buttons/button-group/ButtonGroup";
import Search from "../../components/search/Search";
import { useDispatch, useSelector } from 'react-redux';
import { friendIcon } from "../../configs/button_group_icon_config";
import {  Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Button, Modal } from "react-bootstrap";
import "./Header.scss";
import { getUserByEmail } from "../../services/UserService";
import AccountInfor from "../../components/modal/AccountInfor";
import HelloMessage from "../../components/modal/HelloMessage";
import { getListFriend } from "../../services/FriendService";
import { setFriendAccepted } from "../../redux/reducers/friendReducer";
import CreateGroupModal from "./CreateGroupModal";





function Header() {
    const [showModalAddFriend, setShowModalAddFriend] = useState(false);
    const [showModalAddGroup, setShowModalAddGroup] = useState(false);
    const [showAccountInforModal, setShowAccountInforModal] = useState(false)
    const [showHelloMessageModal, setShowHelloMessageModal] = useState(false)
    const [userSearch, setUserSearch] = useState({});
    const [invalid, setInvalid] = useState('');
    const [isValid, setIsValid] = useState(true);
    const buttons = friendIcon;
    const user = useSelector((state) => state.userInfo.user);
    const friends = useSelector((state) => state.friend.friendsAccepted);
    const dispatch = useDispatch()
    const handleCloseAddFriend = () => setShowModalAddFriend(false);
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
     
        if (!email.trim()) {
            setIsValid(false);
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
 

    useEffect(() => {
        const getListFriendRequet = async () => {
            try {
                const response = await getListFriend(user.email);
                dispatch(setFriendAccepted(response));
            } catch (error) {
                console.error("", error);
     
            }
        };

        getListFriendRequet(); // Call the function to fetch friend requests

    }, [dispatch]);


  
    const renderTooltip = props => (
        <Tooltip id="button-tooltip" {...props}>
            Vui lòng nhập 
        </Tooltip>
    );
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
                        <OverlayTrigger
                            placement="bottom"
                            overlay={renderTooltip}
                            show={!isValid}
                        >
                            <Form.Control type="email" id='searchFriend'
                             value={invalid}
                             onChange={(e) => {
                                 setInvalid(e.target.value);
                                 setIsValid(true);
                                
                             }}
                            placeholder='Email' isInvalid={!isValid} />
                        </OverlayTrigger>
                        </label>
                        {/* {invalid && <span className="text-danger">{invalid}</span>} */}
                
                        {/* {userSearch && <div>{userSearch.name}</div>} */}
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
            {/* <AddFriendModal
                show={showModalAddFriend}
                onClose={() => setShowModalAddFriend(false)}
                onShowAccountInfo={handleShowAccountInfor}
                user={user.email}
                onShowHelloMessage={handleShowHelloMessageModal}
            /> */}
            <AccountInfor show={showAccountInforModal} onClose={handleCloseAccountInfor} handleBack={handleShowModalAddFriend} user={userSearch} addFriend={handleShowHelloMessageModal} />
            <HelloMessage show={showHelloMessageModal} onClose={handleCloseShowHelloMessageModal} handleBack={handleShowAccountInfor} user={userSearch} />
            {/* Modal create group */}
            <CreateGroupModal
                show={showModalAddGroup}
                handleClose={() => setShowModalAddGroup(false)}
            />
        </div>
    );
}

export default Header;