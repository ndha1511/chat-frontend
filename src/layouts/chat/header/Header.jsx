import ButtonGroup from "../../../components/buttons/button-group/ButtonGroup";
import { filterMessageIcon } from "../../../configs/button_group_icon_config";

function Header(props) {
    const buttons = filterMessageIcon;

    const clickButton = (index) => {
        switch (index) {
            case 0:
                props.clickAllButton();
                break;
            case 1:
                props.clickUnreadButton();
                break;
            default:
                break;
        }
    }
    return (
        <div className="d-flex w-100" style={{ 
            borderBottom: "1px solid #f0f0f0",
            paddingLeft: 15
         }}>
            <ButtonGroup buttons={buttons} className="btn-hover" 
            colorActive="blue"
            hoverColor="none"
            fontWeight="bold"
            textHoverColor="blue"
            active={0}
            handle={clickButton}
            />
        </div>
    );
}

export default Header;