import CardListForBoard from "../dinamic_modules/CardListForBoard";


function Stage(props) {
    const fixedTopHeight = "300px";

    

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
