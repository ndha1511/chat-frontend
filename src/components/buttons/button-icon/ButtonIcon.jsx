import "./ButtonIcon.scss";


function ButtonIcon(props) {
    const hoverColor = props.hoverColor ? props.hoverColor : 'crimson';
    const textHoverColor = props.textHoverColor ? props.textHoverColor : 'blue';
    return (
        <button 
        data-bs-toggle={`tooltip`} title={props.title ? props.title : ""}
        className={`btn ${props.className ? props.className : ""} d-flex justify-content-center align-items-center p-2`}
                style={{ 
                    width: props.width ? props.width : 30,
                    height: props.height ? props.height : 30,
                    backgroundColor: props.background ? props.background : "",
                    color: props.color ? props.color : "",
                    '--hover-color': hoverColor,
                    '--text-hover-color': textHoverColor,
                    border:"none",
                    borderBottom: props.borderBottom ? props.borderBottom : "0",
                    borderRadius: props.borderRadius ? props.borderRadius : 0,
                    fontWeight: props.fontWeight ? props.fontWeight : "normal",
                    marginRight: props.marginRight ? props.marginRight : 0,
                    fontSize: props.fontSize,
                    // backgroundColor: props.backgroundColor,  
                 
                  
                 }}
                 onClick={props.clickButton ? props.clickButton : () => {}}
        >
            {props.children}
        </button>
    );
}   

export default ButtonIcon;