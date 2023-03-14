export default function sortCardsByOptions(cards, option) {
    switch (option) {
        case "Name":
            return cards.sort((a, b) => a.name.localeCompare(b.name));
        case "Rarity":
            const rarityOrder = ["common", "uncommon", "rare", "mythic", "bonus"];
            return cards.sort((a, b) => rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity));
        case "CMC":
            return cards.sort((a, b) => a.cmc - b.cmc);
        default:
            return cards; // Return the original array if an unknown option is selected
    }
}
  