import { useEffect, useState } from 'react'
import './decks.css'
import Navbar from '../modules/Navbar'
import Divider from '../assembled_modules/Divider';
import Board from '../assembled_modules/Board'
import DeckListAssembler from '../dinamic_modules/DeckListAssembler';
import { useUserAuth } from '../context/UserAuthContext';
import { Button } from 'react-bootstrap';
import DeckBuilderSearchModule from '../assembled_modules/DeckBuilderSearchModule';

function DeckBuilder() {
  const [submittedCard, setSubmittedCard] = useState();
  const [count, setCount] = useState(0);

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

  useEffect(()=>{
    console.warn("SUBMITTED CARD CHANGED: ", (submittedCard ? submittedCard.name : submittedCard), count, "CARD COUNT: ", submittedCard.count );
    if (submittedCard){
      let tmpCard = submittedCard;
      tmpCard.count = count;
      setSubmittedCard(tmpCard);
    }
    submittedCard.count = count;
    setSubmittedCard(tmpCard);
    if (activeBoard == "Mainboard") {
      setMainCardList(current => [...current, submittedCard]);
    }
    else if (activeBoard == "Sideboard") {
      setSideCardList(current => [...current, submittedCard]);
    }
  },[submittedCard, count])
  
  useEffect(()=>{
    console.log("### main data: ", mainCardList, "Board: ", activeBoard);
    console.log("ßßß side data: ", sideCardList, "Board: ", activeBoard);
  },[mainCardList, sideCardList])

  return (
    <div className="Decks">
      <Navbar />
      <div>
        <Button className="gap-2" variant="primary" onClick={handleLogout}>Log Out</Button>
      </div>
      <DeckBuilderSearchModule user={ user } setSubmittedCard={ setSubmittedCard } setActiveBoard={ setActiveBoard } setCount = {setCount}/>
      <Divider />
      <Board type={"main"} cardList={mainCardList}/>
      <Board type={"side"} cardList={sideCardList}/>
    </div>
  )
}

export default DeckBuilder
