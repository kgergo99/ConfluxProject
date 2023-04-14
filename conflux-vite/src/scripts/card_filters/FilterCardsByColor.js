export default function filterCardsByColor(cards, colors) {
    return cards.filter((card) => {
        const cardface = ( card.card_faces ? card.card_faces[0] : card );
        // Only runs when the options contain color filtering
        if (colors && colors.length > 0) {
            // Check if 'X' is present in the colors array
            if (colors.includes('X')) {
                // If 'X' is present, include cards where colors array is empty
                if (colors.includes('M')) {
                    return false;
                }
                if (cardface.colors.length === 0) {
                    return true;
                }
            }
            // Check if 'M' is present in the colors array
            if (colors.includes('M')) {
                // If card has one color, exclude it
                if (cardface.colors.length <= 1) {
                    return false;
                }
                //If the filter options only contain 'M' -> multicolor cards needed only
                if (colors.length == 1 ) {
                    return true;
                }

                // If 'M' is present and there are other colors in the array -> Multicolor cards containing filter color
                const matchingColors = cardface.colors.filter((color) => colors.includes(color));
                if (matchingColors.length === 0) {
                // If card doesn't have any of the colors, exclude it
                return false;
                }
                return true;
            }

            // Check if card.colors array contains any of the colors in colors
            const matchingColors = cardface.colors.filter((color) => colors.includes(color));
            if (matchingColors.length === 0) {
                // If card doesn't have any of the colors in colors, exclude it
                return false;
            }
        }
        // If all conditions are met, include the card
        return true;
    });
}
  