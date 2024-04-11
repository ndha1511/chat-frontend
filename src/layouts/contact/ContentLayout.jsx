import Avatar from "../../components/avatar/Avatar";
import ButtonGroup from "../../components/buttons/button-group/ButtonGroup";
import "./ContentLayout.scss"
import { Modal, ListGroup, Button } from 'react-bootstrap';

function ContentLayout() {
    const header = [{
        item:
            <div className=" d-flex w-100 border column "  >
                <i className="bi bi-person-lines-fill col-1" style={{ color: "#67ACE3", }}  ></i>
                <span className="d-flex col-5" style={{ fontWeight: '500', }}>Danh sách bạn bè</span>
            </div>
    }]
    return (
        <div className="d-flex tong" >
            <div className=" d-flex w-100 border column ml-6 p-3 top " >
                <i className="bi bi-envelope-open-fill" style={{ color: "#67ACE3", }}  ></i>
                <span className="d-flex " style={{ fontWeight: '500', marginLeft: '10px' }}>Lời mời kết bạn</span>
            </div>
            <div className="d-flex center" >
                <div className="txt-top">
                    <h6>Lời mời kết bạn (1)</h6>
                </div>
                <div className="ketBan">
                    <div className="thongTin">
                        <div className="d-flex top-cs">
                            <Avatar width={50} height={50} />
                            <div className="center-cs">
                                <h6>Name</h6>
                                <span>2 phut - Từ cửa sổ trò...</span>
                            </div>
                            <div>
                                <Button variant="outline-primary"  ><i className="bi bi-chat-dots"></i></Button>
                            </div>
                        </div>
                        <div className="txt">
                            <textarea placeholder="Xin chào, mình là yasuo. Solo với mình nhé!" />
                        </div>
                        <div className="btn-ft">
                            <Button variant="outline-primary"  >Từ chối</Button>
                            <Button variant="primary" >Đồng ý</Button>
                        </div>
                    </div>
                    <div className="thongTin">
                        <div className="d-flex top-cs">
                            <Avatar width={50} height={50} />
                            <div className="center-cs">
                                <h6>Name</h6>
                                <span>2 phut - Từ cửa sổ trò...</span>
                            </div>
                            <div>
                                <Button variant="outline-primary"  ><i className="bi bi-chat-dots"></i></Button>
                            </div>
                        </div>
                        <div className="txt">
                            <textarea placeholder="Xin chào, mình là yasuo. Solo với mình nhé!" />
                        </div>
                        <div className="btn-ft">
                            <Button variant="outline-primary"  >Từ chối</Button>
                            <Button variant="primary" >Đồng ý</Button>
                        </div>
                    </div>
                    <div className="thongTin">

                    </div>
                    <div className="thongTin">

                    </div>

                </div>
            </div>
        </div>
    );
}

export default ContentLayout;