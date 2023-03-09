export default async function getCardByName(cardName) {
    try {
        const response = await fetch(`http://localhost:3000/bulkdata?name=${cardName} `);
        if (response.status === 404) {
            console.error(`Card with Name ${cardName} not found.`);
            return null;
        }
        const data1 = await response.json();
        if (data1.length === 0) {
            console.error(`Card with Name ${cardName} not found.`);
            return;
            
        } else {
            
            return data1;
        }
    } catch (error) {
        console.error(error);
        
    }
};