import "../modules/modules.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Alert, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import HitCounter from "../modules/HitCounter";

let response ="";

function BulkDataTest() {
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

    async function getCardDataFromName(cardName) {  
        if (!cachedData) {
            await cacheBulkData();
        }
        const cardsData = cachedData.filter((card) =>
            card.name.toLowerCase().includes(cardName.toLowerCase())
        );
        if (cardsData.length === 0 || !cardsData[0].name) {
            throw new Error(`No card found with the name "${cardName}"`);
        }
        return cardsData;
    }
    async function cacheBulkData() {
        console.log('Fetching card data from server...');
        response = await fetch(`http://localhost:3000/bulkdata`);
        if (response.ok) { console.log("Request successful!"); } else { console.log("Request not successful!"); }
        const data = await response.json();
        
        setCachedData(data);
    }
    
    //for initial caching of the data
    useEffect(() => {
        cacheBulkData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const data = await getCardDataFromName(cardName);
            if (data.length === 0) {
                console.log("found error, data length === 0");
                throw new Error(`No card found with name "${cardName}"`);
            }
            setCardData(data);
            console.log(`No(?) error, data length = "${data.length}"`);
        } catch (err ) {
            setError(err.message);
        }
    };

    const handleAddCardToUser = async (id) => {
        const docRef = doc(db, "users", auth.currentUser.uid );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            try {
                const updatedData = {
                    // add the new data fields here
                };
                await updateDoc(docRef, updatedData);
                console.log("Document successfully updated!");
            } catch (err) {
                setError(err.message);
                console.error("Error updating document: ", err);
            }
            } else {
                console.log("No such document exists!");
            }
    }

    return (
        <>
            <h2 style={{color: 'white'}}>Hello { user && user.email }</h2>
            <div>
                <Button className="gap-2" variant="primary" onClick={handleLogout}>Log Out</Button>
            </div>
            <div className="normal-container" style={{ maxHeight: "60px" }} >
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
            <div className="normal-container overflow-auto" style={{maxHeight: `calc(${window.innerHeight}px - 60px)`,}}>
            {cardData && cardData.length !== 0 && cardData.map((card) => (
                <div key={card.id} className="normal-container">
                    <h1>{card.name} | {card.prices.eur} € | {card.prices.usd} $</h1>
                    {card.image_uris && <img src={card.image_uris.small} alt={card.name} />}
                    {/*<Form onSubmit={handleAddCardToUser(card.id)}>
                        <Button variant="primary" onClick={() => handleAddCardToUser(card.id)}>+</Button>
                    </Form>*/}
                    <HitCounter></HitCounter>
                    <Button variant="primary" onClick={() => handleAddCardToUser(card.id)}>+</Button>
                    
                </div>
            ))}
            </div>
            {error && <Alert variant="danger">{error}</Alert> }
        </>
    );
}

export default BulkDataTest;
