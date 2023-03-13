import './assembledmodules.css'
import Searchbar from '../modules/searchbar'
import SearchIcon from '../assets/SearchIcon.svg'
import SortIcon from '../assets/Sort-Outline-32px.svg'

function CardSearchBars() {

    return (
      <div className="card-search-bars-container grid-container div-fullrow">
        <div className='grid-item card-name-search-bar'>
            <Searchbar
                length={100}
                placeholder_text={"Deck Name..."}
                /*icon={ <SearchNormal1 className='svg-search-icon' size="2.0rem" color="black" variant="Outline"/> }>
                */
                iconUrl = { SearchIcon }
            />
        </div>
        <div className='grid-item card-sortbar'>
            <Searchbar
                length={100}
                placeholder_text={"Sort By:"}
                /*icon={ <SearchNormal1 className='svg-search-icon' size="2.0rem" color="black" variant="Outline"/> }>
                */
                iconUrl = { SortIcon }
            />
        </div>
      </div>
    )
  }
  
  export default CardSearchBars