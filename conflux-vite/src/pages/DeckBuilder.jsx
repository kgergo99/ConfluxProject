import { useEffect, useState, useCallback } from 'react'
import './deckbuilder.css'
import Navbar from '../modules/Navbar'
import Divider from '../assembled_modules/Divider';
import Board from '../assembled_modules/Board'
import DeckListAssembler from '../dinamic_modules/DeckListAssembler';
import { useUserAuth } from '../context/UserAuthContext';
import { Button } from 'react-bootstrap';
import DeckBuilderSearchModule from '../assembled_modules/DeckBuilderSearchModule';
import { assembleCardEntries } from '../scripts/AssembleCardEntries';
import ActionButton from '../modules/ActionButton';
import TickSquare from '../assets/TickSquare-Linear-24px.svg';
import ExportSquare from '../assets/ExportSquare-Linear-24px.svg';
import ArrowLeft3 from '../assets/ArrowLeft3-Linear-24px.svg';
import ArrowLeft2 from '../assets/ArrowLeft2-Linear-24px.svg';
import ArrowLeft from '../assets/ArrowLeft-Linear-24px.svg';
import makeNewDeckForUser, { calcDeckSize, getCollectedCount } from '../scripts/MakeDeckForUser';
import getUserCards from '../scripts/GetUserCards';

function DeckBuilder() {
  const [forceUpdateState, forceUpdate] = useState(false);

  const [submittedCard, setSubmittedCard] = useState();
  const [countState, setCount] = useState(0);
  const [userCards, setUserCards] = useState();

  const [submissionTrigger, setSubmissionTrigger] = useState(null);
  const [activeBoard, setActiveBoard] = useState();
  const [mainCardList, setMainCardList] = useState([]);
  const [sideCardList, setSideCardList] = useState([]);

  const {user, logOut} = useUserAuth();
  /*const handleLogout = async () => {
    try {
      await logOut();
    }catch (err) {
      console.log(err.message);
    }
  }*/ 

  const fixedTopHeight = "300px";

  var stylingObject = {
      scrollPane: {
      maxHeight: `calc(100vh - ${fixedTopHeight})`,
      overflow: "scroll",
      },
  };

  const handleCardListChange = (cardList, board) => {
    if (board == "Mainboard") {
      setMainCardList(cardList);
      forceUpdate(!forceUpdateState);
    }
    else if (board == "Sideboard"){
      setSideCardList(cardList);
      forceUpdate(!forceUpdateState);
    }
  }

  const handleSaveDeck = async () => {
    console.log("Saving Deck...");
    const deckSize = calcDeckSize(mainCardList, sideCardList);
    setUserCards(await getUserCards(user));
    const collectedSize = getCollectedCount(userCards, mainCardList, sideCardList);

    const newDeck = makeNewDeckForUser("Name", mainCardList[0].card.image_uris.art_crop, deckSize, collectedSize, mainCardList, sideCardList );
    console.log("The new decklist: ", newDeck);
  }


  useEffect (()=>{
    if ( !(countState==0 || submittedCard == null || activeBoard == null) ) {
      if (activeBoard == "Mainboard"){
        setMainCardList(assembleCardEntries(submittedCard, countState, mainCardList, activeBoard));
      }
      else if (activeBoard == "Sideboard"){
        setSideCardList(assembleCardEntries(submittedCard, countState, sideCardList, activeBoard));
      }
    }
  },[submissionTrigger])

  useEffect (()=>{
    console.log("count state: ",countState);
  },[countState])
  useEffect (()=>{
    console.log("activeBoard state: ",activeBoard);
  },[activeBoard])
  useEffect (()=>{
    console.log("submittedCard state: ",submittedCard);
  },[submittedCard])

  /*useEffect(()=>{
    console.log("### main data: ", mainCardList, "Board: ", activeBoard);
    console.log("ßßß side data: ", sideCardList, "Board: ", activeBoard);
  },[mainCardList, sideCardList])*/

  return (
    <div className="Decks">
      <Navbar />
      <DeckBuilderSearchModule user={ user } setSubmissionTrigger={setSubmissionTrigger} setSubmittedCard={ setSubmittedCard } setActiveBoard={ setActiveBoard } setCount = {setCount}/>
      <div className='actionbutton-list-container'>
        <ActionButton title="Back" icon={ArrowLeft2}/>
        <ActionButton title="Save" icon={TickSquare} onClick={handleSaveDeck}/>
        <ActionButton title="Export" icon={ExportSquare}/>
      </div> 
      <div className="disable-scrollbars" style={stylingObject.scrollPane}>
        <Board type={"Mainboard"} cardList={mainCardList} cardListChange={handleCardListChange}/>
        <Board type={"Sideboard"} cardList={sideCardList} cardListChange={handleCardListChange}/>
      </div>
    </div>
  )
}

export default DeckBuilder
