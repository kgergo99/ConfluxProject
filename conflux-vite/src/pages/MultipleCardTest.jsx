import '../modules/modules.css'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from '../context/UserAuthContext';
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase';

async function getCardData(cardName) {
  const response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${cardName}`);
  if (response.status === 404) {
    throw new Error('Card not found');
  }
  const cardData = await response.json();
  const oracleId = cardData.oracle_id;
  const response2 = await fetch(`https://api.scryfall.com/cards/search?order=released&q=oracleid%3A${oracleId}&unique=prints`);
  const searchData = await response2.json();
  const cardsData = searchData.data;
  return cardsData;
}


function MultipleCardTest() {
    const [cardName, setCardName] = useState('');
    const [cardData, setCardData] = useState(null);
    const [error, setError] = useState(null);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
          const data = await getCardData(cardName);
          setCardData(data);
        } catch (err) {
          setError(err.message);
        }
    };
  
    //const searchHeight = document.getElementById('cardsearch').offsetHeight;
    //const scrollableHeight = `calc(${window.innerHeight}px - ${document.getElementById('cardsearch').offsetHeight}px)`;

    return (
        <>
          <div className='normal-container' style={{maxHeight: '60px'}}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Control
                  type="text"
                  placeholder="Card name..."
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="Submit">Get Card</Button>
            </Form>
          </div>
          <div className='normal-container overflow-auto' style={{maxHeight: `calc(${window.innerHeight}px - 60px)` }}>
          {cardData && cardData.map((card) => (
            <div key={card.id} className='normal-container'>
              <h1>{card.name} | {card.prices.eur} € | {card.prices.usd} $ </h1>
              <img src={card.image_uris.small} alt={card.name} />
            </div>
          ))}
          </div>
          {error &&
            <Alert variant="danger">
              {error}
            </Alert>
          }
        </>
    );
  }
  
  export default MultipleCardTest;
  