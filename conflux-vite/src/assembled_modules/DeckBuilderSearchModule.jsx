import Searchbar from '../modules/searchbar'
import SearchIcon from '../assets/SearchIcon.svg'
import SortIcon from '../assets/Sort-Outline-32px.svg'
import BoxSearch from '../assets/BoxSearch-Outline-32px.svg'
import './assembledmodules.css'
import SearchbarSuggestions from '../modules/SearchBarSuggestions'

function DeckBuilderSearchModule() {

    return (
        <div className="grid-container-search grid-container div-fullrow">
            <div className='grid-item default-searchbar'>
                <SearchbarSuggestions
                    placeholder_text={"Card Name..."}
                    iconUrl = { SearchIcon }
                />
            </div>
            <div className='grid-item smallsearch-container deck-sortbar'>
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
        </div>
    )
}
  
  export default DeckBuilderSearchModule