"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Format = require("d3-format");

var _d3TimeFormat = require("d3-time-format");

var _displayValuesFor = require("./displayValuesFor");

var _displayValuesFor2 = _interopRequireDefault(_displayValuesFor);

var _getYesterdayDate = require("./getYesterdayDate");

var _getYesterdayDate2 = _interopRequireDefault(_getYesterdayDate);

var _GenericChartComponent = require("../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _utils = require("../utils");

var _ToolTipText = require("./ToolTipText");

var _ToolTipText2 = _interopRequireDefault(_ToolTipText);

var _ToolTipTSpanLabel = require("./ToolTipTSpanLabel");

var _ToolTipTSpanLabel2 = _interopRequireDefault(_ToolTipTSpanLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OHLCTooltip = function (_Component) {
	_inherits(OHLCTooltip, _Component);

	function OHLCTooltip(props) {
		_classCallCheck(this, OHLCTooltip);

		var _this = _possibleConstructorReturn(this, (OHLCTooltip.__proto__ || Object.getPrototypeOf(OHLCTooltip)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		return _this;
	}

	_createClass(OHLCTooltip, [{
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var displayValuesFor = this.props.displayValuesFor;
			var _props = this.props,
			    xDisplayFormat = _props.xDisplayFormat,
			    accessor = _props.accessor,
			    volumeFormat = _props.volumeFormat,
			    ohlcFormat = _props.ohlcFormat,
			    percentFormat = _props.percentFormat,
			    displayTexts = _props.displayTexts,
			    onChange = _props.onChange,
			    visible = _props.visible;
			var _moreProps$chartConfi = moreProps.chartConfig,
			    width = _moreProps$chartConfi.width,
			    height = _moreProps$chartConfi.height;
			var displayXAccessor = moreProps.displayXAccessor,
			    fullData = moreProps.fullData;


			var currentItem = displayValuesFor(this.props, moreProps);
			var yesterdayItem = (0, _getYesterdayDate2.default)(fullData, currentItem);

			var displayDate = void 0,
			    open = void 0,
			    high = void 0,
			    low = void 0,
			    close = void 0,
			    yesterdayClose = void 0,
			    volume = void 0,
			    percentChange = void 0;
			displayDate = open = high = low = close = yesterdayClose = volume = percentChange = displayTexts.na;

			if ((0, _utils.isDefined)(currentItem) && (0, _utils.isDefined)(accessor(currentItem))) {
				var item = accessor(currentItem);

				volume = (0, _utils.isDefined)(item.volume) ? volumeFormat(item.volume) : displayTexts.na;

				displayDate = xDisplayFormat(displayXAccessor(item));
				open = ohlcFormat(item.open);
				high = ohlcFormat(item.high);
				low = ohlcFormat(item.low);
				close = ohlcFormat(item.close);
				yesterdayClose = (0, _utils.isDefined)(yesterdayItem) ? ohlcFormat(yesterdayItem.close) : null;
				percentChange = (0, _utils.isDefined)(yesterdayItem) ? percentFormat((item.close - yesterdayClose) / yesterdayClose) : "n/a";

				if (onChange) {
					onChange({ displayDate: displayDate, open: open, high: high, low: low, close: close, volume: volume, percentChange: percentChange });
				}
			}

			var originProp = this.props.origin;

			var origin = (0, _utils.functor)(originProp);

			var _origin = origin(width, height),
			    _origin2 = _slicedToArray(_origin, 2),
			    x = _origin2[0],
			    y = _origin2[1];

			var itemsToDisplay = {
				displayDate: displayDate,
				open: open,
				high: high,
				low: low,
				close: close,
				percentChange: percentChange,
				volume: volume,
				x: x,
				y: y
			};

			return this.props.children(this.props, moreProps, itemsToDisplay);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(_GenericChartComponent2.default, {
				clip: false,
				svgDraw: this.renderSVG,
				drawOn: ["mousemove"]
			});
		}
	}]);

	return OHLCTooltip;
}(_react.Component);

OHLCTooltip.propTypes = {
	className: _propTypes2.default.string,
	accessor: _propTypes2.default.func,
	xDisplayFormat: _propTypes2.default.func,
	children: _propTypes2.default.func,
	volumeFormat: _propTypes2.default.func,
	percentFormat: _propTypes2.default.func,
	ohlcFormat: _propTypes2.default.func,
	origin: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.func]),
	fontFamily: _propTypes2.default.string,
	fontSize: _propTypes2.default.number,
	onClick: _propTypes2.default.func,
	displayValuesFor: _propTypes2.default.func,
	textFill: _propTypes2.default.string,
	labelFill: _propTypes2.default.string,
	displayTexts: _propTypes2.default.object,
	onChange: _propTypes2.default.func,
	visible: _propTypes2.default.bool
};

var displayTextsDefault = {
	d: "Date: ",
	o: " O: ",
	h: " H: ",
	l: " L: ",
	c: " C: ",
	v: " Vol: ",
	p: " P: ",
	na: "n/a",
	u: "Last update: "
};

OHLCTooltip.defaultProps = {
	accessor: function accessor(d) {
		return {
			date: d.date,
			open: d.open,
			high: d.high,
			low: d.low,
			close: d.close,
			volume: d.volume
		};
	},
	xDisplayFormat: (0, _d3TimeFormat.timeFormat)("%Y-%m-%d"),
	volumeFormat: (0, _d3Format.format)(".4s"),
	percentFormat: (0, _d3Format.format)(".2%"),
	ohlcFormat: (0, _d3Format.format)(".2f"),
	displayValuesFor: _displayValuesFor2.default,
	origin: [0, 0],
	children: defaultDisplay,
	displayTexts: displayTextsDefault
};

function defaultDisplay(props, moreProps, itemsToDisplay) {
	/* eslint-disable */
	var className = props.className,
	    textFill = props.textFill,
	    labelFill = props.labelFill,
	    onClick = props.onClick,
	    fontFamily = props.fontFamily,
	    fontSize = props.fontSize,
	    visible = props.visible,
	    _props$serverTime = props.serverTime,
	    serverTime = _props$serverTime === undefined ? "08:00" : _props$serverTime,
	    dir = props.dir,
	    _props$onUpdateServer = props.onUpdateServerTime,
	    onUpdateServerTime = _props$onUpdateServer === undefined ? function () {
		console.log("onUpdateServerTime");
	} : _props$onUpdateServer;
	/* eslint-enable */

	var displayTextsRTL = {
		d: ": Date",
		o: ": O",
		h: ": H",
		l: ": L",
		c: ": C",
		v: ": Vol",
		p: ": P",
		na: "n/a",
		u: ": Last update"
	};

	var displayTexts = dir === "rtl" ? displayTextsRTL : props.displayTexts;

	var displayDate = itemsToDisplay.displayDate,
	    open = itemsToDisplay.open,
	    high = itemsToDisplay.high,
	    low = itemsToDisplay.low,
	    close = itemsToDisplay.close,
	    percentChange = itemsToDisplay.percentChange,
	    volume = itemsToDisplay.volume,
	    x = itemsToDisplay.x,
	    y = itemsToDisplay.y;
	// if (!visible) return null

	var getRTL = function getRTL() {
		return _react2.default.createElement(
			"g",
			{
				className: "react-stockcharts-tooltip-hover " + className,
				transform: "translate(" + (x + 60) + ", " + (y + 8) + ")",
				onClick: onClick,
				fill: "white"
			},
			_react2.default.createElement("image", { onClick: onUpdateServerTime, y: "-10px", href: "./assets/cycle_arrow.png", height: "24", width: "24" }),
			_react2.default.createElement(
				_ToolTipText2.default,
				{
					x: 0,
					y: 0,
					fontFamily: fontFamily,
					fontSize: fontSize || 14
				},
				_react2.default.createElement(
					"tspan",
					{ key: "value_U", fill: "white", dy: "6px", x: "30px" },
					serverTime || ""
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: "white", key: "label_U", x: "150px" },
					serverTime ? displayTexts.u : ""
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_U_divider", fill: "#567E9C", dx: "15px" },
					"|"
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_P", fill: "white", dx: "30px" },
					percentChange
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: "white", key: "label_P", x: "330px" },
					displayTexts.p
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_P_divider", fill: "#567E9C", dx: "15px" },
					"|"
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_Vol", fill: "white", dx: "30px" },
					volume
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: "white", key: "label_Vol", x: "450px" },
					displayTexts.v
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_Vol_divider", fill: "#567E9C", dx: "15px" },
					"|"
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_C", fill: "white", dx: "30px" },
					close
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: "white", key: "label_C", x: "570px" },
					displayTexts.c
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_C_divider", fill: "#567E9C", dx: "15px" },
					"|"
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_L", fill: "white", dx: "30px" },
					low
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: "white", key: "label_L", x: "685px" },
					displayTexts.l
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_L_divider", fill: "#567E9C", dx: "15px" },
					"|"
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_H", fill: "white", dx: "30px" },
					high
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: "white", key: "label_H", x: "800px" },
					displayTexts.h
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_H_divider", fill: "#567E9C", dx: "15px" },
					"|"
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_O", fill: "white", dx: "30px" },
					open
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: "white", key: "label_O", x: "915px" },
					displayTexts.o
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_O_divider", fill: "#567E9C", dx: "15px" },
					"|"
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value", fill: "white", dx: "30px" },
					displayDate
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: "white", key: "label", x: "1060px" },
					displayTexts.d
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_divider", fill: "#567E9C", dx: "15px" },
					"|"
				)
			)
		);
	};

	var getLTR = function getLTR() {
		return _react2.default.createElement(
			"g",
			{
				className: "react-stockcharts-tooltip-hover " + className,
				transform: "translate(" + (x + 60) + ", " + (y + 8) + ")",
				onClick: onClick,
				fill: "white"
			},
			_react2.default.createElement("image", { onClick: onUpdateServerTime, x: "853px", y: "-10px", href: "./assets/cycle_arrow.png", height: "24", width: "24" }),
			_react2.default.createElement(
				_ToolTipText2.default,
				{
					x: 0,
					y: 0,
					fontFamily: fontFamily,
					fontSize: fontSize || 14
				},
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: "white", key: "label", dy: "6px" },
					displayTexts.d
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value", fill: "white" },
					displayDate
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_divider", fill: "#567E9C", x: "123" },
					"|"
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: "white", key: "label_O", dx: "34px" },
					displayTexts.o
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_O", fill: "white" },
					open
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_O_divider", fill: "#567E9C", x: "236" },
					"|"
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: "white", key: "label_H", dx: "34px" },
					displayTexts.h
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_H", fill: "white" },
					high
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_H_divider", fill: "#567E9C", x: "352px" },
					"|"
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: "white", key: "label_L", dx: "34px" },
					displayTexts.l
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_L", fill: "white" },
					low
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_L_divider", fill: "#567E9C", x: "464px" },
					"|"
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: "white", key: "label_C", dx: "34px" },
					displayTexts.c
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_C", fill: "white" },
					close
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_C_divider", fill: "#567E9C", x: "579px" },
					"|"
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: "white", key: "label_Vol", dx: "34px" },
					displayTexts.v
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_Vol", fill: "white" },
					volume
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_Vol_divider", fill: "#567E9C", x: "704px" },
					"|"
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: "white", key: "label_P", dx: "34px" },
					displayTexts.p
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_P", fill: "white" },
					percentChange
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_P_divider", fill: "#567E9C", x: "818px" },
					"|"
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: "white", key: "label_U", dx: "60px" },
					serverTime ? displayTexts.u : ""
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_U", fill: "white" },
					serverTime || ""
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_U_divider", fill: "#567E9C", dx: "12px" },
					serverTime ? "|" : ""
				)
			)
		);
	};

	var renderTooltip = function renderTooltip() {
		return dir === "rtl" ? getRTL() : getLTR();
	};
	return _react2.default.createElement(
		"g",
		null,
		_react2.default.createElement("rect", {
			id: "myGroup",
			width: "100%",
			height: "20px",
			fill: "black",
			transform: "translate(" + x + ", " + y + ")"
		}),
		renderTooltip()
	);
}

exports.default = OHLCTooltip;
//# sourceMappingURL=OHLCTooltip.js.map