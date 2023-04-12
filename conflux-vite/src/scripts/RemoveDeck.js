import { updateDoc ,getDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase';


export const RemoveDeck = async (deckId) => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef, "cards");

    if (docSnap.exists()) {
        const deckIndex = docSnap.data().decks.findIndex((item) => item.deckId === deckId);
        console.log("Deck index: ", deckIndex, "deck ID: ", deckId);
        if (deckIndex !== -1) {
            try {
                const updatedDecks = [...docSnap.data().decks];
                
                // Deleting the card
                updatedDecks.splice(deckIndex, 1);

                const updatedData = {
                    decks: updatedDecks,
                };

                await updateDoc(docRef, updatedData);
                console.log("Document successfully updated!");
            } catch (err) {
                console.error("Error updating document: ", err);
            }
        } else {
            console.log("No such document exists!");
        }
    }
}

