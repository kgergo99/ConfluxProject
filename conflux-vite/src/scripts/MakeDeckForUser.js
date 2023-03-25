import { nanoid } from 'nanoid';

export default function makeNewDeckForUser(id, name, coverImage, deckSize, collectedSize, mainList, sideList) {
    const deckId =(id ? id : nanoid());
    const newDeck = {
        deckId: deckId,
        name: name,
        coverImage: coverImage,
        deckSize: deckSize,
        collectedSize: collectedSize,
        mainList: mainList,
        sideList: sideList,
    }

    return newDeck;
}

export function modifyDeckForUser() {

}

export function calcDeckSize(mainList, sideList) {
    let count = 0;
    mainList.forEach(cardObj => count += cardObj.count);
    sideList.forEach(cardObj => count += cardObj.count);
    return count;
}

export function getCollectedCount(userCards, mainList, sideList) {
    let count = 0;
    let idList = [];
    let combinedList = mainList.concat(sideList);

    combinedList.forEach(cardObj => idList.push(cardObj.card.id));

    for (const card of Object.values(userCards)) {
        if (idList.includes(card.id)) {
            console.warn(card.id)
            const matchingCard = combinedList.find(c => c.card.id == card.id);
            if (matchingCard) {
                if (card.count <= matchingCard.count) {
                    count += card.count;
                }
                else {
                    count += matchingCard.count;
                }
            }
        }
    }

    return count;
}