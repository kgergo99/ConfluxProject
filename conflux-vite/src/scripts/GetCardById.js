export default async function getCardById(id) {
    try {
      const response = await fetch(`http://localhost:3000/bulkdata?id=${id}`);
      if (response.status === 404) {
        console.error(`Card with ID ${id} not found.`);
      } else {
        const data1 = await response.json();
        //setData(data1);
        console.log("-- data inside getCardById: ", data1);
        return data1;
      }
    } catch (error) {
      console.error(error);
    }
};

//The "setData" is a state in the component where we include this script.
/* Example use:
const [data, setData] = useState(null);
useEffect(() => {
    getCardById(id, setData);
}, [id, setData]);
*/