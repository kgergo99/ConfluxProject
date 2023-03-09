import CardComponent from "../modules/CardComponent";
import filterCardsByOptions from "../scripts/FilterCardsByOptions";
import getCardById from "../scripts/GetCardById";
import getAllCardsByIds from "../scripts/GetAllCardsByIds";
import React, { useState, useEffect } from "react";

function CardListAssembler(props) {
    const [cardsData, setCardsData] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
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
    
    const testFilter = ['B','G','W', 'R'];
    const testFilter2 = ['W', 'R'];
    const testOptions = {
        colors: testFilter2,
    };

    useEffect(() => {
        if (userCards.length > 0) {
            const userCardIds = userCards.map(card => card.id);
            getAllCardsByIds(userCardIds, setCardsData);
            console.log("$$$ getAllCardsByIds -> set cardsData with: ", cardsData);
        }
    }, [userCards]);

    useEffect(() => {
        console.log("$$$ Current cardsData in CardListAssembler: ", cardsData);
    }, [cardsData]);

    useEffect(() => {
        console.log("$$$ Cards data: ", cardsData);
        async function filter() {
            const filtered = await filterCardsByOptions(cardsData, testOptions);
            if (filtered.length > 0) {
                console.log("$$$ filteredCards EXISTS: ", filtered);
                setFilteredCards(filtered);
            }
        }
        filter();
    }, [cardsData]);

    useEffect(() => {
        console.log("$$$ Cards data: ", cardsData);
    }, [cardsData]);

    return (
        <div className='deck-grid disable-scrollbars' style={stylingObject.grid}>
            {userCards.map((card) => {
                const filteredCard = filteredCards.find(obj => obj.id === card.id);
                if (!filteredCard) {
                    return null;
                }
                return (
                    <div key={card.id}>
                        <CardComponent id={card.id} 
                            count={card.count} 
                            imageUrl={filteredCard.image_uris.small} 
                            name={filteredCard.name}
                        />
                    </div>
                );
            })}
            {/*
                // Only render the CardComponent if the card.id is in the filteredCards collection
                filteredCards.some(obj => obj.id === card.id) &&
                <div key={card.id}><CardComponent id={card.id} count={card.count}/></div>  
            ))}*/}
        </div>
    )
}

export default CardListAssembler