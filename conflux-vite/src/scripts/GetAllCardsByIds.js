import getCardById from "./GetCardById";

export default async function getAllCardsByIds(userCards, setCardsData) {
    //const cardDataPromises = userCards.map(({ id }) => getCardById(id));
    //const cardData = await Promise.all(cardDataPromises);
    //setCardsData(cardData);

    /*Here, you're using map() to create an array of promises, 
    where each promise represents a call to getCardById() with 
    the corresponding id from userCards. Then, you're using 
    Promise.all() to wait for all the promises to resolve, 
    and return an array of resolved values. Finally, you're 
    setting the state cardsData to the array of resolved 
    values using the setData() function.*/

    const cards = [];
    for (let i = 0; i < userCards.length; i++) {
        const card = await getCardById(userCards[i].id);
        cards.push(card);
    }
    setCardsData(cards);
};