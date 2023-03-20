import CardListForBoard from "../dinamic_modules/CardListForBoard";
import Divider from "./Divider";


function Board(props) {
    let boardTypeText = "Main Board";
    if (props.type == "side"){
        boardTypeText = "Side Board";
    }

    return (
        <div>
            <h2>{boardTypeText}</h2>
            <Divider />
            {/*<CardListForBoard />*/}
        </div>
    )
    
}

export default Board
