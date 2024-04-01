import Avatar from "../../../components/avatar/Avatar";
import ButtonGroup from "../../../components/buttons/button-group/ButtonGroup";
import ButtonIcon from "../../../components/buttons/button-icon/ButtonIcon";
import { chatIcon } from "../../../configs/button-group-icon-config";

function Header() {
    const buttons = chatIcon;
    return (
        <div className="d-flex w-100 p-3" style={{ height: "100%", 
        justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f0f0" }}>
            <div className="d-flex" style={{ alignItems: "center" }}>
                <Avatar/>
                <div className="d-flex" style={{ 
                    marginLeft: 10,
                    alignItems: "center",
                 }}>
                    <span style={{ fontWeight: "bold" }}>User Name</span>
                    <ButtonIcon
                        title="Chỉnh sửa"
                    ><i className="bi bi-pencil-square"></i></ButtonIcon>
                </div>
            </div>
            <div className="action">
                <ButtonGroup buttons={buttons} className="btn-hover" width={40} height={40} hoverColor="#f0f0f0"/>
            </div>
        </div>
    );
}

export default Header;