import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import Search from "./Search";
import SearchResult from "../messages/search-result/SearchResult";
import ButtonGroup from "../buttons/button-group/ButtonGroup";
import { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";

function SearchMessage() {
    const messageSearch = useSelector((state) => state.message.messageSearch);
    const [messageConvert, setMessageConvert] = useState([]);
    useEffect(() => {
        const convert = messageSearch.messages.map((msg) => {
            return { item: <SearchResult /> }
        });
        setMessageConvert(convert);
    }, [messageSearch])
    return (
        <div className="p-2 d-flex flex-column">
            <div>
                <h6>Kết quả tìm kiếm</h6>
                <small>{!messageSearch.show ? "Nhập nội dung cần tìm trong hộp thoại" : "Danh sách kết quả phù hợp trong hội thoại"}</small>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <SimpleBar style={{ width:'100%', height:'85vh'}}>
                    {messageSearch.show ?
                        messageSearch.loading ? <div className="d-flex flex-column w-100 align-items-center">
                            <Spinner style={{ marginTop: window.innerHeight * 0.3 }} animation="border" role="status" variant="primary"><span className="visually-hidden">
                                Loading...</span></Spinner>
                            <span>Đang tìm kiếm...</span>
                        </div> :
                            messageSearch.messages.length > 0 ?
                                <div className="d-flex w-100" style={{ overflow: "auto" }}>
                                    <ButtonGroup buttons={messageConvert}
                                        widthBtnGroup="100%"
                                        vertical width="100%"
                                        className="btn-hover"
                                        hoverColor="#eeeeee"
                                        textColor="black"
                                        backgroundActive="#eeeeee"
                                    />
                                </div>
                                :
                                <div className="d-flex flex-column w-100 align-items-center">
                                    <img src="assets/images/search-empty.png" alt="icon-search" width={180} height={160} />
                                    <span>Không tìm thấy kết quả phù hợp</span>
                                </div>
                        :
                        <img src="assets/images/search-empty.png" alt="icon-search" width={180} height={160} />}
                </SimpleBar>
            </div>
        </div>
    );
}

export default SearchMessage;