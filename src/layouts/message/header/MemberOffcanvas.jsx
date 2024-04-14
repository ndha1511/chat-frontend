import React, { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import ButtonGroup from '../../../components/buttons/button-group/ButtonGroup';
import "./Header.scss"
import { useSelector } from 'react-redux';
import { getUserGroupById } from '../../../services/GroupService';
import Avatar from '../../../components/avatar/Avatar';
import HoverDots from '../../../components/hover-dots/HoverDots';

function MemberOffcanvas({ show, handleClose }) {
    const chatInfo = useSelector(state => state.message.chatInfo);
    const [members, setMembers] = useState([])
    const [memberItems, setMemberItems] = useState([]);



    // console.log(chatInfo.user.numberOfMembers)
    // console.log(chatInfo)
    // console.log(chatInfo)

    useEffect(() => {
        const getUserbyGroupId = async () => {
            const roomId = chatInfo.roomId
            // console.log(roomId)
            try {
                const res = await getUserGroupById(roomId)
                setMembers(res)
                console.log(res)
            } catch (error) {
                alert('lỗi không láy được user')
            }
        }
        getUserbyGroupId();
    }, [])


    useEffect(() => {
        const owner = members.filter(member=>member.email === chatInfo.user.owner)
        // console.log(owner)
        const admins = members.filter(member=>chatInfo.user.admins.includes(member.email))
        const memberList = members.filter(member=>!chatInfo.user.admins.includes(member.email)&&!(member.email === chatInfo.user.owner))
        const listRs = [...owner,...admins,...memberList]
        const listMember = listRs.map(member => ({
            item:
               <HoverDots member={member}/>
        }));
        setMemberItems(listMember);
    }, [members,]);

    return (
        <Offcanvas show={show} onHide={()=>{handleClose(false);}} placement="end" style={{ width: '350px' }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Thành viên</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body >
                <div className='d-flex bd-member'>
                    <button className='btn-add-member'> <i className="bi bi-person-add"></i>Thêm thành viên</button>
                    <div className='d-flex w-100 center-member'>
                        <h6>Danh sách thành viên ({chatInfo.user.numberOfMembers})</h6>
                        <button className='btn-center'><i className="bi bi-three-dots"></i></button>
                    </div>

                    <div className="w-100 d-flex btn-group" style={{ flex: 1 }} >
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
