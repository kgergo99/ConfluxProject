import "./cardbutton.css"

function CardCountChanger(props) {
    
    const icon = props.icon

    var stylingObject = {
        cardButton: {
          background: `no-repeat center url(${icon})`,
          width: "24px",
          height: "24px",
          margin: "0rem",
        },
    };
    
    function handleClick() {
        // Perform actions when the delete button is clicked
    }

    return (
        <div className="card-button-container">
            <div className="card-button-inner">
                <input type="number" style={stylingObject.cardButton}></input>
            </div>
            
        </div>
    )
}

export default CardCountChanger