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
  const [nameFilter, setNameFilter] = useState();

  const {user, logOut} = useUserAuth();


  const handleSearchSubmit = (searchTerm) => {
    setNameFilter(searchTerm);
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
      <div className='overflow-auto disable-scrollbars'>
        <DeckSearchModule onSearchSubmit={handleSearchSubmit}/>
        <Divider />
        <DeckListAssembler userDecks={userDecks} nameFilter={nameFilter}/>
      </div>
    </div>
  )
}

export default Decks
