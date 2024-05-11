import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../avatar/Avatar";
import "./HoverDots.scss"
import "../../App.scss"
import { Dropdown, } from "react-bootstrap";
import { addAdmin, removeAdmin, removeMember } from "../../services/GroupService";
import { deleteMember, reRenderMember } from "../../redux/reducers/renderOffcanvas";
import Swal from "sweetalert2";
import { Icon } from "zmp-ui";
import AccountInfor from "../modal/AccountInfor";
import ProfileModal from "../modal/ProfileModal";

function HoverDots({ member }) {
    const chatInfo = useSelector(state => state.message.chatInfo);
    const user = useSelector(state => state.userInfo.user);
    const admins = chatInfo.user.admins;
    const [showHoverDots, setShowHoverDots] = useState(false);
    const [showAccountInfor, setShowAccountInfor] = useState(false)
    const [showProfile, setShowprofile] = useState(false)
    const dispatch = useDispatch();


    const handleShowAccountInforOrProfile = () => {
        if( user.email === member.email) {
            setShowprofile(true);
            setShowAccountInfor(false);
        }else{
            setShowAccountInfor(true);
            setShowprofile(false);
        }
    }
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
                html: `Bạn đã thêm ${member.name} làm phó nhóm.`,
                timer: 1500, // Đặt thời gian tự đóng là 1500 mili giây
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    htmlContainer: 'my-custom-html',
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
                html: `Bạn đã giáng ${member.name} xuống làm thành viên.`,
                timer: 1500, // Đặt thời gian tự đóng là 1500 mili giây
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    htmlContainer: 'my-custom-html',
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
            Swal.fire({
                html: `Bạn đã xóa ${member.name} ra khỏi nhóm.`,
                timer: 1500, // Đặt thời gian tự đóng là 1500 mili giây
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    htmlContainer: 'my-custom-html',
                }
            });
            dispatch(deleteMember(member.email));
            console.log(member.email)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="d-flex w-100 container-member "   onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className='d-flex member-tong' style={{ width: '100%', alignItems: 'center', }} onClick={handleShowAccountInforOrProfile} >
                <Avatar user={member} /> {member.email === chatInfo.user.owner ? <div className="rotate-45"><Icon style={{ color: "#f5d25c" }} icon="zi-key-solid" size={18} /></div> :
                    (admins.includes(member.email)) ? <div className="rotate-45"><Icon style={{ color: "#00ff7f" }} icon="zi-key-solid" size={18} /></div> :
                        <></>}
                <div style={{ marginLeft: '15px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                       {user.email === member.email ? <span>Bạn</span>: <span>{member.name}</span>}
                        {member.email === chatInfo.user.owner ? <span style={{ fontSize: 14, color: '#9a8f85' }}>Trưởng nhóm</span>
                            :(admins.includes(member.email)) ?
                            <span style={{ fontSize: 14, color: '#9a8f85' }}>Phó nhóm</span>
                            :
                            <></>
                        }

                    </div>
                </div>
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

                   {showAccountInfor &&(<AccountInfor show={showAccountInfor} onClose={() => setShowAccountInfor(false)} user={member}/>)} 
                   {showProfile &&(<ProfileModal show={showProfile} onClose={() => setShowprofile(false)} />)}                 
            </div>
        </div>
    );
}

export default HoverDots;