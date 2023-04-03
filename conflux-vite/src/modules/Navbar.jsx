import './navbar.css'
import './modules.css'
import { HambergerMenu, User, ArrowRight2, Arrow } from 'iconsax-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const [navActiveState, setNavActiveState] = useState(false);

  const handleNavMenuClick = () => {
    setNavActiveState(!navActiveState);
  }

  useEffect(()=>{
    console.log(navActiveState)
  },[navActiveState])

  return (
    <div className="nav-main">

      <div className='navbar-item' onClick={handleNavMenuClick}>
        <HambergerMenu className='svg-button menu' size="2.5rem" color="black" variant="Outline"/>
        
      </div>
      

      <Link to="/login"><p className='logo-text navbar-item'>CONFLUX</p></Link>

      <div className='navbar-item'>
        <User className='svg-button user' size="2.5rem" color="black" variant="Outline"/>
      </div>
      {navActiveState && 
        <div className='nav-dropdown normal-container'>
          <ul>
            <li>
              <Link to="/cards">
                  <div className='menu-item-container'>
                    <p>Collection</p>
                    <div><ArrowRight2 className='svg-button menu' size="2rem" color="black" variant="Outline"/></div>
                  </div>
                </Link> 
            </li>
            <li>
              <Link to="/stagingarea">
                  <div className='menu-item-container'>
                    <p>Add Cards</p>
                    <div><ArrowRight2 className='svg-button menu' size="2rem" color="black" variant="Outline"/></div>
                  </div>
                </Link> 
            </li>
            <li>
              <Link to="/decks">
                  <div className='menu-item-container'>
                    <p>Decks</p>
                    <div><ArrowRight2 className='svg-button menu' size="2rem" color="black" variant="Outline"/></div>
                  </div>
                </Link> 
            </li>
            <li>
              <Link to="/deckbuilder">
                  <div className='menu-item-container'>
                    <p>Build Deck</p>
                    <div><ArrowRight2 className='svg-button menu' size="2rem" color="black" variant="Outline"/></div>
                  </div>
                </Link> 
            </li>
          </ul>
        </div>}
    </div>
  )
}
  
export default Navbar
  