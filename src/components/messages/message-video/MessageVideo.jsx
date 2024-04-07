import BaseMessage from "../BaseMessage";
import { useSelector } from 'react-redux';
import { arrayToDateTime } from '../../../utils/DateTimeHandle';

function MessageVideo(props) {
    const userCurrent = useSelector((state) => state.userInfo.user);
    const fileInfo = props.message.content;
    return (
        <BaseMessage
            message={props.message}
            isSender={userCurrent.email === props.message.senderId}
            lastMessage={props.lastMessage ? true : false}
        >
            <div style={{display:'flex',flexDirection:'column'}}>
                <video width="350" height="500" controls >
                    <source src={fileInfo.filePath} type="video/mp4" />
                </video>
            <div style={{display:'flex',justifyContent:'flex-end',marginTop:10}}>
            <span style={{fontSize:12, color:'white',border:'0.5px solid rgb(154, 150, 150)', backgroundColor:'grey',width:45,
                borderRadius:10, display:'flex',alignItems:'center',justifyContent:'center',height:30

            }}>{`${arrayToDateTime(props.message.sendDate).getHours()}:${arrayToDateTime(props.message.sendDate).getMinutes()}`}</span>
            </div>
            </div>

        </BaseMessage>
    );
}

export default MessageVideo;