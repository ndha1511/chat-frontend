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
import { setMessageSearchCurrent, setMessages, updateMessage } from "../../../redux/reducers/messageReducer";
import MessageSystem from "../../../components/messages/message-system/MessageSystem";
import { getColorForName } from "../../../utils/ExtractUsername";
import { Spinner } from "react-bootstrap";
import { Icon } from "zmp-ui";

import MessageVideoCall from "../../../components/messages/message-audio-video-call/MessageVideoCall";
import MessageAudioCall from "../../../components/messages/message-audio-video-call/MessageAudioCall";

import SearchMessageInput from "../../../components/search/SearchMessageInput";
import { arrayToDateTime } from "../../../utils/DateTimeHandle";
import Avatar from "../../../components/avatar/Avatar";
import { setTypingChat } from "../../../redux/reducers/renderMessage";


function Content(props) {

    const messages = useSelector(state => state.message.messages);
    const typingChat = useSelector(state => state.renderMessage.typingChat);
    const reRenderMessage = useSelector(state => state.message.renderMessage);
    const scrollEnd = useSelector(state => state.message.scrollEnd);
    const userCurrent = useSelector((state) => state.userInfo.user);
    const messageSearch = useSelector((state) => state.message.messageSearch);
    const messageSearchCurrent = useSelector((state) => state.message.messageSearchCurrent);
    const [loadMore, setLoadMore] = useState(true);
    const showSearchMessage = useSelector((state) => state.renderView.showSearchMessage);
    const dispatch = useDispatch();
    const scrollableDivRef = useRef(null);
    const scrollableSearch = useRef(null);
    const chatInfo = useSelector(state => state.message.chatInfo);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [displayDate, setDisplayDate] = useState();

    const [showScrollButton, setShowScrollButton] = useState(false);
    const windowSize = useSelector(state => state.render.windowSize);

    const firstDivRef = useRef(null);
    const [firstDivHeight, setFirstDivHeight] = useState(0);

    useEffect(() => {
        if (firstDivRef.current) {
            const height = firstDivRef.current.clientHeight + window.innerHeight * 0.12;
            setFirstDivHeight(height);
        }
    }, [showSearchMessage]);

   

    useEffect(() => {
        const handler = setTimeout(() => {
            if (Object.keys(typingChat.user).length > 0 || typingChat.showTyping !== false) {
                dispatch(setTypingChat({user: {}, showTyping: false}));
            }
        }, 1000);
        return () => {
            clearTimeout(handler);
        }
    }, [typingChat])


    const displayAvatar = (message, index,) => {
        if (index + 1 === messages.length) {
            return true;
        }
        const startTime = arrayToDateTime(message.sendDate);
        const endTime = arrayToDateTime(messages[index + 1].sendDate);
        // Tính toán sự khác biệt giữa hai thời điểm (được tính bằng mili giây)
        const timeDifferenceInMilliseconds = Math.abs(endTime - startTime);
        // Chuyển đổi sự khác biệt thành số phút
        const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60);

        if (message.senderId === userCurrent.email) {
            return false;
        }
        if (timeDifferenceInMinutes < 1 && message.senderId === messages[index + 1].senderId && startTime.getDate() === endTime.getDate()) {
            return false;
        }
        return true;
    }
    const renderMessage = (message, index, isLatest = false) => {
        var component = <></>;
        var showAvatar = displayAvatar(message, index);
        const messageType = message.messageType;
        switch (messageType) {
            case "TEXT":
                component = <MessageText currentPage={currentPage} scrollToMessage={scrollToMessage} message={message} key={index} lastMessage={isLatest && message.senderId === userCurrent.email ? true : false} showAvatar={showAvatar} />;
                return checkStatusMessage(message, index, isLatest, component);
            case "FILE":
                component = <MessageFile message={message} key={index} lastMessage={isLatest && message.senderId === userCurrent.email ? true : false} showAvatar={showAvatar} />
                return checkStatusMessage(message, index, isLatest, component);
            case "IMAGE":
                component = <MessageImage message={message} key={index} lastMessage={isLatest && message.senderId === userCurrent.email ? true : false} showAvatar={showAvatar} />
                return checkStatusMessage(message, index, isLatest, component);
            case "VIDEO":
                component = <MessageVideo message={message} key={index} lastMessage={isLatest && message.senderId === userCurrent.email ? true : false} showAvatar={showAvatar} />
                return checkStatusMessage(message, index, isLatest, component);
            case "IMAGE_GROUP":
                component = <ImageGroup message={message} key={index} lastMessage={isLatest && message.senderId === userCurrent.email ? true : false} showAvatar={showAvatar} />
                return checkStatusMessage(message, index, isLatest, component);
            case "SYSTEM":
                return <MessageSystem message={message} key={index} lastMessage={false} showAvatar={showAvatar} />
            case "AUDIO_CALL":
                component = <MessageAudioCall message={message} key={index} lastMessage={isLatest && message.senderId === userCurrent.email ? true : false} showAvatar={showAvatar} />;
                return checkStatusMessage(message, index, isLatest, component);
            case "VIDEO_CALL":
                component = <MessageVideoCall message={message} key={index} lastMessage={isLatest && message.senderId === userCurrent.email ? true : false} showAvatar={showAvatar} />;
                return checkStatusMessage(message, index, isLatest, component);
            default: break;
        }

    }

    const checkStatusMessage = (message, index, isLatest, component) => {
        var showAvatar = displayAvatar(message, index);
        if (message.messageStatus === "ERROR") {
            return <MessageError message={message} key={index} lastMessage={isLatest && message.senderId === userCurrent.email ? true : false} showAvatar={showAvatar} />
        } else if (message.messageStatus === "REVOKED") {
            return <MessageRevoked message={message} key={index} lastMessage={isLatest && message.senderId === userCurrent.email ? true : false} showAvatar={showAvatar} />
        }
        return component;
    }

    const fetchMore = async () => {
        console.log("Fetching more data");
        try {
            setCurrentPage(prev => prev + 1);
            const response = await getMessageByRoomId(userCurrent.email, props.roomId, currentPage + 1);
            const messagesMore = response.messages.reverse();
            setTotalPages(response.totalPage);
            dispatch(updateMessage(messagesMore));
        } catch (error) {
            console.log(error);
        }
    }

    const fetchMore2 = async (nextPage) => {
        console.log("Fetching more data");
        try {
            const response = await getMessageByRoomId(userCurrent.email, props.roomId, nextPage);
            const messagesMore = response.messages.reverse();
            setTotalPages(response.totalPage);
            dispatch(updateMessage(messagesMore));
            setCurrentPage(nextPage);
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
                    console.log(response);
                    dispatch(setMessages(response.messages.reverse()));
                    setCurrentPage(0);
                    setTotalPages(response.totalPage);

                } catch (error) {
                    console.log(error);
                    setLoadMore(false);
                }
            }
            getMessages();
        } else {
            dispatch(setMessages([]));
            setLoadMore(false);
        }
    }, [chatInfo.roomId, reRenderMessage]);

    const scrollToTop = () => {
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
            setShowScrollButton(false);
        }
    };

    const scrollToMessage = async (messageParent, nextPage) => {

        if (scrollableDivRef.current) {
            const message = document.getElementById(messageParent.id);
            if (message) {
                scrollableDivRef.current.scrollTop = message.offsetTop - 100;
                console.log(message);
                const child = message.querySelector(".mess-text");
                if (child) {
                    child.style.backgroundColor = "#a7e2bb";
                    setTimeout(function () {
                        child.style.backgroundColor = messageParent.senderId === userCurrent.email ? "rgb(229, 239, 255)" : "white";
                    }, 1000);
                }

            } else {
                if (loadMore) {
                    await fetchMore2(nextPage);
                    scrollToMessage(messageParent, nextPage + 1);
                }
            }
        }
    }

    useEffect(() => {
        if(Object.keys(messageSearchCurrent).length > 0) {
            scrollToMessage(messageSearchCurrent, currentPage + 1);
            dispatch(setMessageSearchCurrent({}))
        }
    }, [messageSearchCurrent]);


    useEffect(() => {
        if (totalPages === 1 || totalPages === 0) {
            setLoadMore(false);
        } else {
            if (currentPage === totalPages - 1) {
                setLoadMore(false);
            } else {
                setLoadMore(true);
            }
        }
    }, [totalPages, currentPage])

    useEffect(() => {
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
        }
    }, [scrollEnd, chatInfo]);




    const scrollEvent = () => {
        if (scrollableDivRef.current) {
            const scrollPosition = scrollableDivRef.current.scrollTop;
            if (scrollPosition <= -400) {
                setShowScrollButton(true);
                const dateDivs = document.querySelectorAll(".date");
                let closestDiv = null;
                let minDistance = Number.MAX_SAFE_INTEGER;
                dateDivs.forEach(div => {
                    const offsetTop = div.offsetTop;
                    if (offsetTop <= scrollPosition + 80) {
                        const distance = Math.abs(scrollPosition + offsetTop);
                        if (distance < minDistance) {
                            minDistance = distance;
                            closestDiv = div;
                        }
                    }
                });
                if (closestDiv) {
                    const date = closestDiv.getAttribute("datadate");
                    setDisplayDate(date);
                }
            } else {
                setShowScrollButton(false);
            }
        }
    }
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
    const getMessageDate = (message) => {
        const [year, month, day] = message.sendDate.slice(0, 3);
        return `${day}-${month}-${year}`;
    };

    const compareWithCurrentDate = (dateString) => {
        const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const [day, month, year] = dateString.split('-');
        const messageDate = new Date(year, month - 1, day);
        if (currentDate.getTime() === messageDate.getTime()) {
            return "Hôm nay ";
        }
        const dayName = daysOfWeek[messageDate.getDay()];
        messageDate.setDate(messageDate.getDate() + 1);
        if (currentDate.getTime() === messageDate.getTime()) {
            return "Hôm qua";
        }
        return `${dayName} ${day}/${month}/${year}`;
    }
    const getMessage = (message, index) => {
        if (index === 0) {
            if (index + 1 < messages.length) {
                if (getMessageDate(messages[index + 1]) === getMessageDate(message)) {
                    return (
                        <div key={message.id} id={message.id}
                            className={`message message-slide-in ${message.senderId === userCurrent.email ? "message-right" : "message-left"}`}>

                            {renderMessage(message, index, true)}  </div>
                    )
                }
                return (
                    <div key={message.id} id={message.id}>
                        <div className="message message-center date" datadate={getMessageDate(message)}><span className="date-style">{compareWithCurrentDate(getMessageDate(message))}</span></div>
                        <div
                            className={`message message-slide-in ${message.senderId === userCurrent.email ? "message-right" : "message-left"}`}>

                            {renderMessage(message, index, true)}  </div>
                    </div>
                )
            }
            return (
                <div key={message.id} id={message.id}>
                    <div className="message message-center date" datadate={getMessageDate(message)}><span className="date-style">{compareWithCurrentDate(getMessageDate(message))}</span></div>
                    <div
                        className={`message message-slide-in ${message.senderId === userCurrent.email ? "message-right" : "message-left"}`}>

                        {renderMessage(message, index, true)}  </div>
                </div>
            )
        } else {
            if (index + 1 < messages.length) {
                if (getMessageDate(messages[index + 1]) === getMessageDate(message)) {
                    return (
                        <div key={message.id} id={message.id}
                            className={`message message-slide-in ${message.senderId === userCurrent.email ? "message-right" : "message-left"}`}
                        > {renderMessage(message, index)} </div>
                    )
                }
                return (
                    <div key={message.id} id={message.id}>
                        <div className="message message-center date" datadate={getMessageDate(message)}><span className="date-style">{compareWithCurrentDate(getMessageDate(message))}</span></div>
                        <div
                            className={`message message-slide-in ${message.senderId === userCurrent.email ? "message-right" : "message-left"}`}
                        > {renderMessage(message, index)} </div>
                    </div>
                )
            }
            return (
                <div key={message.id} id={message.id}>
                    <div className="message message-center date" datadate={getMessageDate(message)}><span className="date-style">{compareWithCurrentDate(getMessageDate(message))}</span></div>
                    <div
                        className={`message message-slide-in ${message.senderId === userCurrent.email ? "message-right" : "message-left"}`}
                    > {renderMessage(message, index)} </div>
                </div>
            )
        }
    }
    return (
        <div id="scrollableDiv" ref={scrollableDivRef} className="d-flex content-chat w-100 "
            onScroll={scrollEvent}
            style={{
                height: "100%",
                backgroundImage: chatInfo.user.avatar ?
                    `linear-gradient(-45deg,rgba(199, 194, 194, 0.6), rgba(226, 218, 218, 0.7),rgba(169, 149, 149, 0.6)), url(${chatInfo.user.avatar}), linear-gradient(90deg, rgba(${hexToRgb(lighterColor)}, 1) 0%, rgba(${hexToRgb(baseColor)}, 1) 50%, rgba(${hexToRgb(darkerColor)}, 1) 100%)` :
                    `linear-gradient(90deg, rgba(${hexToRgb(lighterColor)}, 0.6) 0%, rgba(${hexToRgb(baseColor)}, 0.6) 50%, rgba(${hexToRgb(darkerColor)}, 0.6) 100%)`,
                backgroundSize: 'cover', // Set the size for each background
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                // backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${chatInfo.user.avatar}), linear-gradient(90deg, rgba(${hexToRgb(lighterColor)}, 0.4) 0%, rgba(${hexToRgb(baseColor)}, 0.
            }}

        >

            <InfiniteScroll
                dataLength={messages.length}
                style={{ display: "flex", flexDirection: "column-reverse", paddingBottom: "30px", overflow: 'unset' }} //To put endMessage and loader to the top.
                inverse={true}
                next={fetchMore}

                hasMore={loadMore}
                loader={<div className="message message-center">
                    <Spinner animation="border" role="status" variant="primary" size="sm">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>}
                scrollableTarget="scrollableDiv"
            >
                {messages.map((message, index) => {
                    return getMessage(message, index);
                })}
            </InfiniteScroll>
            {showScrollButton && (
                <button className="scroll-button" onClick={scrollToTop}
                    style={{
                        left: windowSize.width > 768 ? "98vw" : "93vw"
                    }}
                >
                    <Icon icon="zi-chevron-down" />
                </button>
            )}
            {showScrollButton && (
                <div className="float-date date-style"
                    style={{
                        left: windowSize.width > 768 ? (compareWithCurrentDate(displayDate) !== "Hôm nay" && compareWithCurrentDate(displayDate) !== "Hôm qua") ? "60.9%" : "61.8%" :
                            (compareWithCurrentDate(displayDate) !== "Hôm nay" && compareWithCurrentDate(displayDate) !== "Hôm qua") ? "37vw" : "40vw",
                        top: "15vh"
                    }}
                >{compareWithCurrentDate(displayDate)}</div>
            )}
            {showSearchMessage && <div ref={firstDivRef} className={`search-message ${windowSize.width > 768 ? "col-9" : "col-12"}`}><SearchMessageInput /></div>}

            {/* view for mobile */}
            {messageSearch.show && windowSize.width <= 768 ?
                <div className="search-result col-12"
                    style={{ top: firstDivHeight }}>
                    <div ref={scrollableSearch} id="scrollableSearch" className="d-flex align-items-center justify-content-center" style={{zIndex: 900}}>
                        {messageSearch.loading ? <Spinner animation="border" role="status" variant="primary"><span className="visually-hidden">Loading...</span></Spinner> :
                            messageSearch.messages.length > 0 ?
                                <InfiniteScroll
                                    dataLength={messageSearch.messages.length}
                                    style={{ display: "flex", flexDirection: "column", paddingBottom: "30px", overflow: 'unset' }}
                                    inverse={true}
                                    next={fetchMore}
                                    hasMore={true}
                                    loader={<div className="message message-center">
                                        <Spinner animation="border" role="status" variant="primary" size="sm">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    </div>}
                                    scrollableTarget="scrollableSearch"
                                >
                                    {messageSearch.messages.map((message, index) => {
                                        return <div key={message.id}>
                                            {`${index} - ${message.id}`}
                                        </div>;
                                    })}
                                </InfiniteScroll>
                                : <span>Không tìm thấy kết quả phù hợp</span>}
                    </div>
                </div>
                : <></>}
            {Object.keys(typingChat.user).length > 0 && <div className="d-flex" style={{ position: "fixed", bottom: props.heightFooter }}>
                <div style={{bottom: -80}}><Avatar width={30} height={30} user={typingChat.user}/></div>
                <div className="message incoming">
                    <div className="message-bubble">
                        <div className="message-content" id="typingAnimation">
                            <div className="typing-dots">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

        </div>
    );
}

export default Content;