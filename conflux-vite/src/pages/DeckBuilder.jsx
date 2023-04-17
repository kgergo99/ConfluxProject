import { useEffect, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './deckbuilder.css'
import Navbar from '../modules/Navbar'
import Board from '../assembled_modules/Board'
import { useUserAuth } from '../context/UserAuthContext';
import { Alert } from 'react-bootstrap';
import DeckBuilderSearchModule from '../assembled_modules/DeckBuilderSearchModule';
import { assembleCardEntries } from '../scripts/AssembleCardEntries';
import ActionButton from '../modules/ActionButton';
import TickSquare from '../assets/TickSquare-Linear-24px.svg';
import ArrowLeft2 from '../assets/ArrowLeft2-Linear-24px.svg';
import Trash from '../assets/Trash-Linear-24px.svg'
import getUserCards from '../scripts/GetUserCards';
import SavingWindow from '../assembled_modules/SavingWindow';
import BlurOverlay from '../modules/BlurOverlay';
import { handleAddDeckToUser } from '../scripts/AddCardListToUser';
import { RemoveDeck } from '../scripts/RemoveDeck';

function DeckBuilder(props) {
  const location = useLocation();
  const deckToEdit = (location.state ? location.state.deck : null);

  const [forceUpdateState, forceUpdate] = useState(false);
  const [error, setError] = useState("");

  const [submittedCard, setSubmittedCard] = useState();
  const [countState, setCount] = useState(0);
  const [userCards, setUserCards] = useState();

  const [showSavingWindow, setShowSavingWindow] = useState(false);
  const [submissionTrigger, setSubmissionTrigger] = useState(null);
  const [activeBoard, setActiveBoard] = useState();
  const [mainCardList, setMainCardList] = useState([]);
  const [sideCardList, setSideCardList] = useState([]);

  const {user, logOut} = useUserAuth();
  const navigate = useNavigate(); 

  const fixedTopHeight = "240px";

  var stylingObject = {
      scrollPane: {
      maxHeight: `calc(100vh - ${fixedTopHeight})`,
      overflow: "scroll",
      },
  };

  useEffect(()=>{
    async function fetchUserCards(){
      setUserCards(await getUserCards(user));
    }
    fetchUserCards();

    if(deckToEdit){
      setMainCardList(deckToEdit.mainList);
      setSideCardList(deckToEdit.sideList);
    }
  },[])


  //removing the error
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timeout);
    }
}, [error])

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
    setError("");
    setUserCards(await getUserCards(user));
    if(mainCardList.length != 0){
      setShowSavingWindow(true);
    }
    else {
      //Main card list is empty. give warning.
      setError("No card in mainboard, unable to save.");
    }

  }

  const handleDeckSaved = async (newDeck) => {
    setShowSavingWindow(false);
    await handleAddDeckToUser(newDeck);
  }

  const handleDelete = async () => {
    if (deckToEdit) {
      await RemoveDeck(deckToEdit.deckId);
    }
    navigate("/decks");
  }

  const handleCancel = () => {
    setShowSavingWindow(false);
  }

  const handleBack = () => {
    navigate(-1);
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
  
  return (
    <div className="deckbuilder-wrapper">
      <Navbar />
      <DeckBuilderSearchModule user={ user } setSubmissionTrigger={setSubmissionTrigger} setSubmittedCard={ setSubmittedCard } setActiveBoard={ setActiveBoard } setCount = {setCount}/>
      {error && <div className='fixed-bottom popup-animation popup-animation-reverse'><Alert variant="danger">{error}</Alert></div>}
      <div className='actionbutton-list-container'>
        <ActionButton title="Back" icon={ArrowLeft2} onClick={handleBack}/>
        <ActionButton title="Save" icon={TickSquare} onClick={handleSaveDeck}/>
        {deckToEdit && <ActionButton title="Delete" icon={Trash} onClick={handleDelete}/>}
      </div> 
      {showSavingWindow &&
        <>
          <BlurOverlay />
          <SavingWindow mainCardList={mainCardList} sideCardList={sideCardList} userCards={userCards} onDeckSaved={handleDeckSaved} deckToEdit={deckToEdit} onSaveCancel={handleCancel}/>
        </>}
      <div className="disable-scrollbars" style={stylingObject.scrollPane}>
        <Board type={"Mainboard"} cardList={mainCardList} cardListChange={handleCardListChange}/>
        <Board type={"Sideboard"} cardList={sideCardList} cardListChange={handleCardListChange}/>
      </div>
    </div>
  )
}

export default DeckBuilder



