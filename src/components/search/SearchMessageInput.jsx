import { Icon } from "zmp-ui";
import "./SearchMessageInput.scss";
import { useDispatch, useSelector } from "react-redux";
import { setShowSearchMessage } from "../../redux/reducers/renderLayoutReducer";
import { useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { setMessageSearch } from "../../redux/reducers/messageReducer";
import { findMessage } from "../../services/MessageService";
import "zmp-ui/icon/styles/icon.css";
import Avatar from "../avatar/Avatar";
import SimpleBar from "simplebar-react";

function SearchMessageInput() {
    const dispatch = useDispatch();
    const [showButtonDelete, setShowButtonDelete] = useState(false);
    const [showButtonDelete1, setShowButtonDelete1] = useState(false);
    const [showMenuSender, setShowMenuSender] = useState(false);
    const chatInfo = useSelector(state => state.message.chatInfo);
    const [valueSearch, setValueSearch] = useState("");
    const [valueSearch1, setValueSearch1] = useState("");
    const user = useSelector((state) => state.userInfo.user);
    const divRef = useRef(null);
    const debounce = useDebounce(valueSearch, 500);
    console.log(user)
    const inputRef = useRef(null);

    const clearSearch = () => {
        dispatch(setMessageSearch({
            messages: [],
            show: false,
            loading: false,
            totalPage: 0,
        }));
    }

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        const messageSearch = {
            messages: [],
            show: true,
            loading: true,
            totalPage: 0,
        }
        dispatch(setMessageSearch(messageSearch));
        if (valueSearch !== "") {
            setShowButtonDelete(true);
        } else {
            setShowButtonDelete(false);
        }
    }, [valueSearch]);
    useEffect(() => {
        function handleClickOutside(event) {
          if (divRef.current && !divRef.current.contains(event.target)) {
            // Click ra ngoài div, đóng div
            setShowMenuSender(false);
          }
        }
    
        // Lắng nghe sự kiện click ở cấp độ toàn bộ tài liệu
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Loại bỏ lắng nghe sự kiện khi component unmount
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
    useEffect(() => {
        const search = async () => {
            if (debounce.trim() === "") {
                clearSearch();
            } else {
                const messageSearch = {
                    messages: [],
                    show: true,
                    loading: true,
                    totalPage: 0,
                }
                dispatch(setMessageSearch(messageSearch));
                try {
                    const response = await findMessage(chatInfo.roomId, debounce, user.email);
                    const messageSearch = {
                        messages: response.messages,
                        show: true,
                        loading: false,
                        totalPage: response.totalPage,
                    };
                    dispatch(setMessageSearch(messageSearch));
                } catch (error) {
                    console.log(error);
                    clearSearch();
                }
            }
        }
        search();
    }, [debounce]);

    const handleSearch = (e) => {
        setValueSearch(e.target.value);
    };
    const handleSearch1 = (e) => {
        const searchValue = e.target.value;
        setValueSearch1(searchValue);
        if (searchValue === '') {
            setShowButtonDelete1(false);
        } else {
            setShowButtonDelete1(true);
        }
    };
    const hanldeShowMenu = (e) => {
        setShowMenuSender(!showMenuSender)
    }
    return (
        <div className="p-1">
            <div className="d-flex flex-column" style={{ paddingLeft: 25 }}>
                <div className="d-inline-flex mt-1 align-items-center">
                    <label className="d-flex align-items-center p-1 col-10" style={{
                        backgroundColor: "#f0f0f0",
                        color: "gray",
                        borderRadius: 16,
                        height: 26,
                    }}>
                        <div className="col-11 d-flex align-items-center" style={{ paddingLeft: 5 }}>
                            <Icon icon="zi-search" size={20} />
                            <input ref={inputRef} className="input-search-message col-10" type="text"
                                onChange={handleSearch}
                                value={valueSearch}
                                style={{ backgroundColor: "transparent", border: "none", outline: "none" }} placeholder="Tìm tin nhắn" />
                        </div>
                        {showButtonDelete && <div onClick={() => setValueSearch("")} className="col-1 d-flex align-items-center justify-content-end"><Icon icon="zi-close-circle-solid" size={20} /></div>}
                    </label>
                    <div className="d-flex justify-content-center col-1">
                        <button onClick={() => { dispatch(setShowSearchMessage(false)); clearSearch() }} className="btn-close-search d-flex justify-content-center">Đóng</button>
                    </div>
                </div>
                <div className="d-inline-flex align-items-center filter-message ">
                    <strong style={{ fontSize: 14 }}>Lọc theo: </strong>
                    <div onClick={hanldeShowMenu} className="m-3">
                        <small className="filter-search"  >Người gửi <Icon style={{ marginLeft: 5, }} icon="zi-chevron-down" /></small>
                    </div>
                    {showMenuSender && (
                          <div ref={divRef} className="menu-sender" >
                          <div className="sendre">
                              <div className="col-11 d-flex align-items-center input-sender" style={{ paddingLeft: 5 }}>
                                  <Icon icon="zi-search" size={20} />
                                  <input ref={inputRef} className="input-search-message col-10" type="text"
                                      onChange={handleSearch1}
                                      value={valueSearch1}
                                      style={{ backgroundColor: "transparent", border: "none", outline: "none" }} placeholder="Tìm tin nhắn" />
                                  {showButtonDelete1 && <button onClick={() => { setValueSearch1(""); setShowButtonDelete1(false) }} className=""><Icon icon="zi-close-circle-solid" size={16} /></button>}
                              </div>
                          </div>
                          <div className="filter-member">
                              <SimpleBar style={{ height: 70 }}>
                                  <div className="d-flex align-items-center p-1 btn-mb"><Avatar user={user} width={27} height={27} /><span style={{ marginLeft: 6, fontSize: 12 }}>{user.name}</span></div>
                                  <div className="d-flex align-items-center p-1 btn-mb"><Avatar user={user} width={27} height={27} /><span style={{ marginLeft: 6, fontSize: 12 }}>{user.name}</span></div>
                                  <div className="d-flex align-items-center p-1 btn-mb"><Avatar user={user} width={27} height={27} /><span style={{ marginLeft: 6, fontSize: 12 }}>{user.name}</span></div>
                                  <div className="d-flex align-items-center p-1 btn-mb"><Avatar user={user} width={27} height={27} /><span style={{ marginLeft: 6, fontSize: 12 }}>{user.name}</span></div>
                                  <div className="d-flex align-items-center p-1 btn-mb"><Avatar user={user} width={27} height={27} /><span style={{ marginLeft: 6, fontSize: 12 }}>{user.name}</span></div>
                              </SimpleBar>
                          </div>
  
                      </div>
                    )}
                    <div className="m-2">
                        <small className="filter-search" >Ngày gửi <Icon style={{ marginLeft: 5 }} icon="zi-chevron-down" /></small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchMessageInput;