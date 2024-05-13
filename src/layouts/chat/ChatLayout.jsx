import { useSelector } from "react-redux";
import ButtonGroup from "../../components/buttons/button-group/ButtonGroup";
import Header from "./header/Header";
import { useEffect, useState } from "react";
import BoxChat from "../../components/box-chat/BoxChat";
import "./ChatLayout.scss"
import SimpleBar from "simplebar-react";
import 'simplebar/dist/simplebar.min.css';
function ChatLayout() {
    const rooms = useSelector((state) => state.room.rooms);
    const [roomRender, setRoomRender] = useState([]);
    const [roomUnread, setRoomUnread] = useState([]);
    const [roomUnreadRender, setRoomUnreadRender] = useState([]);
    const [showAllRoom, setShowAllRoom] = useState(true);

    const clickAllButton = () => {
        setShowAllRoom(true);
    }

    const clickUnreadButton = () => {
        const listBoxChatRoomUnread = roomUnreadRender.map((room) => { return { item: <BoxChat room={room} /> } });
        setRoomUnread(() => listBoxChatRoomUnread);
        setShowAllRoom(false);
    }





    useEffect(() => {
        const listBoxChat = rooms.map((room) => { return { item: <BoxChat room={room} /> } });
        setRoomRender(() => listBoxChat);
        const listRoomUnread = rooms.filter(room => {
            return room.numberOfUnreadMessage > 0;
        });
        setRoomUnreadRender(() => listRoomUnread);
        
    }, [rooms]);

    return (

        <div className="d-flex" style={{ flexDirection: "column", }}>
            <Header clickAllButton={clickAllButton} clickUnreadButton={clickUnreadButton}/>

            <SimpleBar style={{ maxHeight: '83vh' }}>

                {rooms.length <= 0 ?
                    <div className="d-flex w-100 justify-content-center align-items-center"
                        style={{ textAlign: "center", height: '78vh', }}>
                        <p>Bạn chưa có cuộc trò chuyện nào, <br></br> hãy kết thêm bạn mới để trò chuyện nhé</p>
                    </div>
                    :
                    showAllRoom ?
                    <div className="w-100 d-flex" style={{ flex: 1, }}>
                        <ButtonGroup buttons={roomRender}
                            widthBtnGroup="100%"
                            vertical width="100%"
                            className="btn-hover"
                            hoverColor="#eeeeee"
                            textColor="black"
                            backgroundActive="#eeeeee"
                        />
                    </div>
                    :
                    <div className="w-100 d-flex" style={{ flex: 1, }}>
                        <ButtonGroup buttons={roomUnread}
                            widthBtnGroup="100%"
                            vertical width="100%"
                            className="btn-hover"
                            hoverColor="#eeeeee"
                            textColor="black"
                            backgroundActive="#eeeeee"
                        />
                    </div>
                }

            </SimpleBar>

        </div>


    );
}

export default ChatLayout;