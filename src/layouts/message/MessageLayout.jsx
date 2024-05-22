import { useSelector } from "react-redux";
import Content from "./content/Content";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import "./MessageLayout.scss";
import { useEffect, useRef, useState } from "react";
import { Icon } from "zmp-ui";

function MessageLayout(props) {
    const chatInfo = useSelector(state => state.message.chatInfo);
    const messageReply = useSelector(state => state.message.messageReply);
    const checkKeyMessageReply = () => {
        if(Object.keys(messageReply).length > 0 ) {
            return true;
        }
        return false;
    }
    const [heightFooter, setHeightFooter] = useState();

    const footer = useRef(null);

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.target === footer.current) {
                    setHeightFooter(entry.contentRect.height);
                }
            }
        });

        if (footer.current) {
            observer.observe(footer.current);
        }

        // Cleanup observer on component unmount
        return () => {
            if (footer.current) {
                observer.unobserve(footer.current);
            }
        };
    }, [footer]);
     

    const images = [

        {src:"/assets/images/slide1.png",caption: "Nhắn tin nhiều hơn, soạn thảo ít hơn", text: "Sử dụng tin nhắn nhanh để lưu sẵn các tin nhắn thường  dùng và gửi nhanh trong hội thoại bất kì. " },
        {src:"/assets/images/slide2.png",caption:"Tin nhắn tự xóa",text:"Từ giờ tin nhắn đã có thể tự độn xóa sau khoảng thời gian nhất định"},
        {src:"/assets/images/slide3.jpg",caption:"Gọi nhóm và làm việc hiệu quả với Zalo Group Call",text:"Trao đổi công việc mọi lúc mọi nơi"},
        {src:"/assets/images/slide4.jpg",caption:"Trải nghiệm xuyên suốt",text:"Kết nối và giải quyết công việc trên mọi thiết bị với dữ liệu luôn được đồng bộ"},
        {src:"/assets/images/slide5.png",caption:"Gửi File nặng?",text:"Đã có Zalo PC 'xử' hết"},
        {src:"/assets/images/slide6.jpg",caption:"Chát nhóm với đồng nghiệp",text:"Tiện lợi hơn, nhờ các công cụ hỗ trợ trên máy tính"},
        {src:"/assets/images/slide7.jpg",caption:"Giải quyết công việc hiệu quả hơn, lên đến 40%",text:"Với Zalo PC"},

    ];
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if(Object.keys(chatInfo).length <= 0 ) {
            const interval = setInterval(() => {
                setCurrentSlide((currentSlide + 1) % images.length); // Cập nhật slide tiếp theo
            }, 3000);
            return () => clearInterval(interval);
        } // Thay đổi slide mỗi 3 giây
    }, [currentSlide, images.length, chatInfo]);
    // console.log(chatInfo);
    const handlePrevSlide = () => {
        setCurrentSlide((currentSlide - 1 + images.length) % images.length);
    };

    const handleNextSlide = () => {
        setCurrentSlide((currentSlide + 1) % images.length);
    };
    return (
        <div className="d-flex w-100" >
            {Object.keys(chatInfo).length > 0 ?
                <div className="d-flex w-100" style={{ flexDirection: "column" }}>
                    <div className="d-flex w-100" style={{ height: "12%", paddingTop: "18px", alignItems: 'center', paddingLeft: "15px" }}>
                        <span style={{marginTop:-27, marginRight:-15}}>{props.backButton}</span>

                        <Header/>

                    </div>
                    <div className="w-100" style={{  height: checkKeyMessageReply() ? "50%" : "70%", width: '100%' }}>
                        <Content roomId={chatInfo.roomId} heightFooter={heightFooter}/>
                    </div>
                    <div ref={footer} className="d-flex w-100" style={{ height: checkKeyMessageReply() ? "38%" : "18%", zIndex: 990 }}>
                        <Footer user={chatInfo.user} />
                    </div>
                </div> :
                <div className="d-flex w-100 carousel" style={{ height: "100%" }}>
                    <div className="title" style={{ color: '#236DDC', textAlign: 'center', position: 'absolute', width: '100%' }}>
                        <p>Chào mừng đến với <span>Zalo PC!</span></p>
                        <span>Khám phá những tiện ích hỗ trợ việc làm và trò chuyện cùng người <br />
                            thân, bạn bè được tối ưu hóa cho máy tính của bạn.</span>
                    </div>
                    <div className="slide" style={{ backgroundImage: `url(${images[currentSlide].src})` }}></div>
                    <div className="caption" style={{ color: '#236DDC', textAlign: 'center', position: 'absolute', width: '100%' }}>
                        {images[currentSlide].caption}
                    </div>
                    <div className="text" style={{ color: 'black', textAlign: 'center', position: 'absolute', width: '100%' }}>
                        {images[currentSlide].text}
                    </div>
                    <button className="prev-button" onClick={handlePrevSlide}><Icon icon="zi-chevron-left" size={50} /></button>
                    <button className="next-button" onClick={handleNextSlide}><Icon icon="zi-chevron-right" size={50} /></button>
                    <div className="dots">
                        {images.map((_, index) => (
                            <span key={index} className={`dot ${index === currentSlide ? 'active' : ''}`} />
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}

export default MessageLayout;