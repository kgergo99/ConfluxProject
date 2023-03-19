import "./modules.css";
import React, { useState } from "react";

function AdderPanel(props){
    const { card } = props;
    const [count, setCount] = useState(0);
    const handleCountChange = (count) => {
        setCount(count);
    };

    const handleAddCard = async (card, count) => {
        // call the function with the card and count arguments
        //await handleAddOrRemoveCardFromUser(card, count, false, false);
    };

    return (
        <div className="dropdown-row-container">
            <div className="firsthalf-wrapper">
                {card.icon_svg_uri && <img className="svg-set-icon" src={card.icon_svg_uri} alt={card.set_name} />}
                <div className="dropdown-text-cardname">{card.name}</div>
            </div>
            <div className="secondhalf-wrapper">
                <div className="dropdown-text-setname">{card.set_name}</div>
                <div className="dropdown-count">{32}</div>  
            </div>
        </div>
    )
    
}

export default AdderPanel