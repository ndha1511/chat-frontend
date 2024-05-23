import Avatar from "../../avatar/Avatar";

function SearchResult({ message }) {
    return (
        <div className="d-flex w-100 pb-3 align-items-center justify-content-between"
            style={{height: '100%'}}
        >
            <div className="d-flex align-items-center">
                <Avatar width={40} height={40} />
                <div className="d-flex flex-column align-items-start">
                    <span>Hoàng Anh</span>
                    <span>Content message</span>
                </div>
            </div>
            <div className="d-flex">
                <span>Time</span>
            </div>
        </div>
    )
}

export default SearchResult;