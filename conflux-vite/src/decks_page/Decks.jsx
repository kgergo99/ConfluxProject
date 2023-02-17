import { useState } from 'react'
import './decks.css'
import Navbar from '../modules/Navbar'
import DeckSearchModule from '../assembled_modules/DeckSearchModule';
import ColorFilterModule from '../assembled_modules/ColorFilterModule';
import Divider from '../assembled_modules/Divider';
import DeckListAssembler from '../dinamic_modules/DeckListAssembler';


function Decks() {

  return (
    <div className="Decks">
      <Navbar />
      <DeckSearchModule />
      <ColorFilterModule radius={"2.2rem"}/>
      <Divider />
      <DeckListAssembler />
    </div>
  )
}

export default Decks
