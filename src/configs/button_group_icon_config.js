import { Icon } from "zmp-ui"
import VideoIcon from "../components/icons/Icons"
import Icons from "../components/icons/Icons"

// icon in navbar
export const navbarIcon = [
    {
        item:<Icon style={{color:'white'}} icon="zi-chat" size={30}/>,
        title: "Tin nhắn"
    },
    {
        item: <Icons type="contact" fillColor="white" size={33} />,
        title: "Danh bạ"
    },
    {
        item: <Icons type="video" fillColor="white" size={25} />,
        title: "Meeting"
    },
]

// add friend, create group chat
export const friendIcon = [
    {
        item:  <Icon icon="zi-add-user"/>,
        title: "Thêm bạn"
    },
    {
        item: <Icon icon="zi-add-member"/>,
        title: "Tạo nhóm chat"
    }
]

// send sticker, file, image
export const actionChatIcon = [
    {
        item: <img src="/assets/icons/sticker-icon.png" alt="sticker" width={20} height={20} />,
        title: "Gửi sticker"

    },
    {
        item: <label htmlFor="image" style={{ cursor: "pointer" }}>
            <input id="image" type="file" accept="image/*" style={{ display: "none" }} />
            <i className="bi bi-image" style={{ fontSize: 20 }}></i>
        </label>,
        title: "Gửi hình ảnh"
    },
    {

        item: <label htmlFor="attachFile" style={{ cursor: "pointer" }}>
            <input id="attachFile" type="file" style={{ display: "none" }} />
            <i className="bi bi-paperclip" style={{ fontSize: 20 }}></i>
        </label>,
        title: "Đính kèm file"
    }
]

// message header icon
export const chatIcon = [
    {
        item: <i className="bi bi-search"></i>,
        title: "Tìm kiếm tin nhắn"
    },
    {
        item: <i className="bi bi-telephone"></i>,
        title: "Cuộc gọi thoại"
    },
    {
        item: <i className="bi bi-camera-video"></i>,
        title: "Gọi video"
    },
    {
        item: <i className="bi bi-square-half"></i>,
        title: "Thông tin hội thoại"
    }
]

// header list chat room 
export const filterMessageIcon = [
    {
        item: "Tất cả"
    },
    {
        item: "Chưa đọc"
    }
] 

export const btnCT = [
    {    item: <i className="bi bi-quote" style={{ transform: 'scaleX(-1) scaleY(-1)',}}></i>,},
    {    item: <i className="bi bi-reply-fill" style={{ transform: 'scaleX(-1) ',}}></i>,},
    {    item: <i className="bi bi-three-dots"></i>,},

]

export const emojis = [
    {
        id: "6610ff903df61304b883dce3",
        icon: "❤️",
        emojiType: "HEART"
    },
    {
        id: "6610ffd93df61304b883dce4",
        icon: "👍",
        emojiType: "LIKE"
    },
    {
        id: "661100463df61304b883dce5",
        icon: "😆",
        emojiType: "SMILE"
    },
    {
        id: "661100b23df61304b883dce6",
        icon: "😭",
        emojiType: "CRY"
    },
    {
        id: "661101803df61304b883dce7",
        icon: "😠",
        emojiType: "ANGRY"
    },
    {
        id: "6611056c3df61304b883dce8",
        icon: "😮",
        emojiType: "WOW"
    }
]

