import { useSelector } from "react-redux";
import Content from "./content/Content";
import Footer from "./footer/Footer";
import Header from "./header/Header";


function MessageLayout(props) {
    const chatInfo = useSelector(state => state.message.chatInfo);
    // console.log(chatInfo);
    return (
        <div className="d-flex w-100">
            {Object.keys(chatInfo).length > 0 ?
                <div className="d-flex w-100" style={{ flexDirection: "column" }}>
                    <div className="d-flex w-100" style={{ height: "12%", paddingTop: "18px", alignItems: 'center', paddingLeft: "15px" }}>
                        {props.backButton}
                        <Header user={chatInfo.user}/>
                    </div>
                    <div className="w-100" style={{ height: "70%" }}>
                        <Content roomId={chatInfo.roomId}/>
                    </div>
                    <div className="d-flex w-100" style={{ height: "18%" }}>
                        <Footer user={chatInfo.user}/>
                    </div>
                </div> :
                <div className="d-flex w-100" style={{ 
                    backgroundImage: `url("/assets/images/background-zalo.png")`,
                    height: "100%",
                 }}>
                    
                </div>
            }
        </div>
    );
}

export default MessageLayout;