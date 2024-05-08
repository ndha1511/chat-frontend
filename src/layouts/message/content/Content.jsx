import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessageByRoomId } from "../../../services/MessageService";

import MessageText from "../../../components/messages/message-text/MessageText";
import MessageFile from "../../../components/messages/message-file/MessageFile";
import "./Content.scss";

import InfiniteScroll from "react-infinite-scroll-component";
import MessageImage from "../../../components/messages/mesage-image/MessageImage";
import MessageError from "../../../components/messages/message-error/MessageError";
import MessageVideo from "../../../components/messages/message-video/MessageVideo";

import MessageRevoked from "../../../components/messages/message-revoked/MessageRevoked";

import ImageGroup from "../../../components/messages/image-group/ImageGroup";
import { setMessages } from "../../../redux/reducers/messageReducer";
import MessageSystem from "../../../components/messages/message-system/MessageSystem";
import { getColorForName } from "../../../utils/ExtractUsername";
import { setViewIndedx } from "../../../redux/reducers/renderLayoutReducer";



function Content(props) {

    const messages = useSelector(state => state.message.messages);
    const reRenderMessage = useSelector(state => state.message.renderMessage);
    const scrollEnd = useSelector(state => state.message.scrollEnd);
    const userCurrent = useSelector((state) => state.userInfo.user);
    const [loadMore, setLoadMore] = useState(true);

    const dispatch = useDispatch();
    const scrollableDivRef = useRef(null);
    const chatInfo = useSelector(state => state.message.chatInfo);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [render, setRender] = useState(false);



    const renderMessage = (message, index, isLatest = false) => {
        var component = <></>;
        const messageType = message.messageType;
        switch (messageType) {
            case "TEXT":
                component = <MessageText message={message} key={index} lastMessage={isLatest && message.senderId === userCurrent.email ? true : false} />;
                return checkStatusMessage(message, index, isLatest, component);
            case "FILE":
                component = <MessageFile message={message} key={index} lastMessage={isLatest && message.senderId === userCurrent.email ? true : false} />
                return checkStatusMessage(message, index, isLatest, component);

            case "IMAGE":
                component = <MessageImage message={message} key={index} lastMessage={isLatest && message.senderId === userCurrent.email ? true : false} />
                return checkStatusMessage(message, index, isLatest, component);
            case "VIDEO":
                component = <MessageVideo message={message} key={index} lastMessage={isLatest && message.senderId === userCurrent.email ? true : false} />
                return checkStatusMessage(message, index, isLatest, component);
            case "IMAGE_GROUP":
                component = <ImageGroup message={message} key={index} lastMessage={isLatest && message.senderId === userCurrent.email ? true : false} />
                return checkStatusMessage(message, index, isLatest, component);
            case "SYSTEM":
                return <MessageSystem message={message} key={index} lastMessage={false} />

            default: break;
        }

    }

    const checkStatusMessage = (message, index, isLatest, component) => {
        if (message.messageStatus === "ERROR") {
            return <MessageError message={message} key={index} lastMessage={isLatest && message.senderId === userCurrent.email ? true : false} />
        } else if (message.messageStatus === "REVOKED") {
            return <MessageRevoked message={message} key={index} lastMessage={isLatest && message.senderId === userCurrent.email ? true : false} />
        }
        return component;
    }

    const fetchMore = async () => {
        console.log("Fetching more data");
        try {
            setCurrentPage(prev => prev + 1);
            const response = await getMessageByRoomId(userCurrent.email, props.roomId, currentPage);
            const messagesMore = response.messages.reverse();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        if (chatInfo.roomId !== "") {
            const getMessages = async () => {
                try {
                    const response = await getMessageByRoomId(userCurrent.email, props.roomId);
                    // dispatch(setMessages(response.messages.reverse()));
                    dispatch(setMessages(response.messages.reverse()));
                    setTotalPages(response.totalPage);
                    if (currentPage === response.totalPage - 1) setLoadMore(false);
                    else setLoadMore(true);
                } catch (error) {
                    console.log(error);
                }
            }
            getMessages();
        } else { dispatch(setMessages([])); }
    }, [chatInfo.roomId, reRenderMessage]);

    useEffect(() => {
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
        }
    }, [scrollEnd]);
    useEffect(() => {

    }, [currentPage])
    // console.log(userCurrent.name)

    function adjustColor(color, amount) {
        return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
    }
    const baseColor = chatInfo.user ? getColorForName(chatInfo.user?.name) : '#FFFFFF'; // Màu trắng là màu mặc định
    const lighterColor = adjustColor(baseColor, 40); // Làm sáng màu lên một chút
    const darkerColor = adjustColor(baseColor, -40); // Làm tối màu đi một chút
    function hexToRgb(hex) {
        hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
    }
    return (
        <div id="scrollableDiv" ref={scrollableDivRef} className="d-flex content-chat w-100 "
            style={{
                height: "100%",
                backgroundImage: chatInfo.user.avatar ?
                    `linear-gradient(-45deg,rgba(199, 194, 194, 0.6), rgba(226, 218, 218, 0.7),rgba(169, 149, 149, 0.6)), url(${chatInfo.user.avatar}), linear-gradient(90deg, rgba(${hexToRgb(lighterColor)}, 1) 0%, rgba(${hexToRgb(baseColor)}, 1) 50%, rgba(${hexToRgb(darkerColor)}, 1) 100%)` :
                    `linear-gradient(90deg, rgba(${hexToRgb(lighterColor)}, 0.6) 0%, rgba(${hexToRgb(baseColor)}, 0.6) 50%, rgba(${hexToRgb(darkerColor)}, 0.6) 100%)`,
                backgroundSize: 'cover', // Set the size for each background
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
                // backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${chatInfo.user.avatar}), linear-gradient(90deg, rgba(${hexToRgb(lighterColor)}, 0.4) 0%, rgba(${hexToRgb(baseColor)}, 0.
            }}

        >

                <InfiniteScroll
                    dataLength={messages.length}
                    style={{ display: "flex", flexDirection: "column-reverse", paddingBottom: "30px", overflow: 'unset' }} //To put endMessage and loader to the top.
                    inverse={true}
                    next={fetchMore}
                    hasMore={true}
                    loader={<h1></h1>}
                    scrollableTarget="scrollableDiv"
                >
                    {messages.map((message, index) => {
                        return index === 0 ? <div key={index}
                            className={`message ${message.senderId === userCurrent.email ? "message-right" : "message-left"}`}>
                            {renderMessage(message, index, true)}  </div> :
                            <div key={index}
                                className={`message ${message.senderId === userCurrent.email ? "message-right" : "message-left"}`}
                            > {renderMessage(message, index)} </div>
                    })}
                </InfiniteScroll>
        </div>
    );
}

export default Content;