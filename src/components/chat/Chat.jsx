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

const chatMessages = [
    {
        senderId: '1',
        receiverId: '2',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '1',
        receiverId: '2',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '1',
        receiverId: '2',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Test message'
        },
        type: 'text'
    },
    {
        senderId: '2',
        receiverId: '1',
        content: {
            message: 'Voting Rights News — A magazine covering the nuts and bolts of power and political change, from the local up. New in Bolts: SCOTUS refuses to empower state legislatures to run elections as they please'
        },
        type: 'text'
    },
    {
        senderId: '1',
        receiverId: '2',
        content: {
            message: 'Twelve Republican senators joined Democrats in voting in favor of a same-sex marriage bill on Tuesday, a share that would have been all but imaginable a decade ago that shows how internal party divisions have grown on the issue. The bill, the Respect for Marriage Act, would require states to recognize same-sex marriages and repeal 1996′s Defense of Marriage Act, which defined marriage as being between a man and a woman. Since the early 2000s, both Democrats and Republicans have become more likely to say they support same-sex marriage. Just since 2015, the share of adults in favor of same-sex marriages has risen from 60 percent to 70 percent in 2021. This is also true among white Evangelical Protestants, who make up a major block of Republican voters and are known to turn out in primary elections to support candidates who share their views. Republican supporters argued the proposed legislation would protect religious liberty and, as Sen. Romney (R-Utah) said, show that “Congress — and I — esteem and love all of our fellow Americans equally.” Sen. Mike Lee (R-Utah) said on Tuesday, “I’m not aware of a single state in the United States threatening to pass any law infringing on the ability of same-sex couples to enjoy privileges associated with same-sex marriage.”'
        },
        type: 'text'
    },


]

const RenderMessages = (message, index) => {
    if (message.senderId === '1') {
        if (message.type === 'text')
            return (
                <div className={cx("message-text")} key={index} style={{justifyContent: 'flex-end'}}>
                    <div>
                        {message.content.message}
                    </div>
                </div>
            )
    }
    if (message.type === 'text')
        return (
            <div className={cx("message-text")} style={{justifyContent: 'flex-start'}} key={index}>
                <img alt='avatar' src='https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg'/>
                <div>
                    {message.content.message}
                </div>
            </div>
        )
}




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
            <div className={cx("message")}>
                <div className={cx("content")}>
                    {chatMessages.map((message, index) => {
                        return RenderMessages(message, index);
                    })}
                </div>
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
                    <textarea placeholder='Nhập tin nhắn gửi tới Cloud của tôi'/>
                </div>
            </div>
        </div>);
}

export default Chat;