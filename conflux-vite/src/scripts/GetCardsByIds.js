export default async function getCardsByIds(ids) {
    try {
      const response = await fetch(`http://localhost:3000/bulkdata?ids=${ids.join()}`);
      if (response.status === 404) {
        console.error(`Cards with IDs ${ids.join()} not found.`);
        return [];
      } else {
        const data = await response.json();
        console.log("-- data inside getCardsByIds: ", data);
        return data;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  