import { Icon } from "zmp-ui";
import "./SearchMessageInput.scss";
import { useDispatch, useSelector } from "react-redux";
import { setShowSearchMessage } from "../../redux/reducers/renderLayoutReducer";
import { useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { setCurrentPageMessageSearch, setMessageSearch, updateMessageSearch } from "../../redux/reducers/messageReducer";
import { findMessage } from "../../services/MessageService";
import "zmp-ui/icon/styles/icon.css";
import Avatar from "../avatar/Avatar";
import SimpleBar from "simplebar-react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getUserGroupById } from "../../services/GroupService";

function SearchMessageInput() {
    const dispatch = useDispatch();
    const [showButtonDelete, setShowButtonDelete] = useState(false);
    const [showButtonDelete1, setShowButtonDelete1] = useState(false);
    const [showMenuSender, setShowMenuSender] = useState(false);
    const [showMenuSentDate, setShowMenuSentDate] = useState(false);
    const chatInfo = useSelector(state => state.message.chatInfo);
    const currentPage = useSelector(state => state.message.currentPageMessageSearch);
    const [valueSearch, setValueSearch] = useState("");
    const [valueSearch1, setValueSearch1] = useState("");
    const user = useSelector((state) => state.userInfo.user);
    const divRef = useRef(null);
    const debounce = useDebounce(valueSearch, 500);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const startDatePickerRef = useRef(null);
    const endDatePickerRef = useRef(null);
    const inputRef = useRef(null);
    const [listMember, setListMember] = useState([]);
    const [userSend, setUserSend] = useState({
        email: "",
        name: "",
        avatar: ""
    });
    const [dateApi, setDateApi] = useState({
        startDate: "",
        endDate: ""
    });

    const [viewDate, setViewDate] = useState("");

    const clearSearch = () => {
        dispatch(setMessageSearch({
            messages: [],
            show: false,
            loading: false,
            totalPage: 0,
        }));
    }

    const memberList = async () => {
        if (chatInfo.room.roomType === "GROUP_CHAT") {
            const rep = await getUserGroupById(chatInfo.user.id);
            setListMember(rep);
        }

    }

    useEffect(() => {
        if (dateApi.startDate !== "" && dateApi.endDate !== "") {
            if (dateApi.startDate === dateApi.endDate) {
                const startDateView = new Date(startDate);
                const startDay = startDateView.getDate();
                const startMonth = startDateView.getMonth() + 1;
                const startYear = startDateView.getFullYear();
                setViewDate(`${startDay}/${startMonth}/${startYear}`);
            } else {
                const startDateView = new Date(startDate);
                const endDateView = new Date(endDate);


                const startDay = startDateView.getDate();
                const startMonth = startDateView.getMonth() + 1;
                const startYear = startDateView.getFullYear();

                const endDay = endDateView.getDate();
                const endMonth = endDateView.getMonth() + 1;
                const endYear = endDateView.getFullYear();

                setViewDate(`${startDay}/${startMonth}/${startYear} - ${endDay}/${endMonth}/${endYear}`);
            }
        } else {
            setViewDate("");
        }
    }, [dateApi])

    useEffect(() => {
        memberList();
        if (inputRef.current) {
            inputRef.current.focus();
        }
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
                setShowMenuSentDate(false);
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
            const emailQuery = userSend.email;
            const startDate = dateApi.startDate.trim();
            const endDate = dateApi.endDate.trim();
            if (debounce.trim() === "" && emailQuery.trim() === "" &&
                startDate === "" && endDate === "") {
                clearSearch();
            } else {
                dispatch(setCurrentPageMessageSearch(0));
                const messageSearch = {
                    messages: [],
                    show: true,
                    loading: true,
                    totalPage: 0,
                }
                dispatch(setMessageSearch(messageSearch));
                try {
                    const response = await findMessage(chatInfo.roomId, debounce, user.email, emailQuery, startDate, endDate);
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
    }, [debounce, userSend, dateApi]);

    const setUserSendQuery = (user) => {
        setUserSend({
            email: user.email,
            name: user.name,
            avatar: user.avatar,
        });
    }

    useEffect(() => {
        const searchMore = async () => {
            const emailQuery = userSend.email;
            const startDate = dateApi.startDate.trim();
            const endDate = dateApi.endDate.trim();
            try {
                const response = await findMessage(chatInfo.roomId, debounce, user.email, emailQuery, startDate, endDate, currentPage);
                dispatch(updateMessageSearch(response.messages));
            } catch (error) {
                console.log(error);
                clearSearch();
            }

        }
        if (currentPage > 0) {
            searchMore();
        }
    }, [currentPage]);
    const clearUserSend = (e) => {
        e.stopPropagation();
        setUserSend({
            avatar: "",
            email: "",
            name: "",
        })
    }

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
    const hanldeShowMenu = () => {
        setShowMenuSender(!showMenuSender)
    }
    const hanldeShowMenuSentDate = () => {
        setShowMenuSentDate(!showMenuSentDate)
    }
    const submitDate = () => {
        setDateApi({
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        })
    }
    const cancelDate = () => {
        setShowMenuSentDate(false);
    }

    const clearDate = (e) => {
        e.stopPropagation();
        setStartDate(new Date());
        setEndDate(new Date());
        setDateApi({
            startDate: "",
            endDate: "",
        })
    }


    const CustomInput = ({ value, onClick, label }) => (
        <div onClick={onClick} className="custom-datepicker-input">
            {value ? <span>{value}</span> : <span>{label}</span>}
        </div>
    );
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
                    {userSend.email !== "" ?
                        <div onClick={hanldeShowMenu} className="m-3">
                            <small className="filter-search filter-search-active"  >{userSend.name}
                                <span onClick={clearUserSend}><Icon style={{ marginLeft: 5, }} icon="zi-close-circle-solid" size={18} /></span>
                            </small>
                        </div>
                        :
                        <div onClick={hanldeShowMenu} className="m-3">
                            <small className="filter-search"  >Người gửi <Icon style={{ marginLeft: 5, }} icon="zi-chevron-down" size={18} /></small>
                        </div>}
                    {showMenuSender && (
                        <div ref={divRef} className="menu-sender" >
                            <div className="sendre">
                                <div className="col-11 d-flex align-items-center input-sender" style={{ paddingLeft: 5 }}>
                                    <Icon icon="zi-search" size={20} />
                                    <input ref={inputRef} className="input-search-message col-10" type="text"
                                        onChange={handleSearch1}
                                        value={valueSearch1}
                                        style={{ backgroundColor: "transparent", border: "none", outline: "none" }} placeholder="Tìm kiếm" />
                                    {showButtonDelete1 && <button onClick={() => { setValueSearch1(""); setShowButtonDelete1(false) }} className=""><Icon icon="zi-close-circle-solid" size={16} /></button>}
                                </div>
                            </div>
                            <div className="filter-member">
                                <SimpleBar style={{ height: 70 }}>
                                    {chatInfo.room.roomType === "GROUP_CHAT" ? (
                                        <>
                                            {listMember.map((item) => (
                                                <div onClick={() => setUserSendQuery(item)} className="d-flex align-items-center p-1 btn-mb">
                                                    <Avatar user={item} width={27} height={27} /><span style={{ marginLeft: 6, fontSize: 12 }}>{item.name}</span>
                                                </div>

                                            ))}
                                        </>
                                    )
                                        : <>
                                            <div className="d-flex align-items-center p-1 btn-mb" onClick={() => setUserSendQuery(user)}><Avatar user={user} width={27} height={27} /><span style={{ marginLeft: 6, fontSize: 12 }}>{user.name}</span></div>
                                            <div className="d-flex align-items-center p-1 btn-mb" onClick={() => setUserSendQuery(chatInfo.user)} ><Avatar user={chatInfo.user} width={27} height={27} /><span style={{ marginLeft: 6, fontSize: 12 }}>{chatInfo.user.name}</span></div>
                                        </>
                                    }

                                </SimpleBar>
                            </div>

                        </div>
                    )}
                    {viewDate === "" ?
                        <div className="m-2" onClick={hanldeShowMenuSentDate} >
                            <small className="filter-search" >Ngày gửi <Icon style={{ marginLeft: 5 }} icon="zi-chevron-down" size={18} /></small>
                        </div> :
                        <div className="m-2" onClick={hanldeShowMenuSentDate} >
                            <small className="filter-search filter-search-active"  >{viewDate}
                                <span onClick={clearDate}><Icon style={{ marginLeft: 5, }} icon="zi-close-circle-solid" size={18} /></span>
                            </small>
                        </div>}
                    {showMenuSentDate && (
                        <div ref={divRef} className="menu-sent-date">
                            <div>
                                <span>Chọn khoảng thời gian: </span>
                            </div>
                            <div className="isDate" >
                                <div>
                                    <span>Từ ngày</span>
                                    <div className="selectDate" onClick={() => startDatePickerRef.current.setOpen(true)}>
                                        <DatePicker
                                            ref={startDatePickerRef}
                                            selected={startDate}
                                            value={startDate}
                                            onChange={date => {
                                                setStartDate(date);
                                            }}
                                            onClickOutside={() => startDatePickerRef.current.setOpen(false)}
                                            dropdownMode="select"
                                            customInput={<CustomInput label="Ngày gửi" />}
                                            maxDate={endDate}
                                        />

                                        <i className="bi bi-calendar"></i>
                                    </div>
                                </div>
                                <div>
                                    <span>Đến ngày</span>
                                    <div className="selectDate" onClick={() => endDatePickerRef.current.setOpen(true)}>
                                        <DatePicker
                                            ref={endDatePickerRef}
                                            selected={endDate}
                                            value={endDate}
                                            onChange={date => {
                                                setEndDate(date);
                                            }}
                                            onClickOutside={() => endDatePickerRef.current.setOpen(false)}
                                            dropdownMode="select"
                                            customInput={<CustomInput label="Đến ngày" />}
                                            maxDate={new Date()}
                                            minDate={startDate}

                                        />
                                        <i className="bi bi-calendar"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end mt-3">
                                <button style={{marginRight:10}} className="btn-dates" onClick={cancelDate}>Hủy</button>
                                <button  className="btn-dates" onClick={submitDate}>Xác nhận</button>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchMessageInput;