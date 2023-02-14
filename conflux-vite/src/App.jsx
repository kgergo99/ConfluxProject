import { useState } from 'react'
import './App.css'
import Navbar from './modules/Navbar'
import Searchbar from './modules/Searchbar'
import { SearchNormal1 } from 'iconsax-react';
import SearchIcon from './assets/SearchIcon.svg'
import DeckSearchModule from './assembled_modules/DeckSearchModule';
import ColorFilterModule from './assembled_modules/ColorFilterModule';
import Divider from './assembled_modules/Divider';


function App() {

  return (
    <div className="App">
      <Navbar />
      <DeckSearchModule />
      <ColorFilterModule radius={"2.2rem"}/>
      <Divider />
    </div>
  )
}

export default App
