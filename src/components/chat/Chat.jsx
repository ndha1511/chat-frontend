import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Chat.module.scss';
import classNames from 'classnames/bind';
import { faImage, faNoteSticky, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faBorderAll, faMagnifyingGlass, faPaperclip, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const headerButtons = [
    { tippyText: 'Tìm kiếm tin nhắn', icon: faMagnifyingGlass },
    { tippyText: 'Cuộc gọi thoại', icon: faPhone },
    { tippyText: 'Gọi video', icon: faVideo },
    { tippyText: 'Thông tin hội thoại', icon: faBorderAll }
];

const optionButtons = [
    { tippyText: 'Gửi sticker', icon: faNoteSticky },
    { tippyText: 'Gửi hình ảnh', icon: faImage },
    { tippyText: 'Đính kèm file', icon: faPaperclip }
]

function Chat() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <img src='https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg' alt='avatar' />
                <div className={cx("navbar")}>
                    <div className={cx("info")}>
                        <p>Cloud của tôi</p>
                        <button className={cx("btn-edit")}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>

                    </div>
                    <div className={cx("menu")}>
                        {headerButtons.map((value, index) => (
                            <button key={index}>
                                <FontAwesomeIcon icon={value.icon} />
                            </button>
                        ))}
                    </div>

                </div>
            </div>
            <div className={cx("message")}></div>
            <div className={cx("footer")}>
                <div className={cx("options")}>
                    {optionButtons.map((value, index) => {
                        if (index === 2) {
                            return (
                            
                                    <label for="attach-file">
                                        <FontAwesomeIcon icon={value.icon} />
                                        <input type='file' id='attach-file' style={{ display: 'none' }} />
                                    </label>
                               
                            )
                        }
                        return <button>
                            <FontAwesomeIcon icon={value.icon}/>
                        </button>
                    })}
                </div>
                <div className={cx("text-input")}>
                    <input placeholder='Nhập tin nhắn gửi tới Cloud của tôi'/>
                </div>
            </div>
        </div>);
}

export default Chat;