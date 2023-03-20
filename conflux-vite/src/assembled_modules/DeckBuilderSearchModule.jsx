import Searchbar from '../modules/searchbar'
import SearchIcon from '../assets/SearchIcon.svg'
import SortIcon from '../assets/Sort-Outline-32px.svg'
import BoxSearch from '../assets/BoxSearch-Outline-32px.svg'
import Tick from '../assets/TickCircle-Outline-24px.svg'
import ArrowSwapHor from '../assets/ArrowSwapHorizontal-Linear-24px.svg'
import './assembledmodules.css'
import SearchbarSuggestions from '../modules/SearchBarSuggestions'
import DropDownBar from '../modules/DropDownBar'
import { useState, useEffect } from 'react'
import Numberbar from '../modules/NumberBar'

function DeckBuilderSearchModule(props) {
    const user = props.user;
    const options = ['Mainboard', 'Sideboard'];
    const [selectedBoard, setSelectedBoard] = useState("Mainboard");
    const [selectedCard, setSelectedCard] = useState(null);
    const [count, setCount] = useState(0);

    const handleSelectBoard = (selectedOption) => {
        setSelectedBoard(selectedOption);
    }    

    const handleCountChange = (count) => {
        setCount(count);
    };

    const handleSelectedCardChange = (selectedCardValue) => {
        setSelectedCard(selectedCardValue);
    };      

    function submitCard() {
        props.setSubmittedCard(selectedCard);
        props.setActiveBoard(selectedBoard);
        props.setCount(count);
    }
    useEffect (()=>{
        console.log("selected selectedCard: ",selectedCard);
    },[selectedCard])
    useEffect (()=>{
        console.log("selected board: ",selectedBoard);
    },[selectedBoard])

    useEffect (()=>{
        console.log("count state: ",count);
    },[count])

    return (
        <div className="grid-container-search grid-container div-fullrow">
            <div className='grid-item default-searchbar'>
                <SearchbarSuggestions
                    placeholder_text={"Card Name..."}
                    iconUrl = { SearchIcon }
                    user = { user }
                    onSelectedCardChange = { handleSelectedCardChange }
                />
            </div>
            <div className='grid-item smallsearch-container deck-sortbar'>
                <div className='grid-item'>
                    <DropDownBar
                        options={options}
                        onSubmit={handleSelectBoard}
                        iconUrl = { ArrowSwapHor }
                    />
                </div>
                <div className='grid-item'>
                    <div className='grid-item-double'>
                        <Numberbar
                            count={count}
                            onCountChange={handleCountChange}
                        />
                        <div className='card-add-button-wrapper'>
                            <button className='button-submit' type="submit" title="Add" onClick={submitCard} style={ { background: `no-repeat center url(${Tick})`, height:"100%"} }></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
  
  export default DeckBuilderSearchModule