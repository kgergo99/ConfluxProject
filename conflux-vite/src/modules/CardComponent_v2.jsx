
import "./cardcomponent.css"
import CardButton from "./CardButtons/CardButton";
import TrashIcon from '../assets/Trash-Outline-32px.svg'
import PlusIcon from '../assets/Add-Outline-24px.svg'
import TickCircle from '../assets/TickCircle-Outline-24px.svg'
import CardCountChanger from "./CardButtons/CardCountChanger";
import HitCounter from "./HitCounter"
import { useEffect, useState } from "react";

function CardComponent_v2(props) {
  const [count, setCount] = useState(props.count || 0);
  const id = props.id;
  const imageUrl = props.imageUrl;
  const name = props.name;
  const price_eur = props.price_eur;

  const handleCountChange = (count) => {
    setCount(count);
  };
  const handleUpdate = () => {
    props.onCountUpdate(props.id, count);
  };

  useEffect (()=>{
    setCount(props.count);
  },[props.count])

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

          <div className="card-button-wrapper">
            <CardButton icon={TrashIcon}/>
            <HitCounter count={count} onCountChange={handleCountChange} />
            <CardButton icon={TickCircle} onClick={handleUpdate}/>
          </div>          
      </div>
  );
}

export default CardComponent_v2