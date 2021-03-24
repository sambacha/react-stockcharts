"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getNewXY = getNewXY;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Array = require("d3-array");

var _utils = require("../../utils");

var _utils2 = require("../utils");

var _ChartDataUtil = require("../../utils/ChartDataUtil");

var _ClickableCircle = require("./ClickableCircle");

var _ClickableCircle2 = _interopRequireDefault(_ClickableCircle);

var _ClickableRect = require("./ClickableRect");

var _ClickableRect2 = _interopRequireDefault(_ClickableRect);

var _BackgroundHover = require("./BackgroundHover");

var _BackgroundHover2 = _interopRequireDefault(_BackgroundHover);

var _AnnotateShape = require("./AnnotateShape");

var _AnnotateShape2 = _interopRequireDefault(_AnnotateShape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function pointDirection(x1, y1, x2, y2) {
	return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
}

var Transform = function (_Component) {
	_inherits(Transform, _Component);

	function Transform(props) {
		_classCallCheck(this, Transform);

		var _this = _possibleConstructorReturn(this, (Transform.__proto__ || Object.getPrototypeOf(Transform)).call(this, props));

		_this.handleEdgeBottomDragStart = _this.handleEdgeBottomDragStart.bind(_this);
		_this.handleEdgeBottomDrag = _this.handleEdgeBottomDrag.bind(_this);
		_this.handleDrag = _this.handleDrag.bind(_this);
		_this.handleDragStart = _this.handleDragStart.bind(_this);

		_this.handleEdgeTopDragStart = _this.handleEdgeTopDragStart.bind(_this);
		_this.handleEdgeTopDrag = _this.handleEdgeTopDrag.bind(_this);

		_this.handleEdgeLeftDragStart = _this.handleEdgeLeftDragStart.bind(_this);
		_this.handleEdgeLeftDrag = _this.handleEdgeLeftDrag.bind(_this);

		_this.handleEdgeRightDragStart = _this.handleEdgeRightDragStart.bind(_this);
		_this.handleEdgeRightDrag = _this.handleEdgeRightDrag.bind(_this);

		_this.handleDragComplete = _this.handleDragComplete.bind(_this);

		_this.saveNodeType = _utils2.saveNodeType.bind(_this);
		_this.nodes = {};

		_this.state = {
			anchor: undefined
		};
		return _this;
	}

	_createClass(Transform, [{
		key: "handleDragStart",
		value: function handleDragStart(moreProps) {
			var _props = this.props,
			    position = _props.position,
			    edgeRight = _props.edgeRight,
			    edgeLeft = _props.edgeLeft,
			    edgeAngleTop = _props.edgeAngleTop,
			    edgeAngleBottom = _props.edgeAngleBottom,
			    appearance = _props.appearance;
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

			var _edgeRight = _slicedToArray(edgeRight, 2),
			    rightCX = _edgeRight[0],
			    rightCY = _edgeRight[1];

			var dXR = mouseX - xScale(rightCX);
			var dYR = mouseY - yScale(rightCY);

			var _edgeLeft = _slicedToArray(edgeLeft, 2),
			    leftCX = _edgeLeft[0],
			    leftCY = _edgeLeft[1];

			var dXL = mouseX - xScale(leftCX);
			var dYL = mouseY - yScale(leftCY);

			var _edgeAngleTop = _slicedToArray(edgeAngleTop, 2),
			    topCX = _edgeAngleTop[0],
			    topCY = _edgeAngleTop[1];

			var dXT = mouseX - xScale(topCX);
			var dYT = mouseY - yScale(topCY);

			var _edgeAngleBottom = _slicedToArray(edgeAngleBottom, 2),
			    bottomCX = _edgeAngleBottom[0],
			    bottomY = _edgeAngleBottom[1];

			var dXB = mouseX - xScale(bottomCX);
			var dYB = mouseY - yScale(bottomY);

			this.dragStartPosition = {
				position: position,
				dx: dx,
				dy: dy,
				dXR: dXR,
				dYR: dYR,
				dXL: dXL,
				dYL: dYL,
				dXT: dXT,
				dYT: dYT,
				dXB: dXB,
				dYB: dYB
			};
		}
	}, {
		key: "handleDrag",
		value: function handleDrag(moreProps) {
			var _props2 = this.props,
			    index = _props2.index,
			    onDrag = _props2.onDrag,
			    width = _props2.width,
			    height = _props2.height,
			    degrees = _props2.degrees;

			var _moreProps$mouseXY = _slicedToArray(moreProps.mouseXY, 2),
			    mouseY = _moreProps$mouseXY[1],
			    yScale = moreProps.chartConfig.yScale,
			    xAccessor = moreProps.xAccessor,
			    mouseXY = moreProps.mouseXY,
			    plotData = moreProps.plotData,
			    xScale = moreProps.xScale;

			var _dragStartPosition = this.dragStartPosition,
			    dx = _dragStartPosition.dx,
			    dy = _dragStartPosition.dy,
			    dXR = _dragStartPosition.dXR,
			    dYR = _dragStartPosition.dYR,
			    dXL = _dragStartPosition.dXL,
			    dYL = _dragStartPosition.dYL,
			    dXT = _dragStartPosition.dXT,
			    dYT = _dragStartPosition.dYT,
			    dXB = _dragStartPosition.dXB,
			    dYB = _dragStartPosition.dYB;

			var xValue = xScale.invert(xScale((0, _ChartDataUtil.getXValue)(xScale, xAccessor, mouseXY, plotData)) - dx);
			var xyValue = [xValue, yScale.invert(mouseY - dy)];

			// RIGHT
			var xRValue = xScale.invert(xScale((0, _ChartDataUtil.getXValue)(xScale, xAccessor, mouseXY, plotData)) - dXR);
			var xyRValue = [xRValue, yScale.invert(mouseY - dYR)];

			// LEFT
			var xLValue = xScale.invert(xScale((0, _ChartDataUtil.getXValue)(xScale, xAccessor, mouseXY, plotData)) - dXL);
			var xyLValue = [xLValue, yScale.invert(mouseY - dYL)];

			// TOP
			var xTValue = xScale.invert(xScale((0, _ChartDataUtil.getXValue)(xScale, xAccessor, mouseXY, plotData)) - dXT);
			var xyTValue = [xTValue, yScale.invert(mouseY - dYT)];

			// TOP
			var xBValue = xScale.invert(xScale((0, _ChartDataUtil.getXValue)(xScale, xAccessor, mouseXY, plotData)) - dXB);
			var xyBValue = [xBValue, yScale.invert(mouseY - dYB)];

			onDrag(index, xyValue, {
				width: width,
				height: height,
				edgeRight: xyRValue,
				edgeLeft: xyLValue,
				edgeAngleTop: xyTValue,
				edgeAngleBottom: xyBValue,
				degrees: degrees
			});
		}
	}, {
		key: "handleEdgeLeftDragStart",
		value: function handleEdgeLeftDragStart(moreProps) {
			var _props3 = this.props,
			    position = _props3.position,
			    edgeLeft = _props3.edgeLeft;
			var mouseXY = moreProps.mouseXY;
			var yScale = moreProps.chartConfig.yScale,
			    xScale = moreProps.xScale;

			var _mouseXY2 = _slicedToArray(mouseXY, 2),
			    mouseX = _mouseXY2[0],
			    mouseY = _mouseXY2[1];

			var _edgeLeft2 = _slicedToArray(edgeLeft, 2),
			    textCX = _edgeLeft2[0],
			    textCY = _edgeLeft2[1];

			var dx = mouseX - xScale(textCX);
			var dy = mouseY - yScale(textCY);

			this.dragStartPosition = {
				edgeLeft: edgeLeft,
				dx: dx,
				dy: dy
			};
			this.setState({
				anchor: "edgeLeft"
			});
		}
	}, {
		key: "handleEdgeLeftDrag",
		value: function handleEdgeLeftDrag(moreProps) {
			var _props4 = this.props,
			    index = _props4.index,
			    position = _props4.position,
			    width = _props4.width,
			    onDrag = _props4.onDrag,
			    edgeRight = _props4.edgeRight,
			    edgeLeft = _props4.edgeLeft,
			    edgeAngleTop = _props4.edgeAngleTop,
			    edgeAngleBottom = _props4.edgeAngleBottom,
			    height = _props4.height,
			    degrees = _props4.degrees;

			var xScale = moreProps.xScale,
			    _moreProps$mouseXY2 = _slicedToArray(moreProps.mouseXY, 2),
			    mouseX = _moreProps$mouseXY2[0],
			    mouseY = _moreProps$mouseXY2[1],
			    yScale = moreProps.chartConfig.yScale,
			    xAccessor = moreProps.xAccessor,
			    currentItem = moreProps.currentItem;

			var _dragStartPosition2 = this.dragStartPosition,
			    dx = _dragStartPosition2.dx,
			    dy = _dragStartPosition2.dy;


			var newWidth = Math.abs(xScale(position[0]) - mouseX + width / 2);

			onDrag(index, position, {
				width: newWidth,
				height: height,
				edgeRight: edgeRight,
				edgeLeft: edgeLeft,
				edgeAngleTop: edgeAngleTop,
				edgeAngleBottom: edgeAngleBottom,
				degrees: degrees
			});
		}
	}, {
		key: "handleEdgeRightDragStart",
		value: function handleEdgeRightDragStart(moreProps) {
			var _props5 = this.props,
			    position = _props5.position,
			    edgeRight = _props5.edgeRight;
			var mouseXY = moreProps.mouseXY;
			var yScale = moreProps.chartConfig.yScale,
			    xScale = moreProps.xScale;

			var _mouseXY3 = _slicedToArray(mouseXY, 2),
			    mouseX = _mouseXY3[0],
			    mouseY = _mouseXY3[1];

			var _edgeRight2 = _slicedToArray(edgeRight, 2),
			    textCX = _edgeRight2[0],
			    textCY = _edgeRight2[1];

			var dx = mouseX - xScale(textCX);
			var dy = mouseY - yScale(textCY);

			this.dragStartPosition = {
				edgeRight: edgeRight,
				dx: dx,
				dy: dy
			};
			this.setState({
				anchor: "edgeRight"
			});
		}
	}, {
		key: "handleEdgeRightDrag",
		value: function handleEdgeRightDrag(moreProps) {
			var _props6 = this.props,
			    index = _props6.index,
			    position = _props6.position,
			    width = _props6.width,
			    onDrag = _props6.onDrag,
			    edgeRight = _props6.edgeRight,
			    edgeLeft = _props6.edgeLeft,
			    edgeAngleTop = _props6.edgeAngleTop,
			    edgeAngleBottom = _props6.edgeAngleBottom,
			    height = _props6.height,
			    degrees = _props6.degrees;

			var xScale = moreProps.xScale,
			    _moreProps$mouseXY3 = _slicedToArray(moreProps.mouseXY, 2),
			    mouseX = _moreProps$mouseXY3[0],
			    mouseY = _moreProps$mouseXY3[1],
			    yScale = moreProps.chartConfig.yScale,
			    xAccessor = moreProps.xAccessor,
			    currentItem = moreProps.currentItem;

			var _dragStartPosition3 = this.dragStartPosition,
			    dx = _dragStartPosition3.dx,
			    dy = _dragStartPosition3.dy;


			var newWidth = Math.abs(mouseX - xScale(position[0]) + width / 2);

			onDrag(index, position, {
				width: newWidth,
				height: height,
				edgeRight: edgeRight,
				edgeLeft: edgeLeft,
				edgeAngleTop: edgeAngleTop,
				edgeAngleBottom: edgeAngleBottom,
				degrees: degrees
			});
		}
	}, {
		key: "handleEdgeTopDragStart",
		value: function handleEdgeTopDragStart(moreProps) {
			this.setState({
				anchor: "edgeTop"
			});
		}
	}, {
		key: "handleEdgeBottomDragStart",
		value: function handleEdgeBottomDragStart(moreProps) {
			this.setState({
				anchor: "edgeBottom"
			});
		}
	}, {
		key: "handleDragComplete",
		value: function handleDragComplete() {
			var _props7;

			this.setState({
				anchor: undefined
			});
			(_props7 = this.props).onDragComplete.apply(_props7, arguments);
		}
	}, {
		key: "handleEdgeTopDrag",
		value: function handleEdgeTopDrag(moreProps) {
			var _props8 = this.props,
			    index = _props8.index,
			    position = _props8.position,
			    width = _props8.width,
			    onDrag = _props8.onDrag,
			    edgeRight = _props8.edgeRight,
			    edgeLeft = _props8.edgeLeft,
			    edgeAngleTop = _props8.edgeAngleTop,
			    edgeAngleBottom = _props8.edgeAngleBottom,
			    height = _props8.height,
			    degrees = _props8.degrees;

			var xScale = moreProps.xScale,
			    _moreProps$mouseXY4 = _slicedToArray(moreProps.mouseXY, 2),
			    mouseX = _moreProps$mouseXY4[0],
			    mouseY = _moreProps$mouseXY4[1],
			    yScale = moreProps.chartConfig.yScale,
			    xAccessor = moreProps.xAccessor,
			    currentItem = moreProps.currentItem;

			var newHeight = Math.abs(yScale(position[1]) - mouseY + height / 2);
			var newDegrees = pointDirection(mouseX, mouseY, position[0], position[1]);

			onDrag(index, position, {
				width: newHeight,
				height: newHeight,
				edgeRight: edgeRight,
				edgeLeft: edgeLeft,
				degrees: degrees,
				edgeAngleTop: edgeAngleTop,
				edgeAngleBottom: edgeAngleBottom
			});
		}
	}, {
		key: "handleEdgeBottomDrag",
		value: function handleEdgeBottomDrag(moreProps) {
			var _props9 = this.props,
			    index = _props9.index,
			    position = _props9.position,
			    width = _props9.width,
			    onDrag = _props9.onDrag,
			    edgeRight = _props9.edgeRight,
			    edgeLeft = _props9.edgeLeft,
			    edgeAngleTop = _props9.edgeAngleTop,
			    edgeAngleBottom = _props9.edgeAngleBottom,
			    height = _props9.height,
			    degrees = _props9.degrees;

			var xScale = moreProps.xScale,
			    _moreProps$mouseXY5 = _slicedToArray(moreProps.mouseXY, 2),
			    mouseX = _moreProps$mouseXY5[0],
			    mouseY = _moreProps$mouseXY5[1],
			    yScale = moreProps.chartConfig.yScale,
			    xAccessor = moreProps.xAccessor,
			    currentItem = moreProps.currentItem;

			var newHeight = Math.abs(mouseY - yScale(position[1]) + height / 2);
			var newWidth = Math.abs(mouseY - yScale(position[1]) + width / 2);
			var newDegrees = pointDirection(mouseX, mouseY, position[0], position[1]);

			onDrag(index, position, {
				width: newWidth,
				height: newHeight,
				edgeRight: edgeRight,
				edgeLeft: edgeLeft,
				edgeAngleTop: edgeAngleTop,
				edgeAngleBottom: edgeAngleBottom,
				degrees: degrees
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _props10 = this.props,
			    stroke = _props10.stroke,
			    opacity = _props10.opacity,
			    fill = _props10.fill,
			    r = _props10.r,
			    edgeStrokeWidth = _props10.edgeStrokeWidth,
			    edgeFill = _props10.edgeFill,
			    edgeStroke = _props10.edgeStroke,
			    edgeInteractiveCursor = _props10.edgeInteractiveCursor,
			    hoverText = _props10.hoverText,
			    selected = _props10.selected,
			    position = _props10.position,
			    width = _props10.width,
			    height = _props10.height,
			    degrees = _props10.degrees,
			    figure = _props10.figure,
			    onHover = _props10.onHover,
			    onUnHover = _props10.onUnHover;

			var hoverTextEnabled = hoverText.enable,
			    hoverTextSelected = hoverText.selectedText,
			    hoverTextUnselected = hoverText.text,
			    restHoverTextProps = _objectWithoutProperties(hoverText, ["enable", "selectedText", "text"]);

			var anchor = this.state.anchor;


			return _react2.default.createElement(
				"g",
				{ transform: "rotate(" + degrees + " " + position[0] + " " + position[1] + ")" },
				_react2.default.createElement(_ClickableCircle2.default, {
					ref: this.saveNodeType("edgeTop"),
					show: selected,
					cx: position[0],
					cy: position[1],
					r: r,
					fill: edgeFill,
					stroke: anchor === "edgeTop" ? stroke : edgeStroke,
					strokeWidth: edgeStrokeWidth,
					strokeOpacity: 1,
					interactiveCursorClass: edgeInteractiveCursor,
					placement: "top",
					width: width,
					height: height,
					onDragStart: this.handleEdgeTopDragStart,
					onDrag: this.handleEdgeTopDrag,
					onDragComplete: this.handleDragComplete
				}),
				_react2.default.createElement(_ClickableCircle2.default, {
					ref: this.saveNodeType("edgeBottom"),
					show: selected,
					cx: position[0],
					cy: position[1],
					r: r,
					fill: edgeFill,
					stroke: anchor === "edgeBottom" ? stroke : edgeStroke,
					strokeWidth: edgeStrokeWidth,
					strokeOpacity: 1,
					interactiveCursorClass: edgeInteractiveCursor,
					placement: "bottom",
					width: width,
					height: height,
					onDragStart: this.handleEdgeBottomDragStart,
					onDrag: this.handleEdgeBottomDrag,
					onDragComplete: this.handleDragComplete
				}),
				_react2.default.createElement(_ClickableRect2.default, {
					ref: this.saveNodeType("edgeLeft"),
					show: selected,
					cx: position[0],
					cy: position[1],
					r: r,
					fill: edgeFill,
					stroke: anchor === "edgeLeft" ? stroke : edgeStroke,
					strokeWidth: edgeStrokeWidth,
					strokeOpacity: 1,
					placement: "left",
					width: width,
					height: height,
					interactiveCursorClass: edgeInteractiveCursor,
					onDragStart: this.handleEdgeLeftDragStart,
					onDrag: this.handleEdgeLeftDrag,
					onDragComplete: this.handleDragComplete
				}),
				_react2.default.createElement(_ClickableRect2.default, {
					ref: this.saveNodeType("edgeRight"),
					show: selected,
					cx: position[0],
					cy: position[1],
					r: r,
					placement: "right",
					width: width,
					height: height,
					fill: edgeFill,
					stroke: anchor === "edgeRight" ? stroke : edgeStroke,
					strokeWidth: edgeStrokeWidth,
					strokeOpacity: 1,
					interactiveCursorClass: edgeInteractiveCursor,
					onDragStart: this.handleEdgeRightDragStart,
					onDrag: this.handleEdgeRightDrag,
					onDragComplete: this.handleDragComplete
				}),
				_react2.default.createElement(_BackgroundHover2.default, {
					ref: this.saveNodeType("background"),
					show: selected,
					position: position,
					fill: fill,
					opacity: opacity,
					width: width,
					height: height,
					degrees: degrees,
					cx: position[0],
					cy: position[1],
					interactiveCursorClass: "react-stockcharts-move-cursor",
					onDragStart: this.handleDragStart,
					onDrag: this.handleDrag,
					onDragComplete: this.handleDragComplete
				})
			);
		}
	}]);

	return Transform;
}(_react.Component);

function getNewXY(moreProps) {
	var xScale = moreProps.xScale,
	    yScale = moreProps.chartConfig.yScale,
	    xAccessor = moreProps.xAccessor,
	    plotData = moreProps.plotData,
	    mouseXY = moreProps.mouseXY;

	var mouseY = mouseXY[1];

	var x = (0, _ChartDataUtil.getXValue)(xScale, xAccessor, mouseXY, plotData);

	var _yScale$domain$slice$ = yScale.domain().slice().sort(_d3Array.ascending),
	    _yScale$domain$slice$2 = _slicedToArray(_yScale$domain$slice$, 2),
	    small = _yScale$domain$slice$2[0],
	    big = _yScale$domain$slice$2[1];

	var y = yScale.invert(mouseY);
	var newY = Math.min(Math.max(y, small), big);

	return [x, newY];
}

Transform.propTypes = {
	index: _propTypes2.default.number,
	onDrag: _propTypes2.default.func.isRequired,
	onDragComplete: _propTypes2.default.func.isRequired,
	onSelect: _propTypes2.default.func.isRequired,
	onUnSelect: _propTypes2.default.func.isRequired,

	r: _propTypes2.default.number.isRequired,
	defaultClassName: _propTypes2.default.string,

	selected: _propTypes2.default.bool,

	stroke: _propTypes2.default.string.isRequired,
	fill: _propTypes2.default.string.isRequired,

	edgeStrokeWidth: _propTypes2.default.number.isRequired,
	edgeStroke: _propTypes2.default.string.isRequired,
	edgeFill: _propTypes2.default.string.isRequired,
	hoverText: _propTypes2.default.object.isRequired
};

Transform.defaultProps = {
	onDrag: _utils.noop,
	onEdge1Drag: _utils.noop,
	onEdge2Drag: _utils.noop,
	onDragComplete: _utils.noop,
	onSelect: _utils.noop,
	onUnSelect: _utils.noop,

	selected: false,
	fill: "#FFFFFF",
	stroke: "#000000",
	edgeStroke: "#000000",
	edgeFill: "#FFFFFF",
	edgeStrokeWidth: 2,
	r: 5,
	strokeWidth: 1,
	strokeOpacity: 1,
	hoverText: {
		enable: false
	}
};

exports.default = Transform;
//# sourceMappingURL=Transform.js.map