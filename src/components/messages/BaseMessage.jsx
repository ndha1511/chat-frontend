import { useState } from "react";
import "./BaseMessage.scss";
import ButtonGroup from "../buttons/button-group/ButtonGroup";
import { btnCT } from "../../configs/button-group-icon-config";

function BaseMessage(props) {
    const [hiddenBtn, setHiddenBtn] = useState(false);
    const buttons = btnCT;
    return (
        <div onMouseEnter={() => setHiddenBtn(true)}
            onMouseLeave={() => setHiddenBtn(false)}
            className="d-flex w-100 " style={{ flexDirection: props.isSender ? "row" : "row-reverse", alignItems: "flex-end", justifyContent: "flex-end" }}>
            <div className="hidden" style={{ display: hiddenBtn ? "block" : "none", marginBottom: "20px" }}>
                <div style={{backgroundColor:'white', borderRadius:5,border:'0.5px solid grey'}}>
                    <ButtonGroup buttons={buttons}
                        className="btn-hover"
                        width={25}
                        height={25}
                        backgroundActive="#6495ed"
                        hoverColor="#87cefa"
                        active={0}
                        textHoverColor="blue"
                        fontSize={18}
                        backgroundColor="white"
                        borderRadius={5}
                    />
                </div>

            </div>

            {props.children}
            {
                props.lastMessage ?
                    <div className="m-2">
                        <p>status message</p>
                    </div> : <></>
            }

        </div>
    );
}

export default BaseMessage;