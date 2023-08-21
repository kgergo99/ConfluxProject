import Searchbar from '../modules/Searchbar'
import SearchIcon from '../assets/SearchIcon.svg'
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