import './assembledmodules.css'
import Searchbar from '../modules/Searchbar'
import SearchIcon from '../assets/SearchIcon.svg'
import SortIcon from '../assets/Sort-Outline-32px.svg'
import { useEffect, useState } from 'react'
import DropDownBar from '../modules/DropDownBar'

function CardSearchBars({onNameFilterChange, onSortByChange}) {
    const [nameToFilter, setNameToFilter] = useState("");
    const [sortBy, setSortBy] = useState('');

    const handleSubmit = (name) => {
        setNameToFilter(name);
        if (typeof onNameFilterChange === 'function') {
            onNameFilterChange(name);
        }
    }
    const handleSort = (selectedOption) => {
        setSortBy(selectedOption);
        if (typeof onSortByChange === 'function') {
            onSortByChange(selectedOption);
        }
    };
    const options = ['Name (A-Z)', 'Name (Z-A)', 'CMC (Lowest First)', 'CMC (Highest First)', 'Rarity (Mythic First)', 'Rarity (Common First)', 'Price (Highest First)', 'Price (Lowest First)'];
    
    useEffect(() => {
        onNameFilterChange(nameToFilter);
    }, [nameToFilter, onNameFilterChange]);

    useEffect(() => {
        onSortByChange(sortBy);
    }, [sortBy, onSortByChange]);

    return (
      <div className="card-search-bars-container grid-container div-fullrow">
        <div className='grid-item card-name-search-bar'>
            <Searchbar onSubmit={handleSubmit}
                placeholder_text={"Card Name..."}
                iconUrl = { SearchIcon }
            />
        </div>
        <div className='grid-item card-sortbar'>
            <DropDownBar
                options={options}
                /*placeholder_text={"Sort By:"}*/
                onSubmit={handleSort}
                iconUrl = { SortIcon }
            />
        </div>
      </div>
    )
  }
  
  export default CardSearchBars