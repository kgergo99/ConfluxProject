import "./assembledmodules.css"
import { useEffect, useState } from "react";
import makeNewDeckForUser, { calcDeckSize, getCollectedCount } from "../scripts/MakeDeckForUser";
import AddOutline from "../assets/Add-Outline-24px.svg"
import CancelSquare from "../assets/CloseSquare-Linear-24px.svg"
import { useNavigate } from "react-router-dom";

function SavingWindow(props) {
    const mainCardList = props.mainCardList;
    const sideCardList = props.sideCardList;
    const userCards = props.userCards;
    const deckToEdit = props.deckToEdit;
    const navigate = useNavigate();

    const [coverImg, setCoverImg] = useState("");
    const [deckName, setDeckName] = useState(deckToEdit? deckToEdit.name : "Deck");
    const randomImageCount = 3;
    const [coverImgList, setCoverImgList] = useState([]);
    const [selectedImgList, setSelectedImgList] = useState([]);
    const [updateCoverImgList, setUpdateCoverImgList] = useState(false);

    const deckSize = calcDeckSize(mainCardList, sideCardList);
    const collectedSize = getCollectedCount(userCards, mainCardList, sideCardList);

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
        if(!deckToEdit) {
            setCoverImg(imgLinks[0]);
        }
        else {
            setCoverImg(deckToEdit.coverImage);
        }
        
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

    const handleSubmit = async () => {
        const newDeck = makeNewDeckForUser(
            (deckToEdit? deckToEdit.deckId : null),
            deckName,
            coverImg,
            deckSize,
            collectedSize, 
            mainCardList, 
            sideCardList );
        
        await props.onDeckSaved(newDeck);
        navigate("/decks");
    }

    const handleCancel = () => {
        props.onSaveCancel();
    }

    return(
        <div className="window-container fixed-window-middle popup-middle-animation" >
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
                <input type="text" placeholder={deckName} className="deck-name white-input-panel" onChange={(e) => setDeckName(e.target.value)}/>
                <button onClick={handleSubmit} className="button-save button-border-rad purple-hover" style={{backgroundImage: `url(${AddOutline})`, backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: '50%'} }></button>
            </div>
            <div className="cancel-container">
                <button onClick={handleCancel} className="button-cancel button-border-rad purple-hover" style={{backgroundImage: `url(${CancelSquare})`, backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: '50%'} }></button>
            </div>
        </div>
    )
}

export default SavingWindow