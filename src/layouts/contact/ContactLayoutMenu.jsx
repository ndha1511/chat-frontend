import ButtonGroup from "../../components/buttons/button-group/ButtonGroup";

function ContacLayoutMenu() {
    const arrMenu = [
        {
            item:
                <div className=" d-flex w-100 column "  >
                    <i className="bi bi-person-lines-fill col-2"  style={{color:"#67ACE3",}}  ></i>
                    <span className="d-flex col-10"  style={{fontWeight:'500',}}>Danh sách bạn bè</span>
                </div>
        },
        {
            item:
                <div className=" d-flex w-100 column "  >
                    <i className="bi bi-people-fill col-2"  style={{color:"#67ACE3",}} ></i>
                    <span className="d-flex col-10"  style={{fontWeight:'500',}}  >Danh sách nhóm</span>
                </div>
        },
        {
            item:
                <div className=" d-flex w-100 column "  >
                    <i className="bi bi-envelope-open-fill col-2 " style={{color:"#67ACE3",}} ></i>
                    <span className="d-flex col-10"  style={{fontWeight:'500',}}>Lời mời kết bạn</span>
                </div>
        }

    ]
    return (
        <div className="d-flex" style={{ flexDirection: "column" }}>
            <ButtonGroup buttons={arrMenu}
                vertical 
                width='100%'
                height='50px'
                fontSize='15px'
                className="btn-hover"
                hoverColor="#eeeeee"
                backgroundActive="#E5EFFF"
            ></ButtonGroup>
        </div>
    );
}

export default ContacLayoutMenu;