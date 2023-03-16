import "./modules.css";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import HitCounter from "../modules/HitCounter";
import { handleAddCardToUser } from "../scripts/AddCardToUser";

function AdderPanelTest(props){
    const { card } = props;
    const [count, setCount] = useState(0);
    const handleCountChange = (count) => {
        setCount(count);
    };

    const handleAddCard = async (card, count) => {
        // call the function with the card and count arguments
        await handleAddCardToUser(card, count, false);
    };

    return (
            <div className="normal-container">
            <h1>{card.name} | {card.prices.eur} € | {card.prices.usd} $</h1>
            {card.image_uris && <img src={card.image_uris.small} alt={card.name} />}
            <HitCounter count={count} onCountChange={handleCountChange} />
            <Button variant="primary" onClick={() => handleAddCard(card, count)}>+</Button>             
        </div>
    )
    
}

export default AdderPanelTest