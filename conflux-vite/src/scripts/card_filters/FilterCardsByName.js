import nameFiltering from "./NameFiltering";

export default function filterCardsByName(cards, name) {
    return cards.filter((card) => {
        if (!nameFiltering(card, name) ) {
            return false;
        }
        return true
    });
  }
  