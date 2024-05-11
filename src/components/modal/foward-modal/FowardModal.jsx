
import { useSelector } from "react-redux";
import { Modal, Button, Form,  } from 'react-bootstrap';
import React, {  useState } from "react";
import "./FowardModal.scss"
import Avatar from "../../avatar/Avatar";
import { fowardMessage } from "../../../services/MessageService";
import Swal from "sweetalert2";
function FowardModal(props) {
  const friends = useSelector((state) => state.friend.friendsAccepted);
  const user = useSelector((state) => state.userInfo.user);
  const groups = useSelector((state) => state.group.groups);
  const [receivers, setReceivers] = useState([]);
  const groupList = [
    "Bạn bè",
    "Nhóm"
  ]

  const handleChange = (event) => {
    const receiverId = event.target.value;
    if (event.target.checked) {
      setReceivers([...receivers, receiverId]);
    } else {
      setReceivers(receivers.filter(id => id !== receiverId));
    }
  };

  const handleShare = async () => {
    const request = {
      messageId: props.message.id,
      senderId: user.email,
      receiversId: receivers
    }
    try {
      await fowardMessage(request);
    Swal.fire({
      html: `Chia sẻ tin nhắn thành công.`,
      timer: 1500, // Đặt thời gian tự đóng là 1500 mili giây
      timerProgressBar: true,
      showConfirmButton: false,
      customClass: {
          htmlContainer: 'my-custom-html',
      }
  });
    props.handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal className="md-G" show={props.show} onHide={props.handleClose} centered>
      <Modal.Header className="md-h" closeButton>
        <Modal.Title style={{ fontWeight: 'bold', fontSize: 20 }}>Chia sẻ</Modal.Title>
      </Modal.Header>
      <Modal.Body className="md-bd" style={{ maxHeight: 500 }}>
        <div className="body-top">
          <div className="search">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Nhập tên, Email" />
          </div>
        </div>
        <div className="body-center">
          {groupList.map((item, index) => {
            return (
              <table key={index} className="table table-hover">
                <thead>
                  <tr><th><span style={{ width: '100px' }}>{item}</span></th></tr>
                </thead>
                
                <tbody>
                  {item === "Bạn bè" ? friends.map((friend, index) => {
                    return (
                      <tr key={index} className="tr-create-group">
                        <td>
                          <Form.Check
                            type="checkbox"
                            onChange={(e) => {
                              handleChange(e, friend.email)
            
                            }}
                            value={friend.email}
                
                          />
                        </td>
                        <td><Avatar user={friend} /></td>
                        <td>{friend.name}</td>
                      </tr>
                    )
                  }) : groups.map((group, index) => {
                    return (
                      <tr key={index} className="tr-create-group">
                        <td>
                        <Form.Check
                            type="checkbox"
                            onChange={(e) => {
                              handleChange(e, group.id)
            
                            }}
                            value={group.id}
                          />
                        </td>
                        <td><Avatar user={
                          {avatar: group.avatar, name: group.groupName}
                        }/></td>
                        <td>{group.groupName}</td>
                        
                      </tr>
                    )

                  })}
                </tbody>
              </table>
            )
          })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleShare}>
          Chia sẻ
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FowardModal;