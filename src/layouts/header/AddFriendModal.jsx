import React, { useEffect, useState } from 'react';
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { getUserByEmail } from "../../services/UserService";
import { useDispatch } from 'react-redux';
import { setFriendAccepted } from "../../redux/reducers/friendReducer";
import { getListFriend } from '../../services/FriendService';

function AddFriendModal({ show, onClose,user,onShowAccountInfo }) {
    const [userSearch, setUserSearch] = useState({});
    const [invalid, setInvalid] = useState("");
    const dispatch = useDispatch();

    const searchUser = async () => {
        const email = document.getElementById('searchFriend').value;
        console.log(email)
        if (!email) {
            setInvalid("Vui lòng nhập email.");
            return;
        }
        try {
            const result = await getUserByEmail(email);
            setUserSearch(result);
            setInvalid("");
            onShowAccountInfo(result);
            onClose();
        } catch (error) {
            setInvalid("Không tìm thấy người dùng hoặc có lỗi xảy ra.");
        }
    };

    useEffect(() => {
        const getListFriendRequest = async () => {
            try {
                
                const response = await getListFriend(user);
                dispatch(setFriendAccepted(response));
            } catch (error) {
                alert("Error fetching friend requests.");
            }
        };

        getListFriendRequest();
    }, [dispatch, user.email]);

    return (
        <Modal show={show} onHide={onClose} scrollable={true} centered>
            <Modal.Header closeButton>
                <Modal.Title style={{ fontWeight: 'bold', fontSize: 20 }}>Thêm bạn</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-custom">
                <div>
                    <label htmlFor='searchFriend'>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip>{invalid}</Tooltip>}
                            show={!!invalid}
                        >
                            <input type="email" id='searchFriend' placeholder='Email' />
                        </OverlayTrigger>
                    </label>
                    {/* Kết quả tìm kiếm hoặc thông báo lỗi */}
                    {userSearch && <div>{userSearch.name}</div>}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={searchUser} >
                    Tìm kiếm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddFriendModal;
