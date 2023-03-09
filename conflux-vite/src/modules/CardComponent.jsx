import "./modules.css";
import getCardById from "../scripts/GetCardById";
import { useState, useEffect } from 'react'

function CardComponent(props) {
  const id = props.id;
  const imageUrl = props.imageUrl;
  const count = props.count;  
  const name = props.name;


  /*useEffect(() => {
    async function fetchCards() {
      const cards = await getCardById(id);
      if (cards) {
        setData(cards);
      }
    }
    fetchCards();
    //setData(await getCardById(id));
  }, [id, setData]);*/

  return (
      <div className="normal-container">
          <>
            <h1>{name}</h1>
            {imageUrl && <img src={imageUrl} alt={name} />}
            <h2>{count}</h2>
          </>
      </div>
  );
}

export default CardComponent