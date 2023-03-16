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

    

    useEffect(() => {
        setCardOrderUpdate(!cardOrderUpdate);
        console.log("SORTBYTEST SortByOption changed to: ", sortByOption);
        console.log("SORTBYTEST Cards in the filtered: ", filteredCards);
    }, [sortByOption]);

    useEffect(() => {
        console.log("SORTBYTEST cardOrderUpdate: ", cardOrderUpdate);
    }, [cardOrderUpdate]);

    useEffect(() => {
        if (userCards.length > 0 && cardsData.length == 0) {
            //Initial setup for getting cards data
            getAllCardsByIds(userCards, setCardsData, setIsCardsDataSetup);
            console.log("$$$ getAllCardsByIds -> set cardsData with: ", cardsData);
        } else if ( cardsData.length > 0) {
            //If the initial setup is done and userCards changes from props
            
        }

        
    }, [userCards]);

    useEffect(() => {
        console.log("$$$ Current cardsData in CardListAssembler: ", cardsData);

        if (cardsData.length > 0) {
            // If the cardsData has already been set give it the count data too
            setCardCount(userCards, cardsData, setCardsData);
        }
    }, [isCardsDataSetup]);

    /*useEffect(() => {
        async function filter() {
            const filtered = await filterCardsByOptions(cardsData, filterOptions);
                setFilteredCards(filtered);
        }
        filter();
    }, [cardsData, cFilter, tFilter, rFilter]); //!WARNING!: KEEP ONLY THE PROP IN THE HOOK, filterOptions causes infinte loop
    */

    /* useEffect(() => {
        async function filter() {
            const filtered = await filterCardsByColor(cardsData, cFilter);
            setFilteredCards(filtered);
        }
        filter();
    }, [cardsData, cFilter]); //!WARNING!: KEEP ONLY THE PROP IN THE HOOK, filterOptions causes infinte loop

    useEffect(() => {
        async function filter() {
            const filtered = await filterCardsByType(cardsData, tFilter);
            setFilteredCards(filtered);
        }
        filter();   
    }, [cardsData, tFilter]); //!WARNING!: KEEP ONLY THE PROP IN THE HOOK, filterOptions causes infinte loop */

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
        //console.log("filter-by filteredCards after :", filteredCards);
    }, [cardsData, props, cardOrderUpdate]); //!WARNING!: KEEP ONLY THE PROP IN THE HOOK, filterOptions causes infinte loop



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
                        />
                    </div>
                );
            })}
            
            {/*
            {userCards.map((card) => {
                const filteredCard = filteredCards.find(obj => obj.id === card.id);
                if (!filteredCard) {
                    return null;
                }
                return (
                    <div key={card.id}>
                        <CardComponent_v2 id={card.id} 
                            count={card.count} 
                            imageUrl={filteredCard.image_uris.normal} 
                            name={filteredCard.name}
                            price_eur={filteredCard.prices.eur}
                        />
                    </div>
                );
            })}
           */}
        </div>
    )
}

export default CardListAssembler