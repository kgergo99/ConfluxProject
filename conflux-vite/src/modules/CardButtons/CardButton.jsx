import "./cardbutton.css"

function CardButton(props) {
    
    const icon = props.icon

    var stylingObject = {
        cardButton: {
          background: `no-repeat center url(${icon})`,
          width: "24px",
          height: "24px",
          margin: "0rem",
        },
    };
    
    const handleClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };

    return (
        <div className="card-button-container">
            <div className="card-button-inner">
                <button type="submit" onClick={handleClick} style={stylingObject.cardButton}></button>
            </div>
            
        </div>
    )
}

export default CardButton