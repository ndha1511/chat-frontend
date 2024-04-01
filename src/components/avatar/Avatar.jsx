function Avatar(props) {
    return (
        <div className="avatar"
            style={{
                width: props.width ? props.width : 50,
                height: props.height ? props.height : 50,
                borderRadius: "50%",
                backgroundColor: props.background ? props.background : "crimson",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
            }}
            onClick={props.clickAvatar ? props.clickAvatar : () => { }}
        >
            {props.url ?
                <img src={props.url} alt="avatar" width="100%" height="100%"
                    style={{ borderRadius: "50%" }}
                /> :
                <span>HA</span>
            }
        </div>
    );
}

export default Avatar;