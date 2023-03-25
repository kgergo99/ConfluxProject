import { useUserAuth } from '../context/UserAuthContext';
import { Button } from 'react-bootstrap';
import { arrayUnion, collection, updateDoc ,getDoc, setDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase';

export default async function getUserDecks(user) {
    const docRef = doc(db, "users", user.uid );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data().decks;
    }
    else {
        console.error("User does not have any decks");
        return null;
    }
}