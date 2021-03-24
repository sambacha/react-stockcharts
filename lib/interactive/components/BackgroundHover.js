"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GenericChartComponent = require("../../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _GenericComponent = require("../../GenericComponent");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BackgroundHover = function (_Component) {
	_inherits(BackgroundHover, _Component);

	function BackgroundHover(props) {
		_classCallCheck(this, BackgroundHover);

		var _this = _possibleConstructorReturn(this, (BackgroundHover.__proto__ || Object.getPrototypeOf(BackgroundHover)).call(this, props));

		_this.saveNode = _this.saveNode.bind(_this);
		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		_this.isHover = _this.isHover.bind(_this);
		return _this;
	}

	_createClass(BackgroundHover, [{
		key: "saveNode",
		value: function saveNode(node) {
			this.node = node;
		}
	}, {
		key: "isHover",
		value: function isHover(moreProps) {
			var _helper = helper(this.props, moreProps),
			    rect = _helper.rect;

			var _moreProps$mouseXY = _slicedToArray(moreProps.mouseXY, 2),
			    x = _moreProps$mouseXY[0],
			    y = _moreProps$mouseXY[1];

			if (x >= rect.x && y >= rect.y && x <= rect.x + rect.width && y <= rect.y + rect.height) {
				return true;
			}
			return false;
		}
	}, {
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var _props = this.props,
			    width = _props.width,
			    height = _props.height;

			var _helper2 = helper(this.props, moreProps),
			    rect = _helper2.rect;

			ctx.globalCompositeOperation = "destination-over";
			ctx.fillStyle = (0, _utils.hexToRGBA)("#74b9ff", 0.3);

			ctx.beginPath();
			ctx.fillRect(rect.x, rect.y, width, height);
			ctx.setTransform(1, 1, 1, 1, 1, 0);

			ctx.beginPath();
			ctx.restore();
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps, e) {
			var _props2 = this.props,
			    cx = _props2.cx,
			    cy = _props2.cy,
			    width = _props2.width,
			    onHover = _props2.onHover,
			    onUnHover = _props2.onUnHover,
			    height = _props2.height,
			    fill = _props2.fill;

			return _react2.default.createElement(
				"g",
				null,
				_react2.default.createElement("rect", {
					fill: "#e2e2e2",
					x: cx,
					y: cy,
					width: width,
					height: height,
					onMouseMove: function onMouseMove() {
						onHover(_extends({}, moreProps, { hovering: true, show: true }), e);
					},
					onMouseEnter: function onMouseEnter() {
						onHover(_extends({}, moreProps, { hovering: true, show: true }), e);
					},
					onMouseLeave: function onMouseLeave() {
						onUnHover(moreProps, e);
					}
				})
			);
		}
	}, {
		key: "render",
		value: function render() {
			var interactiveCursorClass = this.props.interactiveCursorClass;
			var show = this.props.show;
			var _props3 = this.props,
			    onDragStart = _props3.onDragStart,
			    onDrag = _props3.onDrag,
			    onDragComplete = _props3.onDragComplete;


			return show ? _react2.default.createElement(_GenericChartComponent2.default, {
				ref: this.saveNode,
				interactiveCursorClass: interactiveCursorClass,
				selected: true,
				isHover: this.isHover,
				onDragStart: onDragStart,
				onDrag: onDrag,
				onDragComplete: onDragComplete,
				svgDraw: this.renderSVG,
				canvasDraw: this.drawOnCanvas,
				canvasToDraw: _GenericComponent.getMouseCanvas,
				drawOn: ["pan", "mousemove", "drag"]
			}) : null;
		}
	}]);

	return BackgroundHover;
}(_react.Component);

function helper(props, moreProps) {
	var position = props.position,
	    width = props.width,
	    height = props.height;
	var xScale = moreProps.xScale,
	    yScale = moreProps.chartConfig.yScale;

	var _position = _slicedToArray(position, 2),
	    xValue = _position[0],
	    yValue = _position[1];

	var x = xScale(xValue) - width / 2;
	var y = yScale(yValue) - height / 2;

	var rect = {
		x: x,
		y: y,
		width: width,
		height: height
	};

	return {
		x: x,
		y: y,
		rect: rect
	};
}

BackgroundHover.propTypes = {
	onDragStart: _propTypes2.default.func.isRequired,
	onDrag: _propTypes2.default.func.isRequired,
	onDragComplete: _propTypes2.default.func.isRequired,
	fill: _propTypes2.default.string.isRequired,

	cx: _propTypes2.default.number,
	cy: _propTypes2.default.number,

	className: _propTypes2.default.string.isRequired,
	show: _propTypes2.default.bool.isRequired,
	strokeOpacity: _propTypes2.default.number.isRequired,
	fillOpacity: _propTypes2.default.number.isRequired,
	interactiveCursorClass: _propTypes2.default.string
};

BackgroundHover.defaultProps = {
	className: "react-stockcharts-interactive-line-edge",
	onDragStart: _utils.noop,
	onDrag: _utils.noop,
	onDragComplete: _utils.noop,
	onMove: _utils.noop,
	show: false,
	fillOpacity: 1,
	strokeOpacity: 1,
	fill: "#74b9ff"
};

exports.default = BackgroundHover;
//# sourceMappingURL=BackgroundHover.js.map