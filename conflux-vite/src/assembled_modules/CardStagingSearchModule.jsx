import SearchIcon from '../assets/SearchIcon.svg'
import Tick from '../assets/TickCircle-Outline-24px.svg'
import ArrowSwapHor from '../assets/ArrowSwapHorizontal-Linear-24px.svg'
import './assembledmodules.css'
import SearchbarSuggestions from '../modules/SearchBarSuggestions'
import DropDownBar from '../modules/DropDownBar'
import { useState, useEffect } from 'react'
import Numberbar from '../modules/NumberBar'

function CardStagingSearchModule(props) {
    const user = props.user;
    const [selectedCard, setSelectedCard] = useState(null);
    const [count, setCount] = useState(0);
    const [submissionTrigger, setSubmissionTrigger] = useState(false);   

    const handleCountChange = (count) => {
        setCount(count);
    };

    const handleSelectedCardChange = (selectedCardValue) => {
        setSelectedCard(selectedCardValue);
    };

    function submitCard() {
        setSubmissionTrigger(!submissionTrigger);
        //props.setSubmittedCard(selectedCard);
        //props.setActiveBoard(selectedBoard);
        //props.setCount(count);
        props.setSubmissionTrigger(submissionTrigger);
    }
    useEffect(()=>{
        props.setSubmittedCard(selectedCard);
        props.setCount(count);
    },[selectedCard,count])

    return (
        <div className="grid-container-search grid-setcol-4-1 grid-row-1 grid-container div-fullrow">
            <div className='grid-item default-searchbar'>
                <SearchbarSuggestions
                    placeholder_text={"Card Name..."}
                    iconUrl = { SearchIcon }
                    user = { user }
                    onSelectedCardChange = { handleSelectedCardChange }
                />
            </div>
            <div className='grid-item deck-sortbar'>
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
  
  export default CardStagingSearchModule