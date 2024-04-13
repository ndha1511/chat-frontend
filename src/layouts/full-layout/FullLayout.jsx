import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Navbar from "../navbars/Navbar";
import ButtonIcon from "../../components/buttons/button-icon/ButtonIcon";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { useDispatch, useSelector } from "react-redux";
import { pushMessage, reRenderMessge } from "../../redux/reducers/messageReducer";
import { createRooms, reRenderRoom } from "../../redux/reducers/renderRoom";
import { getRoomsBySenderId } from "../../services/RoomService";
import { useNavigate} from "react-router-dom";
import { setFriend } from "../../redux/reducers/friendReducer";
import { getFriendRequest } from "../../services/FriendService";

export var stompClient = null;

export const connect = (onConnected, onError) => {
  let sock = new SockJS('http://localhost:8080/ws');
  stompClient = over(sock);
  stompClient.connect({}, onConnected, onError);

}

export const disconnect = () => {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
}



function FullLayout(props) {
  const user = useSelector((state) => state.userInfo.user);
  const rooms = useSelector((state) => state.room.rooms);
  const rerenderRoom = useSelector((state) => state.room.reRender);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [connection, setConnection] = useState(false);
  useEffect(() => {
    const getListFriends = async (email) => {
        try {
            const response = await getFriendRequest(email);
            dispatch(setFriend(response));
        } catch (error) {
            console.log(error);
        }
        
    }
    if(user)
      getListFriends(user.email);

  }, []);



  const state = props.state;
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });




  const dispatch = useDispatch();
  const changeShowComponent = () => {
    dispatch(props.action());
  }
  const onEventReceived = (payload) => {
    const dataReceived = JSON.parse(payload.body);
    if (dataReceived.hasOwnProperty("status")) {
      const status = dataReceived.status;
      const room = dataReceived.room;
      switch (status) {
        case "SUCCESS":
          dispatch(reRenderRoom());
          dispatch(reRenderMessge());
          break;
        case "SENT":
          dispatch(reRenderRoom());
          dispatch(reRenderMessge());
          break;
        case "SEEN":
          dispatch(reRenderRoom());
          dispatch(reRenderMessge());
          break;
        case "CREATE_GROUP":
          dispatch(reRenderRoom());
          stompClient.subscribe(`/user/${room.roomId}/queue/messages`, onEventReceived, {id: room.roomId});
          break;
        case "ADD_MEMBER":
          dispatch(reRenderRoom());
          stompClient.subscribe(`/user/${room.roomId}/queue/messages`, onEventReceived, {id: room.roomId});
          break;
        case "ADD_MEMBER_GROUP":
          dispatch(reRenderRoom());

          dispatch(reRenderMessge());
          break;
        case "REMOVE_MEMBER":
          dispatch(reRenderRoom());
          dispatch(reRenderMessge());

          stompClient.unsubscribe(room.id);
          break;
        case "REMOVE_MEMBER_GROUP":
          dispatch(reRenderRoom());

          dispatch(reRenderMessge());
          break;
        case "REMOVE_GROUP": 
          dispatch(reRenderRoom());
          dispatch(reRenderMessge());

          stompClient.unsubscribe(room.id);
          break;
        case "LEAVE":
          dispatch(reRenderRoom());

          dispatch(reRenderMessge());
          stompClient.unsubscribe(room.id);
          break;
        case "MEMBER_LEAVE":
          dispatch(reRenderRoom());
          dispatch(reRenderMessge());
          break;

        case "REVOKED_MESSAGE":
          dispatch(reRenderRoom());
          dispatch(reRenderMessge());
        default:
          break;
      }
    } else {

    }



  }
  
  useEffect(() => {
    const onConnected = () => {
      if (user)
        stompClient.subscribe(`/user/${user.email}/queue/messages`, onEventReceived);
      setConnection(true);
    }

    const onError = (err) => {
      console.log(err);
    }

    connect(onConnected, onError);
    setLoading(true);
  }, []);
  useEffect(() => {
    if (user) {
      const getRoom = async (id) => {
        try {
          const response = await getRoomsBySenderId(id);
          dispatch(createRooms(response.roomResponses));
        } catch (error) {
          console.log(error)
        }
      }
      getRoom(user.email);
    } else {
      navigate("/auth/login");
    }

  }, [dispatch, user && user.email ? user.email : "", rerenderRoom, loading]);

  useEffect(() => {
    try {
      if(connection) {
        if(!connected) {
          if(rooms.length > 0) { 
            rooms.forEach(room => {

              if(room.roomType === "GROUP_CHAT" && room.roomStatus !== "INACTIVE"){
                stompClient.subscribe(`/user/${room.roomId}/queue/messages`, onEventReceived, {id: room.roomId});

              }

            })
            setConnected(true);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [rooms])

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowSize]);
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <div className={`${Object.keys(state).length > 0 ? "d-none" : ""} d-lg-flex d-md-flex`}>
        <Navbar />
      </div>
      <div
        className={`${Object.keys(state).length > 0 ? "d-none" : ""} d-lg-flex d-md-flex col-12 col-md-3 `}
        style={{
          paddingTop: 30,
          height: "100vh",
          borderRight: "0.5px solid #f0f0f0",
          flexDirection: "column",
          flex: windowSize.width <= 768 ? 1 : ""
        }}
      >
        <div className="d-flex w-100" style={{ paddingLeft: 15 }}>
          <Header />
        </div>
        <div className="pt-3 ">
          {props.sidebar}
        </div>
      </div>
      <div className={`${Object.keys(state).length <= 0 ? "d-none" : " "} d-flex d-lg-flex d-md-flex col-12 col-md-8`} style={{
        display: "flex",
        // flexDirection: "column",
        flex: 1
      }}>
        {React.cloneElement(props.content, {
          backButton: windowSize.width <= 768 ?
            <ButtonIcon
              clickButton={() => { changeShowComponent() }}
              className="btn-hover"
              hoverColor="#f0f0f0"
              borderRadius={50}><i className="bi bi-arrow-left"></i></ButtonIcon> :
            <></>
        })}
      </div>
    </div>
  );
}

export default FullLayout;