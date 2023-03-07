import "./modules.css";
import { useState, useEffect } from 'react'

function CardComponent(props) {
  const [data, setData] = useState(null);
  const id = props.id;    

  const getCardById = async (id) => {
    try {
      //const response = await fetch(`https://api.scryfall.com/cards/${id}`);01c6f877-6b00-4d57-8a88-36cd3b16edbc
      const response = await fetch(`http://localhost:3000/bulkdata?id=${id} `);
      if (response.status === 404) {
        console.error(`Card with ID ${id} not found.`);
      } else {
        const data1 = await response.json();
        setData(data1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCardById(id);
  }, [id]);

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