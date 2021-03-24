"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {

	var options = _defaultOptionsForComputation.ATR;
	var source = function source(d) {
		return { open: d.open, high: d.high, low: d.low, close: d.close };
	};

	function calculator(data) {
		var _options = options,
		    windowSize = _options.windowSize;


		var high = function high(d) {
			return source(d).high;
		},
		    low = function low(d) {
			return source(d).low;
		},
		    close = function close(d) {
			return source(d).close;
		};

		var cciAlgorithm = (0, _utils.slidingWindow)().windowSize(windowSize).source(source).accumulator(function (values) {
			var highestHigh = (0, _d3Array.max)(values, low);
			var lowestLow = (0, _d3Array.min)(values, high);
			var currentClose = close((0, _utils.last)(values));
			var TP = (highestHigh + lowestLow + currentClose) / 3;
			var smaTP = TP / windowSize;
			var meanDeviation = TP / smaTP;
			var cciData = (TP - smaTP) / (0.15 * meanDeviation);
			return cciData;
		});

		var newData = cciAlgorithm(data);

		return newData;
	}
	calculator.undefinedLength = function () {
		var _options2 = options,
		    windowSize = _options2.windowSize;

		return windowSize - 1;
	};
	calculator.options = function (x) {
		if (!arguments.length) {
			return options;
		}
		options = _extends({}, _defaultOptionsForComputation.ATR, x);
		return calculator;
	};

	calculator.source = function (x) {
		if (!arguments.length) {
			return source;
		}
		source = x;
		return calculator;
	};

	return calculator;
};

var _d3Array = require("d3-array");

var _defaultOptionsForComputation = require("./defaultOptionsForComputation");

var _utils = require("../utils");

var _indicator = require("../indicator");
//# sourceMappingURL=cci.js.map