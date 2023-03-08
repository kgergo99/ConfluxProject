import CardComponent from "../modules/CardComponent";
import filterCardsByOptions from "../scripts/FilterCardsByOptions";
import getCardById from "../scripts/GetCardById";
import getAllCardsByIds from "../scripts/GetAllCardsByIds";
import React, { useState, useEffect } from "react";

function CardListAssembler(props) {
    const [cardsData, setCardsData] = useState([]);
    const { userCards } = props;
    const fixedNavbarHeight = "420px";

    var stylingObject = {
        grid: {
        paddingTop: "20px",
        paddingRight: "40px",
        paddingLeft: "40px",
        display: "grid",
        gap: "2rem",
        maxHeight: `calc(100vh - ${fixedNavbarHeight})`,
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        overflow: "scroll",
        
        },
    };
    
    const testFilter = ['B', 'G'];

    useEffect( () => {
        console.log("userCards in CardListAssembler - useEffect: ", userCards);
        getAllCardsByIds(userCards, setCardsData);
    }, [userCards, setCardsData]);

    const filteredCardIds = filterCardsByOptions(cardsData, testFilter);

    return (
        <div className='deck-grid disable-scrollbars' style={stylingObject.grid}>
            {cardsData.map((card) => (
                // Only render the CardComponent if the card.id is in the filteredCardIds collection
                filteredCardIds.includes(card.id) && 
                <div key={card.id}><CardComponent id={card.id} count={card.count}/></div>
                
            ))}
        </div>
    )
}

export default CardListAssembler