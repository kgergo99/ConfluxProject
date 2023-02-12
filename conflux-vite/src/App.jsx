import { useState } from 'react'
import './App.css'
import Navbar from './modules/Navbar'
import Searchbar from './modules/Searchbar'
import { SearchNormal1 } from 'iconsax-react';
import SearchIcon from './assets/SearchIcon.svg'
import DeckSearchModule from './assembled_modules/DeckSearchModule';


function App() {

  return (
    <div className="App">
      <Navbar />
      <DeckSearchModule />
    </div>
  )
}

export default App
