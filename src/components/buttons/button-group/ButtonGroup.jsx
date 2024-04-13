import { useState } from "react";
import ButtonIcon from "../button-icon/ButtonIcon";

function ButtonGroup(props) {
    const [active, setActive] = useState(props.active);
    const clickButton = (index) => {
        setActive(index);
        if(props.showModal) props.showModal(index);
        if(props.handle) props.handle(index);
    }
    return (
        <div className={`${props.vertical ? "btn-group-vertical" : "btn-group"}`}
            style={{ 
                width: props.widthBtnGroup
             }}
        >
            {
                props.buttons.map((button, index) => (
                    <ButtonIcon
                        key={index}
                        className={props.className}
                        width={props.width ? props.width : "auto"}
                        height={props.height ? props.height : "auto"}
                        background={active === index ? props.backgroundActive : null}
                        color={active === index ? props.colorActive : null}
                        clickButton={() => {clickButton(index)}}
                        hoverColor={props.hoverColor}
                        title={button.title}
                        borderBottom={active === index ? `2px solid ${props.colorActive}` : null}
                        fontWeight={props.fontWeight ? props.fontWeight : "normal"}
                        textHoverColor={props.textHoverColor ? props.textHoverColor : "black"}
                        marginRight={props.marginRight ? props.marginRight : 0}
                        fontSize = {props.fontSize}
                        borderRadius={props.borderRadius ? props.borderRadius : 0}
                     
                      
                    >
                        {button.item}
                    </ButtonIcon>
                 
                ))
            }
        </div>
    );
}

export default ButtonGroup;