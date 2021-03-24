"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n    opacity: ", ";\n    transition: all 200ms;\n"], ["\n    opacity: ", ";\n    transition: all 200ms;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _d3Path = require("d3-path");

var _d3Interpolate = require("d3-interpolate");

var _GenericComponent = require("./GenericComponent");

var _GenericChartComponent = require("./GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { mean } from "d3-array";

var ZoomButtons = function (_Component) {
	_inherits(ZoomButtons, _Component);

	function ZoomButtons(props) {
		_classCallCheck(this, ZoomButtons);

		var _this = _possibleConstructorReturn(this, (ZoomButtons.__proto__ || Object.getPrototypeOf(ZoomButtons)).call(this, props));

		_this.handleZoomOut = _this.handleZoomOut.bind(_this);
		_this.handleZoomIn = _this.handleZoomIn.bind(_this);
		_this.zoom = _this.zoom.bind(_this);
		_this.isHover = _this.isHover.bind(_this);
		_this.renderSVG = _this.renderSVG.bind(_this);

		_this.state = {
			visible: false
		};
		return _this;
	}

	_createClass(ZoomButtons, [{
		key: "zoom",
		value: function zoom(direction) {
			var _this2 = this;

			var _context = this.context,
			    xAxisZoom = _context.xAxisZoom,
			    xScale = _context.xScale,
			    plotData = _context.plotData,
			    xAccessor = _context.xAccessor;

			var cx = xScale(xAccessor((0, _utils.last)(plotData)));
			// mean(xScale.range());
			var _props = this.props,
			    zoomMultiplier = _props.zoomMultiplier,
			    onZoom = _props.onZoom;


			var c = direction > 0 ? 1 * zoomMultiplier : 1 / zoomMultiplier;

			var _xScale$domain = xScale.domain(),
			    _xScale$domain2 = _slicedToArray(_xScale$domain, 2),
			    start = _xScale$domain2[0],
			    end = _xScale$domain2[1];

			var _xScale$range$map$map = xScale.range().map(function (x) {
				return cx + (x - cx) * c;
			}).map(xScale.invert),
			    _xScale$range$map$map2 = _slicedToArray(_xScale$range$map$map, 2),
			    newStart = _xScale$range$map$map2[0],
			    newEnd = _xScale$range$map$map2[1];

			var left = (0, _d3Interpolate.interpolateNumber)(start, newStart);
			var right = (0, _d3Interpolate.interpolateNumber)(end, newEnd);

			var foo = [0.25, 0.3, 0.5, 0.6, 0.75, 1].map(function (i) {
				return [left(i), right(i)];
			});

			this.interval = setInterval(function () {
				xAxisZoom(foo.shift());
				if (foo.length === 0) {
					clearInterval(_this2.interval);
					delete _this2.interval;
					onZoom(false, _this2.context, "end");
				}
			}, 10);
		}
	}, {
		key: "handleZoomOut",
		value: function handleZoomOut() {
			var onZoom = this.props.onZoom;

			if (this.interval) return;
			this.zoom(1);
			onZoom(true, this.context, "out");
		}
	}, {
		key: "handleZoomIn",
		value: function handleZoomIn(e, moreProps) {
			var onZoom = this.props.onZoom;

			if (this.interval) return;
			this.zoom(-1);
			onZoom(true, this.context, "in");
		}
	}, {
		key: "isHover",
		value: function isHover(moreProps) {
			var _moreProps$chartConfi = moreProps.chartConfig,
			    width = _moreProps$chartConfi.width,
			    height = _moreProps$chartConfi.height;
			var heightFromBase = this.props.heightFromBase;

			var _moreProps$mouseXY = _slicedToArray(moreProps.mouseXY, 2),
			    mouseX = _moreProps$mouseXY[0],
			    mouseY = _moreProps$mouseXY[1];

			if (mouseX <= width && mouseY >= height - heightFromBase * 2) {
				this.setState({ visible: true });
			} else {
				this.setState({ visible: false });
			}

			return true;
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var chartConfig = this.context.chartConfig;
			var width = chartConfig.width,
			    height = chartConfig.height;
			var visible = this.state.visible;
			var _props2 = this.props,
			    size = _props2.size,
			    heightFromBase = _props2.heightFromBase,
			    rx = _props2.rx,
			    ry = _props2.ry,
			    showing = _props2.showing;
			var _props3 = this.props,
			    stroke = _props3.stroke,
			    strokeOpacity = _props3.strokeOpacity,
			    fill = _props3.fill,
			    strokeWidth = _props3.strokeWidth,
			    fillOpacity = _props3.fillOpacity;
			var _props4 = this.props,
			    textFill = _props4.textFill,
			    textStrokeWidth = _props4.textStrokeWidth;
			var onReset = this.props.onReset;

			var centerX = Math.round(width / 2);
			var y = height - heightFromBase;

			var _size = _slicedToArray(size, 2),
			    w = _size[0],
			    h = _size[1];

			var hLength = 5;
			var wLength = 6;

			var textY = Math.round(y + h / 2);

			var resetX = centerX;

			var zoomOut = (0, _d3Path.path)();
			var zoomOutX = centerX - w - 2 * strokeWidth;
			zoomOut.moveTo(zoomOutX - wLength, textY);
			zoomOut.lineTo(zoomOutX + wLength, textY);
			zoomOut.closePath();

			var zoomIn = (0, _d3Path.path)();
			var zoomInX = centerX + w + 2 * strokeWidth;

			zoomIn.moveTo(zoomInX - wLength, textY);
			zoomIn.lineTo(zoomInX + wLength, textY);

			zoomIn.moveTo(zoomInX, textY - hLength);
			zoomIn.lineTo(zoomInX, textY + hLength);
			// zoomIn.closePath();

			return _react2.default.createElement(
				Wrapper,
				{
					className: "react-stockcharts-zoom-button",
					visible: showing ? visible : true
				},
				_react2.default.createElement("rect", {
					x: zoomOutX - w / 2,
					y: y,
					rx: rx,
					ry: ry,
					height: h,
					width: w,
					fill: fill,
					fillOpacity: fillOpacity,
					stroke: stroke,
					strokeOpacity: strokeOpacity,
					strokeWidth: strokeWidth
				}),
				_react2.default.createElement("path", {
					d: zoomOut.toString(),
					stroke: textFill,
					strokeWidth: textStrokeWidth
				}),
				_react2.default.createElement("rect", {
					x: resetX - w / 2,
					y: y,
					rx: rx,
					ry: ry,
					height: h,
					width: w,
					fill: fill,
					fillOpacity: fillOpacity,
					stroke: stroke,
					strokeOpacity: strokeOpacity,
					strokeWidth: strokeWidth
				}),
				_react2.default.createElement(
					"g",
					{ transform: "translate (" + resetX + ", " + (y + h / 4) + ") scale(.14)" },
					_react2.default.createElement("path", {
						d: "M31 13C23.4 5.3 12.8.5 1.1.5c-23.3 0-42.3 19-42.3 42.5s18.9 42.5 42.3 42.5c13.8 0 26-6.6 33.7-16.9l-16.5-1.8C13.5 70.4 7.5 72.5 1 72.5c-16.2 0-29.3-13.2-29.3-29.4S-15.2 13.7 1 13.7c8.1 0 15.4 3.3 20.7 8.6l-10.9 11h32.5V.5L31 13z",
						fill: textFill
					})
				),
				_react2.default.createElement("rect", {
					x: zoomInX - w / 2,
					y: y,
					rx: rx,
					ry: ry,
					height: h,
					width: w,
					fill: fill,
					fillOpacity: fillOpacity,
					stroke: stroke,
					strokeOpacity: strokeOpacity,
					strokeWidth: strokeWidth
				}),
				_react2.default.createElement("path", {
					d: zoomIn.toString(),
					stroke: textFill,
					strokeWidth: textStrokeWidth
				}),
				_react2.default.createElement("rect", {
					className: "react-stockcharts-enable-interaction out",
					onClick: this.handleZoomOut,
					x: zoomOutX - w / 2,
					y: y,
					rx: rx,
					ry: ry,
					height: h,
					width: w,
					fill: "none"
				}),
				_react2.default.createElement("rect", {
					className: "react-stockcharts-enable-interaction reset",
					onClick: onReset,
					x: resetX - w / 2,
					y: y,
					rx: rx,
					ry: ry,
					height: h,
					width: w,
					fill: "none"
				}),
				_react2.default.createElement("rect", {
					className: "react-stockcharts-enable-interaction in",
					onClick: this.handleZoomIn,
					x: zoomInX - w / 2,
					y: y,
					rx: rx,
					ry: ry,
					height: h,
					width: w,
					fill: "none"
				})
			);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(_GenericChartComponent2.default, {
				clip: false,
				svgDraw: this.renderSVG,
				isHover: this.isHover
				// canvasDraw={this.drawOnCanvas}
				, canvasToDraw: _GenericComponent.getMouseCanvas,
				drawOn: ["mousemove"]
			});
		}
	}]);

	return ZoomButtons;
}(_react.Component);

ZoomButtons.propTypes = {
	zoomMultiplier: _propTypes2.default.number.isRequired,
	size: _propTypes2.default.array.isRequired,
	heightFromBase: _propTypes2.default.number.isRequired,
	rx: _propTypes2.default.number.isRequired,
	ry: _propTypes2.default.number.isRequired,
	stroke: _propTypes2.default.string.isRequired,
	strokeWidth: _propTypes2.default.number.isRequired,
	strokeOpacity: _propTypes2.default.number.isRequired,
	fill: _propTypes2.default.string.isRequired,
	fillOpacity: _propTypes2.default.number.isRequired,
	fontSize: _propTypes2.default.number.isRequired,
	textDy: _propTypes2.default.string.isRequired,
	textFill: _propTypes2.default.string.isRequired,
	textStrokeWidth: _propTypes2.default.number.isRequired,
	onReset: _propTypes2.default.func,
	onZoom: _propTypes2.default.func,
	showing: _propTypes2.default.bool
};

var Wrapper = _styledComponents2.default.g(_templateObject, function (_ref) {
	var visible = _ref.visible;
	return visible ? "1" : "0";
});

ZoomButtons.defaultProps = {
	size: [30, 24],
	heightFromBase: 50,
	rx: 3,
	ry: 3,
	stroke: "#000000",
	strokeOpacity: 0.3,
	strokeWidth: 1,
	fill: "#D6D6D6",
	fillOpacity: 0.4,
	fontSize: 16,
	textDy: ".3em",
	textFill: "#000000",
	textStrokeWidth: 2,
	zoomMultiplier: 1.5,
	onReset: _utils.noop,
	onZoom: _utils.noop,
	showing: false
};

ZoomButtons.contextTypes = {
	xScale: _propTypes2.default.func.isRequired,
	chartConfig: _propTypes2.default.object.isRequired,
	plotData: _propTypes2.default.array.isRequired,
	xAccessor: _propTypes2.default.func.isRequired,
	xAxisZoom: _propTypes2.default.func.isRequired
};

exports.default = ZoomButtons;
//# sourceMappingURL=ZoomButtons.js.map