import { useState } from 'react'
import './decks.css'
import Navbar from '../modules/Navbar'
import Divider from '../assembled_modules/Divider';
import DeckListAssembler from '../dinamic_modules/DeckListAssembler';
import { useUserAuth } from '../context/UserAuthContext';
import { Button } from 'react-bootstrap';
import DeckBuilderSearchModule from '../assembled_modules/DeckBuilderSearchModule';

function DeckBuilder() {
  const {user, logOut} = useUserAuth();
  console.log(user);
  const handleLogout = async () => {
    try {
      await logOut();
    }catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="Decks">
      <Navbar />
      <div>
        <Button className="gap-2" variant="primary" onClick={handleLogout}>Log Out</Button>
      </div>
      <DeckBuilderSearchModule user={user} />
      {/*<ColorFilterModule radius={"2.2rem"}/>*/}
      <Divider />
      
    </div>
  )
}

export default DeckBuilder
