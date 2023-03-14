import './assembledmodules.css'
import Searchbar from '../modules/searchbar'
import SearchIcon from '../assets/SearchIcon.svg'
import SortIcon from '../assets/Sort-Outline-32px.svg'
import { useEffect, useState } from 'react'

function CardSearchBars({onNameFilterChange}) {
    const [nameToFilter, setNameToFilter] = useState("");

    const handleSubmit = (name) => {
        setNameToFilter(name);
        if (typeof onNameFilterChange === 'function') {
            onNameFilterChange(name);
        }
    }
    
    useEffect(() => {
        onNameFilterChange(nameToFilter);
    }, [nameToFilter, onNameFilterChange]);

    return (
      <div className="card-search-bars-container grid-container div-fullrow">
        <div className='grid-item card-name-search-bar'>
            <Searchbar onSubmit={handleSubmit}
                placeholder_text={"Deck Name..."}
                /*icon={ <SearchNormal1 className='svg-search-icon' size="2.0rem" color="black" variant="Outline"/> }>
                */
                iconUrl = { SearchIcon }
            />
        </div>
        <div className='grid-item card-sortbar'>
            <Searchbar
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