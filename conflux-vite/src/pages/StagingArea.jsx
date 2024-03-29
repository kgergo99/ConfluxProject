import { useEffect, useState, useCallback } from 'react'
import './deckbuilder.css'
import Navbar from '../modules/Navbar'
import { useUserAuth } from '../context/UserAuthContext';
import { assembleCardEntries } from '../scripts/AssembleCardEntries';
import ActionButton from '../modules/ActionButton';
import TickSquare from '../assets/TickSquare-Linear-24px.svg';
import ArrowLeft2 from '../assets/ArrowLeft2-Linear-24px.svg';
import CardStagingSearchModule from '../assembled_modules/CardStagingSearchModule';
import Stage from '../assembled_modules/Stage';
import { AddCardListToUser } from '../scripts/AddCardListToUser';
import { useNavigate } from 'react-router-dom';

function StagingArea() {
  const [forceUpdateState, forceUpdate] = useState(false);

  const [submittedCard, setSubmittedCard] = useState();
  const [countState, setCount] = useState(0);
  const navigate = useNavigate();

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
    await AddCardListToUser(cardList);
    navigate("/cards");
  }

  const handleBack = () => {
    navigate(-1);
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
        <ActionButton title="Back" icon={ArrowLeft2} onClick={handleBack}/>
        <ActionButton title="Save" icon={TickSquare} onClick={handleSaveStage}/>
      </div>
      <div className="disable-scrollbars" style={stylingObject.scrollPane}>
        <Stage cardList={cardList} cardListChange={handleCardListChange}/>
      </div>
    </div>
  )
}

export default StagingArea
