export default function updateCardCount(cardId, cardsData, setCardsData, count, increase, decrease) {
    const updatedCardsData = cardsData.map((card) => {
        if (card.id === cardId) {
          if (count) {
            // update the card's count to the provided count
            return { ...card, count: count };
          } else if (increase) {
            // increase the card's count by 1
            return { ...card, count: card.count + 1 };
          } else if (decrease) {
            // decrease the card's count by 1
            return { ...card, count: card.count - 1 };
          }
        }
        return card;
      });
    
      // set the updated cardsData using the setCardsData function
      setCardsData(updatedCardsData);
}
