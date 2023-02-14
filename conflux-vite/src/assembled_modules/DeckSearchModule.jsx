import Searchbar from '../modules/searchbar'
import SearchIcon from '../assets/SearchIcon.svg'
import SortIcon from '../assets/Sort-Outline-32px.svg'
import BoxSearch from '../assets/BoxSearch-Outline-32px.svg'
import './assembledmodules.css'
import './assembledmodules.css'

function DeckSearchModule() {

    return (
      <div className="grid-container-search grid-container div-fullrow">
        <div className='grid-item'>
            <Searchbar
                length={100}
                placeholder_text={"Deck Name..."}
                /*icon={ <SearchNormal1 className='svg-search-icon' size="2.0rem" color="black" variant="Outline"/> }>
                */
                iconUrl = { SearchIcon }
            />
        </div>
        <div className='grid-item'>
            <Searchbar
                length={100}
                placeholder_text={"Sort By:"}
                /*icon={ <SearchNormal1 className='svg-search-icon' size="2.0rem" color="black" variant="Outline"/> }>
                */
                iconUrl = { SortIcon }
            />
        </div>
        <div className='grid-item'>
            <Searchbar
                length={100}
                placeholder_text={"Format:"}
                /*icon={ <SearchNormal1 className='svg-search-icon' size="2.0rem" color="black" variant="Outline"/> }>
                */
                iconUrl = { BoxSearch }
            />
        </div>
      </div>
    )
  }
  
  export default DeckSearchModule