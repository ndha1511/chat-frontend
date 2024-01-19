import styles from './Chats.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const chats = [
    {
        receivernName: 'Cloud của tôi', 
        avatar: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
        newMessage: 'This is message',
        mySend: true,
        time: '2024-01-18'
    },
    {
        receivernName: 'Cloud của tôi', 
        avatar: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
        newMessage: 'This is message',
        mySend: true,
        time: '2024-01-18'
    },
    {
        receivernName: 'Cloud của tôi', 
        avatar: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
        newMessage: 'This is message',
        mySend: true,
        time: '2024-01-18'
    },
    {
        receivernName: 'Cloud của tôi', 
        avatar: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
        newMessage: 'This is message',
        mySend: true,
        time: '2024-01-18'
    },
    {
        receivernName: 'Cloud của tôi', 
        avatar: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
        newMessage: 'This is message',
        mySend: true,
        time: '2024-01-18'
    },
    {
        receivernName: 'Cloud của tôi', 
        avatar: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
        newMessage: 'This is message',
        mySend: true,
        time: '2024-01-18'
    },
    {
        receivernName: 'Cloud của tôi', 
        avatar: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
        newMessage: 'This is message',
        mySend: true,
        time: '2024-01-18'
    },
    {
        receivernName: 'Cloud của tôi', 
        avatar: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
        newMessage: 'This is message',
        mySend: true,
        time: '2024-01-18'
    },
    {
        receivernName: 'Cloud của tôi', 
        avatar: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
        newMessage: 'This is message',
        mySend: true,
        time: '2024-01-18'
    },
    {
        receivernName: 'Cloud của tôi', 
        avatar: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
        newMessage: 'This is message',
        mySend: true,
        time: '2024-01-18'
    },
    {
        receivernName: 'Cloud của tôi', 
        avatar: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
        newMessage: 'This is message',
        mySend: true,
        time: '2024-01-18'
    },


  
]

function Chats() {
    return ( 
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <button>Tất cả</button>
                <button>Chưa đọc</button>
            </div>
            <div className={cx("chats")}>
                {chats.map((value, index) => (
                    <button key={index}>
                        <img src={value.avatar} alt='avatar' width={60} height={60}/>
                        <div className={cx("chat")}>
                            <div className={cx("chat_info")}>
                                <span>{value.receivernName}</span>
                                <p>{value.time}</p>
                            </div>
                            <div className={cx("chat_text")}>
                                <span>{value.mySend ? 'Bạn: ' + value.newMessage : value.newMessage}</span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Chats;