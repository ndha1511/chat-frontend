import BoxChat from "../../components/box-chat/BoxChat";
import ButtonGroup from "../../components/buttons/button-group/ButtonGroup";
import Header from "./header/Header";

function ChatLayout() {
    const chatBoxs = [
        {
            item: <BoxChat />,
        },
        {
            item: <BoxChat />,
        },
        {
            item: <BoxChat />,
        },
        {
            item: <BoxChat />,
        }
    ]
    return (
        <div className="d-flex" style={{ width: "100%", flexDirection: "column" }}>
            <Header />

            <ButtonGroup buttons={chatBoxs}
                vertical width="100%"
                className="btn-hover"
                hoverColor="#eeeeee"
                textColor="black"
                backgroundActive="#eeeeee"
            />

        </div>
    );
}

export default ChatLayout;