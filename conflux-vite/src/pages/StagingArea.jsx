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
import CardStagingSearchModule from '../assembled_modules/CardStagingSearchModule';
import Stage from '../assembled_modules/Stage';

function StagingArea() {
  const [forceUpdateState, forceUpdate] = useState(false);

  const [submittedCard, setSubmittedCard] = useState();
  const [countState, setCount] = useState(0);
  const [userCards, setUserCards] = useState();

  const [submissionTrigger, setSubmissionTrigger] = useState(null);

  const [cardList, setCardList] = useState([]);

  const {user, logOut} = useUserAuth(); 

  const fixedTopHeight = "220px";

  var stylingObject = {
      scrollPane: {
      maxHeight: `calc(100vh - ${fixedTopHeight})`,
      overflow: "scroll",
      },
  };

  const handleCardListChange = (cardList) => {
    setCardList(cardList);
    forceUpdate(!forceUpdateState);
  }

  const handleSaveStage = async () => {
    console.log("Saving Stage...");

    console.log("The cards to be added", cardList);
  }


  useEffect (()=>{
    if ( !(countState==0 || submittedCard == null ) ) {  
        setCardList(assembleCardEntries(submittedCard, countState, cardList));
    }
  },[submissionTrigger])

  return (
    <div className="Decks">
      <Navbar />
      <CardStagingSearchModule user={ user } setSubmissionTrigger={setSubmissionTrigger} setSubmittedCard={ setSubmittedCard } setCount = {setCount}/>
      <div className='actionbutton-list-container'>
        <ActionButton title="Back" icon={ArrowLeft2}/>
        <ActionButton title="Save" icon={TickSquare} onClick={handleSaveStage}/>
        <ActionButton title="Export" icon={ExportSquare}/>
      </div>
      <div className="disable-scrollbars" style={stylingObject.scrollPane}>
        <Stage cardList={cardList} cardListChange={handleCardListChange}/>
      </div>
    </div>
  )
}

export default StagingArea
