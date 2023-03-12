export default function filterCardsByRarity(cards, rarity) {
    return cards.filter((card) => {
        // Only runs when the options contain color filtering
        if (rarity && rarity.length > 0) {
            // Check if card.rarity array contains any of the rarity in rarity
            const cardRarityArray = card.rarity.split(" ");
            const matchingrarity = cardRarityArray.filter((cardRarity) => rarity.includes(cardRarity));

            if (matchingrarity.length === 0) {
                // If card doesn't have any of the rarity in rarity, exclude it
                return false;
            }
        }
        // If all conditions are met, include the card
        return true;
    });
}
  