import { useState } from "react";
import makeNewDeckForUser, { calcDeckSize, getCollectedCount } from "../scripts/MakeDeckForUser";

function SavingWindow(props) {
    const [coverImg, setCoverImg] = useState("Cover Image Link");
    const [deckName, setDeckName] = useState("Deck");

    const mainCardList = props.mainCardList;
    const sideCardList = props.sideCardList;
    const userCards = props.userCards;
    

    const deckSize = calcDeckSize(mainCardList, sideCardList);
    const collectedSize = getCollectedCount(userCards, mainCardList, sideCardList);

    const handleSubmit = () => {
        const newDeck = makeNewDeckForUser(deckName,
        /*mainCardList[0].card.image_uris.art_crop*/ coverImg,
            deckSize,
            collectedSize, 
            mainCardList, 
            sideCardList );
        
        console.log("New Deck: ", newDeck);
        props.onDeckSaved();
    }

    return(
        <div className="normal-container fixed-window-middle popup-animation" >
            <div >
                <input type="text" onChange={(e) => setDeckName(e.target.value)}/>
                <button onClick={handleSubmit}></button>
            </div>
        </div>
    )
}

export default SavingWindow