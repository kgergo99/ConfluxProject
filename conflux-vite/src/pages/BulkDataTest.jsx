import '../modules/modules.css'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from '../context/UserAuthContext';
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase';
import fs from 'fs';

const BULK_DATA_FILE_PATH = '../../../BulkData/default-cards.json';

function loadBulkData() {
    if (!fs.existsSync(BULK_DATA_FILE_PATH)) {
      throw new Error('Bulk data file not found');
    }
    return require(BULK_DATA_FILE_PATH);
  }

async function getCardData(cardName) {
  const bulkData = loadBulkData();
  const jsonData = JSON.parse(bulkData);
  const searchData = jsonData.data.filter((card) => card.name.toLowerCase() === cardName.toLowerCase());
  if (searchData.length === 0) {
    throw new Error('Card not found');
  }
  return searchData;
}

function BulkDataTest() {
  const [cardName, setCardName] = useState('');
  const [cardData, setCardData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await getCardData(cardName);
      setCardData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="normal-container" style={{ maxHeight: '60px' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Control
              type="text"
              placeholder="Card name..."
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Get Card
          </Button>
        </Form>
      </div>
      <div
        className="normal-container overflow-auto"
        style={{ maxHeight: `calc(${window.innerHeight}px - 60px)` }}
      >
        {cardData &&
          cardData.map((card) => (
            <div key={card.id} className="normal-container">
              <h1>
                {card.name} | {card.prices.eur} € | {card.prices.usd} $
              </h1>
              <img src={card.image_uris.small} alt={card.name} />
            </div>
          ))}
      </div>
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}
    </>
  );
}

export default BulkDataTest;
