import { findIndex } from "lodash";

export default function getYesterdayDate(fullData, currentItem) {

    const currentItemIndex = findIndex(fullData, currentItem);

    const firstItemDate = new Date(fullData[0].date);
    const lastItemDate = new Date(fullData[fullData.length - 1].date);

    if (firstItemDate < lastItemDate) return fullData[currentItemIndex - 1] || null;
    if (firstItemDate > lastItemDate) return fullData[currentItemIndex + 1] || null;
}
