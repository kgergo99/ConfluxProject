export default async function getMinCardByName(cardName) {
    try {
        const response = await fetch(`http://localhost:3000/bulkdata?minimalname=${cardName} `);
        if (response.status === 404) {
            console.error(`Card with Name ${cardName} not found. 404`);
            return null;
        }
        const responseData = await response.json();
        if (responseData.length === 0) {
            console.error(`Card with Name ${cardName} not found.`);
            return;
            
        } else {
            return responseData;
        }
    } catch (error) {
        console.error(error);
    }
};