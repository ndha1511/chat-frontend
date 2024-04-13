import {useSelector } from "react-redux";
import ButtonGroup from "../../components/buttons/button-group/ButtonGroup";
import Header from "./header/Header";
import { useEffect, useState } from "react";
import BoxChat from "../../components/box-chat/BoxChat";

function ChatLayout() {
    const rooms = useSelector((state) => state.room.rooms);
    const [roomRender, setRoomRender] = useState([]);

    

    useEffect(() => {
        const listBoxChat = rooms.map((room) => { return {item: <BoxChat room={room}/> }});
        setRoomRender(() => listBoxChat);
    }, [rooms]);

    return (
        <div className="d-flex w-100" style={{ flexDirection: "column", overflowY:'auto'}}>
            <div>
                <Header />
            <div className="d-flex">
                {rooms.length <= 0 ? 
                <div className="d-flex w-100 justify-content-center align-items-center" 
                style={{ textAlign: "center", height: '78vh', overflowY:'auto'}}>
                    <p>Bạn chưa có cuộc trò chuyện nào, <br></br> hãy kết thêm bạn mới để trò chuyện nhé</p>
                </div>
                :
                <ButtonGroup buttons={roomRender}
                widthBtnGroup="100%"
                vertical width="100%"
                className="btn-hover"
                hoverColor="#eeeeee"
                textColor="black"
                backgroundActive="#eeeeee"
                />
                }
            </div>
            </div>

        </div>
    );
}

export default ChatLayout;