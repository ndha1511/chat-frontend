import { useState } from "react";
import ButtonGroup from "../../components/buttons/button-group/ButtonGroup";
import Search from "../../components/search/Search";
import BaseModal from "../../components/modals/BaseModal";
import { friendIcon } from "../../configs/button-group-icon-config";


function Header() {
    const [show, setShow] = useState(false);
    const buttons = friendIcon;

    const handleClose = () => setShow(false);


    const showModal = (index) => {
        switch (index) {
            case 0:
                setShow(true);
                break;
        }
    }
    return (
        <div className="d-flex w-100">
            <Search placeholder="Tìm kiếm" />
            <ButtonGroup buttons={buttons}
                className="btn-hover"
                hoverColor="#f0f0f0"
                width={40}
                height={40}
                showModal={showModal}
            />
            <BaseModal show={show} close={handleClose}/>
        </div>
    );
}

export default Header;