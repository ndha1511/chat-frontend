import { Modal } from "react-bootstrap";

function BaseModal(props) {
    const close = props.close ? props.close : () => {};
    const header = props.header ? props.header : <p>Modal custom header</p>
    const body = props.body ? props.body : <p>Modal custom body</p>
    const footer = props.footer ? props.footer : <p>Modal custom footer</p>

    return (
        <Modal show={props.show} onHide={close}>
            <Modal.Header closeButton>
                {header}
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
            <Modal.Footer>
                {footer}
            </Modal.Footer>
        </Modal>
    );
}

export default BaseModal;