
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Navbar from "../navbars/Navbar";
import ButtonIcon from "../../components/buttons/button-icon/ButtonIcon";

function FullLayout(props) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
 

  const [hiddenComponent, setHiddenComponent] = useState(false);
  const changeShowComponent = () => {
    setHiddenComponent(prev => !prev);
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
    <div className="d-flex">
      <Navbar />
      <div
        className={`d-flex ${!hiddenComponent ? "d-none" : ""} d-lg-flex d-md-flex`}
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
      <div className={`${hiddenComponent ? "d-none" : " "} d-lg-flex d-md-flex`} style={{
        display: "flex",
        // flexDirection: "column",
        flex: 1
      }}>        
        {React.cloneElement(props.content, {backButton: windowSize.width <= 768 ? 
        <ButtonIcon
          clickButton={() => {changeShowComponent()}}
          className="btn-hover"
          hoverColor="#f0f0f0"
          width={50}
          height={50}
          borderRadius={50}
        ><i class="bi bi-arrow-left"></i></ButtonIcon> :
        <></>
      })}
      </div>
    </div>
  );
}

export default FullLayout;