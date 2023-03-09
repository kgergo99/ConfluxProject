import getCardById from "./GetCardById";

export default async function getAllCardsByIds(ids, setCardsData) {
/*
    if (!ids || ids.length === 0) {
        return;
    }
        const startTime = performance.now();
    const cardPromises = ids.map((cardId) => getCardById(cardId));
    console.log("## Promise START");
    const cards = await Promise.all(cardPromises);
        const endTime = performance.now();
        const timeTaken = (endTime - startTime) / 1000; // convert to seconds
        console.log(`## Promise took ${timeTaken.toFixed(2)} seconds to complete`);
    console.log("## Promise END. cards: ", cards);

    setCardsData(cards);*/

    try {
            const startTime = performance.now();
            console.log("## Promise START");
            
        const response = await fetch(`http://localhost:3000/bulkdata?ids=${ids}`);
        const data1 = await response.json();
        if (data1.length === 0) {
            console.error(`Card with ID ${ids} from the user is invalid.`);
            return null;
            //throw new Error(``);
        } else {
            console.log("$$$ ids to fetch: ", ids , "\ngetAllCardsByIds returns with: ", data1);
            setCardsData(data1);
            //return data1;
        }
            const endTime = performance.now();
            const timeTaken = (endTime - startTime) / 1000; // convert to seconds
            console.log(`## Promise took ${timeTaken.toFixed(2)} seconds to complete`);
    } catch (error) {
        console.error(error);
    }

};

/*export default async function getAllCardsByIds(id, setCardsData) {
    if (!id || id.length === 0) {
        return;
    }
    const cardPromises = id.map((id) => getCardById(id));
    console.log("## Promise START");
    const cards = await Promise.all(cardPromises);
    console.log("## Promise END. cards: ", cards);

    setCardsData(cards);
};*/