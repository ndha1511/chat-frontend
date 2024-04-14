import { Button, Modal } from "react-bootstrap";

function VerifyModal(props) {
    const handleAgree = () => {
        props.handleClose();
        props.action();
    }
    return (
        <Modal show={props.show} onHide={props.handleClose} centered>
            <Modal.Body style={{ 
                height: 100,
                display: 'flex',
                alignItems: "center",
                justifyContent: "center"
             }}>{props.content}</Modal.Body>
            <Modal.Footer style={{ 
                display: 'flex',
                alignItems: "center",
                justifyContent: "center"
             }}>
                <Button variant="secondary" onClick={props.handleClose} style={{ 
                    width: 100
                 }}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={() => handleAgree()} style={{ 
                    width: 100
                 }}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default VerifyModal;