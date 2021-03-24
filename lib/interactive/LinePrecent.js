"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Format = require("d3-format");

var _utils = require("../utils");

var _utils2 = require("./utils");

var _EachLinePrecent = require("./wrapper/EachLinePrecent");

var _EachLinePrecent2 = _interopRequireDefault(_EachLinePrecent);

var _MouseLocationIndicator = require("./components/MouseLocationIndicator");

var _MouseLocationIndicator2 = _interopRequireDefault(_MouseLocationIndicator);

var _HoverTextNearMouse = require("./components/HoverTextNearMouse");

var _HoverTextNearMouse2 = _interopRequireDefault(_HoverTextNearMouse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinePrecent = function (_Component) {
	_inherits(LinePrecent, _Component);

	function LinePrecent(props) {
		_classCallCheck(this, LinePrecent);

		var _this = _possibleConstructorReturn(this, (LinePrecent.__proto__ || Object.getPrototypeOf(LinePrecent)).call(this, props));

		_this.handleStart = _this.handleStart.bind(_this);
		_this.handleEnd = _this.handleEnd.bind(_this);
		_this.handleDrawLine = _this.handleDrawLine.bind(_this);
		_this.handleDragLine = _this.handleDragLine.bind(_this);
		_this.handleDragLineComplete = _this.handleDragLineComplete.bind(_this);

		_this.terminate = _utils2.terminate.bind(_this);
		_this.saveNodeType = _utils2.saveNodeType.bind(_this);

		_this.getSelectionState = (0, _utils2.isHoverForInteractiveType)("percents").bind(_this);
		_this.getHoverInteractive = _this.getHoverInteractive.bind(_this);

		_this.state = {
			percent: ""
		};
		_this.nodes = [];
		return _this;
	}

	_createClass(LinePrecent, [{
		key: "handleDragLine",
		value: function handleDragLine(index, newXYValue) {
			this.setState({
				override: _extends({
					index: index
				}, newXYValue)
			});
		}
	}, {
		key: "handleDragLineComplete",
		value: function handleDragLineComplete(moreProps) {
			var _this2 = this;

			var override = this.state.override;

			if ((0, _utils.isDefined)(override)) {
				var percents = this.props.percents;

				var newPercents = percents.map(function (each, idx) {
					return idx === override.index ? _extends({}, each, {
						start: [override.x1Value, override.y1Value],
						end: [override.x2Value, override.y2Value],
						selected: true,
						firstItem: override.firstItem,
						lastItem: override.lastItem
					}) : _extends({}, each, {
						selected: false
					});
				});

				this.setState({
					override: null
				}, function () {
					_this2.props.onComplete(newPercents, moreProps);
				});
			}
		}
	}, {
		key: "handleDrawLine",
		value: function handleDrawLine(xyValue, e, moreProps) {
			var current = this.state.current;
			var percentFormat = this.props.percentFormat;


			if ((0, _utils.isDefined)(current) && (0, _utils.isDefined)(current.start)) {
				this.mouseMoved = true;
				this.setState({
					current: _extends({}, current, {
						start: current.start,
						end: xyValue,
						lastItem: moreProps.currentItem
					})
				});
			}
		}
	}, {
		key: "handleStart",
		value: function handleStart(xyValue, moreProps, e) {
			var _this3 = this;

			var current = this.state.current;

			if ((0, _utils.isNotDefined)(current) || (0, _utils.isNotDefined)(current.start)) {
				this.mouseMoved = false;

				this.setState({
					current: _extends({}, current, {
						start: xyValue,
						end: null,
						firstItem: moreProps.currentItem
					})
				}, function () {
					_this3.props.onStart(moreProps, e);
				});
			}
		}
	}, {
		key: "handleEnd",
		value: function handleEnd(xyValue, moreProps, e) {
			var _this4 = this;

			var current = this.state.current;
			var _props = this.props,
			    percents = _props.percents,
			    appearance = _props.appearance,
			    type = _props.type;


			if (this.mouseMoved && (0, _utils.isDefined)(current) && (0, _utils.isDefined)(current.start)) {
				var newPercents = [].concat(_toConsumableArray(percents.map(function (d) {
					return _extends({}, d, { selected: false });
				})), [{
					start: current.start,
					end: xyValue,
					selected: true,
					appearance: appearance,
					type: type,
					firstItem: current.firstItem,
					lastItem: moreProps.currentItem
				}]);
				this.setState({
					current: null,
					percents: newPercents
				}, function () {
					_this4.props.onComplete(newPercents, moreProps, e);
				});
			}
		}
	}, {
		key: "getHoverInteractive",
		value: function getHoverInteractive(hovering, precentlLine) {
			precentlLine.hovering = hovering;
			var isHover = this.props.isHover;

			isHover(hovering, precentlLine);
		}
	}, {
		key: "render",
		value: function render() {
			var _this5 = this;

			var appearance = this.props.appearance;
			var _props2 = this.props,
			    enabled = _props2.enabled,
			    snap = _props2.snap,
			    shouldDisableSnap = _props2.shouldDisableSnap,
			    snapTo = _props2.snapTo;
			var _props3 = this.props,
			    currentPositionRadius = _props3.currentPositionRadius,
			    currentPositionStroke = _props3.currentPositionStroke;
			var _props4 = this.props,
			    currentPositionstrokeOpacity = _props4.currentPositionstrokeOpacity,
			    currentPositionStrokeWidth = _props4.currentPositionStrokeWidth;
			var _props5 = this.props,
			    hoverText = _props5.hoverText,
			    percents = _props5.percents;
			var _state = this.state,
			    current = _state.current,
			    override = _state.override;


			var hoverTextWithDefault = _extends({}, LinePrecent.defaultProps.hoverText, hoverText);

			var tempLine = (0, _utils.isDefined)(current) && (0, _utils.isDefined)(current.end) ? _react2.default.createElement(
				"g",
				null,
				_react2.default.createElement(_EachLinePrecent2.default, _extends({
					type: "LINE",
					noHover: true,
					x1Value: current.start[0],
					y1Value: current.start[1],
					x2Value: current.end[0],
					y2Value: current.end[1],
					stroke: appearance.stroke,
					hoverText: hoverTextWithDefault,
					strokeWidth: appearance.strokeWidth,
					strokeOpacity: appearance.strokeOpacity,
					fontSize: appearance.fontSize,
					fontFill: appearance.fontFill,
					fontFamily: appearance.fontFamily,
					firstItem: current.firstItem,
					lastItem: current.lastItem,
					edgeStrokeWidth: appearance.edgeStrokeWidth,
					edgeInteractiveCursor: "react-stockcharts-move-cursor",
					lineInteractiveCursor: "react-stockcharts-move-cursor"
				}, current))
			) : null;
			return _react2.default.createElement(
				"g",
				null,
				percents.map(function (each, idx) {
					var eachAppearance = (0, _utils.isDefined)(each.appearance) ? _extends({}, appearance, each.appearance) : appearance;
					return _react2.default.createElement(_EachLinePrecent2.default, {
						key: idx,
						ref: _this5.saveNodeType(idx),
						index: idx,
						type: "LINE",
						label: each.label // TODO
						, selected: each.selected,
						firstItem: each.firstItem,
						lastItem: each.lastItem,
						x1Value: (0, _utils2.getValueFromOverride)(override, idx, "x1Value", each.start[0]),
						y1Value: (0, _utils2.getValueFromOverride)(override, idx, "y1Value", each.start[1]),
						x2Value: (0, _utils2.getValueFromOverride)(override, idx, "x2Value", each.end[0]),
						y2Value: (0, _utils2.getValueFromOverride)(override, idx, "y2Value", each.end[1]),
						stroke: eachAppearance.stroke,
						strokeWidth: eachAppearance.strokeWidth,
						strokeOpacity: eachAppearance.strokeOpacity,
						strokeDasharray: eachAppearance.strokeDasharray,
						edgeStroke: eachAppearance.edgeStroke,
						edgeFill: eachAppearance.edgeFill,
						edgeStrokeWidth: eachAppearance.edgeStrokeWidth,
						fontSize: eachAppearance.fontSize,
						fontFill: eachAppearance.fontFill,
						fontFamily: eachAppearance.fontFamily,
						r: eachAppearance.r,
						hoverText: hoverTextWithDefault,
						onDrag: _this5.handleDragLine,
						onDragComplete: _this5.handleDragLineComplete,
						edgeInteractiveCursor: "react-stockcharts-move-cursor",
						lineInteractiveCursor: "react-stockcharts-move-cursor",
						getHoverInteractive: function getHoverInteractive(hovering) {
							return _this5.getHoverInteractive(hovering, each);
						}
					});
				}),
				tempLine,
				_react2.default.createElement(_MouseLocationIndicator2.default, {
					enabled: enabled,
					snap: snap,
					shouldDisableSnap: shouldDisableSnap,
					snapTo: snapTo,
					r: currentPositionRadius,
					stroke: currentPositionStroke,
					strokeOpacity: currentPositionstrokeOpacity,
					strokeWidth: currentPositionStrokeWidth,
					onMouseDown: this.handleStart,
					onClick: this.handleEnd,
					onMouseMove: this.handleDrawLine
				})
			);
		}
	}]);

	return LinePrecent;
}(_react.Component);

LinePrecent.propTypes = {
	snap: _propTypes2.default.bool.isRequired,
	enabled: _propTypes2.default.bool.isRequired,
	snapTo: _propTypes2.default.func,
	shouldDisableSnap: _propTypes2.default.func.isRequired,

	onStart: _propTypes2.default.func.isRequired,
	onComplete: _propTypes2.default.func.isRequired,
	onSelect: _propTypes2.default.func,
	onDoubleClick: _propTypes2.default.func,

	currentPositionStroke: _propTypes2.default.string,
	currentPositionStrokeWidth: _propTypes2.default.number,
	currentPositionstrokeOpacity: _propTypes2.default.number,
	currentPositionRadius: _propTypes2.default.number,

	hoverText: _propTypes2.default.object.isRequired,

	percents: _propTypes2.default.array.isRequired,

	appearance: _propTypes2.default.shape({
		fontFamily: _propTypes2.default.string.isRequired,
		fontSize: _propTypes2.default.number.isRequired,
		fontFill: _propTypes2.default.string.isRequired,
		stroke: _propTypes2.default.string.isRequired,
		strokeOpacity: _propTypes2.default.number.isRequired,
		strokeWidth: _propTypes2.default.number.isRequired,
		strokeDasharray: _propTypes2.default.oneOf(_utils.strokeDashTypes),
		edgeStrokeWidth: _propTypes2.default.number.isRequired,
		edgeFill: _propTypes2.default.string.isRequired,
		edgeStroke: _propTypes2.default.string.isRequired
	}).isRequired
};

LinePrecent.defaultProps = {
	onStart: _utils.noop,
	onComplete: _utils.noop,
	onSelect: _utils.noop,

	currentPositionStroke: "#000000",
	currentPositionstrokeOpacity: 1,
	currentPositionStrokeWidth: 3,
	currentPositionRadius: 0,
	percentFormat: (0, _d3Format.format)(".2%"),

	shouldDisableSnap: function shouldDisableSnap(e) {
		return e.button === 2 || e.shiftKey;
	},
	hoverText: _extends({}, _HoverTextNearMouse2.default.defaultProps, {
		enable: true,
		bgHeight: "auto",
		bgWidth: "auto",
		text: "Click to select object",
		selectedText: ""
	}),
	percents: [],

	appearance: {
		stroke: "#000000",
		strokeOpacity: 1,
		strokeWidth: 1,
		strokeDasharray: "Solid",
		edgeStrokeWidth: 1,
		edgeFill: "#FFFFFF",
		edgeStroke: "#000000",
		fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
		fontSize: 16,
		fontFill: "#000000",

		r: 6
	}
};

exports.default = LinePrecent;
//# sourceMappingURL=LinePrecent.js.map