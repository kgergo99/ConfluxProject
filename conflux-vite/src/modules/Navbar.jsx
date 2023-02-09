import './navbar.css'
import { HambergerMenu, User } from 'iconsax-react';

function Navbar() {

    return (
      <div className="nav-main">
        <div className='navbar-item'><HambergerMenu href='#' className='svg-button menu' size="2.5rem" color="black" variant="Outline"/></div>     
        <a href='#' className='logo-text navbar-item'>CONFLUX</a>
        <div className='navbar-item'><User href='#' className='svg-button user' size="2.5rem" color="black" variant="Outline"/></div>
      </div>
    )
  }
  
  export default Navbar
  