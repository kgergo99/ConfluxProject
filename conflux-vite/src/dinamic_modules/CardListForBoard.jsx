import CardComponent from "../modules/CardComponent";
import filterCardsByColor from "../scripts/card_filters/FilterCardsByColor";
import filterCardsByType from "../scripts/card_filters/FilterCardsByType";
import filterCardsByName from "../scripts/card_filters/FilterCardsByName";
import getAllCardsByIds from "../scripts/GetAllCardsByIds";
import setCardCount from "../scripts/SetCardCount";
import React, { useState, useEffect } from "react";
import filterCardsByRarity from "../scripts/card_filters/FilterCardsByRarity";
import sortCardsByOptions from "../scripts/SortCardsByOptions";
import CardComponent_v2 from "../modules/CardComponent_v2";
import { handleAddOrRemoveCardFromUser } from "../scripts/AddOrRemoveCardFromUser";

function CardListForBoard(props) {
    const [cardsData, setCardsData] = useState([]);

    const fixedNavbarHeight = "420px";

    const cardList = props.cardList;
    const sortByOption = props.sortBy;
    
    var stylingObject = {
        grid: {
        paddingTop: "20px",
        paddingRight: "40px",
        paddingLeft: "40px",
        display: "grid",
        gap: "2rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        },
    };

    const handleAddCard = async (cardId, count) => {
        //await handleAddOrRemoveCardFromUser(cardId, count, true, false);
    };
    const handleDeleting = async (cardId) => {
        //await handleAddOrRemoveCardFromUser(cardId, null, false, true);
    };

    /*const handleCountUpdate = (cardId, newCount) => {
        if (newCount <= 0) {
            console.log("Card deleted with id: ", cardId);
            handleDeleteCard(cardId);
            return;
        }
        const updatedCards = cardsData.map((card) => {
            if (card.id === cardId) {
                console.log("cardsData updated with new count: ", newCount);
                handleAddCard(cardId, newCount);
                return { ...card, count: newCount };
            }
            return card;
        });
        setCardsData(updatedCards); 
    };*/

    return (
        <div className='' style={stylingObject.grid}>
            
            {cardList.map((card) => {
                return (
                    <div key={card.id}>
                        <CardComponent_v2  id={card.id} 
                            count={card.count} 
                            imageUrl={card.image_uris.normal} 
                            name={card.name}
                            price_eur={card.prices.eur}
                            onCountUpdate={handleCountUpdate}
                            onDeleteCard={handleDeleteCard}
                        />
                    </div>
                );
            })}
        </div>
    )
}

export default CardListForBoard