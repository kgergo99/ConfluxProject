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
import { handleAddOrRemoveCardFromUser_Single } from "../scripts/AddCardListToUser";

function CardListAssembler(props) {
    const [cardsData, setCardsData] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [cardOrderUpdate, setCardOrderUpdate] = useState(false);
    const [isCardsDataSetup, setIsCardsDataSetup] = useState(false);

    const fixedNavbarHeight = "420px";

    const userCards = props.userCards;
    const cFilter = props.colorFilter;
    const tFilter = props.typeFilter;
    const rFilter = props.rarityFilter;
    const nFilter = props.nameFilter;
    const sortByOption = props.sortBy;

    const docRef = props.docRef;
    const docSnap = props.docSnap;
    
    const filterOptions = {
        colors: cFilter,
        type: tFilter,
        rarity: rFilter,
        name: nFilter
    };
    
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

    const handleAddCard = async (cardId, name, count) => {
        await handleAddOrRemoveCardFromUser_Single(cardId, count, name, true, false)
    };
    const handleDeleting = async (cardId) => {
        await handleAddOrRemoveCardFromUser_Single(cardId, null, null, false, true);
    };

    const handleCountUpdate = (cardId, newCount) => {
        if (newCount <= 0) {
            console.log("Card deleted with id: ", cardId);
            handleDeleteCard(cardId);
            return;
        }
        const updatedCards = cardsData.map((card) => {
            if (card.id === cardId) {
                console.log("cardsData updated with new count: ", newCount);
                handleAddCard(cardId, card.name, newCount);
                return { ...card, count: newCount };
            }
            return card;
        });
        setCardsData(updatedCards); 
    };
    const handleDeleteCard = async (cardId) => {
        const updatedCards = cardsData.filter((card) => {
            if (card.id === cardId) {
                //Delete card from the user on firestore
                return false; // remove this card from updatedCards
            }
            return true; // keep this card in updatedCards
        });
        await handleDeleting(cardId);
        console.log("updatedCards: ",updatedCards);
        setCardsData(updatedCards); 
    };
    useEffect(() => {
        setCardOrderUpdate(!cardOrderUpdate);
    }, [sortByOption]);

    useEffect(() => {
        if (userCards.length > 0 && cardsData.length == 0) {
            //Initial setup for getting cards data
            getAllCardsByIds(userCards, setCardsData, setIsCardsDataSetup);
        }        
    }, [userCards]);

    useEffect(() => {
        if (cardsData.length > 0) {
            // If the cardsData has already been set give it the count data too
            setCardCount(userCards, cardsData, setCardsData);
        }
    }, [isCardsDataSetup]);

    useEffect(() => {
        async function filter() {
            let filtered = cardsData;
            if (sortByOption.length > 0) {
                filtered = await sortCardsByOptions(filtered, sortByOption);
            }
            if (cFilter.length > 0) {
                filtered = await filterCardsByColor(filtered, cFilter);
            }
            if (tFilter.length > 0) {
                filtered = await filterCardsByType(filtered, tFilter);
            }
            if (rFilter.length > 0) {
                filtered = await filterCardsByRarity(filtered, rFilter);
            }
            if (nFilter.length > 0) {
                filtered = await filterCardsByName(filtered, nFilter);
            }
            setFilteredCards(filtered);
        }
        filter();
    }, [cardsData, props, cardOrderUpdate]);



    return (
        <div className='' style={stylingObject.grid}>
            {filteredCards.map((card) => {
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

export default CardListAssembler