import { useState } from 'react'
import './App.css'
import Navbar from './modules/Navbar'
import Searchbar from './modules/Searchbar'
import { SearchNormal1 } from 'iconsax-react';
import SearchIcon from './assets/SearchIcon.svg'


function App() {

  return (
    <div className="App">
      <Navbar />
      <Searchbar
        length={100}
        placeholder_text={"Deck Name..."}
        /*icon={ <SearchNormal1 className='svg-search-icon' size="2.0rem" color="black" variant="Outline"/> }>
        */
        iconUrl = { SearchIcon }
      />
    </div>
  )
}

export default App
