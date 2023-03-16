export default function setCardCount(userCards, cardsData, setCardsData) {
    const updatedCardsData = cardsData.map(card => {
        const matchingUserCard = userCards.find(userCard => userCard.id === card.id);
        if (matchingUserCard) {
            return {
                ...card,
                count: matchingUserCard.count
            };
        } else {
            return card;
        }
    });
    console.log("card count set: ", updatedCardsData);
    setCardsData(updatedCardsData);
}