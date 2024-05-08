import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../avatar/Avatar";
import "./HoverDots.scss"
import { Dropdown, } from "react-bootstrap";
import { addAdmin, removeAdmin, removeMember } from "../../services/GroupService";
import { deleteMember, reRenderMember, removeMember1 } from "../../redux/reducers/renderOffcanvas";
import Swal from "sweetalert2";

function HoverDots({ member }) {
    const chatInfo = useSelector(state => state.message.chatInfo);
    const user = useSelector(state => state.userInfo.user);
    const admins = useSelector(state => state.members.admins);
    const dispatch = useDispatch();
    const [showHoverDots, setShowHoverDots] = useState(false);
    const handleMouseEnter = () => {
        setShowHoverDots(true);

    }

    const handleMouseLeave = () => {
        setShowHoverDots(false);
    }
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href="/"
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="" // Thêm class cho avatar dropdown
        >
            {children}
        </a>
    ));
    // console.log(showHoverDots)
    if (member.email === chatInfo.user.owner) {

    }

    const handleAddAdmin = async () => {
        const request = {
            ownerId: user.email,
            adminId: member.email,
            groupId: chatInfo.roomId
        }
        try {
            await addAdmin(request);
            dispatch(reRenderMember())
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                html: `bạn đã thêm ${member.name} làm phó nhóm.<br/><b>(2s)</b>`,
                timer: 3000, // Đặt thời gian tổng cộng là 4 giây để đảm bảo đếm ngược từ 2 -> 0
                timerProgressBar: false,
                showConfirmButton: true,
                willOpen: () => {
                    let counter = 2;
                    const timerInterval = setInterval(() => {
                        Swal.update({
                            html: `bạn đã thêm ${member.name} làm phó nhóm.<br/><b>(${counter}s)</b>`,
                        });
                        counter--;
                        if (counter < 0) {
                            clearInterval(timerInterval);
                            Swal.close(); // Đóng thông báo khi hết thời gian
                        }
                    }, 1000);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleRemoveAdmin = async () => {
        const request = {
            ownerId: user.email,
            adminId: member.email,
            groupId: chatInfo.roomId
        }
        try {
            await removeAdmin(request);
            dispatch(reRenderMember())
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                html: `bạn đã giáng ${member.name} xuống làm thành viên.<br/><b>(2s)</b>`,
                timer: 3000, // Đặt thời gian tổng cộng là 4 giây để đảm bảo đếm ngược từ 2 -> 0
                timerProgressBar: false,
                showConfirmButton: true,
                willOpen: () => {
                    let counter = 2;
                    const timerInterval = setInterval(() => {
                        Swal.update({
                            html: `bạn đã giáng ${member.name} xuống làm thành viên.<br/><b>(${counter}s)</b>`,
                        });
                        counter--;
                        if (counter < 0) {
                            clearInterval(timerInterval);
                            Swal.close(); // Đóng thông báo khi hết thời gian
                        }
                    }, 1000);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    const handleRemoveMember = async () => {
        const request = {
            memberId: member.email,
            adminId: user.email,
            groupId: chatInfo.roomId
        }
        try {
            await removeMember(request);
            // Khởi tạo thông báo với SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                html: `Bạn đã xóa ${member.name} ra khỏi nhóm.<br/><b>(2s)</b>`,
                timer: 3000, // Đặt thời gian tổng cộng là 4 giây để đảm bảo đếm ngược từ 2 -> 0
                timerProgressBar: false,
                showConfirmButton: true,
                willOpen: () => {
                    let counter = 2;
                    const timerInterval = setInterval(() => {
                        Swal.update({
                            html: `Bạn đã xóa ${member.name} ra khỏi nhóm.<br/><b>(${counter}s)</b>`,
                        });
                        counter--;
                        if (counter < 0) {
                            clearInterval(timerInterval);
                            Swal.close(); // Đóng thông báo khi hết thời gian
                        }
                    }, 1000);
                }
            });
            dispatch(deleteMember(member.email));
            console.log(member.email)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="d-flex w-100 container-member " onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className='d-flex member-tong' style={{ width: '100%', alignItems: 'center', }}  >
                <Avatar user={member} /> {member.email === chatInfo.user.owner ? <div className="rotate-45"><i className="bi bi-key-fill"></i></div> :
                    (admins.includes(member.email)) ? <div className="rotate-45"><i className="bi bi-key-fill" style={{ color: "#00ff7f" }}></i></div> :
                        <></>}
                <div style={{ marginLeft: '15px' }}>{member.name}</div>
            </div>
            <div className="dotss"
                style={{
                    display: showHoverDots ? 'block' : 'none', justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {(chatInfo.user.owner === user.email || admins.includes(user.email))
                    && (chatInfo.user.owner !== member.email) && (user.email !== member.email)
                    ? <Dropdown style={{ width: '100%' }}>
                        <Dropdown.Toggle className=" btn-dots" as={CustomToggle} >
                            <button className="btn-dooot"> <i className="bi bi-three-dots"></i></button>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="item-menu" >
                            {
                                user.email === chatInfo.user.owner ?
                                    admins.includes(member.email) ?
                                        <Dropdown.Item onClick={handleRemoveAdmin}>Xóa phó nhóm</Dropdown.Item> :
                                        <Dropdown.Item onClick={handleAddAdmin}>Thêm phó nhóm</Dropdown.Item>
                                    : <></>
                            }
                            {
                                chatInfo.user.owner === user.email ||
                                    (admins.includes(user.email) && !admins.includes(member.email)) ?
                                    <Dropdown.Item onClick={handleRemoveMember}>Xóa thành viên</Dropdown.Item> :
                                    <></>
                            }

                        </Dropdown.Menu>
                    </Dropdown> : <></>}


            </div>
        </div>
    );
}

export default HoverDots;