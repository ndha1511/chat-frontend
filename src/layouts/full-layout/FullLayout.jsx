import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Navbar from "../navbars/Navbar";
import ButtonIcon from "../../components/buttons/button-icon/ButtonIcon";
import { useDispatch, useSelector } from "react-redux";
import { reRenderMessge, setMessageCall } from "../../redux/reducers/messageReducer";
import { createRooms, reRenderRoom } from "../../redux/reducers/renderRoom";
import { getRoomsBySenderId } from "../../services/RoomService";
import { useNavigate } from "react-router-dom";
import { setFriend, setFriendAccepted } from "../../redux/reducers/friendReducer";
import { getFriendRequest, getListFriend } from "../../services/FriendService";
import { findGroupBySenderId, getGroupById } from "../../services/GroupService";
import { reRenderGroup, setGroup } from "../../redux/reducers/groupReducer";
import AudioCallDragable from "../../components/webrtc/AudioCallDragable";
import CallRequestDragable from "../../components/webrtc/CallRequestDragable";
import { getUserByEmail } from "../../services/UserService";
import AudioCallingView from "../../components/webrtc/AudioCallingView";
import { setDragableAudioCall, setDragableCallQuestion, setDragableCallRequest } from "../../redux/reducers/dragableReducer";
import { reRenderMember } from "../../redux/reducers/renderOffcanvas";
import VideoCallDragable from "../../components/webrtc/VideoCallDragable";
import VideoCallingView from "../../components/webrtc/VideoCallingView";
import { reRenderMessageHF } from "../../redux/reducers/renderMessage";
import { Icon } from "zmp-ui";
import { connect, stompClient } from "../../configs/SocketConfig";
import { closePeer, closeStream, localPeer, localStream } from "../../configs/WebRTCConfig";




function FullLayout(props) {
  const user = useSelector((state) => state.userInfo.user);
  const rooms = useSelector((state) => state.room.rooms);
  const messageCall = useSelector((state) => state.message.messageCall);
  const rerenderRoom = useSelector((state) => state.room.reRender);
  const renderGroup = useSelector((state) => state.group.renderGroup);
  const dragableAudioCall = useSelector((state) => state.dragable.dragableAudioCall);
  const dragableCallQuestion = useSelector((state) => state.dragable.dragableCallQuestion);
  const dragableCallRequest = useSelector((state) => state.dragable.dragableCallRequest);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [connection, setConnection] = useState(false);
  const [callerInfo, setCallerInfo] = useState({});
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [remoteStreamsUnique, setRemoteStreamsUnique] = useState([]);
  const [groupInfo, setGroupInfo] = useState({});


  // Hàm loại bỏ các phần tử trùng lặp từ một mảng
  const removeDuplicates = (array) => {
    return array.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  };

  // useEffect để kiểm tra và loại bỏ các phần tử trùng lặp khi remoteStreams thay đổi
  useEffect(() => {
    console.log(remoteStreams);
    setRemoteStreamsUnique(removeDuplicates(remoteStreams));
  }, [remoteStreams]);

  useEffect(() => {
    const getListFriendRequet = async (email) => {
      try {
        const response = await getListFriend(email);
        dispatch(setFriendAccepted(response));
      } catch (error) {
        console.error("", error);

      }
    };

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
      getListFriendRequet(user.email);
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

  const onCallReceived = (call) => {
    if (!localPeer) return;
    const callJson = JSON.parse(call.body);
    const receiverId = callJson.callFrom;
    getCallerInfo(receiverId);
    if (user.email === receiverId) return;

    localPeer.ontrack = (event) => {
      const audioElement = document.createElement('audio');
      audioElement.srcObject = event.streams[0];
      audioElement.onloadedmetadata = (e) => {
        audioElement.play();
      };
      if (!remoteStreams.some(stream => stream.id === event.streams[0].id)) {
        // Thêm stream mới vào danh sách remoteStreams
        setRemoteStreams(prevStreams => [...prevStreams, event.streams[0]]);
      }
    }

    localPeer.onicecandidate = (event) => {
      if (event.candidate) {
        var candidate = {
          type: "candidate",
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.candidate,
        }
        stompClient.send("/app/candidate", {}, JSON.stringify({
          receiverId: receiverId,
          fromUser: user.email,
          candidate: candidate
        }))
      }
    }


    localPeer.createOffer().then(description => {
      localPeer.setLocalDescription(description);
      stompClient.send("/app/offer", {}, JSON.stringify({
        receiverId: receiverId,
        fromUser: user.email,
        offer: {
          type: "offer",
          sdp: description.sdp
        }
      }))
    });

  }



  const onOfferReceived = (offer) => {
    var o = JSON.parse(offer.body)["offer"];
    getCallerInfo(JSON.parse(offer.body)["fromUser"]);


    localPeer.ontrack = (event) => {
      const audioElement = document.createElement('audio');
      audioElement.srcObject = event.streams[0];
      audioElement.onloadedmetadata = (e) => {
        audioElement.play();
      };
      if (!remoteStreams.some(stream => stream.id === event.streams[0].id)) {
        // Thêm stream mới vào danh sách remoteStreams
        setRemoteStreams(prevStreams => [...prevStreams, event.streams[0]]);
      }
    }

    localPeer.onicecandidate = (event) => {
      if (event.candidate) {
        var candidate = {
          type: "candidate",
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.candidate,
        }
        stompClient.send("/app/candidate", {}, JSON.stringify({
          receiverId: JSON.parse(offer.body)["fromUser"],
          fromUser: user.email,
          candidate: candidate
        }))
      }
    }



    localPeer.setRemoteDescription(new RTCSessionDescription(o));

    localPeer.createAnswer().then(description => {
      localPeer.setLocalDescription(description)
      console.log("Setting Local Description")
      console.log(description)
      stompClient.send("/app/answer", {}, JSON.stringify({
        receiverId: JSON.parse(offer.body)["fromUser"],
        fromUser: user.email,
        answer: {
          type: "answer",
          sdp: description.sdp,
        }
      }));

    })
  }

  const onAnswerReceived = (answer) => {
    var a = JSON.parse(answer.body)["answer"];
    console.log(a);
    localPeer.setRemoteDescription(new RTCSessionDescription(a));
  }

  const onCandidateReceived = (candidate) => {
    var c = JSON.parse(candidate.body)["candidate"];
    var iceCandidate = new RTCIceCandidate({
      sdpMLineIndex: c["label"],
      candidate: c["id"],
    })
    localPeer.addIceCandidate(iceCandidate)
  }



  const onFriendReceived = () => {
    dispatch(reRenderGroup())
  };


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
          stompClient.subscribe(`/user/${room.roomId}/topic/call`, onCallReceived, { id: `${room.roomId}_call` });
          break;
        case "ADD_ADMIN":
        case "REMOVE_ADMIN":
        case "REMOVE_MEMBER_GROUP":
        case "ADD_MEMBER_GROUP":
          dispatch(reRenderMember());
          dispatch(reRenderRoom());
          dispatch(reRenderMessge());
          dispatch(reRenderMessageHF());
          break;
        case "REMOVE_MEMBER":
        case "REMOVE_GROUP":
        case "LEAVE":
          dispatch(reRenderRoom());
          dispatch(reRenderMessge());
          dispatch(reRenderMember());
          dispatch(reRenderMessageHF());
          stompClient.unsubscribe(room.roomId);
          stompClient.unsubscribe(`${room.roomId}_call`);
          break;
        case "CALL_REQUEST":
          if (user.email !== dataReceived.message.senderId) {
            getCallerInfo(dataReceived.senderId);
            getGroupIfExist(dataReceived.message.receiverId);
            dispatch(setMessageCall(dataReceived.message));
            dispatch(setDragableCallQuestion(true));
          }
          break;
        case "REJECT_CALL":
        case "MISSED_CALL":
          dispatch(setDragableCallQuestion(true));
          dispatch(setDragableCallRequest(false));
          dispatch(reRenderRoom());
          dispatch(reRenderMessge());
          closeStream();
          break;
        case "END_CALL":
          dispatch(setDragableAudioCall(false));
          dispatch(reRenderRoom());
          dispatch(reRenderMessge());
          closeStream();
          closePeer();
          setRemoteStreams([]);
          break;
        case "ACCEPT_CALL":
          dispatch(setDragableCallRequest(false));
          dispatch(setDragableAudioCall(true));
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
    try {
      const caller = await getUserByEmail(senderId);
      setCallerInfo(caller);
    } catch (error) {
      console.log(error);
    }

  }

  const getGroupIfExist = async (groupId) => {
    try {
      const group = await getGroupById(groupId);
      setGroupInfo(group);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const onConnected = () => {
      if (user) {
        stompClient.subscribe(`/user/${user.email}/queue/messages`, onEventReceived);
        stompClient.subscribe(`/user/${user.email}/queue/friend-request`, onFriendReceived);
        stompClient.subscribe(`/user/${user.email}/queue/response-friend-request`, onFriendReceived);
        stompClient.subscribe(`/user/${user.email}/topic/call`, onCallReceived);
        stompClient.subscribe(`/user/${user.email}/topic/offer`, onOfferReceived);
        stompClient.subscribe(`/user/${user.email}/topic/answer`, onAnswerReceived);
        stompClient.subscribe(`/user/${user.email}/topic/candidate`, onCandidateReceived);
      }
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
                stompClient.subscribe(`/user/${room.roomId}/topic/call`, onCallReceived, { id: `${room.roomId}_call` });

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
    <div className="d-flex" style={{ height: "100vh", position: "relative", width: "100wh" }}>
      {dragableCallQuestion ? messageCall.messageType === "AUDIO_CALL" ? <AudioCallDragable callerInfo={callerInfo} /> :
        <VideoCallDragable
          callerInfo={callerInfo}
          groupInfo={groupInfo}
        /> : <></>}
      {dragableCallRequest && <CallRequestDragable />}
      {dragableAudioCall ? messageCall.messageType === "AUDIO_CALL" ? <AudioCallingView callerInfo={callerInfo}
      /> : <VideoCallingView
        remoteStreams={remoteStreamsUnique}
      /> : <></>}

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
          backButton: windowSize.width <= 768 ?
            <ButtonIcon
              clickButton={() => { changeShowComponent() }}
              className="btn-hover"
              hoverColor="#f0f0f0"
              marginRight={10}

              borderRadius={50}><Icon icon='zi-chevron-left-header' size={32} /></ButtonIcon> :
            <></>
        })}
      </div>
    </div>
  );
}

export default FullLayout;