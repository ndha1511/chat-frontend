import Content from "./content/Content";
import Footer from "./footer/Footer";
import Header from "./header/Header";

function MessageLayout(props) {
    return (
        <div className="d-flex w-100" style={{ flexDirection: "column" }}>
            <div className="d-flex w-100" style={{ height: "12%", paddingTop: "18px", alignItems: 'center', paddingLeft: "15px" }}>
                {props.backButton}
                <Header/>
            </div>
            <div className="w-100" style={{ height: "70%" }}>
                <Content/>
            </div>
            <div className="d-flex w-100" style={{ height: "18%" }}>
                <Footer/>
            </div>
        </div>
    );
}

export default MessageLayout;