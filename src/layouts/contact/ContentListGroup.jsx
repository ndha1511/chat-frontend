import { Button, Dropdown } from "react-bootstrap";
import "./ContentLayout.scss"
import React from "react";
import Avatar from "../../components/avatar/Avatar";
import { useSelector } from "react-redux";

function ContentListGroup(props) {
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href="/"
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="dropdown-menu1" // Thêm class cho avatar dropdown
        >
            {children}
        </a>
    ));
    const groups = useSelector((state) => state.group.groups);
    return (
        <div className="d-flex tong" >
            <div className=" d-flex w-100 border column ml-6 p-3 top " >
                {props.backButton}
                <i className="bi bi-people-fill" style={{ color: "#67ACE3", }}  ></i>
                <span className="d-flex " style={{ fontWeight: '500', marginLeft: '10px' }}>Danh sách nhóm</span>
            </div>
            <div className="d-flex listFriend-center" >
                <div className="txt-top">
                    <h6>Nhóm (122)</h6>
                </div>
                <div className="loc">
                    <div className="loc-top">
                        <div className="search">
                            <i className="bi bi-search"></i>
                            <input type="text" placeholder="Tìm bạn" />
                        </div>
                        <div className="menu1">
                            <Dropdown className="">
                                <Dropdown.Toggle variant="success" id="dropdown-basic" as={CustomToggle}>
                                    <i className="bi bi-arrow-down-up"></i>
                                    <span>A-Z</span>
                                    <i className="bi bi-caret-down-fill"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="list-item">
                                    <Dropdown.Item href="#/action-1">Hành động 1</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Hành động 2</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Hành động 3</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="menu1">
                            <Dropdown className="">
                                <Dropdown.Toggle variant="success" id="dropdown-basic" as={CustomToggle}>
                                    <i className="bi bi-arrow-down-up"></i>
                                    <span>A-Z</span>
                                    <i className="bi bi-caret-down-fill"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="list-item" >
                                    <Dropdown.Item href="#/action-1">Hành động 1</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Hành động 2</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Hành động 3</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="loc-center">
                        {groups.map((item, index) => (
                            <div className="loc-center-s" key={index}>
                                <div className="loc-center-item">
                                    <Avatar user={{
                                        avatar: item.avatar,
                                        name: item.groupName
                                    }}/>
                                    <h6>{item.groupName}</h6>
                                </div>
                                <div>
                                    <Dropdown className="">
                                        <Dropdown.Toggle variant="success" id="dropdown-basic" as={CustomToggle}>
                                            <button><i className="bi bi-three-dots"></i></button>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="list-item" >
                                            <Dropdown.Item >Xem thông tin</Dropdown.Item>
                                            <Dropdown.Item >Phân loại </Dropdown.Item>
                                            <Dropdown.Item >Đặt tên gợi nhớ</Dropdown.Item>
                                            <Dropdown.Item >Chặn người này</Dropdown.Item>
                                            <Dropdown.Item >Xóa bạn</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentListGroup;