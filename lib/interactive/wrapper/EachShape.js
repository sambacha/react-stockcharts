"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getNewXY = getNewXY;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Format = require("d3-format");

var _d3Array = require("d3-array");

var _utils = require("../../utils");

var _utils2 = require("../utils");

var _ChartDataUtil = require("../../utils/ChartDataUtil");

var _StraightLine = require("../components/StraightLine");

var _StraightLine2 = _interopRequireDefault(_StraightLine);

var _AnnotateShape = require("../components/AnnotateShape");

var _AnnotateShape2 = _interopRequireDefault(_AnnotateShape);

var _ClickableCircle = require("../components/ClickableCircle");

var _ClickableCircle2 = _interopRequireDefault(_ClickableCircle);

var _ClickableRect = require("../components/ClickableRect");

var _ClickableRect2 = _interopRequireDefault(_ClickableRect);

var _BackgroundHover = require("../components/BackgroundHover");

var _BackgroundHover2 = _interopRequireDefault(_BackgroundHover);

var _HoverTextNearMouse = require("../components/HoverTextNearMouse");

var _HoverTextNearMouse2 = _interopRequireDefault(_HoverTextNearMouse);

var _Transform = require("../components/Transform");

var _Transform2 = _interopRequireDefault(_Transform);

var _Text = require("../components/Text");

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EachShape = function (_Component) {
	_inherits(EachShape, _Component);

	function EachShape(props) {
		_classCallCheck(this, EachShape);

		var _this = _possibleConstructorReturn(this, (EachShape.__proto__ || Object.getPrototypeOf(EachShape)).call(this, props));

		_this.handleDragComplete = _this.handleDragComplete.bind(_this);

		_this.handleHover = _this.handleHover.bind(_this);

		_this.isHover = _utils2.isHover.bind(_this);
		_this.saveNodeType = _utils2.saveNodeType.bind(_this);
		_this.nodes = {};

		_this.state = {
			hover: false
		};
		return _this;
	}

	_createClass(EachShape, [{
		key: "handleDragComplete",
		value: function handleDragComplete() {
			var _props;

			this.setState({
				anchor: undefined
			});
			(_props = this.props).onDragComplete.apply(_props, arguments);
		}
	}, {
		key: "handleHover",
		value: function handleHover(moreProps) {
			if (this.state.hover !== moreProps.hovering) {
				this.setState({
					hover: moreProps.hovering
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _React$createElement;

			var _props2 = this.props,
			    stroke = _props2.stroke,
			    opacity = _props2.opacity,
			    fill = _props2.fill,
			    r = _props2.r,
			    edgeStrokeWidth = _props2.edgeStrokeWidth,
			    edgeFill = _props2.edgeFill,
			    edgeStroke = _props2.edgeStroke,
			    edgeInteractiveCursor = _props2.edgeInteractiveCursor,
			    hoverText = _props2.hoverText,
			    selected = _props2.selected,
			    figure = _props2.figure,
			    position = _props2.position,
			    onDragComplete = _props2.onDragComplete,
			    onDrag = _props2.onDrag,
			    lineInteractiveCursor = _props2.lineInteractiveCursor,
			    width = _props2.width,
			    height = _props2.height,
			    angle = _props2.angle,
			    edgeRight = _props2.edgeRight,
			    edgeLeft = _props2.edgeLeft,
			    edgeAngleTop = _props2.edgeAngleTop,
			    edgeAngleBottom = _props2.edgeAngleBottom,
			    id = _props2.id,
			    index = _props2.index,
			    degrees = _props2.degrees;

			var hoverTextEnabled = hoverText.enable,
			    hoverTextSelected = hoverText.selectedText,
			    hoverTextUnselected = hoverText.text,
			    restHoverTextProps = _objectWithoutProperties(hoverText, ["enable", "selectedText", "text"]);

			var _state = this.state,
			    hover = _state.hover,
			    anchor = _state.anchor;

			return _react2.default.createElement(
				"g",
				null,
				_react2.default.createElement(_Transform2.default, (_React$createElement = {
					figure: figure,
					position: position,
					stroke: stroke,
					fill: fill,
					index: index,
					opacity: opacity,
					degrees: degrees,
					edgeRight: edgeRight,
					edgeLeft: edgeLeft,
					edgeAngleTop: edgeAngleTop,
					edgeAngleBottom: edgeAngleBottom,
					selected: selected || hover,
					r: r
				}, _defineProperty(_React$createElement, "position", position), _defineProperty(_React$createElement, "fill", fill), _defineProperty(_React$createElement, "opacity", opacity), _defineProperty(_React$createElement, "width", width), _defineProperty(_React$createElement, "height", height), _defineProperty(_React$createElement, "interactiveCursorClass", "react-stockcharts-move-cursor"), _defineProperty(_React$createElement, "onDrag", onDrag), _defineProperty(_React$createElement, "onDragComplete", onDragComplete), _React$createElement)),
				_react2.default.createElement(_AnnotateShape2.default, {
					id: id,
					ref: this.saveNodeType("shape"),
					selected: selected || hover,
					figure: figure,
					position: position,
					stroke: stroke,
					fill: fill,
					opacity: opacity,
					degrees: degrees,
					width: width,
					height: height,
					onHover: this.handleHover,
					onUnHover: this.handleHover,
					interactiveCursorClass: "react-stockcharts-move-cursor"
				}),
				_react2.default.createElement(_HoverTextNearMouse2.default, _extends({
					show: hoverTextEnabled && hover
				}, restHoverTextProps, {
					text: selected ? hoverTextSelected : hoverTextUnselected
				}))
			);
		}
	}]);

	return EachShape;
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

EachShape.propTypes = {
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
	edgeInteractiveCursor: _propTypes2.default.string.isRequired,
	edgeFill: _propTypes2.default.string.isRequired,
	hoverText: _propTypes2.default.object.isRequired,
	lineInteractiveCursor: _propTypes2.default.string.isRequired
};

EachShape.defaultProps = {
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

exports.default = EachShape;
//# sourceMappingURL=EachShape.js.map