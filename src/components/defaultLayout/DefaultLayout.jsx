import { useEffect } from 'react';
import Navigation from '../navigation/Navigation';
import Search from '../search/Search';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';

import {over} from "stompjs";
import SockJS from "sockjs-client";
import { getDataFromLocalStorage } from '../../utils/LocalStorageHandle';
import { reRender } from '../../redux/reducers/renderReducer';
import { reRenderRoom } from '../../redux/reducers/renderRoom';




const cx = classNames.bind(styles);

var stompClient = null;


export const connect = (onConnected, onError) => {
    let sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(sock);
    stompClient.connect({}, onConnected, onError);

}   



export const sendMessage = (message) => {
    stompClient.send("/app/chat", {}, JSON.stringify(message));
}

function DefaultLayout({ children, menu }) {
    const dispatch = useDispatch();
    useEffect(() => {
        const onConnected = () => {
            const user = getDataFromLocalStorage('user');
            if(user)
                stompClient.subscribe(`/user/${user.id}/queue/messages`, onMessageReceived);
        }
        
        const onMessageReceived = (payload) => {
            dispatch(reRender());
            dispatch(reRenderRoom(""));
        }
        
        const onError = (err) => { 
            console.log(err);
        }
        connect(onConnected, onError);   
       })
    return (
        <div className={cx("wrapper")}>
            <Navigation />
            <div className={cx("wrapper1")}>
                <div className={cx("search")}><Search /></div>
                <div  className={cx("menu")}>
                {menu}
                </div>
            </div>
            {children}
        </div>
    );
}

export default DefaultLayout;