
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

  let isButtonClickable  = true;
  
  const [active, setActive] = useState(false);
  const handleActiveClick = () => {
    setActive(!active);
  };
  useEffect(() => {
    const cardInsideContainer = document.querySelector('.card-inside-container');
    if (cardInsideContainer) {
      cardInsideContainer.addEventListener('click', function() {
        this.classList.toggle('active');
      });
    }
  }, []);

  var stylingObject = {
    cardButtonWrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom:  isButtonClickable  ? "-27px" : "30px",
      right: "0px",
      left: "0px",
      transform: isButtonClickable  ? "scale(1)" : "scale(0)",
    },
  };

  const handleCountChange = (count) => {
    setCount(count);
  };
  const handleDone = () => {
    props.onCountUpdate(props.id, count);
    setActive(false);
  };
  const handleDelete = () => {
    props.onDeleteCard(props.id);
    setActive(false);
  };

  useEffect (()=>{
    setCount(props.count);
  },[props.count])

  return (
      <div className={`card-container ${active ? "active" : ""}`}>
          <div className="card-inside-container" onClick={handleActiveClick}>
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
          {/*<div className={`${isButtonClickable ? '' : ' disabled'}`} style={stylingObject.cardButtonWrapper}>*/}
          <div className="card-button-wrapper">
            <CardButton icon={TrashIcon} onClick={handleDelete}/>
            <HitCounter count={count} onCountChange={handleCountChange} />
            <CardButton icon={TickCircle} onClick={handleDone}/>
          </div>          
      </div>
  );
}

export default CardComponent_v2