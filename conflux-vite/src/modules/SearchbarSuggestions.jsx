import './searchbar.css'
import '../index.css'
import './modules.css'
import getMinCardByName from '../scripts/GetMinCardByName.js';
import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import AdderPanel from './AdderPanel';
import getUserCards from '../scripts/GetUserCards';


function SearchbarSuggestions({ placeholder_text, iconUrl, user }) {
    const [cardName, setCardName] = useState("");
    const [userCards, setUserCards] = useState([]);
    const [cardData, setCardData] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setCardData(null);
        console.time("getCardData");
        const cardData = await getMinCardByName(cardName);
        console.timeEnd("getCardData");
        if (!cardData) {
            setError(`Card with Name ${cardName} not found.`);
            return;
        }
        setCardData(cardData);
    }

    useEffect(() => {
        async function fetchCards() {
            const userCards_tmp = await getUserCards(user.user);
            if (userCards_tmp) {
                setUserCards(userCards_tmp);
            }
        }
        fetchCards();
    }, []);
    
    useEffect(() => {
        async function fetchCards() {
            const userCards_tmp = await getUserCards(user.user);
            if (userCards_tmp) {
                setUserCards(userCards_tmp);
            }
        }
        fetchCards();
    }, []);
    

    return (
        <div className='search-form-container'>
            <form className="search-form" onSubmit={handleSubmit}>
                <input className="search-input" 
                    type="search" 
                    placeholder={placeholder_text} 
                    name="searchTerm"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}/>
                <button className="search-submit" 
                    type="submit" 
                    title="Search" 
                    style={ { background: `no-repeat center url(${iconUrl})`} }>
                </button>
            </form>

            {/* Show all the card's data with .map */}
            <div className="dropdown-container" style={{maxHeight: `calc(${window.innerHeight}px - 220px)`,}}>
            {cardData && Array.isArray(cardData) && cardData.map((card) => (
                <div key={card.id}><AdderPanel userCards={userCards} card={card} /></div> ))}
            </div>
            {error && <Alert variant="danger">{error}</Alert> }
        </div>
    )
}
  
export default SearchbarSuggestions