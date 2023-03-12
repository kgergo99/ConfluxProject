import typeFiltering from "./TypeFiltering";

export default function filterCardsByType(cards, type) {
    return cards.filter((card) => {
        if (!typeFiltering(card, type) ) {
            return false;
        }
        return true
    });
  }
  