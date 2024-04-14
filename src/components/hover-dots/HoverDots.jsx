import React, { useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../avatar/Avatar";
import "./HoverDots.scss"
import { Dropdown,  } from "react-bootstrap";

function HoverDots({ member }) {
    const chatInfo = useSelector(state => state.message.chatInfo);
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
    return (
        <div className="d-flex w-100 " style={{ justifyContent: 'flex-start',alignItems:'center' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className='d-flex member-tong' style={{ width: '100%', alignItems: 'center', }}  >
                <Avatar user={member} /> {member.email === chatInfo.user.owner ? <div className="rotate-45"><i className="bi bi-key-fill"></i></div> : <></>}
                <div style={{ marginLeft: '15px' }}>{member.name}</div>
            </div>
            <div className="dots"
                style={{
                    display: showHoverDots ? 'block' : 'none', justifyContent: 'center',
                    alignItems: 'center'
                }}
            >   
                <Dropdown style={{width:'100%'}}>
                <Dropdown.Toggle className=" btn-dots" as={CustomToggle} >
                   <button className="btn-dooot"> <i className="bi bi-three-dots"></i></button>
                </Dropdown.Toggle>
                <Dropdown.Menu className="item-menu" >
                    <Dropdown.Item>aaa</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
                
                
            </div>
        </div>
    );
}

export default HoverDots;