import "./modules.css";

function CardComponent(props) {
  const id = props.id;
  const imageUrl = props.imageUrl;
  const count = props.count;  
  const name = props.name;
  const price_eur = props.price_eur;


  return (
      <div className="normal-container">
          <>
            <h1>{name}</h1>
            {imageUrl && <img src={imageUrl} alt={name} />}
            <h2>{count}</h2>
            <h2>{price_eur ? `${price_eur} €` : "- €"}</h2>
          </>
      </div>
  );
}

export default CardComponent