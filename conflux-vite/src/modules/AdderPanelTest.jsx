import "./modules.css";
import "./adderpanel.css"
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import HitCounter from "../modules/HitCounter";
import { handleAddOrRemoveCardFromUser } from "../scripts/AddOrRemoveCardFromUser";


function AdderPanelTest(props){
    const { card } = props;
    const [count, setCount] = useState(0);
    const handleCountChange = (count) => {
        setCount(count);
    };

    const handleAddCard = async (card, count) => {
        // call the function with the card and count arguments
        await handleAddOrRemoveCardFromUser(card, count, false, false);
    };

    return (
            <div className="normal-container">
            <h1>{card.name}</h1>
            {/*card.icon_svg_uri && <img src={card.icon_svg_uri} alt={card.set_name} />*/}
            <h2>{card.set_uri}</h2>
            {card.image_uris && <img src={card.image_uris.small} alt={card.name} />}
            <HitCounter count={count} onCountChange={handleCountChange} />
            <Button variant="primary" onClick={() => handleAddCard(card, count)}>+</Button>             
        </div>
    )
    
}

export default AdderPanelTest