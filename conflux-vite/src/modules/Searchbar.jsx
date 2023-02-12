import './searchbar.css'
import '../index.css'
import { HambergerMenu, User } from 'iconsax-react';

function Searchbar({ length, placeholder_text, iconUrl }) {

    return (
      <form className="search-form">
            <input type="search" placeholder={placeholder_text}/>
            <button type="submit" style={ { background: `url(${iconUrl})`} }></button>
            
      </form>
    )
  }
  
  export default Searchbar