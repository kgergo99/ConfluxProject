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
import CardBack404 from "../assets/eakett_ca_mtgimage/cardback_404.jpg";

function CardListForBoard(props) {
    const [cardsData, setCardsData] = useState([]);

    const fixedNavbarHeight = "420px";

    let entryList = props.cardList;
    const newEntryList = props.cardList;
    const cardList = entryList.map(entry => entry.card);
    //const sortByOption = props.sortBy;
    
    var stylingObject = {
        grid: {
        paddingTop: "40px",
        paddingRight: "40px",
        paddingLeft: "40px",
        paddingBottom: "40px",
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        },
    };

    const handleAddCard = async (cardId, count) => {
        //await handleAddOrRemoveCardFromUser(cardId, count, true, false);

    };
    const handleDeleting = async (cardId) => {
        //await handleAddOrRemoveCardFromUser(cardId, null, false, true);ú
        // Transfer delete to parent
    };

    const handleCountUpdate = (cardId, newCount) => {
        const index = entryList.findIndex(entry => entry.card.id === cardId);
        if (index !== -1) {
            if (newCount === 0) {
            entryList.splice(index, 1);
            } else {
            entryList[index].count = newCount;
            }
        }
        
        handleDone();
    };

    const handleDelete = (cardId) => {
        const index = entryList.findIndex(entry => entry.card.id === cardId);
        if (index !== -1) {
            entryList.splice(index, 1);
        }
        handleDone();
    }

    const handleDone = () => {
        props.cardListUpdate(entryList);
    } 

    return (
        <div style={stylingObject.grid}>
            
            {entryList.map((entry) => {
                return (
                    <div key={entry.card.id}>
                        <CardComponent_v2  id={entry.card.id} 
                            count={entry.count} 
                            imageUrl={(entry.card.image_uris ? entry.card.image_uris.normal : entry.card.card_faces[0].image_uris.normal)} 
                            name={entry.card.name}
                            price_eur={entry.card.prices.eur}
                            onCountUpdate={handleCountUpdate}
                            onDeleteCard={handleDelete}
                        />
                    </div>
                );
            })}
        </div>
    )
}

export default CardListForBoard