import CardComponent from "../modules/CardComponent";
import filterCardsByColor from "../scripts/card_filters/FilterCardsByColor";
import filterCardsByType from "../scripts/card_filters/FilterCardsByType";
import filterCardsByName from "../scripts/card_filters/FilterCardsByName";
import getAllCardsByIds from "../scripts/GetAllCardsByIds";
import React, { useState, useEffect } from "react";
import filterCardsByRarity from "../scripts/card_filters/FilterCardsByRarity";
import sortCardsByOptions from "../scripts/SortCardsByOptions";

function CardListAssembler(props) {
    const [cardsData, setCardsData] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [cardOrderUpdate, setCardOrderUpdate] = useState(false);

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
        maxHeight: `calc(100vh - ${fixedNavbarHeight})`,
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        overflow: "scroll",
        
        },
    };

    useEffect(() => {
        setCardOrderUpdate(!cardOrderUpdate);
    }, [sortByOption]);

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
        <div className='deck-grid disable-scrollbars' style={stylingObject.grid}>
            {filteredCards.map((card) => {
                return (
                    <div key={card.id}>
                        <CardComponent id={card.id} 
                            count={card.count} 
                            imageUrl={card.image_uris.small} 
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
                        <CardComponent id={card.id} 
                            count={card.count} 
                            imageUrl={filteredCard.image_uris.small} 
                            name={filteredCard.name}
                        />
                    </div>
                );
            })}
            */}
        </div>
    )
}

export default CardListAssembler