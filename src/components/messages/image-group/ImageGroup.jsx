import { useSelector } from "react-redux";
import BaseMessage from "../BaseMessage";
import { emojis } from "../../../configs/button_group_icon_config";


function ImageGroup(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);
    const images = props.message.content;
    const messageStatus = props.message.messageStatus;
    


    return (
        <BaseMessage message={props.message} isSender={userCurrent.email === props.message.senderId}
            lastMessage={props.lastMessage ? true : false}>
            {messageStatus === "SENDING" ? <div style={{ position: "relative", padding: 10 }}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVf3Y4C59D3Y_SOFpvOnqh64ON-yo7CkaXOJGflrjqAA&s"
                    style={{ maxHeight: "800px", maxWidth: "300px", borderRadius: "10px" }}
                />
                <button className="btn-icon-custom">👍</button>
            </div> :
                <div style={{ position: "relative", padding: 10, display: "flex", width: "65%", flexWrap: "wrap", justifyContent: "flex-end" }}>
                    {images.map((image, index) => {
                        return <img src={image.filePath}
                        style={{ maxHeight: "500px", maxWidth: "45vh", borderRadius: "10px" }}
                    />
                    })}
                    <button className="btn-icon-custom">👍</button>
                </div>}
        </BaseMessage>
    );
}
 
export default ImageGroup;