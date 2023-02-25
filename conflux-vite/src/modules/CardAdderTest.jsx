import './modules.css'
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
  return cardData;
}

function CardAdderTest() {
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
  }

  return (
    <>
      <div className='normal-container'>
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
      {cardData && cardData.image_uris &&
        <div className='normal-container'>
          <h1>{cardData.name} | {cardData.prices.eur} €</h1>
          <img src={cardData.image_uris.normal} alt={cardData.name} />
        </div>
      }
      {error &&
        <Alert variant="danger">
          {error}
        </Alert>
      }
    </>
  )
}

export default CardAdderTest;
