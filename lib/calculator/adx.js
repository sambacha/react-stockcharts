"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
https://github.com/ScottLogic/d3fc/blob/master/src/indicator/algorithm/calculator/relativeStrengthIndex.js

The MIT License (MIT)

Copyright (c) 2014-2015 Scott Logic Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

exports.default = function () {

	var options = _defaultOptionsForComputation.ADX;
	function calculator(data) {
		var _options = options,
		    windowSize = _options.windowSize;


		var FindTR = function FindTR(DMIP, DMIM, TR, Last, PrevLast) {

			if (Last.high > PrevLast.high) {
				DMIP = Last.high - PrevLast.high;
			} else {
				DMIP = 0;
			}

			if (Last.low < PrevLast.low) {
				DMIM = PrevLast.low - Last.low;
			} else {
				DMIM = 0;
			}

			if (DMIP > DMIM) {
				DMIM = 0;
			} else if (DMIM > DMIP) {
				DMIP = 0;
			} else if (DMIM = DMIP) {
				DMIM = 0;
				DMIM = 0;
			}

			TR = Math.max(Last.high - Last.low, Last.high - PrevLast.close, Last.low - PrevLast.close);

			return { DMIP: DMIP, DMIM: DMIM, TR: TR };
		};

		var adxIndicator = function adxIndicator(data) {
			var TR = 0;
			var DMIP = 0;
			var DMIM = 0;
			var sumDMIM = 0;
			var sumDMIP = 0;
			var sumTR = 0;
			var ADXVal = 0;
			var devN = (windowSize - 1) / windowSize;
			var nMinus = windowSize - 1;
			var ind = 0;
			var DIPline = 0;
			var DIMline = 0;
			var DXval = 0;
			var adxArr = [];

			for (ind = 1; ind < data.length; ind++) {

				var finded = FindTR(DMIP, DMIM, TR, data[ind], data[ind - 1]);

				sumDMIM = devN * sumDMIM + finded.DMIM;
				sumDMIP = devN * sumDMIP + finded.DMIP;
				sumTR = devN * sumTR + finded.TR;

				DIPline = 100 * (sumDMIP / sumTR);
				DIMline = 100 * (sumDMIM / sumTR);

				DXval = (DIPline - DIMline) / (DIPline + DIMline) * 100;

				if (isNaN(DXval)) {
					DXval = 0;
				}

				ADXVal = (ADXVal * nMinus + DXval) / windowSize;

				if (ind > nMinus) {
					ADXVal = ADXVal;
				} else {
					ADXVal = 0;
				}

				adxArr.push({ plusDI: Math.abs(DIPline), minusDI: Math.abs(DIMline), adxValue: Math.abs(ADXVal) });
			}
			return adxArr;
		};

		var finalData = adxIndicator(data);

		return finalData;
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
		options = _extends({}, _defaultOptionsForComputation.ADX, x);
		return calculator;
	};

	return calculator;
};

var _defaultOptionsForComputation = require("./defaultOptionsForComputation");
//# sourceMappingURL=adx.js.map