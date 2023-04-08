import './navbar.css'
import './modules.css'
import { HambergerMenu, User, ArrowRight2, LogoutCurve } from 'iconsax-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import Divider from '../assembled_modules/Divider';

function Navbar() {
  const {user, logOut} = useUserAuth();

  const [navActiveState, setNavActiveState] = useState(false);
  const [userNavActiveState, setUserNavActiveState] = useState(false);

  const [isSmall, setIsSmall] = useState(false);

  const handleNavMenuClick = () => {
    setNavActiveState(!navActiveState);
    setUserNavActiveState(false);
  }
  const handleUserNavClick = () => {
    setUserNavActiveState(!userNavActiveState);
    setNavActiveState(false);
  }

  const handleLogout = async () => {
    try {
      await logOut();
    }catch (err) {
      console.warn(err.message);
    }
  }

  useEffect(() => {
    function handleResize() {
      setIsSmall(window.innerWidth < 306);
    }

    window.addEventListener('resize', handleResize);

    handleResize(); // Initial state  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="nav-main">

      <div className='navbar-item' onClick={handleNavMenuClick}>
        <HambergerMenu className='svg-button menu' size="2.5rem" color="black" variant="Outline"/>
      </div>
      
      {!isSmall && <Link to="/login"><p className='logo-text navbar-item'>CONFLUX</p></Link>}

      <div className='navbar-item' onClick={handleUserNavClick}>
        <User className='svg-button user' size="2.5rem" color="black" variant="Outline"/>
      </div>
      {navActiveState && 
        <div className='nav-dropdown nav-dropdown-left normal-container popup-animation'>
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
        </div>
      }
      {userNavActiveState && 
        <div className='nav-dropdown nav-dropdown-right normal-container popup-animation'>
          <ul>
            <li>
              
              <div className='mt-3 ms-2 me-2 d-flex flex-column align-items-center justify-content-center'>
                <p>Logged in:</p>
                <p>{user.email}</p>
              </div>
              <Divider></Divider>
            </li>
            <li>
                <div className='menu-item-container logout-container' onClick={handleLogout}>
                  <p>Log out</p>
                  <div className='pe-1'><LogoutCurve className='svg-button menu' size="2rem" color="black" variant="Outline"/></div>
                </div> 
            </li>            
          </ul>
        </div>
      }
        
    </div>
  )
}
  
export default Navbar
  