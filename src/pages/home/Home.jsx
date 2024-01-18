
import Chat from '../../components/chat/Chat';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);
const chat_rooms = [
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
    { name: 'test' },
]

function Home() {
    return (
        <div className={cx("wrapper")}>
            
            <Chat data={"message here"} />
        </div>
    );
}

export default Home;