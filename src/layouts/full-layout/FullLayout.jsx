import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Navbar from "../navbars/Navbar";
import ButtonIcon from "../../components/buttons/button-icon/ButtonIcon";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { useDispatch, useSelector } from "react-redux";
import { reRenderMessge } from "../../redux/reducers/messageReducer";
import { createRooms, reRenderRoom } from "../../redux/reducers/renderRoom";
import { getRoomsBySenderId } from "../../services/RoomService";
import { useNavigate } from "react-router-dom";
import { setFriend } from "../../redux/reducers/friendReducer";
import { getFriendRequest } from "../../services/FriendService";
import { findGroupBySenderId } from "../../services/GroupService";
import { setGroup } from "../../redux/reducers/groupReducer";
import AudioCallDragable from "../../components/webrtc/AudioCallDragable";
import CallRequestDragable from "../../components/webrtc/CallRequestDragable";
import { getUserByEmail } from "../../services/UserService";
import { reRenderMember } from "../../redux/reducers/renderOffcanvas";


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
  const renderGroup = useSelector((state) => state.group.renderGroup);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [connection, setConnection] = useState(false);
  const [showDragableCallRequest, setShowDragableCallRequest] = useState(false);
  const [showDragableCallQuestion, setShowDragableCallQuestion] = useState(false);
  const [callerInfo, setCallerInfo] = useState({});
  const [messageCall, setMessageCall] = useState({});


  useEffect(() => {
    const getListFriends = async (email) => {
      try {
        const response = await getFriendRequest(email);
        dispatch(setFriend(response));
      } catch (error) {
        console.log(error);
      }

    }
    const getGroups = async (email) => {
      try {
        const response = await findGroupBySenderId(email);
        dispatch(setGroup(response));
      } catch (error) {
        console.log(error);
      }
    }
    if (user) {
      getListFriends(user.email);
      getGroups(user.email);
    }


  }, [renderGroup]);



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
        case "CREATE_GROUP":
        case "ADD_MEMBER":
          dispatch(reRenderRoom());

          stompClient.subscribe(`/user/${room.roomId}/queue/messages`, onEventReceived, { id: room.roomId });
          break;
        case "ADD_ADMIN":
        case "REMOVE_ADMIN":
        case "ADD_MEMBER_GROUP":
          dispatch(reRenderMember());
          dispatch(reRenderRoom());
          dispatch(reRenderMessge());
          break;
        case "REMOVE_MEMBER":
        case "REMOVE_GROUP":
        case "LEAVE":
          dispatch(reRenderRoom());
          dispatch(reRenderMessge());
          dispatch(reRenderMember());
          stompClient.unsubscribe(room.roomId);
          break;
        case "CALL_REQUEST":
          getCallerInfo(dataReceived.senderId);
          setMessageCall(dataReceived.message);
          setShowDragableCallQuestion(true);
          break;
        case "REJECT_CALL":
        case "MISSED_CALL":
          setShowDragableCallQuestion(false);
          setShowDragableCallRequest(false);
          dispatch(reRenderRoom());
          dispatch(reRenderMessge());
          break;
        case "ACCEPT_CALL":
          setShowDragableCallQuestion(false);
          setShowDragableCallRequest(false);
          dispatch(reRenderRoom());
          dispatch(reRenderMessge());
          break;
        default:
          dispatch(reRenderRoom());
          dispatch(reRenderMessge());
          break;
      }
    }

  }
  const getCallerInfo = async (senderId) => {
    const caller = await getUserByEmail(senderId);
    setCallerInfo(caller);
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
      if (connection) {
        if (!connected) {
          if (rooms.length > 0) {
            rooms.forEach(room => {

              if (room.roomType === "GROUP_CHAT" && room.roomStatus !== "INACTIVE") {
                stompClient.subscribe(`/user/${room.roomId}/queue/messages`, onEventReceived, { id: room.roomId });

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

  const hiddenDragable = () => {
    setShowDragableCallQuestion(false);
  }

  const hiddenDragableRequest = () => {
    setShowDragableCallRequest(false);
  }

  const showDragableRequest = () => {
    setShowDragableCallRequest(true);
  }
  return (
    <div className="d-flex" style={{ height: "100vh", position: "relative", width: "100wh" }}>
      {showDragableCallQuestion && <AudioCallDragable hiddenDragable={hiddenDragable}
        callerInfo={callerInfo}
        message={messageCall} />}
      {showDragableCallRequest && <CallRequestDragable hiddenDragable={hiddenDragableRequest} />}
      <div className={`${Object.keys(state).length > 0 ? "d-none" : ""} d-lg-flex d-md-flex`}>
        <Navbar />
      </div>
      <div
        className={`${Object.keys(state).length > 0 ? "d-none" : ""} d-lg-flex d-md-flex col-12 col-md-3 `}
        style={{
          paddingTop: 30,
          maxHeight: "100vh",
          borderRight: "0.5px solid #f0f0f0",
          flexDirection: "column",
          flex: windowSize.width <= 768 ? 1 : "",
          // overflow:'hidden',
          // border:'1px solid red',

        }}
      >
        <div className="d-flex w-100" style={{ paddingLeft: 15 }}>
          <Header />
        </div>
        <div  >
          {props.sidebar}
        </div>
      </div>
      <div className={`${Object.keys(state).length <= 0 ? "d-none" : " "} d-flex d-lg-flex d-md-flex col-12 col-md-8`} style={{
        display: "flex",
        // flexDirection: "column",
        flex: 1
      }}>
        {React.cloneElement(props.content, {
          showDragableRequest: showDragableRequest,
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