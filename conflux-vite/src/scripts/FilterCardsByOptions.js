export default function filterCardsByOptions(cards, options) {
    return cards.filter((card) => {
      if (options.colors && options.colors.length > 0) {
        // Check if card.colors array contains any of the colors in options.colors
        const matchingColors = card.colors.filter((color) => options.colors.includes(color));
        if (matchingColors.length === 0) {
          // If card doesn't have any of the colors in options.colors, exclude it
          return false;
        }
      }
      // If all conditions are met, include the card
      return true;
    });
  }
  