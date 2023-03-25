import { useState, useEffect } from 'react'
import './decks.css'
import Navbar from '../modules/Navbar'
import DeckSearchModule from '../assembled_modules/DeckSearchModule';
import ColorFilterModule from '../assembled_modules/ColorFilterModule';
import Divider from '../assembled_modules/Divider';
import DeckListAssembler from '../dinamic_modules/DeckListAssembler';
import { useUserAuth } from '../context/UserAuthContext';
import { Button } from 'react-bootstrap';
import getUserDecks from "../scripts/GetUserDecks"

function Decks() {
  const [userDecks, setUserDecks] = useState([]);

  const {user, logOut} = useUserAuth();
  console.log(user);
  const handleLogout = async () => {
    try {
      await logOut();
    }catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    async function fetchDecks() {
        const userDecks = await getUserDecks(user);
        if (userDecks) {
          setUserDecks(userDecks);
        }
    }
    fetchDecks();
}, []);

  return (
    <div className="Decks">
      <Navbar />
      {/*<h1>Hello <br/> { user && user.email }</h1>
      <div>
        <Button className="gap-2" variant="primary" onClick={handleLogout}>Log Out</Button>
      </div>*/}
      <DeckSearchModule />
      {/*<ColorFilterModule radius={"2.2rem"}/>*/}
      <Divider />
      <DeckListAssembler userDecks={userDecks}/>
    </div>
  )
}

export default Decks
