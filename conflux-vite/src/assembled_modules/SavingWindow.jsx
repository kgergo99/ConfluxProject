import "./assembledmodules.css"
import { useEffect, useState } from "react";
import makeNewDeckForUser, { calcDeckSize, getCollectedCount } from "../scripts/MakeDeckForUser";
import AddOutline from "../assets/Add-Outline-24px.svg"

function SavingWindow(props) {
    const [coverImg, setCoverImg] = useState("src/assets/card_images/cover/card_cover_404.png");
    const [deckName, setDeckName] = useState("Deck");
    const randomImageCount = 3;
    const [coverImgList, setCoverImgList] = useState([]);
    const [updateCoverImgList, setUpdateCoverImgList] = useState(false);

    const mainCardList = props.mainCardList;
    const sideCardList = props.sideCardList;
    const userCards = props.userCards;

    const deckSize = calcDeckSize(mainCardList, sideCardList);
    const collectedSize = getCollectedCount(userCards, mainCardList, sideCardList);

    useEffect(()=>{
        
        const newImage = randomImage(mainCardList);
        setCoverImgList([...coverImgList, newImage]);
        setCoverImg(coverImgList[0]);
        
        console.log("UPDATE IN coverImg");
    }, [updateCoverImgList])

    // To update the list 
    useEffect(()=>{
        console.log("helper | ", coverImgList);
        if ( !coverImgList || coverImgList.length < randomImageCount){
            setUpdateCoverImgList(!updateCoverImgList);
        }
    }, [updateCoverImgList])

    function randomImage(mainCardList) {
        const cardIndex = Math.floor(Math.random() * mainCardList.length);
        const chosen = mainCardList[cardIndex];
        const img = (chosen.card.image_uris? chosen.card.image_uris.art_crop : chosen.card.card_faces[0].image_uris.art_crop); 
        return img;
    }
    

    const handleRadioChange = (img) => {
        setCoverImg(img);
    }

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
        <div className="window-container fixed-window-middle popup-animation" >
            <div className="grid-savedeck">
                <label for="checkbox-1">
                    <input type="radio" id="checkbox-1" onChange={() => handleRadioChange(coverImgList[0])} className="checkbox-1 d-none" name="cover-group" />
                    <img src={coverImgList[0]} className="image-item w-h-100 label-img-size-limit"></img>
                </label>
                <label for="checkbox-2">
                    <input type="radio" id="checkbox-2" onChange={() => handleRadioChange(coverImgList[1])} className="checkbox-2 d-none" name="cover-group"/>
                    <img src={coverImgList[1]} className="image-item w-h-100 label-img-size-limit"></img>
                </label>
                <label for="checkbox-3">
                    <input type="radio" id="checkbox-3" onChange={() => handleRadioChange(coverImgList[2])} className="checkbox-3 d-none" name="cover-group"/>
                    <img src={coverImgList[2]} className="image-item w-h-100 label-img-size-limit"></img>
                </label>
                
                <img className="image-item w-h-100 cover-image cover-img-size-limit" src={coverImg}></img>
                <input type="text" className="deck-name white-input-panel" onChange={(e) => setDeckName(e.target.value)}/>
                <button onClick={handleSubmit} className="button-save" style={{backgroundImage: `url(${AddOutline})`, backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: '50%'} }></button>
            </div>
            

            {/*<div >
                <input type="text" onChange={(e) => setDeckName(e.target.value)}/>
                <button onClick={handleSubmit}></button>
            </div>*/}

        </div>
    )
}

export default SavingWindow