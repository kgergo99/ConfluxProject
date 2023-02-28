import "../modules/modules.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";

async function getCardData(cardName) {  
    console.log('Fetching card data from server...');
    const response = await fetch(`http://localhost:3000/bulkdata`);
    if (response.ok) { console.log("Request successful!"); } else { console.log("Request not successful!"); }
    const data = await response.json();
    const cardsData = data.filter((card) =>
        card.name.toLowerCase().includes(cardName.toLowerCase())
    );
    return cardsData;
}

function BulkDataTest() {
    const [cardName, setCardName] = useState("");
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

    return (
        <>
            <div
                className="normal-container"
                style={{ maxHeight: "60px" }}
            >
                <Form onSubmit={handleSubmit}>
                <Form.Group
                    className="mb-3"
                    controlId="formBasicText"
                >
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
                style={{
                    maxHeight: `calc(${window.innerHeight}px - 60px)`,
                }}
            >
            {cardData &&
                cardData.map((card) => (
                    <div key={card.id} className="normal-container">
                    <h1>
                        {card.name} | {card.prices.eur} € |{" "}
                        {card.prices.usd} $
                    </h1>
                    <img
                        src={card.image_uris.small}
                        alt={card.name}
                    />
                    </div>
                ))}
            </div>
            {error && (
                <Alert variant="danger">{error}</Alert>
            )}
        </>
    );
}

export default BulkDataTest;
