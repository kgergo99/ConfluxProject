import "./modules.css";
import getCardById from "../scripts/GetCardById";
import { useState, useEffect } from 'react'

function CardComponent(props) {
  const [data, setData] = useState(null);
  const id = props.id;    


  useEffect(() => {
    getCardById(id, setData);
  }, [id, setData]);

    useEffect(() => {
      console.log("Needed ID: ", id,  "\nCard data: ", data);
  }, [data]);

  return (
      <div className="normal-container">
        {data && (
          <>
            <h1>{data.name}</h1>
            {data.image_uris && <img src={data.image_uris.small} alt={data.name} />}
            <h2>{props.count}</h2>
          </>
        )}
      </div>
  );
}

export default CardComponent