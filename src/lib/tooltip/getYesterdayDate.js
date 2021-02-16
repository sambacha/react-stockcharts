export default function getYesterdayDate(previousItem, nextItem) {
    if (previousItem && nextItem) {
        const previousDate = new Date(previousItem.date);
        const nextDate = new Date(nextItem.date);
        if (previousDate < nextDate) {
            return previousItem;
        } else {
            return nextItem;
        }
    }
    return null;
}
