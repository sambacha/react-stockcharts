"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = getYesterdayDate;

var _lodash = require("lodash");

function getYesterdayDate(fullData, currentItem) {

	var currentItemIndex = (0, _lodash.findIndex)(fullData, currentItem);

	var firstItemDate = new Date(fullData[0].date);
	var lastItemDate = new Date(fullData[fullData.length - 1].date);

	if (firstItemDate < lastItemDate) return fullData[currentItemIndex - 1] || null;
	if (firstItemDate > lastItemDate) return fullData[currentItemIndex + 1] || null;
}
//# sourceMappingURL=getYesterdayDate.js.map