"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("../utils");

var _utils2 = require("./utils");

var _GenericChartComponent = require("../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _GenericComponent = require("../GenericComponent");

var _HoverTextNearMouse = require("./components/HoverTextNearMouse");

var _HoverTextNearMouse2 = _interopRequireDefault(_HoverTextNearMouse);

var _EachShape = require("./wrapper/EachShape");

var _EachShape2 = _interopRequireDefault(_EachShape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shape = function (_React$Component) {
	_inherits(Shape, _React$Component);

	function Shape() {
		_classCallCheck(this, Shape);

		var _this = _possibleConstructorReturn(this, (Shape.__proto__ || Object.getPrototypeOf(Shape)).call(this));

		_this.handleDraw = _this.handleDraw.bind(_this);
		_this.handleDrag = _this.handleDrag.bind(_this);
		_this.handleDragComplete = _this.handleDragComplete.bind(_this);
		_this.saveNodeType = _utils2.saveNodeType.bind(_this);
		_this.getSelectionState = (0, _utils2.isHoverForInteractiveType)("shapes").bind(_this);

		_this.nodes = [];
		_this.state = {};
		return _this;
	}

	_createClass(Shape, [{
		key: "handleDrag",
		value: function handleDrag(index, position, otherProps) {
			this.setState({
				override: _extends({}, otherProps, {
					index: index,
					position: position
				})
			});
		}
	}, {
		key: "handleDragComplete",
		value: function handleDragComplete(moreProps) {
			var _this2 = this;

			var override = this.state.override;

			if ((0, _utils.isDefined)(override)) {
				var shapes = this.props.shapes;

				var newTextList = shapes.map(function (each, idx) {
					var selected = idx === override.index;
					return selected ? _extends({}, each, override, {
						position: override.position,
						selected: true
					}) : _extends({}, each, {
						selected: false
					});
				});
				this.setState({
					override: null
				}, function () {
					_this2.props.onDragComplete(newTextList, moreProps);
				});
			}
		}
	}, {
		key: "handleDraw",
		value: function handleDraw(moreProps, e) {
			var _props = this.props,
			    enabled = _props.enabled,
			    shapes = _props.shapes;

			var xScale = moreProps.xScale,
			    _moreProps$mouseXY = _slicedToArray(moreProps.mouseXY, 2),
			    mouseX = _moreProps$mouseXY[0],
			    mouseY = _moreProps$mouseXY[1],
			    yScale = moreProps.chartConfig.yScale,
			    xAccessor = moreProps.xAccessor,
			    currentItem = moreProps.currentItem;

			var xyValue = [xAccessor(currentItem), yScale.invert(mouseY)];

			var xylValue = [];

			if (enabled) {
				var _props2 = this.props,
				    defaultShape = _props2.defaultShape,
				    onChoosePosition = _props2.onChoosePosition,
				    figure = _props2.figure;


				var position = [xyValue[0], xyValue[1]];

				var newShape = _extends({}, defaultShape, {
					selected: true,
					figure: figure,
					position: position,
					degrees: 0,
					width: 50,
					height: 50,
					edgeAngleTop: [xyValue[0], xyValue[1]],
					edgeAngleBottom: [xyValue[0], xyValue[1]],
					edgeRight: [xyValue[0], xyValue[1]],
					edgeLeft: [xyValue[0], xyValue[1]]
				});
				if (onChoosePosition) {
					onChoosePosition(newShape, moreProps, e);
				}
			} else {
				var newLabels = [].concat(_toConsumableArray(shapes.map(function (d) {
					return _extends({}, d);
				})));
				this.props.onDragComplete(newLabels, moreProps);
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var _props3 = this.props,
			    hoverText = _props3.hoverText,
			    shapes = _props3.shapes;
			var override = this.state.override;


			var hoverTextWithDefault = _extends({}, Shape.defaultProps.hoverText, hoverText);

			return _react2.default.createElement(
				"g",
				null,
				shapes.map(function (shape, idx) {
					return _react2.default.createElement(_EachShape2.default, _extends({
						key: idx,
						ref: _this3.saveNodeType(idx),
						index: idx,
						fill: shape.fill,
						stroke: shape.stroke,
						figure: shape.figure,
						position: (0, _utils2.getValueFromOverride)(override, idx, "position", shape.position),
						selected: shape.selected,
						opacity: 1,
						degrees: (0, _utils2.getValueFromOverride)(override, idx, "degrees", shape.degrees),
						width: (0, _utils2.getValueFromOverride)(override, idx, "width", shape.width),
						height: (0, _utils2.getValueFromOverride)(override, idx, "height", shape.height),
						edgeAngleTop: (0, _utils2.getValueFromOverride)(override, idx, "edgeAngleTop", shape.edgeAngleTop),
						edgeAngleBottom: (0, _utils2.getValueFromOverride)(override, idx, "edgeAngleBottom", shape.edgeAngleBottom),
						edgeLeft: (0, _utils2.getValueFromOverride)(override, idx, "edgeLeft", shape.edgeLeft),
						edgeRight: (0, _utils2.getValueFromOverride)(override, idx, "edgeRight", shape.edgeRight)
						// edgeAngleTop={shape.edgeAngleTop}
						// edgeAngleBottom={shape.edgeAngleBottom}
						// edgeLeft={shape.edgeLeft}
						// edgeRight={shape.edgeRight}
						, edgeInteractiveCursor: "react-stockcharts-move-cursor",
						lineInteractiveCursor: "react-stockcharts-move-cursor",
						onDrag: _this3.handleDrag,
						onDragComplete: _this3.handleDragComplete,
						hoverText: hoverTextWithDefault
					}, shape.appearance));
				}),
				_react2.default.createElement(_GenericChartComponent2.default, {
					onClick: this.handleDraw,
					svgDraw: _utils.noop,
					canvasDraw: _utils.noop,
					canvasToDraw: _GenericComponent.getMouseCanvas,
					drawOn: ["mousemove", "pan"]
				})
			);
		}
	}]);

	return Shape;
}(_react2.default.Component);

Shape.propTypes = {
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

	shapes: _propTypes2.default.array.isRequired,

	appearance: _propTypes2.default.shape({
		stroke: _propTypes2.default.string.isRequired,
		fill: _propTypes2.default.string.isRequired,
		edgeStrokeWidth: _propTypes2.default.number.isRequired,
		edgeFill: _propTypes2.default.string.isRequired,
		edgeStroke: _propTypes2.default.string.isRequired
	})
};

Shape.defaultProps = {
	onStart: _utils.noop,
	onComplete: _utils.noop,
	onSelect: _utils.noop,

	currentPositionStroke: "#000000",
	currentPositionstrokeOpacity: 1,
	currentPositionStrokeWidth: 3,
	currentPositionRadius: 0,

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
	shapes: [],

	defaultShape: {
		appearance: {
			stroke: "#000000",
			fill: "#000000",
			edgeStrokeWidth: 1,
			edgeFill: "#FFFFFF",
			edgeStroke: "#000000",
			r: 6
		}
	}
};

exports.default = Shape;
//# sourceMappingURL=Shape.js.map