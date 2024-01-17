import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Chat from '../../components/chat/Chat';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { faSearch, faUserGroup, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const chat_rooms = [
    {name: 'test'},
    {name: 'test'},
    {name: 'test'},
    {name: 'test'},
    {name: 'test'},
    {name: 'test'},
    {name: 'test'},
    {name: 'test'},
    {name: 'test'},
    {name: 'test'},
    {name: 'test'},
    {name: 'test'},
    {name: 'test'},
    {name: 'test'},
    {name: 'test'},
    {name: 'test'},
    {name: 'test'},
    {name: 'test'},
    {name: 'test'},
    {name: 'test'},
    {name: 'test'},
]

function Home() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("conversations")}>
                <div className={cx("header")}>
                    <div className={cx("search")}>
                        <button><FontAwesomeIcon icon={faSearch}/></button>
                        <input placeholder='Tìm kiếm'/>
                    </div>
                    <button><FontAwesomeIcon icon={faUserPlus}/></button>
                    <button><FontAwesomeIcon icon={faUserGroup}/></button>
                </div>
                <div style={{display: 'flex'}}>
                    <button>Tất cả</button>
                    <button>Chưa đọc</button>
                </div>
                <div className={cx("chat_rooms")}>
                    {chat_rooms.map((value, index) => (
                        <button style={{width: '100%'}} key={index}>
                            <img src='' alt='avatar'/>
                            <div>
                                <p>{value.name}</p>
                                <p>new message</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <Chat data={"message here"} />
        </div>
    );
}

export default Home;