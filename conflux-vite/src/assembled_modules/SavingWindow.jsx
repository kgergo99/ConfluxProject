import "./assembledmodules.css"
import { useEffect, useState } from "react";
import makeNewDeckForUser, { calcDeckSize, getCollectedCount } from "../scripts/MakeDeckForUser";
import AddOutline from "../assets/Add-Outline-24px.svg"

function SavingWindow(props) {
    const [coverImg, setCoverImg] = useState("");
    const [deckName, setDeckName] = useState("Deck");
    const randomImageCount = 3;
    const [coverImgList, setCoverImgList] = useState([]);
    const [selectedImgList, setSelectedImgList] = useState([]);
    const [updateCoverImgList, setUpdateCoverImgList] = useState(false);

    const mainCardList = props.mainCardList;
    const sideCardList = props.sideCardList;
    const userCards = props.userCards;

    const deckSize = calcDeckSize(mainCardList, sideCardList);
    const collectedSize = getCollectedCount(userCards, mainCardList, sideCardList);

    /*useEffect(()=>{
        
        const newImage = randomImage(mainCardList);
        setCoverImgList([...coverImgList, newImage]);
        setCoverImg(coverImgList[0]);
        
        console.log("UPDATE IN coverImg");
    }, [updateCoverImgList])
    */

    // To update the list 
    /*useEffect(()=>{
        if ( !coverImgList || coverImgList.length < randomImageCount){
            setUpdateCoverImgList(!updateCoverImgList);
        }
    }, [updateCoverImgList])*/

    function randomImage(mainCardList) {
        const cardIndex = Math.floor(Math.random() * mainCardList.length);
        const chosen = mainCardList[cardIndex];
        const img = (chosen.card.image_uris? chosen.card.image_uris.art_crop : chosen.card.card_faces[0].image_uris.art_crop); 
        return img;
    }

    function getImageLinks(mainCardList){
        let imgLinks = [];
        mainCardList.forEach(element => {
            const current = (element.card.image_uris? element.card.image_uris.art_crop : element.card.card_faces[0].image_uris.art_crop);
            imgLinks.push(current);
        });
        return imgLinks;
    }
    
    useEffect(()=>{
        const imgLinks = getImageLinks(mainCardList);
        setCoverImgList(imgLinks);
        setCoverImg(imgLinks[0]);
    },[])

    useEffect(() => {
        const selectLinks = () => {
            let links = [];
            if (coverImgList.length < 3) {
                    // If there are fewer than 3 image links, select them without checking for duplicates
                    for (let i = 0; i < randomImageCount; i++) {
                        links.push(coverImgList[Math.floor(Math.random() * coverImgList.length)]);
                    }
            } else {
                // If there are at least 3 image links, select 3 unique links
                while (links.length < 3) {
                    const randomIndex = Math.floor(Math.random() * coverImgList.length);
                    const randomLink = coverImgList[randomIndex];
                    if (!links.includes(randomLink)) {
                        links.push(randomLink);
                    }
                }
            }
            setSelectedImgList(links);
        };
        selectLinks();
    }, [coverImgList]);



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
                    <input type="radio" id="checkbox-1" onChange={() => handleRadioChange(selectedImgList[0])} className="checkbox-1 d-none" name="cover-group" />
                    <img src={selectedImgList[0]} className="image-item w-h-100 label-img-size-limit"></img>
                </label>
                <label for="checkbox-2">
                    <input type="radio" id="checkbox-2" onChange={() => handleRadioChange(selectedImgList[1])} className="checkbox-2 d-none" name="cover-group"/>
                    <img src={selectedImgList[1]} className="image-item w-h-100 label-img-size-limit"></img>
                </label>
                <label for="checkbox-3">
                    <input type="radio" id="checkbox-3" onChange={() => handleRadioChange(selectedImgList[2])} className="checkbox-3 d-none" name="cover-group"/>
                    <img src={selectedImgList[2]} className="image-item w-h-100 label-img-size-limit"></img>
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