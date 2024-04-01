import Avatar from "../../components/avatar/Avatar";
import ButtonGroup from "../../components/buttons/button-group/ButtonGroup";
import ButtonIcon from "../../components/buttons/button-icon/ButtonIcon";
import { navbarIcon } from "../../configs/button-group-icon-config";
import "./Navbar.scss";
function Navbar() {
    const buttons = navbarIcon;
    return (
        <nav className="bg-info navbar-vertical">
            <div>
                <div className="d-flex justify-content-center align-items-center m-2 mb-4 mt-4">
                    <Avatar />
                </div>
                <div>
                    <ButtonGroup buttons={buttons} vertical
                        className="btn-hover"
                        width={68}
                        height={65}
                        backgroundActive="#6495ed"
                        hoverColor="#87cefa"
                        active={0}
                        textHoverColor="blue"
                    />
                </div>
            </div>

            <div className="footer">
                <ButtonIcon
                    className="btn-hover"
                    width={68}
                    height={65}
                    title="Cài đặt"
                    hoverColor="#87cefa"
                >
                    <i className="bi bi-gear" style={{ fontSize: "25px"}}></i>
                </ButtonIcon>
            </div>
        </nav>

    );
}

export default Navbar;