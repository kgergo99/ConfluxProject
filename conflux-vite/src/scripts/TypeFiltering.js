export default function typeFiltering(card, type) {
    //console.log("type filter card type: #", card.type_line, "# type given: ", type );
    if (type.length === 0) {
        return true;
    }
    const matchingTypes = type.some((t) => card.type_line.toLowerCase().includes(t.toLowerCase()));
    if (!matchingTypes) {
        // If card doesn't have any of the types, exclude it
        return false;
    }
    return true;
}