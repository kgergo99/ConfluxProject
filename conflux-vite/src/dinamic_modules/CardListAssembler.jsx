import CardComponent from "../modules/CardComponent";
//import "../modules/modules.css";
import React from "react";

function CardListAssembler(props) {
    const fixedNavbarHeight = "420px";

    var stylingObject = {
        grid: {
        paddingTop: "20px",
        paddingRight: "40px",
        paddingLeft: "40px",
        display: "grid",
        gap: "2rem",
        maxHeight: `calc(100vh - ${fixedNavbarHeight})`,
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        overflow: "scroll",
        
        },
    };

    const { cards } = props;
    
    return (
        <div className='deck-grid disable-scrollbars' style={stylingObject.grid}>
            {cards.map((card) => (
                <div key={card.id}><CardComponent id={card.id} count={card.count}/></div>
                
            ))}
        </div>
    )
}

export default CardListAssembler