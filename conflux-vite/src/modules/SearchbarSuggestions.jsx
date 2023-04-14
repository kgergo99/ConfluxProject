import './searchbar.css'
import '../index.css'
import './modules.css'
import './searchbarsuggestions.css'
import React, { useState, useEffect } from "react";
import AdderPanel from './AdderPanel';
import getUserCards from '../scripts/GetUserCards';
import getCardReduced from '../scripts/GetCardReduced';


function SearchbarSuggestions({ placeholder_text, iconUrl, user, onSelectedCardChange }) {
    const [cardName, setCardName] = useState("");
    const [userCards, setUserCards] = useState([]);
    const [cardData, setCardData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedPanel, setSelectedPanel] = useState(null);
    const [searchingState, setSearchingState] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSearchingState(true);
        setCardData(null);
        console.time("getCardData");
        const cardData = await getCardReduced(cardName);
        console.timeEnd("getCardData");
        if (!cardData) {
            setError(`Card with Name ${cardName} not found.`);
            return;
        }
        setCardData(cardData);
    }

    const handlePanelClick = (card) => {
        setSelectedPanel(card.name + " | " + card.set_name);
        setSearchingState(false);
        if (onSelectedCardChange) {
            onSelectedCardChange(card);
        }
    };

    const handleClickInside = () => {
        setSelectedPanel(null);
        if (onSelectedCardChange) {
            onSelectedCardChange(null);
        }
        if (cardData || error) {
            setSearchingState(false);
        }
    }
    
    useEffect(() => {
        async function fetchCards() {
            const userCards_tmp = await getUserCards(user);
            if (userCards_tmp) {
                setUserCards(userCards_tmp);
            }
        }
        fetchCards();
    }, []);
    

    return (
        <div className='search-form-container'>
            <form className="search-form" onSubmit={handleSubmit}>
                <input className="search-input" onClick={ handleClickInside } 
                    type="search" 
                    placeholder={selectedPanel ? selectedPanel : placeholder_text} 
                    name="searchTerm"
                    value={selectedPanel ? "" : cardName}
                    onChange={(e) => setCardName(e.target.value) + setSelectedPanel(null)}/>
                <button className="search-submit" 
                    type="submit" 
                    title="Search" 
                    style={ { background: `no-repeat center url(${iconUrl})`} }>
                </button>
            </form>

            {/* Show all the card's data with .map */}
            <div className="dropdown-container" style={{maxHeight: `calc(${window.innerHeight}px - 220px)`,}}>
                {(searchingState && cardData) && Array.isArray(cardData) && cardData.map((card) => (
                    <div key={card.id}>
                        <div onClick={() => handlePanelClick(card)}><AdderPanel userCards={userCards} card={card} onSelectedCardChange={onSelectedCardChange}/></div>
                    </div> 
                    ))}
                {(searchingState && error) && <AdderPanel userCards={null} card={null}/> }
            </div>
            
        </div>
    )
}
  
export default SearchbarSuggestions