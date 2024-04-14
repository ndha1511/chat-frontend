
import { useSelector } from "react-redux";
import { Modal, Button, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import "./FowardModal.scss"
import Avatar from "../../avatar/Avatar";
function FowardModal(props) {
  const friends = useSelector((state) => state.friend.friendsAccepted);
  const groupList = [
    "Bạn bè",
    "Nhóm"
  ]
  return (
    <Modal className="md-G" show={props.show} onHide={props.handleClose} centered>
      {/* <Modal.Header closeButton>
          <Modal.Title>Chia sẻ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {groupList.map((item, index) => {
                return <table key={index}>
                    <tbody>
                        <caption>{item}</caption>
                        {item === "Bạn bè" ? friends.map((friend, index) =>{
                            return (
                                <tr key={index}>
                                   <td>{friend.name}</td>
                                </tr>
                            )
                        }):<></>}
                    </tbody>
                </table>
            })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Chia sẻ
          </Button>
        </Modal.Footer> */}
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
                <tbody>
                  <caption style={{ width: '100px' }}>{item}</caption>
                  {item === "Bạn bè" ? friends.map((friend, index) => {
                    return (
                      <tr key={index} className="tr-create-group">
                        <td>
                          <Form.Check
                            type="checkbox"
                          />
                        </td>
                        <td><Avatar /></td>
                        <td>{friend.name}</td>
                      </tr>
                    )
                  }) : <></>}
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
        <Button variant="primary" onClick={props.handleClose}>
          Chia sẻ
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FowardModal;