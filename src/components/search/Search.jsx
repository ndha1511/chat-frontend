import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { faSearch, faUserGroup, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { getUserInfo } from '../../services/UserService';
import UserInfo from '../userInfo/UserInfo';

const cx = classNames.bind(styles);

function Search() {
    const [show, setShow] = useState(false);
    const [userSearch, setUserSearch] = useState({});
    const [phoneNumber, setPhoneNumber] = useState('');
    const [notFound, setNotFound] = useState('');

    const handleClose = () => { setShow(false); setUserSearch({}); setNotFound(''); };
    const handleShow = () => setShow(true);
    const searchUser = () => {
        if (phoneNumber) {
            getUserInfo(phoneNumber).then(resp => {
                setUserSearch(resp);
                console.log(resp);
            }).catch(err => {
                console.error(err);
                setNotFound("Không tìm thấy tài khoản này");
            });
        }
    }

    const back = () => {
        setUserSearch({});
    }
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

                    {Object.keys(userSearch).length !== 0 ? <div style={{ display: "flex" }}>
                        <button onClick={back}>back</button>
                        <Modal.Title style={{ fontWeight: 'bold', fontSize: 25 }}>Thông tin tài khoản</Modal.Title>
                    </div> :
                        <Modal.Title style={{ fontWeight: 'bold', fontSize: 25 }}>Thêm bạn</Modal.Title>
                    }
                </Modal.Header>
                <Modal.Body className={cx("modal-body")}>
                    {Object.keys(userSearch).length !== 0 ? <UserInfo user={userSearch} closeModel={handleClose} /> :
                        <label htmlFor='searchFriend'>
                            <input id='searchFriend' placeholder='Số điện thoại' onChange={(e) => setPhoneNumber(e.target.value)} />
                        </label>
                    }

                </Modal.Body>
                {Object.keys(userSearch).length !== 0 ? <></> :
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} className={cx("modal-button")}>
                            Hủy
                        </Button>
                        <Button variant="primary" onClick={searchUser} className={cx("modal-button")}>
                            Tìm kiếm
                        </Button>
                    </Modal.Footer>
                }

            </Modal>

        </div>
    );
}

export default Search;