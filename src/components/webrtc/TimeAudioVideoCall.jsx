
import { useEffect, useState } from "react";
function TimeAudioVideoCall() {
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCounter(pre => pre + 1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [])


    // Tính số giờ, phút và giây từ biến đếm
    const hours = Math.floor(counter / 3600);
    const minutes = Math.floor((counter % 3600) / 60);
    const seconds = counter % 60;

    // Format giờ, phút và giây để luôn hiển thị hai chữ số
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return (

        <span>{formattedHours > 0 ? formattedHours : ''}{formattedMinutes}:{formattedSeconds}</span>

    );
}
export default TimeAudioVideoCall;