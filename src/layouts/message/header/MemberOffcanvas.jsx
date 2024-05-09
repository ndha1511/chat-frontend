import React, { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import ButtonGroup from '../../../components/buttons/button-group/ButtonGroup';
import "./Header.scss"
import { useDispatch, useSelector } from 'react-redux';
import {  getGroupById, getUserGroupById } from '../../../services/GroupService';
import HoverDots from '../../../components/hover-dots/HoverDots';
import { createAdmin, createMember } from '../../../redux/reducers/renderOffcanvas';
import UpdateGroupModal from '../../header/UpdateGroupModal';


function MemberOffcanvas({ show, handleClose }) {
    const chatInfo = useSelector(state => state.message.chatInfo);
    const admins1 = useSelector(state => state.members.admins);
    const memberList = useSelector(state => state.members.members);
    const groupChat = useSelector(state => state.message.chatInfo.user);
    const reRenderMember = useSelector(state => state.members.reRender);
    const [members, setMembers] = useState([])
    const [memberItems, setMemberItems] = useState([]);
    const [showManager, setShowManager] = useState(false)

    const dispatch = useDispatch();
    const handleShowManagerModal = () => {
        setShowManager(true)

    }


    // console.log(chatInfo.user.numberOfMembers)
    // console.log(chatInfo.user.members)
    console.log(memberList)

    useEffect(() => {
        const getUserbyGroupId = async () => {
            const roomId = chatInfo.roomId
            // console.log(roomId)
            try {
                const res = await getUserGroupById(roomId)
                setMembers(res)
                dispatch(createMember(res))
                const group = await getGroupById(roomId)
                dispatch(createAdmin(group.admins))
                console.log(res)
            } catch (error) {
                alert('lỗi không láy được user')
            }
        }
        getUserbyGroupId();
  
    }, [chatInfo.roomId,reRenderMember])

    useEffect(()=>{
        setMembers(memberList)
    },[memberList])

    useEffect(() => {
        const owner = members.filter(member=>member.email === chatInfo.user.owner)
        // console.log(owner)
        const admins = members.filter(member=>admins1.includes(member.email))
        const memberList = members.filter(member=>!admins1.includes(member.email)&&!(member.email === chatInfo.user.owner))
        const listRs = [...owner,...admins,...memberList]
        const listMember = listRs.map(member => ({
            item: <HoverDots key={member.email} member={member} />
        }));
        setMemberItems(listMember);
        
    }, [members,]);

    return (
        <Offcanvas show={show} onHide={()=>{handleClose(false);}} placement="end" style={{ width: '350px' }} backdrop={true}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Thành viên</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body >
                <div className='d-flex bd-member'>
                    <button onClick={handleShowManagerModal} className='btn-add-member'> <i style={{marginRight:10}} className="bi bi-person-add"></i>Thêm thành viên</button>
                    <UpdateGroupModal show={showManager} handleClose={() => setShowManager(false)}
                                groupName={groupChat.name}
                            // selectedMembers={groupChat.members}
                            />
                    <div className='d-flex w-100 center-member'>
                        <h6>Danh sách thành viên ({memberList.length})</h6>
                        <button className='btn-center'><i className="bi bi-three-dots"></i></button>
                    </div>

                    <div className="w-100 d-flex btn-group" style={{ flex: 1,}} >
                       <ButtonGroup buttons={memberItems}
                            widthBtnGroup="100%"
                            vertical width="100%"
                            className="btn-hover"
                            hoverColor="#eeeeee"
                            textColor="black"
                            backgroundActive="#eeeeee"
                        />
                    </div>
                 
                 


                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default MemberOffcanvas;
