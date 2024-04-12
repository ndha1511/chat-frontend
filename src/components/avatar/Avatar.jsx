import { extractName, getColorForName } from "../../utils/ExtractUsername";

function Avatar(props) {
    const user = props.user ? props.user : null;
    return (
        <div className="avatar"
            data-bs-toggle={`tooltip`}
            title={props.title ? props.title : ""}
            style={{
                width: props.width ? props.width : 50,
                height: props.height ? props.height : 50,
                borderRadius: "50%",
                backgroundColor: user ? getColorForName(user.name) : "crimson",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
            }}
            onClick={props.clickAvatar ? props.clickAvatar : () => { }}
        >
            {user && user.avatar ?
                <img src={user.avatar} alt="avatar" width="100%" height="100%"
                    style={{ borderRadius: "50%" }}
                /> :
                <span className="text-light">{user ? extractName(user.name) : "HA"}</span>
            }
        </div>
    );
}

export default Avatar;