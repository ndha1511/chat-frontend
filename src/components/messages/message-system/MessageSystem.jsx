

function MessageSystem(props) {
    return (
        <div
            className="d-flex w-100 justify-content-center"

        >
            <div style={{
                backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'auto',
                padding: "2px 14px 3px 20px", borderRadius: 15, margin: 3
            }}>
                <span className="" style={{ color: "white", fontSize: 13 }}>{props.message.content}</span>
            </div>
        </div>
    );
}

export default MessageSystem;