
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Navbar from "../navbars/Navbar";
import ButtonIcon from "../../components/buttons/button-icon/ButtonIcon";
import { useDispatch } from "react-redux";
import { setChatInfo } from "../../redux/reducers/messageReducer";

function FullLayout(props) {

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
              borderRadius={50}
            ><i className="bi bi-arrow-left"></i></ButtonIcon> :
            <></>
        })}
      </div>
    </div>
  );
}

export default FullLayout;