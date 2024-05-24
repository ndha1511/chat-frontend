import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../avatar/Avatar";
import "./HoverDots.scss"
import "../../App.scss"
import { Button, Dropdown, } from "react-bootstrap";
import { addAdmin, leaveGroup, removeAdmin, removeGroup, removeMember } from "../../services/GroupService";
import { deleteMember, reRenderMember } from "../../redux/reducers/renderOffcanvas";
import Swal from "sweetalert2";
import { Icon } from "zmp-ui";
import AccountInfor from "../modal/AccountInfor";
import ProfileModal from "../modal/ProfileModal";
import HelloMessage from "../modal/HelloMessage";
import VerifyModal from "../dialogs/verify-dialog/VerifyModal";

function HoverDots({ member, handleClose }) {
    const chatInfor = useSelector(state => state.message.chatInfo);
    const [chatInfo, setChatInfo] = useState(chatInfor);
    const user = useSelector(state => state.userInfo.user);

    const [showHoverDots, setShowHoverDots] = useState(false);
    const [showAccountInfor, setShowAccountInfor] = useState(false)
    const [showProfile, setShowprofile] = useState(false)
    const [showSecurity, setShowSecurity] = useState(false);
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [showHelloMessage, setShowHelloMessage] = useState(false)
    const handleShowRemoveMoadl = () => setShowRemoveModal(true);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const handleCloseRemoveModal = () => setShowRemoveModal(false);
    const dispatch = useDispatch();

    const handleShow = () => setShowVerifyModal(true);
    const handleShowAccountInforOrProfile = () => {
        if (user.email === member.email) {
            setShowprofile(true);
            setShowAccountInfor(false);
        } else {
            setShowAccountInfor(true);
            setShowprofile(false);
        }
    }
    useEffect(()=>{
        if(chatInfor.room?.roomType === 'GROUP_CHAT'){
            setChatInfo(chatInfor);
        }
    },[chatInfor])
    const removeAction = async () => {
        const request = {
            ownerId: user.email,
            groupId: chatInfo.roomId
        }
        try {
            await removeGroup(request);
            handleClose();
        } catch (error) {
            console.log(error);
        }

    }
    const handleLeaveGroup = () => {
        handleShow();

    }
    const handleCloseModal = () => setShowVerifyModal(false);
    const handleRemoveGroup = () => {
        handleShowRemoveMoadl();
    }
    const handleShowHelloMessageModal = () => {
        setShowAccountInfor(false);
        setShowHelloMessage(true)
    }
    const handleMouseEnter = () => {
        setShowHoverDots(true);

    }
    const leaveAction = async () => {
        const request = {
            memberId: user.email,
            groupId: chatInfo.roomId
        }
        try {
            await leaveGroup(request);
            handleClose();
        } catch (error) {
            console.log(error);
        }
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
                },
                width: '250px',
                padding: 0,
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
                ,
                width: '250px',
                padding: 0,
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
                },
                width: '250px',
                padding: 0, 
            });
            dispatch(deleteMember(member.email));
            console.log(member.email)
        } catch (error) {
            console.log(error);
        }
    }


    const checkDot = (member) => {
        if (chatInfo.user.owner === user.email) {
            return <button className="btn-dooot "><i className="bi bi-three-dots"></i></button>

        }
        if (chatInfo.user.owner !== user.email && !chatInfo.user.admins.includes(user.email) && member.email === user.email) {
            return <button className="btn-dooot "><i className="bi bi-three-dots"></i></button>
        }

        if (chatInfo.user.admins.includes(user.email) && chatInfo.user.admins.includes(member.email) && member.email === user.email) {
            return <button className="btn-dooot "><i className="bi bi-three-dots"></i></button>
        }
        if (chatInfo.user.admins.includes(user.email) && !chatInfo.user.admins.includes(member.email) && member.email !== chatInfo.user.owner) {
            return <button className="btn-dooot "><i className="bi bi-three-dots"></i></button>
        }
    }

    console.log(chatInfo)
    return (
        <div className="d-flex w-100 container-member " onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className='d-flex member-tong' style={{ width: '100%', alignItems: 'center', }} onClick={handleShowAccountInforOrProfile} >
                <Avatar user={member} /> {member.email === chatInfo.user.owner ? <div className="rotate-45"><Icon style={{ color: "#f5d25c" }} icon="zi-key-solid" size={18} /></div> :
                    (chatInfo.user.admins.includes(member.email)) ? <div className="rotate-45"><Icon style={{ color: "#00ff7f" }} icon="zi-key-solid" size={18} /></div> :
                        <></>}
                <div style={{ marginLeft: '15px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        {user.email === member.email ? <span>Bạn</span> : <span>{member.name}</span>}
                        {member.email === chatInfo.user.owner ? <span style={{ fontSize: 14, color: '#9a8f85' }}>Trưởng nhóm</span>
                            : (chatInfo.user.admins.includes(member.email)) ?
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
                {((chatInfo.user.owner === user.email || chatInfo.user.admins.includes(user.email) || user.email === member.email)
                )
                    ? <Dropdown style={{ width: '100%' }}>
                        <Dropdown.Toggle className="btn-dots" as={CustomToggle}>
                            {checkDot(member)}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="item-menu" >
                            {
                                user.email === chatInfo.user.owner && user.email !== member.email
                                    ? <>
                                        {chatInfo.user.admins.includes(member.email)
                                            ? <Dropdown.Item onClick={handleRemoveAdmin}>Xóa phó nhóm</Dropdown.Item>
                                            : <Dropdown.Item onClick={handleAddAdmin}>Thêm phó nhóm</Dropdown.Item>
                                        }
                                        <Dropdown.Item onClick={handleRemoveMember}>Xóa thành viên</Dropdown.Item>
                                    </>
                                    : null
                            }
                            {
                                chatInfo.user.admins.includes(user.email) && !chatInfo.user.admins.includes(member.email) && user.email !== member.email && chatInfo.user.owner !== member.email
                                    ? <Dropdown.Item onClick={handleRemoveMember}>Xóa thành viên</Dropdown.Item>
                                    : null
                            }
                            {
                                user.email === member.email
                                    ?
                                    chatInfo.user.owner === user.email ?
                                    <>
                                     <Dropdown.Item onClick={handleRemoveGroup} >Giải thán nhóm</Dropdown.Item>
                                     <Dropdown.Item onClick={handleLeaveGroup} >Rời nhóm</Dropdown.Item><></>
                                    </>
                                    : <Dropdown.Item onClick={handleLeaveGroup} >Rời nhóm</Dropdown.Item>:<></>
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    : null
                }



                {showAccountInfor && (<AccountInfor show={showAccountInfor} onClose={() => setShowAccountInfor(false)} user={member} addFriend={handleShowHelloMessageModal} />)}
                {showProfile && (<ProfileModal show={showProfile} onClose={() => setShowprofile(false)} />)}
                {showHelloMessage && (<HelloMessage show={showHelloMessage} onClose={() => setShowHelloMessage(false)} handleBack={handleShowAccountInforOrProfile} />)}




                <VerifyModal content="Bạn có chắc chắn muốn rời nhóm" show={showVerifyModal}
                    handleClose={handleCloseModal}
                    action={leaveAction}
                />
                <VerifyModal content="Bạn có chắc chắn giải tán nhóm" show={showRemoveModal}
                    handleClose={handleCloseRemoveModal}
                    action={removeAction}
                />



            </div>
        </div>
    );
}

export default HoverDots;