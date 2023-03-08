import "../modules/modules.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Alert, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import HitCounter from "../modules/HitCounter";
import { getFirestore, FieldValue, arrayUnion, collection, updateDoc ,getDoc, setDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase';
import AdderPanelTest from "../modules/AdderPanelTest";


let response ="";

function QueryServerTest() {
    //const [data, setData] = useState(null);

    const {user, logOut} = useUserAuth();
    const [cachedData, setCachedData] = useState(null);
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
        await getCardByName();
    };

    const getCardByName = async () => {
        setError("");
        try {
            const response = await fetch(`http://localhost:3000/bulkdata?name=${cardName} `);
            const data1 = await response.json();
            if (data1.length === 0) {
                console.error(`Card with Name ${cardName} not found.`);
                throw new Error(`No card found with name "${cardName}"`);
            } else {
                setCardData(data1);
                return data1;
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };
    

    return (
        <>
            <h2 style={{color: 'white'}}>{ user && user.email }</h2>
            <div>
                <Button className="gap-2" variant="primary" onClick={handleLogout}>Log Out</Button>
            </div>
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
            <div className="normal-container overflow-auto" style={{maxHeight: `calc(${window.innerHeight}px - 220px)`,}}>
            {cardData && cardData.length !== 0 && cardData.map((card) => (
                <div key={card.id}><AdderPanelTest card={card} /></div> ))}
            </div>
            {error && <Alert variant="danger">{error}</Alert> }
        </>
    );
}

export default QueryServerTest;
