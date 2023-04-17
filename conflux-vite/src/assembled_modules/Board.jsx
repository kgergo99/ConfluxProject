import CardListForBoard from "../dinamic_modules/CardListForBoard";
import Divider from "./Divider";


function Board(props) {
    let boardTypeText = "Main Board";
    if (props.type == "Sideboard"){
        boardTypeText = "Side Board";
    }


    const handleCardListUpdate = (cardList) => {
        props.cardListChange(cardList, props.type);
    }

    return (
        <div className="board-container">
            <h2 className="board-title">{boardTypeText}</h2>
            <Divider />
            {/*<CardListForBoard />*/}
            <div >
                <CardListForBoard cardList={props.cardList} cardListUpdate={handleCardListUpdate}/>
            </div>
        </div>
    )
    
}

export default Board
