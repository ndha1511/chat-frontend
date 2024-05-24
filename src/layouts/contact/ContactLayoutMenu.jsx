import { useDispatch, useSelector } from "react-redux";
import ButtonGroup from "../../components/buttons/button-group/ButtonGroup";
import { setContactIndex, setViewContent } from "../../redux/reducers/renderLayoutReducer";
import { reRenderMessageLayout } from "../../redux/reducers/renderReducer";
import "zmp-ui/icon/styles/icon.css";
import { Icon } from "zmp-ui";

function ContacLayoutMenu() {
    const friends = useSelector((state) => state.friend.friends);
    const dispatch = useDispatch();
    const arrMenu = [
        {
            item:
                <div className=" d-flex w-100 column" style={{ alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 10 }}  >
                    <i className="bi bi-person-lines-fill " style={{ color: "#67ACE3", fontSize: 25 }}  ></i>
                    <span className="d-flex col-10" style={{ fontWeight: '500', marginLeft: 20, }}>Danh sách bạn bè</span>
                </div>
        },
        {
            item:
                <div className=" d-flex w-100 column " style={{ alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 10 }}  >
                    <i className="bi bi-people-fill " style={{ color: "#67ACE3", fontSize: 25 }} ></i>
                    <span className="d-flex col-10" style={{ fontWeight: '500', marginLeft: 20, }}  >Danh sách nhóm</span>
                </div>
        },
        {
            item:
                <div className=" d-flex w-100 column " style={{ alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 10 }}   >
                    {/* <i  className="bi bi-envelope-open-fill col-2 " style={{color:"#67ACE3",fontSize:25}} ></i> */}
                    <Icon style={{ color: "#67ACE3", fontSize: 28, }} icon='zi-stranger-solid' />
                    <span className="d-flex col-10" style={{ fontWeight: '500', marginLeft: 17, }}>Lời mời kết bạn</span>
                </div>
        }

    ]
    const myFunction = (index) => {
        dispatch(setContactIndex(index));
        dispatch(setViewContent({ data: index }));
        dispatch(reRenderMessageLayout());
    }
    return (
        <div className="d-flex" style={{ flexDirection: "column", marginTop: 10, position: 'relative' }}>
            <div className="announce-contact-cs" > <span >{friends.length !== 0 ?friends.length:''}{friends.length >= 5 ? (<span style={{ fontWeight: 500 }}>+</span>) : ''}</span></div>
            <ButtonGroup buttons={arrMenu}
                vertical
                width='100%'
                height='50px'
                fontSize='15px'
                className="btn-hover"
                hoverColor="#eeeeee"
                backgroundActive="#E5EFFF"
                handle={myFunction}
            ></ButtonGroup>
        </div>
    );
}

export default ContacLayoutMenu;