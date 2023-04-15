import getCardById from "./GetCardById";

export default async function getAllCardsByIds(userCards, setCardsData, setIsCardsDataSetup) {
    const userCardIds = userCards.map(card => card.id);
    const userCardCounts = userCards.map(card => card.count)

    try {
        //const startTime = performance.now();
        //console.log("FETCHTIMER Promise START");
        const response = await fetch(`http://localhost:3000/bulkdata?ids=${userCardIds}`);
        const data1 = await response.json();
        if (data1.length === 0) {
            console.error(`Card with ID ${userCardIds} from the user is invalid.`);
            return null;
        } else {
            //console.log("$$$ ids to fetch: ", userCardIds , "\ngetAllCardsByIds returns with: ", data1);
            setCardsData(data1);
            setIsCardsDataSetup(true);
            //return data1;
        }
            //const endTime = performance.now();
            //const timeTaken = (endTime - startTime) / 1000; // convert to seconds
            //console.log(`FETCHTIMER Promise took ${timeTaken.toFixed(2)} seconds to complete`);
    } catch (error) {
        console.error(error);
    }

};