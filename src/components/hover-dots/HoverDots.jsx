import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../avatar/Avatar";
import "./HoverDots.scss"
import { Dropdown,  } from "react-bootstrap";
import { addAdmin, removeAdmin, removeMember } from "../../services/GroupService";
import { deleteMember, reRenderMember, removeMember1 } from "../../redux/reducers/renderOffcanvas";
import { setViewContent } from "../../redux/reducers/renderLayoutReducer";

function HoverDots({ member }) {
    const chatInfo = useSelector(state => state.message.chatInfo);
    const user = useSelector(state => state.userInfo.user);
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
    if(member.email === chatInfo.user.owner){
        
    }

    const handleAddAdmin = async () => {
        const request = {
            ownerId: user.email,
            adminId: member.email,
            groupId: chatInfo.roomId
        }
        try {
            await addAdmin(request);
            alert("bạn đã thêm " + member.name + " làm phó nhóm");
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
            alert("bạn đã giáng " + member.name + " xuống làm thành viên");
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
            alert("bạn đã xóa " + member.name + " ra khỏi nhóm");
            dispatch(deleteMember(member.email));
            console.log(member.email)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="d-flex w-100 " style={{ justifyContent: 'flex-start',alignItems:'center' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className='d-flex member-tong' style={{ width: '100%', alignItems: 'center', }}  >
                <Avatar user={member} /> {member.email === chatInfo.user.owner ? <div className="rotate-45"><i className="bi bi-key-fill"></i></div> : 
                (chatInfo.user.admins.includes(member.email)) ? <div className="rotate-45"><i className="bi bi-key-fill" style={{ color: "#00ff7f" }}></i></div> :
                <></>}
                <div style={{ marginLeft: '15px' }}>{member.name}</div>
            </div>
            <div className="dots"
                style={{
                    display: showHoverDots ? 'block' : 'none', justifyContent: 'center',
                    alignItems: 'center'
                }}
            >   
                {(chatInfo.user.owner === user.email || chatInfo.user.admins.includes(user.email))
                && (chatInfo.user.owner !== member.email) && (user.email !== member.email)
                 ? <Dropdown style={{width:'100%'}}>
                <Dropdown.Toggle className=" btn-dots" as={CustomToggle} >
                   <button className="btn-dooot"> <i className="bi bi-three-dots"></i></button>
                </Dropdown.Toggle>
                <Dropdown.Menu className="item-menu" >
                    {
                    user.email === chatInfo.user.owner?
                    chatInfo.user.admins.includes(member.email)? 
                    <Dropdown.Item onClick={handleRemoveAdmin}>Xóa phó nhóm</Dropdown.Item>:
                    <Dropdown.Item onClick={handleAddAdmin}>Phong làm phó nhóm</Dropdown.Item>
                    : <></>
                    }
                    {
                        chatInfo.user.owner === user.email ||
                        (chatInfo.user.admins.includes(user.email) && !chatInfo.user.admins.includes(member.email)) ?
                        <Dropdown.Item onClick={handleRemoveMember}>Xóa thành viên</Dropdown.Item>:
                        <></>
                    }
                    
                </Dropdown.Menu>
                </Dropdown> : <></>}
                
                
            </div>
        </div>
    );
}

export default HoverDots;