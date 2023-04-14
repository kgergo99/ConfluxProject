import "./modules.css";
import "./adderpanel.css";
import React, { useState, useEffect } from "react";

function AdderPanel(props){
    const [count, setCount] = useState(0);
    const card = props.card;
    const userCards = props.userCards;

    useEffect(() => {
        const cardCount = userCards && Array.isArray(userCards) && userCards.find(cardObj => cardObj.id === card.id)?.count;
        setCount(cardCount || 0);
    }, [userCards, card]);

    return (
        <div className="dropdown-row-container">
            <div className="firsthalf-wrapper">
                {card && <div className="dropdown-count">{count > 0 ? count : " "}</div>}
                <div className="dropdown-text-cardname">{card ? card.name : "No results"}</div>
            </div>
            <div className="secondhalf-wrapper">
                {card && <div className="dropdown-text-setname">{card.set_name}</div>}
            </div>
        </div>
    )
    
}

export default AdderPanel