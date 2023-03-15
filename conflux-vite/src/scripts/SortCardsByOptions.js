export default function sortCardsByOptions(cards, option) {
    switch (option) {
        case "Name (A-Z)":
            return cards.sort((a, b) => a.name.localeCompare(b.name));
        case "Name (Z-A)":
            return cards.sort((a, b) => b.name.localeCompare(a.name));
        case "Rarity (Mythic First)":
            const mythicOrder = ["mythic", "rare", "uncommon", "common", "bonus"];
            return cards.sort((a, b) => mythicOrder.indexOf(a.rarity) - mythicOrder.indexOf(b.rarity));
        case "Rarity (Common First)":
            const commonOrder = ["common", "uncommon", "rare", "mythic", "bonus"];
            return cards.sort((a, b) => commonOrder.indexOf(a.rarity) - commonOrder.indexOf(b.rarity));
        case "CMC (Lowest First)":
            return cards.sort((a, b) => a.cmc - b.cmc);
        case "CMC (Highest First)":
            return cards.sort((a, b) => b.cmc - a.cmc);
        case "Price (Highest First)":
            return cards.sort((a, b) => b.prices.eur - a.prices.eur);
        case "Price (Lowest First)":
            return cards.sort((a, b) => a.prices.eur - b.prices.eur);
        default:
            return cards; // Return the original array if an unknown option is selected
    }
}
//const options = ['Name (A-Z)', 'Name (Z-A)', 'CMC (Lowest First)', 'CMC (Highest First)', 'Rarity (Mythic First)', 'Rarity (Common First)', 'Price (Highest First)', 'Price (Lowest First)'];