import { nanoid } from 'nanoid';

export default function makeNewDeckForUser(name = "Deck", coverImage, deckSize, collectedSize, mainList, sideList) {
    const deckId = nanoid();
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