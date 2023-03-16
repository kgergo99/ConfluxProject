import "./cardbutton.css"
import TrashIcon from '../assets/Trash-Outline-32px.svg'

function CardButton(props) {
    
    var stylingObject = {
        deleteButton: {
          background: `no-repeat center url(${TrashIcon})`,
          width: "24px",
          height: "24px",
          margin: "0rem",
        },
    };
    
    function handleDelete() {
        // Perform actions when the delete button is clicked
    }

    return (
        <div className="card-button-container">
            <div className="card-button-inner">
                <button type="submit" title="Delete" onClick={handleDelete} style={stylingObject.deleteButton}></button>
            </div>
            
        </div>
    )
}

export default CardButton