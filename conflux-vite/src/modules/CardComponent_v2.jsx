
import "./cardcomponent.css"
import getCardById from "../scripts/GetCardById";
import { useState, useEffect } from 'react'

function CardComponent_v2(props) {
  const id = props.id;
  const imageUrl = props.imageUrl;
  const count = props.count;  
  const name = props.name;
  const price_eur = props.price_eur;


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
      <div className="card-container">
          <div className="card-inside-container">
            <div className="my-card-header">
                <div className="name-price">
                    <h2>{name}</h2>
                    <p id="price" className="p-no-margin-bottom">{price_eur ? `${price_eur} €` : "- €"}</p>
                </div>
                <div className="count-container">
                    <div className="count-box">
                        <p className="p-no-margin-bottom">{count}</p>
                    </div>
                </div>
            </div>
            {imageUrl && <img src={imageUrl} alt={name} />}
          </div>
      </div>
  );
}

export default CardComponent_v2