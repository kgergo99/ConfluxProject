import "./modules.css";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import HitCounter from "../modules/HitCounter";
import { arrayUnion, collection, updateDoc ,getDoc, setDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase';

function AdderPanelTest(props){
    const { card } = props;
    const [count, setCount] = useState(0);
    const handleCountChange = (count) => {
        setCount(count);
    };

    const handleAddCardToUser = async (card) => {
        const docRef = doc(db, "users", auth.currentUser.uid );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            try {
                const updatedData = {
                    // add the new data fields here
                    cards: arrayUnion({ id: card.id, count: count })
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
            <div className="normal-container">
            <h1>{card.name} | {card.prices.eur} € | {card.prices.usd} $</h1>
            {card.image_uris && <img src={card.image_uris.small} alt={card.name} />}
            <HitCounter count={count} onCountChange={handleCountChange} />
            <Button variant="primary" onClick={() => handleAddCardToUser(card)}>+</Button>             
        </div>
    )
    
}

export default AdderPanelTest