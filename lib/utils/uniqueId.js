"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = uniqueId;
var idCounter = {};

function uniqueId() {
	var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "$unique$";

	if (!idCounter[prefix]) {
		idCounter[prefix] = 0;
	}

	var id = ++idCounter[prefix];
	if (prefix === "$unique$") {
		return "" + id;
	}

	return "" + prefix + id;
}
//# sourceMappingURL=uniqueId.js.map