import { useState } from 'react'
import './App.css'
import Navbar from './modules/Navbar'
import DeckSearchModule from './assembled_modules/DeckSearchModule';
import ColorFilterModule from './assembled_modules/ColorFilterModule';
import Divider from './assembled_modules/Divider';
import DeckListAssembler from './dinamic_modules/DeckListAssembler';
import Decks from './decks_page/Decks';
import StartPage from './start_page/StartPage';


function App() {

  return (
    <div className="App">
      <StartPage />
    </div>
  )
}

export default App
