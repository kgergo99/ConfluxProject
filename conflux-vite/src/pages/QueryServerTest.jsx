import "../modules/modules.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Alert, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";

import { getFirestore, FieldValue, arrayUnion, collection, updateDoc ,getDoc, setDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase';
import AdderPanelTest from "../modules/AdderPanelTest";
import getCardByName from "../scripts/GetCardByName";


let response ="";

function QueryServerTest() {
    //const [data, setData] = useState(null);

    const {user, logOut} = useUserAuth();
    const [cardName, setCardName] = useState("");
    const [cardData, setCardData] = useState(null);
    const [error, setError] = useState(null);

    const handleLogout = async () => {
        try {
            await logOut();
        }catch (err) {
            console.log(err.message);
        }
    } 


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setCardData(null);
        console.time("getCardData");
        const cardData = await getCardByName(cardName);
        console.timeEnd("getCardData");
        if (!cardData) {
            setError(`Card with Name ${cardName} not found.`);
            return;
        }
        setCardData(cardData);
    };    

    return (
        <>
            <h2 style={{color: 'white'}}>{ user && user.email }</h2>
            <div>
                <Button className="gap-2" variant="primary" onClick={handleLogout}>Log Out</Button>
            </div>

             {/* Card searching form */}
            <div className="normal-container" style={{ maxHeight: "100px" }} >
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Control
                    type="text"
                    placeholder="Card name..."
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Get Card</Button>
                </Form>
            </div>

            {/* Show all the card's data with .map */}
            <div className="normal-container overflow-auto" style={{maxHeight: `calc(${window.innerHeight}px - 220px)`,}}>
            {cardData && Array.isArray(cardData) && cardData.map((card) => (
                <div key={card.id}><AdderPanelTest card={card} /></div> ))}
            </div>
            {error && <Alert variant="danger">{error}</Alert> }

        </>
    );
}

export default QueryServerTest;
