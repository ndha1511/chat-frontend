import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

function FowardModal(props) {
    const friends = useSelector((state) => state.friend.friendsAccepted);
    const groupList = [
        "Bạn bè",
        "Nhóm"
    ]
    return (
        <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
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
        </Modal.Footer>
      </Modal>
    );
}

export default FowardModal;