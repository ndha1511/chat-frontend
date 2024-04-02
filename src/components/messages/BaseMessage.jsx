function BaseMessage(props) {
    return (
        <div className="d-flex" style={{ flexDirection: props.isSender ? "row" : "row-reverse" }}>
            <div className="hidden">
                <div>
                    <p>List button here</p>
                </div>
            </div>
            <div>
                {props.children}
                {
                    props.lastMessage ?
                        <div>
                            <p>status message</p>
                        </div> : <></>
                }
            </div>
        </div>
    );
}

export default BaseMessage;