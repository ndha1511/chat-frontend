import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { faSearch, faUserGroup, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const cx = classNames.bind(styles);

function Search() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className={cx("header")}>
            <div className={cx("search")}>
                <button><FontAwesomeIcon icon={faSearch} /></button>
                <input placeholder='Tìm kiếm' />
            </div>
            <button className={cx('btn-add')} onClick={handleShow}><FontAwesomeIcon icon={faUserPlus} /></button>
            <button className={cx('btn-add')}><FontAwesomeIcon icon={faUserGroup} /></button>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontWeight: 'bold', fontSize: 25 }}>Thêm bạn</Modal.Title>
                </Modal.Header>
                <Modal.Body className={cx("modal-body")}>
                    <label htmlFor='searchFriend'>
                        <input id='searchFriend' placeholder='Số điện thoại'/>
                    </label>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className={cx("modal-button")}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleClose} className={cx("modal-button")}>
                        Tìm kiếm
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default Search;