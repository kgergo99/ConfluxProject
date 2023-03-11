import typeFiltering from "./TypeFiltering";

export default function filterCardsByOptions(cards, options) {
    return cards.filter((card) => {
      // Only runs when the options contain color filtering
      if (options.colors && options.colors.length > 0) {
        // Check if 'X' is present in the options.colors array
        if (options.colors.includes('X')) {
          // If 'X' is present, include cards where colors array is empty
          if (options.colors.includes('M')) {
            return false;
          }
          if (card.colors.length === 0) {
            if (typeFiltering(card, options.type) ) {
              return true;
            }
          }
        }
        // Check if 'M' is present in the options.colors array
        if (options.colors.includes('M')) {
          // If card has one color, exclude it
          if (card.colors.length <= 1) {
            return false;
          }
          //If the filter options only contain 'M' -> multicolor cards needed only
          if (options.colors.length == 1 ) {
            if (typeFiltering(card, options.type) ) {
              return true;
            }
          }

          // If 'M' is present and there are other colors in the array -> Multicolor cards containing filter color
          const matchingColors = card.colors.filter((color) => options.colors.includes(color));
          if (matchingColors.length === 0) {
            // If card doesn't have any of the colors, exclude it
            return false;
          }
          if (typeFiltering(card, options.type) ) {
            return true;
          }
        }

        // Check if card.colors array contains any of the colors in options.colors
        const matchingColors = card.colors.filter((color) => options.colors.includes(color));
        if (matchingColors.length === 0) {
          // If card doesn't have any of the colors in options.colors, exclude it
          return false;
        }
      }

      if (!typeFiltering(card, options.type) ) {
        return false;
      }
      // If all conditions are met, include the card
      return true;
    });
  }
  