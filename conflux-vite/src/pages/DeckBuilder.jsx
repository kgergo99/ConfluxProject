import { useEffect, useState } from 'react'
import './decks.css'
import Navbar from '../modules/Navbar'
import Divider from '../assembled_modules/Divider';
import Board from '../assembled_modules/Board'
import DeckListAssembler from '../dinamic_modules/DeckListAssembler';
import { useUserAuth } from '../context/UserAuthContext';
import { Button } from 'react-bootstrap';
import DeckBuilderSearchModule from '../assembled_modules/DeckBuilderSearchModule';
import { addCardToBoardList } from '../scripts/addCardToBoardList';

function DeckBuilder() {
  const [submittedCard, setSubmittedCard] = useState();
  const [editedCard, setEditedCard] = useState();
  const [countState, setCount] = useState(0);

  const [submissionTrigger, setSubmissionTrigger] = useState(null);
  const [activeBoard, setActiveBoard] = useState();
  const [mainCardList, setMainCardList] = useState([]);
  const [sideCardList, setSideCardList] = useState([]);

  const {user, logOut} = useUserAuth();
  const handleLogout = async () => {
    try {
      await logOut();
    }catch (err) {
      console.log(err.message);
    }
  }
/*
  useEffect(()=>{
    const tempCard = submittedCard ? { ...submittedCard } : {};
    tempCard.count = count;
    setEditedCard(tempCard);
  },[submittedCard])
*/
/*  useEffect(()=>{
    console.warn("SUBMITTED CARD CHANGED: ", (submittedCard ? submittedCard.name : submittedCard),"| Count: ", count, "| Board: ", activeBoard, "| Card's count: ", (submittedCard ? submittedCard.count : null));
    console.warn("EDITED CARD CHANGED: ", (editedCard ? editedCard : editedCard),"| Count: ", count, "| Board: ", activeBoard, "| Card's count: ", (editedCard ? editedCard.count : null));

    //Giving cards to the correct board
    if (activeBoard == "Mainboard") {
      setMainCardList(current => [...current, editedCard]);
    }
    else if (activeBoard == "Sideboard") {
      setSideCardList(current => [...current, editedCard]);
    }
  },[submissionTrigger])*/
  
  useEffect (()=>{
    console.warn("mainCardList: ", mainCardList, "\nsideCardList: ", sideCardList);
  },[mainCardList, sideCardList])

  useEffect (()=>{
    const tmp = [submittedCard, countState, mainCardList, activeBoard]
    console.warn("TO BE ASSEMBLED:",tmp);

    if ( !(countState==0 || submittedCard == null || activeBoard == null) ) {
      if (activeBoard == "Mainboard"){
        setMainCardList(addCardToBoardList(submittedCard, countState, mainCardList, activeBoard));
      }
      else if (activeBoard == "Sideboard"){
        setSideCardList(addCardToBoardList(submittedCard, countState, sideCardList, activeBoard));
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
      <div>
        <Button className="gap-2" variant="primary" onClick={handleLogout}>Log Out</Button>
      </div>
      <DeckBuilderSearchModule user={ user } setSubmissionTrigger={setSubmissionTrigger} setSubmittedCard={ setSubmittedCard } setActiveBoard={ setActiveBoard } setCount = {setCount}/>
      <Divider />
      <Board type={"main"} cardList={mainCardList}/>
      <Board type={"side"} cardList={sideCardList}/>
    </div>
  )
}

export default DeckBuilder
