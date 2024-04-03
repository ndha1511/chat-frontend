// icon in navbar
export const navbarIcon = [
    {
        item: <i className="bi bi-chat-text" style={{ fontSize: "25px" }}></i>,
        title: "Tin nhắn"
    },
    {
        item: <i className="bi bi-file-person" style={{ fontSize: "25px" }}></i>,
        title: "Danh bạ"
    },
    {
        item: <i className="bi bi-camera-video" style={{ fontSize: "25px" }}></i>,
        title: "Meeting"
    },
]

// add friend, create group chat
export const friendIcon = [
    {
        item: <i className="bi bi-person-add"></i>,
        title: "Thêm bạn"
    },
    {
        item: <i className="bi bi-people"></i>,
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

