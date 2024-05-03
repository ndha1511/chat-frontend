import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Tooltip, OverlayTrigger } from 'react-bootstrap'; // Import Form from react-bootstrap
import { reRender } from '../../redux/reducers/renderReducer';
import Avatar from '../../components/avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { addGroup, addMember } from '../../services/GroupService';
import { createMember, reRenderMember } from '../../redux/reducers/renderOffcanvas';

// Your other code...

function CreateGroupModal({ show, handleClose,groupName, selectedMembers }) {
    const [friendName, setFriendName] = useState('');
    const [friendId, setFriendId] = useState([]);
    const[updateMemberId,setUpdateMemberId] = useState([]);
    const[updateState,setUpdateState] = useState(false);

    const memberList = useSelector(state => state.members.members);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const[title,setTitle] = useState('Tạo nhóm');
    const [isValid, setIsValid] = useState(true); // State to manage input validity
    const friends = useSelector((state) => state.friend.friendsAccepted);
    const chatInfo = useSelector(state => state.message.chatInfo);
    const user = useSelector((state) => state.userInfo.user);
    const dispatch = useDispatch();
    
    const handleAddGroup = async () => {
        if (!friendName.trim()) {
            setIsValid(false);
            return;
        }

        const groupData = {
            groupName: friendName,
            ownerId: user.email,
            ownerName: user.name,
            membersId: friendId,
        };
        try {
            const formData = createGroupFormData(groupData);
            const res = await addGroup(formData);
            setFriendId([]);
            dispatch(reRender());
            handleClose(); // Close modal on successful group creation
            setFriendName('');
        } catch (error) {
            console.error("Error creating group:", error);
        }
    };

    const handleAddMemberToGroup = async () => {
        if(updateMemberId.length > 0) {
            const request = {
                adderId: user.email,
                membersId: updateMemberId,
                groupId: chatInfo.roomId
            }
            try {
                await addMember(request);
                dispatch(reRenderMember())
                setUpdateMemberId([]);
                handleClose();
            } catch (error) {
                console.error("Error creating group:", error);
            }

        }
        
        
    }

    function createGroupFormData(groupData) {
        const formData = new FormData();
        formData.append('groupName', groupData.groupName);
        formData.append('ownerId', groupData.ownerId);
        formData.append('ownerName', groupData.ownerName);
        groupData.membersId.forEach((memberId, index) => {
            formData.append(`membersId[${index}]`, memberId);
        });
        return formData;
    }

    useEffect(() => {
        console.log(friendId);
        // Bạn có thể thực hiện bất kỳ hành động gì bạn muốn với friendId ở đây
    }, [friendId]);
    const handleChange = (event) => {
        const memberId = event.target.value;
        if (event.target.checked) {
            setFriendId([...friendId, memberId]);
        } else {
            setFriendId(friendId.filter(id => id !== memberId));
        }
    };
    useEffect(() => {
        console.log(updateMemberId);
        // Bạn có thể thực hiện bất kỳ hành động gì bạn muốn với friendId ở đây
    }, [updateMemberId]);
    const handleUpdate = (event) => {
        const memberId = event.target.value;
        if (event.target.checked) {
            setUpdateMemberId([...updateMemberId, memberId]);
        } else {
            setUpdateMemberId(updateMemberId.filter(id => id !== memberId));
        }
    };


    const renderTooltip = props => (
        <Tooltip id="button-tooltip" {...props}>
            Vui lòng nhập tên nhóm
        </Tooltip>
    );

    
    
    useEffect(() => {
        if (selectedMembers && selectedMembers.length > 0) {
            // Chuyển đổi danh sách selectedMembers thành mảng các email
            const selectedEmails = selectedMembers.map(member => member);
            setFriendId(selectedEmails);
            console.log(selectedEmails)
            setIsUpdateMode(true)
            setTitle('Thêm thành viên')
        }
    }, [selectedMembers,updateState]);
  
    useEffect(() => {
        if (groupName) {
            setFriendName(groupName);
        }
    }, [groupName]);
    return (
        <Modal show={show} onHide={handleClose} className="md-G" centered scrollable={true}>
            <Modal.Header className="md-h" closeButton>
                <Modal.Title style={{ fontWeight: 'bold', fontSize: 20 }}>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="md-bd" style={{ maxHeight: 500 }}>
                <div className="body-top">
                    <div className="name">
                        <i className="bi bi-camera"></i>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={renderTooltip}
                            show={!isValid}>
                            <Form.Control
                                className="ip-name"
                                value={friendName}
                                onChange={(e) => {
                                    setFriendName(e.target.value);
                                    setIsValid(true);
                                }}
                                type="text"
                                id="name"
                                placeholder="Nhập tên nhóm"
                                isInvalid={!isValid}
                            />
                        </OverlayTrigger>
                    </div>
                    <div className="search">
                        <i className="bi bi-search"></i>
                        <input type="text" placeholder="Nhập tên, Email" />
                    </div>
                </div>
                <div className="body-center">
                    <table className="table table-hover">
                        <tbody>
                            {friends.map((friend, index) => (
                                <tr key={index} className="tr-create-group">
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            onChange={(e) => {
                                                handleChange(e, friend.email)
                                                handleUpdate(e,friend.email)
                                            }}
                                            value={friend.email}
                                            checked={friendId.includes(friend.email)}
                                            disabled={chatInfo.user?.members?.includes(friend.email)?true:false}
                                            id={`checkbox-${index}`} // Thêm ID cho mỗi checkbox
                                        />
                                    </td>
                                    <td><Avatar user={friend}  /></td>
                                    <td>{friend.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Modal.Body>
            <Modal.Footer className="md-f">
                <Button variant="secondary" onClick={()=>{
                    handleClose()
                    setUpdateMemberId([])
                    setUpdateState(prev=> !prev)
                }} className="modal-button-custom">
                    Hủy
                </Button>
                {isUpdateMode ? ( // Hiển thị nút "Update" nếu đang trong chế độ "Update"
                    <Button variant="primary" onClick={handleAddMemberToGroup} className="modal-button-custom">
                        Update
                    </Button>
                ) : (
                    <Button variant="primary" onClick={handleAddGroup} className="modal-button-custom">
                        Tạo nhóm
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default CreateGroupModal;
