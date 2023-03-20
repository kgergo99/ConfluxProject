import "./modules.css";
import React, { useState, useEffect } from "react";

function AdderPanel(props){
    const [count, setCount] = useState(0);
    const card = props.card;
    const userCards = props.userCards;  
    const handleAddCard = async (card, count) => {
        // call the function with the card and count arguments
        //await handleAddOrRemoveCardFromUser(card, count, false, false);
    };

    useEffect(() => {
        const cardCount = userCards && Array.isArray(userCards) && userCards.find(cardObj => cardObj.id === card.id)?.count;
        setCount(cardCount || 0);
    }, [userCards, card.id]);

    return (
        <div className="dropdown-row-container">
            <div className="firsthalf-wrapper">
                {card.icon_svg_uri && <img className="svg-set-icon" src={card.icon_svg_uri} alt={card.set_name} />}
                <div className="dropdown-text-cardname">{card.name}</div>
            </div>
            <div className="secondhalf-wrapper">
                <div className="dropdown-text-setname">{card.set_name}</div>
                <div className="dropdown-count">{count > 0 ? count : " "}</div>
            </div>
        </div>
    )
    
}

export default AdderPanel