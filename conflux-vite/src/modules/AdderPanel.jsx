import "./modules.css";
import React, { useState, useEffect } from "react";
import Warning2 from '../assets/Warning2.svg'

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
                <img className="svg-set-icon" src={card? card.icon_svg_uri : Warning2} alt={card? card.set_name : "error"} />
                <div className="dropdown-text-cardname">{card ? card.name : "No results"}</div>
            </div>
            <div className="secondhalf-wrapper">
                {card && <div className="dropdown-text-setname">{card.set_name}</div>}
                {card && <div className="dropdown-count">{count > 0 ? count : " "}</div>}
            </div>
        </div>
    )
    
}

export default AdderPanel