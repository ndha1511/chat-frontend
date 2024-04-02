import { useDispatch, useSelector } from "react-redux";
import ButtonGroup from "../../components/buttons/button-group/ButtonGroup";
import Header from "./header/Header";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { getRoomsBySenderId } from "../../services/RoomService";
import { createRooms } from "../../redux/reducers/renderRoom";
import { useNavigate } from "react-router-dom";
import BoxChat from "../../components/box-chat/BoxChat";

function ChatLayout() {
    const rooms = useSelector((state) => state.room.rooms);
    const navigate = useNavigate();
    const user = useSelector((state) => state.userInfo.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [roomRender, setRoomRender] = useState([]);
    useEffect(() => {
        if(user) {
            const getRoom = async (id) => {
                try {
                    const response = await getRoomsBySenderId(id);
                    dispatch(createRooms(response.roomResponses));
                    setLoading(false);
                } catch (error) {
                    console.log(error)
                    setLoading(false);
                }
            }
            getRoom(user.id);
        } else {
            navigate("/auth/login");
        }

    }, [dispatch, user.id]);

    useEffect(() => {
        const listBoxChat = rooms.map((room) => { return {item: <BoxChat room={room} /> }});
        setRoomRender(() => listBoxChat);
    }, [rooms]);

    return (
        <div className="d-flex w-100" style={{ flexDirection: "column"}}>
            {loading ? <div className="d-flex w-100 justify-content-center align-items-center"
                style={{ height: "500px"}}
            >
                <Spinner animation="border" variant="primary" />
            </div> :
            <div>
                <Header />
            <div className="d-flex">
                {rooms.length <= 0 ? 
                <div className="d-flex w-100 justify-content-center align-items-center" 
                style={{ textAlign: "center", height: "500px"}}>
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
            }

        </div>
    );
}

export default ChatLayout;