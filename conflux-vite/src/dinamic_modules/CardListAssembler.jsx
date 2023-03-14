import CardComponent from "../modules/CardComponent";
import filterCardsByOptions from "../scripts/FilterCardsByOptions";
import filterCardsByColor from "../scripts/card_filters/FilterCardsByColor";
import filterCardsByType from "../scripts/card_filters/FilterCardsByType";
import filterCardsByName from "../scripts/card_filters/FilterCardsByName";
import getCardById from "../scripts/GetCardById";
import getAllCardsByIds from "../scripts/GetAllCardsByIds";
import React, { useState, useEffect } from "react";
import filterCardsByRarity from "../scripts/card_filters/FilterCardsByRarity";

function CardListAssembler(props) {
    const [cardsData, setCardsData] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);

    const fixedNavbarHeight = "420px";

    const userCards = props.userCards;
    const cFilter = props.colorFilter;
    const tFilter = props.typeFilter;
    const rFilter = props.rarityFilter;
    const nFilter = props.nameFilter;
    console.log("!!CardListAssembler re-renders!!");
    
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
        maxHeight: `calc(100vh - ${fixedNavbarHeight})`,
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        overflow: "scroll",
        
        },
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
            if (cFilter.length > 0) {
                filtered = await filterCardsByColor(filtered, cFilter);
            }
            if (tFilter.length > 0) {
                filtered = await filterCardsByType(filtered, tFilter);
            }
            if (rFilter.length > 0) {
                filtered = await filterCardsByRarity(filtered, rFilter);
                console.log("rarity filtering: ", rFilter);
            }
            if (nFilter.length > 0) {
                filtered = await filterCardsByName(filtered, nFilter);
                console.log("name filtering: ", nFilter);
            }
            console.log("filtering filtered cards: ", filtered);
            setFilteredCards(filtered);
        }
        filter();   
    }, [cardsData, tFilter, cFilter, rFilter, nFilter]); //!WARNING!: KEEP ONLY THE PROP IN THE HOOK, filterOptions causes infinte loop

    useEffect(() => {
        console.log("filtering. filteredCards contains: ", filteredCards);
    }, [filteredCards]);

    useEffect(() => {
        console.log("$$$ Cards data: ", cardsData);
    }, [cardsData]);

    useEffect(() => {
        console.log("--- - CardListAssembler cFilter value: ", cFilter);
    }, [cFilter])

    useEffect(() => {
        console.log("--- filterOptions changed: ", filterOptions);
    }, [filterOptions]);

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