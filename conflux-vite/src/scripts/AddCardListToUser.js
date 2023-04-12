import { arrayUnion, updateDoc ,getDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase';

export const AddCardListToUser = async (cardList) => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef, "cards");

    cardList.forEach(cardObj => {
        handleAddOrRemoveCardFromUser(docRef, docSnap, cardObj.card.id, cardObj.count, cardObj.card.name, false, false);
    });    
};

export const handleAddOrRemoveCardFromUser = async (docRef, docSnap, cardId, count, name, overwriting, deleting) => {
    if (docSnap.exists()) {
        const cardIndex = docSnap.data().cards.findIndex((item) => item.id === cardId);
        if (cardIndex !== -1) {
            try {
                const updatedCards = [...docSnap.data().cards];
                if (!deleting) {
                    // Adding / Overwriting card
                    if (!overwriting) {
                        updatedCards[cardIndex].count += count;
                    } else {
                        updatedCards[cardIndex].count = count;
                    }
                    if (updatedCards[cardIndex].count > 999) {
                        console.log("Maximum count exceeded.");
                        return;
                    }
                } else {
                    // Deleting the card
                    updatedCards.splice(cardIndex, 1);
                }
                const updatedData = {
                    cards: updatedCards,
                };

                await updateDoc(docRef, updatedData);
                console.log("Document successfully updated!");
            } catch (err) {
                console.error("Error updating document: ", err);
            }
        } else if (count > 0) {
            try {
                const updatedData = {
                    // add the new data fields here
                    cards: arrayUnion({ id: cardId, count: count, name: name }),
                };
                await updateDoc(docRef, updatedData);
                console.log("Document successfully updated!");
            } catch (err) {
                console.error("Error updating document: ", err);
            }
        } else {
            console.log("Invalid card amount!", count);
        }
    } else {
        console.log("No such document exists!");
    }
}

export const handleAddOrRemoveCardFromUser_Single = async (cardId, count, name, overwriting, deleting) => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef, "cards");
    if (docSnap.exists()) {
        const cardIndex = docSnap.data().cards.findIndex((item) => item.id === cardId);
        if (cardIndex !== -1) {
            try {
                const updatedCards = [...docSnap.data().cards];
                if (!deleting) {
                    console.log("NOT DELETING", updatedCards[cardIndex]);
                    // Adding / Overwriting card
                    if (!overwriting) {
                        updatedCards[cardIndex].count += count;
                    } else {
                        updatedCards[cardIndex].count = count;
                    }
                    if (updatedCards[cardIndex].count > 999) {
                        console.log("Maximum count exceeded.");
                        return;
                    }
                } else {
                    // Deleting the card
                    console.log("Deleting the card: ", updatedCards[cardIndex]);
                    updatedCards.splice(cardIndex, 1);
                }
                const updatedData = {
                    cards: updatedCards,
                };

                await updateDoc(docRef, updatedData);
                console.log("Document successfully updated!");
            } catch (err) {
                console.error("Error updating document: ", err);
            }
        } else if (count > 0) {
            //Card is not already in the doc and the count is greater than 0
            try {
                const updatedData = {
                    // add the new data fields here
                    cards: arrayUnion({ id: cardId, count: count, name: name }),
                };
                await updateDoc(docRef, updatedData);
                console.log("Document successfully updated!");
            } catch (err) {
                console.error("Error updating document: ", err);
            }
        } else {
            console.log("Invalid card amount!", count);
        }
    } else {
        console.log("No such document exists!");
    }
}

export const handleAddDeckToUser = async (newDeck) => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef, "decks");
    if (docSnap.exists()) {
        try {
            const userDoc = docSnap.data();
            const existingDeckIndex = userDoc.decks.findIndex(deck => deck.deckId === newDeck.deckId);
            if (existingDeckIndex !== -1) {
                // Update existing deck
                const updatedDecks = [...userDoc.decks];
                updatedDecks[existingDeckIndex] = { ...updatedDecks[existingDeckIndex], ...newDeck };
                const updatedData = { decks: updatedDecks };
                await updateDoc(docRef, updatedData);
                console.log("Existing deck successfully updated!");
            } else {
                // Add new deck
                const updatedData = {
                    decks: arrayUnion(newDeck),
                };
                await updateDoc(docRef, updatedData);
                console.log("New deck added successfully!");
            }
            } catch (err) {
                console.error("Error updating document: ", err);
            }
        } else {
            console.log("No such document exists!");
        }
}

