import Searchbar from '../modules/searchbar'
import SearchIcon from '../assets/SearchIcon.svg'
import SortIcon from '../assets/Sort-Outline-32px.svg'
import BoxSearch from '../assets/BoxSearch-Outline-32px.svg'
import './assembledmodules.css'

function DeckSearchModule(props) {
    const handleSubmit = (searchTerm) => {
        props.onSearchSubmit(searchTerm)
    }

    return (
        <div className="grid-container-search grid-container div-fullrow">
            <div className='grid-item default-searchbar'>
                <Searchbar
                    placeholder_text={"Deck Name..."}
                    iconUrl = { SearchIcon }
                    onSubmit = { handleSubmit }
                />
            </div>
            {/*<div className='grid-item smallsearch-container deck-sortbar'>
                <div className='grid-item'>
                    <Searchbar
                        length={100}
                        placeholder_text={"Sort By:"}
                        
                        iconUrl = { SortIcon }
                    />
                </div>
                <div className='grid-item'>
                    <Searchbar
                        length={100}
                        placeholder_text={"Format:"}
                        
                        iconUrl = { BoxSearch }
                    />
                </div>
            </div>*/}
        </div>
    )
}
  
  export default DeckSearchModule