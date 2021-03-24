"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _EachLabelArrow$defau;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getNewXY = getNewXY;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("../../utils");

var _utils2 = require("../utils");

var _ChartDataUtil = require("../../utils/ChartDataUtil");

var _HoverTextNearMouse = require("../components/HoverTextNearMouse");

var _HoverTextNearMouse2 = _interopRequireDefault(_HoverTextNearMouse);

var _ClickableCircle = require("../components/ClickableCircle");

var _ClickableCircle2 = _interopRequireDefault(_ClickableCircle);

var _LabelArrow = require("../components/LabelArrow");

var _LabelArrow2 = _interopRequireDefault(_LabelArrow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EachLabelArrow = function (_Component) {
	_inherits(EachLabelArrow, _Component);

	function EachLabelArrow(props) {
		_classCallCheck(this, EachLabelArrow);

		var _this = _possibleConstructorReturn(this, (EachLabelArrow.__proto__ || Object.getPrototypeOf(EachLabelArrow)).call(this, props));

		_this.handleHover = _this.handleHover.bind(_this);

		_this.handleDragStart = _this.handleDragStart.bind(_this);
		_this.handleDrag = _this.handleDrag.bind(_this);
		_this.handleEdge1Drag = _this.handleEdge1Drag.bind(_this);
		_this.handleEdge1DragStart = _this.handleEdge1DragStart.bind(_this);
		_this.handleDragComplete = _this.handleDragComplete.bind(_this);

		_this.isHover = _utils2.isHover.bind(_this);
		_this.saveNodeType = _utils2.saveNodeType.bind(_this);
		_this.nodes = {};

		_this.state = {
			hover: false
		};
		return _this;
	}

	_createClass(EachLabelArrow, [{
		key: "handleDragStart",
		value: function handleDragStart(moreProps) {
			var position = this.props.position;
			var mouseXY = moreProps.mouseXY;
			var yScale = moreProps.chartConfig.yScale,
			    xScale = moreProps.xScale;

			var _mouseXY = _slicedToArray(mouseXY, 2),
			    mouseX = _mouseXY[0],
			    mouseY = _mouseXY[1];

			var _position = _slicedToArray(position, 2),
			    textCX = _position[0],
			    textCY = _position[1];

			var dx = mouseX - xScale(textCX);
			var dy = mouseY - yScale(textCY);

			this.dragStartPosition = {
				position: position, dx: dx, dy: dy
			};
		}
	}, {
		key: "handleDrag",
		value: function handleDrag(moreProps) {
			var _props = this.props,
			    index = _props.index,
			    onDrag = _props.onDrag;

			var _moreProps$mouseXY = _slicedToArray(moreProps.mouseXY, 2),
			    mouseY = _moreProps$mouseXY[1],
			    yScale = moreProps.chartConfig.yScale,
			    xAccessor = moreProps.xAccessor,
			    mouseXY = moreProps.mouseXY,
			    plotData = moreProps.plotData,
			    xScale = moreProps.xScale;

			var _dragStartPosition = this.dragStartPosition,
			    dx = _dragStartPosition.dx,
			    dy = _dragStartPosition.dy;

			var xValue = xScale.invert(xScale((0, _ChartDataUtil.getXValue)(xScale, xAccessor, mouseXY, plotData)) - dx);
			// xScale.invert(xScale(xAccessor(currentItem)) - dx);
			var xyValue = [xValue, yScale.invert(mouseY - dy)];

			onDrag(index, xyValue);
		}
	}, {
		key: "handleHover",
		value: function handleHover(moreProps) {
			if (this.state.hover !== moreProps.hovering) {
				this.setState({
					hover: moreProps.hovering
				});
			}
			this.props.getHoverInteractive(moreProps.hovering);
		}
	}, {
		key: "handleDragComplete",
		value: function handleDragComplete() {
			var _props2;

			this.setState({
				anchor: undefined
			});
			(_props2 = this.props).onDragComplete.apply(_props2, arguments);
		}
	}, {
		key: "handleEdge1Drag",
		value: function handleEdge1Drag(moreProps) {
			var _props3 = this.props,
			    index = _props3.index,
			    onDrag = _props3.onDrag;

			var _moreProps$mouseXY2 = _slicedToArray(moreProps.mouseXY, 2),
			    mouseY = _moreProps$mouseXY2[1],
			    yScale = moreProps.chartConfig.yScale,
			    xAccessor = moreProps.xAccessor,
			    mouseXY = moreProps.mouseXY,
			    plotData = moreProps.plotData,
			    xScale = moreProps.xScale;

			var _dragStartPosition2 = this.dragStartPosition,
			    dx = _dragStartPosition2.dx,
			    dy = _dragStartPosition2.dy;

			var xValue = xScale.invert(xScale((0, _ChartDataUtil.getXValue)(xScale, xAccessor, mouseXY, plotData)) - dx);
			// xScale.invert(xScale(xAccessor(currentItem)) - dx);
			var xyValue = [xValue, yScale.invert(mouseY - dy)];

			onDrag(index, xyValue);
		}
	}, {
		key: "handleEdge1DragStart",
		value: function handleEdge1DragStart(moreProps) {
			var position = this.props.position;
			var mouseXY = moreProps.mouseXY;
			var yScale = moreProps.chartConfig.yScale,
			    xScale = moreProps.xScale;

			var _mouseXY2 = _slicedToArray(mouseXY, 2),
			    mouseX = _mouseXY2[0],
			    mouseY = _mouseXY2[1];

			var _position2 = _slicedToArray(position, 2),
			    textCX = _position2[0],
			    textCY = _position2[1];

			var dx = mouseX - xScale(textCX);
			var dy = mouseY - yScale(textCY);
			this.dragStartPosition = {
				position: position, dx: dx, dy: dy
			};
			this.setState({
				anchor: "edge2"
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _props4 = this.props,
			    type = _props4.type,
			    position = _props4.position,
			    hoverText = _props4.hoverText,
			    selected = _props4.selected,
			    onDragComplete = _props4.onDragComplete,
			    r = _props4.r,
			    edgeStrokeWidth = _props4.edgeStrokeWidth,
			    edgeFill = _props4.edgeFill,
			    edgeStroke = _props4.edgeStroke,
			    edgeInteractiveCursor = _props4.edgeInteractiveCursor,
			    stroke = _props4.stroke,
			    fill = _props4.fill,
			    width = _props4.width,
			    id = _props4.id;
			var _state = this.state,
			    hover = _state.hover,
			    anchor = _state.anchor;


			var hoverHandler = {
				onHover: this.handleHover,
				onUnHover: this.handleHover
			};

			var hoverTextEnabled = hoverText.enable,
			    hoverTextSelected = hoverText.selectedText,
			    hoverTextUnselected = hoverText.text,
			    restHoverTextProps = _objectWithoutProperties(hoverText, ["enable", "selectedText", "text"]);

			return _react2.default.createElement(
				"g",
				null,
				_react2.default.createElement(_ClickableCircle2.default, {
					ref: this.saveNodeType("edge1"),
					show: selected || hover,
					cx: position[0],
					cy: position[1],
					r: r,
					fill: edgeFill,
					stroke: anchor === "edge1" ? stroke : edgeStroke,
					strokeWidth: edgeStrokeWidth,
					strokeOpacity: 1,
					interactiveCursorClass: edgeInteractiveCursor,
					onDragStart: this.handleEdge1DragStart,
					onDrag: this.handleEdge1Drag,
					onDragComplete: this.handleDragComplete }),
				_react2.default.createElement(_LabelArrow2.default, _extends({
					id: id,
					ref: this.saveNodeType("labelarrow"),
					type: type,
					fill: fill,
					width: width,
					onHover: this.handleHover,
					onUnHover: this.handleHover,
					selected: selected || hover,
					interactiveCursorClass: "react-stockcharts-move-cursor"
				}, hoverHandler, {

					onDragStart: this.handleDragStart,
					onDrag: this.handleDrag,
					onDragComplete: onDragComplete,
					position: position
				})),
				_react2.default.createElement(_HoverTextNearMouse2.default, _extends({
					show: hoverTextEnabled && hover
				}, restHoverTextProps, {
					text: selected ? hoverTextSelected : hoverTextUnselected
				}))
			);
		}
	}]);

	return EachLabelArrow;
}(_react.Component);

function getNewXY(moreProps, snapTo) {
	var xScale = moreProps.xScale,
	    xAccessor = moreProps.xAccessor,
	    plotData = moreProps.plotData,
	    mouseXY = moreProps.mouseXY;


	var currentItem = (0, _ChartDataUtil.getCurrentItem)(xScale, xAccessor, mouseXY, plotData);
	var x = xAccessor(currentItem);
	var y = snapTo(currentItem);

	return [x, y];
}

EachLabelArrow.propTypes = {
	index: _propTypes2.default.number,

	position: _propTypes2.default.array.isRequired,

	selected: _propTypes2.default.bool.isRequired,

	onDrag: _propTypes2.default.func.isRequired,
	onDragComplete: _propTypes2.default.func.isRequired,
	fill: _propTypes2.default.string.isRequired,
	width: _propTypes2.default.number.isRequired,

	hoverText: _propTypes2.default.object.isRequired,
	type: _propTypes2.default.oneOf(["OPEN", "CLOSE"]).isRequired
};

EachLabelArrow.defaultProps = (_EachLabelArrow$defau = {
	edgeStroke: "#000000",
	edgeFill: "#FFFFFF",
	edgeStrokeWidth: 2,
	r: 5,
	strokeWidth: 1,
	strokeOpacity: 1,
	strokeDasharray: "Solid",

	onDrag: _utils.noop,
	onDragComplete: _utils.noop,
	selected: false,
	hovering: false,
	width: 40,
	type: "OPEN"
}, _defineProperty(_EachLabelArrow$defau, "width", 40), _defineProperty(_EachLabelArrow$defau, "fill", "green"), _defineProperty(_EachLabelArrow$defau, "hoverText", _extends({}, _HoverTextNearMouse2.default.defaultProps)), _EachLabelArrow$defau);

exports.default = EachLabelArrow;
//# sourceMappingURL=EachLabelArrow.js.map