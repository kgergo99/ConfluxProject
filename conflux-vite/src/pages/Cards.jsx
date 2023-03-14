import CardListAssembler from "../dinamic_modules/CardListAssembler";
import { useState, useEffect } from 'react'
import './decks.css'
import Navbar from '../modules/Navbar'
import CardSearchBars from "../assembled_modules/CardSearchBars";
import ColorFilterModule from '../assembled_modules/ColorFilterModule';
import TypeFilterModule from "../assembled_modules/TypeFilterModule";
import RarityFilterModule from "../assembled_modules/RarityFilterModule";
import Divider from '../assembled_modules/Divider';
import { useUserAuth } from '../context/UserAuthContext';
import { Button } from 'react-bootstrap';
import { arrayUnion, collection, updateDoc ,getDoc, setDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase';


function Cards(){
    const [cards, setCards] = useState([]);
    const [colorFilter, setColorFilter] = useState([]);
    const [typeFilter, setTypeFilter] = useState([]);
    const [rarityFilter, setRarityFilter] = useState([]);
    const [nameFilter, setNameFilter] = useState("");
    const {user, logOut} = useUserAuth();
    console.log("current user: ", user.uid);
    console.log("!!Cards re-render!!");
    const handleLogout = async () => {
        try {
            await logOut();
        }catch (err) {
            console.log(err.message);
        }
    }

    function handleColorFilterChange(newColorFilter) {
        setColorFilter(newColorFilter);
    }
    function handleTypeFilterChange(newTypeFilter) {
        setTypeFilter(newTypeFilter);
    }
    function handleRarityFilterChange(newRarityFilter) {
        setRarityFilter(newRarityFilter);
    }
    function handleNameFilterChange(newNameFilter) {
        setNameFilter(newNameFilter);
    }

    const GetUserCards = async () => {
        const docRef = doc(db, "users", user.uid );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("docSnap.data().cards: ", docSnap.data().cards);
            console.log("userCards in Cards - GetUserCards: ", cards);
            return docSnap.data().cards;
        }
        else {
            console.error("User does not have any cards");
            return null;
        }
    }

    useEffect(() => {
        async function fetchCards() {
            const userCards = await GetUserCards();
            if (userCards) {
                setCards(userCards);
            }
        }
        fetchCards();
    }, []);
    
    useEffect(() => {
        console.log("userCards in Cards - useEffect: ", cards);
    }, [cards]);    
    useEffect(() => {
        console.log("Cards colorFilter value: ", colorFilter);
    }, [colorFilter])
    useEffect(() => {
        console.log("Cards typeFilter value: ", typeFilter);
    }, [typeFilter])

    return (
        <div className="Decks">
        <Navbar />
        <h1>Hello { user && user.email }</h1>
        <div>
            <Button className="gap-2" variant="primary" onClick={handleLogout}>Log Out</Button>
        </div>
        <CardSearchBars onNameFilterChange={handleNameFilterChange}/>
        <ColorFilterModule radius={"2.2rem"} onColorFilterChange={handleColorFilterChange}/>
        <TypeFilterModule radius={"2.2rem"} onTypeFilterChange={handleTypeFilterChange}/>
        <RarityFilterModule radius={"2.2rem"} onRarityFilterChange={handleRarityFilterChange}/>
        <Divider />
        <CardListAssembler userCards={cards} colorFilter={colorFilter} typeFilter={typeFilter} rarityFilter={rarityFilter} nameFilter={nameFilter}/>
        </div>
    )
}

export default Cards