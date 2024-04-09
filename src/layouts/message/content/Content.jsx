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



function Content(props) {

    const messages = useSelector(state => state.message.messages);
    const [messageState, setMessagesSate] = useState([]);
    const userCurrent = useSelector((state) => state.userInfo.user);
    const [loading, setLoading] = useState(false);
    const [loadMore, setLoadMore] = useState(true);
    const dispatch = useDispatch();
    const scrollableDivRef = useRef(null);
    const chatInfo = useSelector(state => state.message.chatInfo);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);


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
            setMessagesSate(prev => [...messagesMore, ...prev]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (chatInfo.roomId != "") {
            const getMessages = async () => {
                try {
                    const response = await getMessageByRoomId(userCurrent.email, props.roomId);
                    // dispatch(setMessages(response.messages.reverse()));
                    setMessagesSate(() => response.messages.reverse());
                    setTotalPages(response.totalPage);
                    setLoading(true);
                    if (currentPage === response.totalPage - 1) setLoadMore(false);
                    else setLoadMore(true);
                } catch (error) {
                    console.log(error);
                }
            }
            getMessages();
        } else { setMessagesSate(() => []); }
    }, [chatInfo.roomId, messages]);
    useEffect(() => {
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
        }
    }, [messageState]);
    useEffect(() => {

    }, [currentPage])

    return (
        <div id="scrollableDiv" className="d-flex content-chat w-100 " style={{ height: "100%" }}>

            {loading ? <InfiniteScroll
                dataLength={messageState.length}
                style={{ display: "flex", flexDirection: "column-reverse", paddingBottom: "30px" }} //To put endMessage and loader to the top.
                inverse={true}
                next={fetchMore}
                hasMore={loadMore}
                scrollableTarget="scrollableDiv"
            >
                {messageState.map((message, index) => {
                    return index === 0 ? <div key={index}
                        className={`message ${message.senderId === userCurrent.email ? "message-right" : "message-left"}`}>
                        {renderMessage(message, index, true)}  </div> :
                        <div key={index}
                            className={`message ${message.senderId === userCurrent.email ? "message-right" : "message-left"}`}
                        > {renderMessage(message, index)} </div>
                })}
            </InfiniteScroll> : <></>}
        </div>
    );
}

export default Content;