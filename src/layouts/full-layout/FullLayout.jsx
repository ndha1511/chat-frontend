import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Navbar from "../navbars/Navbar";
import ButtonIcon from "../../components/buttons/button-icon/ButtonIcon";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { useDispatch, useSelector } from "react-redux";
import { pushMessage } from "../../redux/reducers/messageReducer";
import { reRenderRoom } from "../../redux/reducers/renderRoom";

var stompClient = null;

export const connect = (onConnected, onError) => {
  let sock = new SockJS('http://localhost:8080/ws');
  stompClient = over(sock);
  stompClient.connect({}, onConnected, onError);

}



function FullLayout(props) {
  const user = useSelector((state) => state.userInfo.user);

  const state = props.state;
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });




  const dispatch = useDispatch();
  const changeShowComponent = () => {
    dispatch(props.action());
  }
  useEffect(() => {
    const onConnected = () => {
      if (user)
        stompClient.subscribe(`/user/${user.email}/queue/messages`, onEventReceived);
    }
    const onEventReceived = (payload) => {
      dispatch(pushMessage(payload.body));
      // alert(payload.body);
      dispatch(reRenderRoom());
      // const info = payload.body;
      // const status = info.status || "";
      // switch (JSON.stringify(status)) {
      //   case "SUCCESS":
      //     dispatch(pushMessage(payload.body.message));
      //     dispatch(reRenderRoom());
      //     break;
      //   case "SENT":
          
      //     break;
      //   case "ERROR":
      //     dispatch(pushMessage(payload.body));
      //     dispatch(reRenderRoom());
      //     break;
  

      // }

    }

    const onError = (err) => {
      connect(onConnected, onError);
      console.log(err);
    }

    connect(onConnected, onError);
  }, []);

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