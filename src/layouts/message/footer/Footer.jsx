import { useSelector } from "react-redux";
import ButtonGroup from "../../../components/buttons/button-group/ButtonGroup";
import { actionChatIcon } from "../../../configs/button-group-icon-config";
import "./Footer.scss";


function Footer(props) {
    const buttons = actionChatIcon;
    const userCurrent = useSelector((state) => state.userInfo.user);
    return (
        <div className="d-flex w-100" style={{ height: "100%", flexDirection: 'column' }}>
            <div className="d-flex w-100" style={{ paddingLeft: 15, height: "45%", alignItems: "center" }}>
                <ButtonGroup buttons={buttons} className="btn-hover"
                    marginRight={15}
                    width={40} height={40}
                    hoverColor="#f0f0f0"
                />
            </div>
            <div className="d-flex w-100" style={{ height: "45%", borderTop: "1px solid gray" }}>
                <label htmlFor="input-msg" style={{ width: "100%"  }}>
                    <textarea placeholder={`Nhập tin nhắn gửi tới ${props.user.name}`} id="input-msg" className="input-message"/>
                </label>
            </div>
        </div>
    );
}

export default Footer;