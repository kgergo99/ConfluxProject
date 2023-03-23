import CardListForBoard from "../dinamic_modules/CardListForBoard";
import Divider from "./Divider";


function Stage(props) {
    const fixedTopHeight = "300px";

    var stylingObject = {
        scrollPane: {
        maxHeight: `calc(100vh - ${fixedTopHeight})`,
        overflow: "scroll",
        },
    };

    const handleCardListUpdate = (cardList) => {
        props.cardListChange(cardList);
    }

    return (
        <div className="board-container">
            <div >
                <CardListForBoard cardList={props.cardList} cardListUpdate={handleCardListUpdate}/>
            </div>
        </div>
    )
    
}

export default Stage
