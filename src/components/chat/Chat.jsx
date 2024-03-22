import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Chat.module.scss';
import classNames from 'classnames/bind';
import { faImage, faNoteSticky, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faBorderAll, faMagnifyingGlass, faPaperclip, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { extractName, getColorForName } from '../../utils/ExtractUsername';
import { useEffect, useRef, useState } from 'react';
import { getDataFromLocalStorage } from '../../utils/LocalStorageHandle';
import { getMessageByRoomId } from '../../services/MessageService';
import InfiniteScroll from 'react-infinite-scroll-component';
import { reRender } from '../../redux/reducers/renderReducer';
import { sendMessage } from '../defaultLayout/DefaultLayout';

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
    const sender = getDataFromLocalStorage("user");
    const chatInfo = useSelector((state) => state.message.chatInfo);
    const dispatch = useDispatch();
    const [textMessage, setTextMessage] = useState('');
    const [showButtonSend, setShowButtonSend] = useState(true);
    const [messages, setMessages] = useState([]);
    const contentRef = useRef(null);
    const isRender = useSelector((state) => state.render.renderResult);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [scroll, setScroll] = useState(false);
    const [loadMore, setLoadMore] = useState(true);

    const RenderMessages = (message, index) => {
        if (message.senderId === sender.id) {
            return (
                <div className={cx("message-text")} key={index} style={{ justifyContent: 'flex-end' }}>
                    <div>
                        {message.content}
                    </div>
                </div>
            )
        }
        return (
            <div className={cx("message-text")} style={{ justifyContent: 'flex-start' }} key={index}>
                <img alt='avatar' src='https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg' />
                <div>
                    {message.content}
                </div>
            </div>
        )

    }

    const convertMessage = (message) => {
        switch (message.type) {
            case "TEXT":

        }
    }
    const loadMoreMessage = () => {
        const nextPage = currentPage + 1;
        if(nextPage <= totalPage) {
            getMessageByRoomId(chatInfo.roomId, nextPage)
                .then(resp => {                    
                    setMessages((prev) => [...resp.messages.reverse(), ...prev]);
                    setCurrentPage(nextPage);
                })
                .catch(err => console.log(err));
        } else {
            setLoadMore(false); 
        }

    }

    const changeTextMessage = (e) => {
        setTextMessage(e.target.value)
    }
    useEffect(() => {
        if ("roomId" in chatInfo) {
            getMessageByRoomId(chatInfo.roomId)
                .then(resp => {
                    setMessages(() => resp.messages.reverse());
                    setTotalPage(resp.totalPage);
                })
                .catch(err => console.log(err));
        } else {
            setMessages([]);
        }
    }, [chatInfo, isRender])
    useEffect(() => {
        if (contentRef.current) {
            const contentElement = contentRef.current;
            contentElement.scrollTop = contentElement.scrollHeight;
        }
    }, [scroll])

    const sendTextMessage = () => {
        setTextMessage("");
        const msg = {
            senderId: sender.id,
            receiverId: chatInfo.id,
            content: textMessage,
            messageType: "TEXT",
            messageStatus: "SENT"
        }
        setMessages(prev => [...prev, msg]);
        sendMessage(msg);
        setScroll(!scroll);
        // dispatch(reRender());
    }
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <button className={cx("avatar")} style={{ backgroundColor: getColorForName(chatInfo.name) }}>
                    {chatInfo.avatar ?
                        <img src={chatInfo.avatar} alt='avatar' /> :
                        <span>{extractName(chatInfo.name)}</span>
                    }
                </button>
                <div className={cx("navbar")}>
                    <div className={cx("info")}>
                        <p>{chatInfo.name}</p>
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
            <div className={cx("message")} id='scrollMsg' ref={contentRef}>
               
                    <InfiniteScroll dataLength={messages.length}
                        style={{ display: 'flex', flexDirection: 'column' }}
                        className={cx("content")}
                        inverse={true}
                        hasMore={loadMore}
                        scrollableTarget="scrollMsg"
                        next={loadMoreMessage}
                    >
                        {messages.map((message, index) => (
                            RenderMessages(message, index)
                        ))}
                    </InfiniteScroll>
               
            </div>
            <div className={cx("footer")}>
                <div className={cx("options")}>
                    {optionButtons.map((value, index) => {
                        if (index === 2) {
                            return (

                                <label htmlFor="attach-file" key={index}>
                                    <FontAwesomeIcon icon={value.icon} />
                                    <input type='file' id='attach-file' style={{ display: 'none' }} multiple />
                                </label>

                            )
                        }
                        if (index === 1) {
                            return (

                                <label htmlFor="attach-file1" key={index}>
                                    <FontAwesomeIcon icon={value.icon} />
                                    <input type='file' id='attach-file1' style={{ display: 'none' }} multiple accept='image/*' />
                                </label>

                            )
                        }
                        return <button key={index}>
                            <FontAwesomeIcon icon={value.icon} />
                        </button>
                    })}
                </div>
                <div className={cx("text-input")}>
                    <textarea placeholder={`Nhập tin nhắn gửi tới ${chatInfo.name}`} value={textMessage} onChange={changeTextMessage} />
                    <button onClick={sendTextMessage}>Gửi</button>
                </div>
            </div>
        </div>);
}

export default Chat;