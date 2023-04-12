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
        </div>
    )
}
  
  export default DeckSearchModule