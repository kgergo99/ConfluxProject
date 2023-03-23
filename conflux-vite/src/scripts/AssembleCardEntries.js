export const assembleCardEntries = (card, count, cardEntryList, board) => {
    const index = cardEntryList.findIndex((entry) => entry.card.id === card.id);
    if (index >= 0) {
        const updatedEntry = {
            ...cardEntryList[index],
            count: cardEntryList[index].count + count,
        };
        const updatedCardEntryList = [
            ...cardEntryList.slice(0, index),
            updatedEntry,
            ...cardEntryList.slice(index + 1),
        ];
        return updatedCardEntryList;
    } else {
        const newEntry = {
            card: card,
            count: count,
            board: board,
        };
        const updatedCardEntryList = [...cardEntryList, newEntry];
        return updatedCardEntryList;
    }
};
