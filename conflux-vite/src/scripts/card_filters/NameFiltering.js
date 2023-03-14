export default function nameFiltering(card, name) {
    if (name.length === 0) {
        return true;
    }
    const matchingName = card.name.toLowerCase().includes(name);
    if(!matchingName){
        return false;
    }
    return true;
}