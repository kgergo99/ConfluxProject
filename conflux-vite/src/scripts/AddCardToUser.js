import { arrayUnion, collection, updateDoc ,getDoc, setDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase';

export const handleAddCardToUser = async (card, count, overwriting) => {
    const docRef = doc(db, "users", auth.currentUser.uid );
    const docSnap = await getDoc(docRef, "cards"); //this only gets the cards part, nothing else
    if (docSnap.exists()) {
        const cardIndex = docSnap.data().cards.findIndex((item) => item.id === card.id);
        if (cardIndex !== -1) {
            try {
                const updatedCards = [...docSnap.data().cards];
                if(!overwriting){
                    updatedCards[cardIndex].count += count;
                }
                else{
                    updatedCards[cardIndex].count = count;
                }
                const updatedData = {
                  cards: updatedCards
                };
                if (updatedCards[cardIndex].count > 999) {
                    console.log("Maximum count exceeded.");
                    return;
                }
                await updateDoc(docRef, updatedData);
                console.log("Document successfully updated!");
            } catch (err) {
                console.error("Error updating document: ", err);
            }
        } else if(count > 0) {
            try { 
                const updatedData = {
                // add the new data fields here
                cards: arrayUnion({ id: card.id, count: count })
            };
            await updateDoc(docRef, updatedData);
            console.log("Document successfully updated!");
            } catch (err) {    
                console.error("Error updating document: ", err);
            }
        }
        else {
            console.log("Invalid card amount!", count);
        }         
    } else {
        console.log("No such document exists!");
    }
}
