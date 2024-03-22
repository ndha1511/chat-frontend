
import { useSelector } from 'react-redux';
import Chat from '../../components/chat/Chat';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';



const cx = classNames.bind(styles);


function Home() {
    const chatInfo = useSelector((state) => state.message.chatInfo);
    return (
        <div className={cx("wrapper")}>
            {Object.keys(chatInfo).length !== 0 ? <Chat data={"message here"} /> :
                <h1>Hello welcome to chat application</h1>
            }
        </div>
    );
}

export default Home;