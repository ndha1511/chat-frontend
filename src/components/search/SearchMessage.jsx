import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

function SearchMessage() {
    const messageSearch = useSelector((state) => state.message.messageSearch);
    return (
        <div className="p-2">
            <div>
                <h6>Kết quả tìm kiếm</h6>
                <small>{!messageSearch.show ? "Nhập nội dung cần tìm trong hộp thoại" : "Danh sách kết quả phù hợp trong hội thoại"}</small>
            </div>
            <div className="d-flex justify-content-center p-3 mt-3">
                {messageSearch.show ?
                messageSearch.loading ? <div className="d-flex flex-column w-100 align-items-center">
                    <Spinner style={{marginTop: window.innerHeight * 0.3}} animation="border" role="status" variant="primary"><span className="visually-hidden">
                    Loading...</span></Spinner>
                    <span>Đang tìm kiếm...</span>
                </div> : 
                messageSearch.messages.length > 0 ? <></> :
                <div className="d-flex flex-column w-100 align-items-center">
                    <img src="assets/images/search-empty.png" alt="icon-search" width={180} height={160}/>
                    <span>Không tìm thấy kết quả phù hợp</span>
                </div>
                 :
                <img src="assets/images/search-empty.png" alt="icon-search" width={180} height={160}/>}
            </div>
        </div>
    );
}

export default SearchMessage;