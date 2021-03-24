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

var _utils = require("../../utils");

var _svgPathToCanvas = require("svg-path-to-canvas");

var _svgPathToCanvas2 = _interopRequireDefault(_svgPathToCanvas);

var _GenericChartComponent = require("../../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _GenericComponent = require("../../GenericComponent");

var _shapes = require("./shapes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnnotateShape = function (_Component) {
	_inherits(AnnotateShape, _Component);

	function AnnotateShape(props) {
		_classCallCheck(this, AnnotateShape);

		var _this = _possibleConstructorReturn(this, (AnnotateShape.__proto__ || Object.getPrototypeOf(AnnotateShape)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		_this.isHover = _this.isHover.bind(_this);

		_this.state = {
			hoverSVG: false
		};
		return _this;
	}

	_createClass(AnnotateShape, [{
		key: "isHover",
		value: function isHover(moreProps, e) {
			var _props = this.props,
			    onHover = _props.onHover,
			    width = _props.width;

			if ((0, _utils.isDefined)(onHover)) {
				var _helper = (0, _shapes.helper)(this.props, moreProps),
				    rect = _helper.rect;

				var _moreProps$mouseXY = _slicedToArray(moreProps.mouseXY, 2),
				    x = _moreProps$mouseXY[0],
				    y = _moreProps$mouseXY[1];

				if (x >= rect.x - rect.width / 2 && y >= rect.y - rect.height / 2 && x <= rect.x + rect.width / 2 && y <= rect.y + rect.height / 2) {
					return true;
				}
			}
			return false;
		}
	}, {
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var _props2 = this.props,
			    figure = _props2.figure,
			    width = _props2.width,
			    height = _props2.height,
			    degrees = _props2.degrees,
			    fill = _props2.fill,
			    stroke = _props2.stroke;

			var _helper2 = (0, _shapes.helper)(this.props, moreProps),
			    x = _helper2.x,
			    y = _helper2.y;

			ctx.fillStyle = (0, _utils.hexToRGBA)(fill, 1);
			var pathData = "";

			switch (figure) {
				case "trapeze":
					pathData = (0, _shapes.TrapezePath)(x, y, width, height, degrees);
					break;
				case "triangle":
					pathData = (0, _shapes.TrianglePath)(x, y, width, height, degrees);
					break;
				case "polygon":
					pathData = (0, _shapes.PolygonPath)(x, y, width, height, degrees);
					break;
				case "rectangle":
					pathData = (0, _shapes.RectanglePath)(x, y, width, height, degrees);
					break;
				case "cursor":
					pathData = (0, _shapes.CursorPath)(x, y, width, height, degrees);
					break;
				case "crescent":
					pathData = (0, _shapes.CrescentPath)(x, y, width, height, degrees);
					break;
				case "right":
					pathData = (0, _shapes.RightPath)(x, y, width, height, degrees);
					break;
				case "star":
					pathData = (0, _shapes.StarPath)(x, y, width, height, degrees);
					break;
				case "exclamatio":
					pathData = (0, _shapes.ExclamationPath)(x, y, width, height, degrees);
					break;
				case "lover":
					pathData = (0, _shapes.LoverPath)(x, y, width, height, degrees);
					break;
				case "circle":
					pathData = (0, _shapes.CirclePath)(x, y, width, height, degrees);
					break;
				case "close":
					pathData = (0, _shapes.ClosePath)(x, y, width, height, degrees);
					break;
				case "pluse":
					pathData = (0, _shapes.PlusePath)(x, y, width, height, degrees);
					break;
				case "home":
					pathData = (0, _shapes.HomePath)(x, y, width, height, degrees);
					break;
				case "flag":
					pathData = (0, _shapes.FlagPath)(x, y, width, height, degrees);
					break;
				case "pencil":
					pathData = (0, _shapes.PencilPath)(x, y, width, height, degrees);
					break;
				case "pin":
					pathData = (0, _shapes.PinPath)(x, y, width, height, degrees);
					break;
				case "search":
					pathData = (0, _shapes.SearchPath)(x, y, width, height, degrees);
					break;
				case "filter":
					pathData = (0, _shapes.FilterPath)(x, y, width, height, degrees);
					break;
				case "command":
					pathData = (0, _shapes.CommandPath)(x, y, width, height, degrees);
					break;
				default:
					pathData = (0, _shapes.ExclamationPath)(x, y, width, height, degrees);
			}

			var sp = new _svgPathToCanvas2.default(pathData);
			sp.save().beginPath().to(ctx).fill();
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var xAccessor = moreProps.xAccessor;
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale,
			    plotData = moreProps.plotData;
			var _props3 = this.props,
			    fill = _props3.fill,
			    degrees = _props3.degrees,
			    width = _props3.width,
			    height = _props3.height,
			    onHover = _props3.onHover,
			    interactiveCursorClass = _props3.interactiveCursorClass;

			var _helper3 = (0, _shapes.helper)(this.props, moreProps),
			    x = _helper3.x,
			    y = _helper3.y;

			var figure = this.props.figure;


			var pathData = "";

			switch (figure) {
				case "cursor":
					pathData = (0, _shapes.CursorPath)(x, y, width, height, degrees);
					break;
				case "crescent":
					pathData = (0, _shapes.CrescentPath)(x, y, width, height, degrees);
					break;
				case "right":
					pathData = (0, _shapes.RightPath)(x, y, width, height, degrees);
					break;
				case "star":
					pathData = (0, _shapes.StarPath)(x, y, width, height, degrees);
					break;
				case "exclamatio":
					pathData = (0, _shapes.ExclamationPath)(x, y, width, height, degrees);
					break;
				case "lover":
					pathData = (0, _shapes.LoverPath)(x, y, width, height, degrees);
					break;
				case "circle":
					pathData = (0, _shapes.CirclePath)(x, y, width, height, degrees);
					break;
				case "close":
					pathData = (0, _shapes.ClosePath)(x, y, width, height, degrees);
					break;
				case "pluse":
					pathData = (0, _shapes.PlusePath)(x, y, width, height, degrees);
					break;
				case "home":
					pathData = (0, _shapes.HomePath)(x, y, width, height, degrees);
					break;
				case "flag":
					pathData = (0, _shapes.FlagPath)(x, y, width, height, degrees);
					break;
				case "pencil":
					pathData = (0, _shapes.PencilPath)(x, y, width, height, degrees);
					break;
				case "pin":
					pathData = (0, _shapes.PinPath)(x, y, width, height, degrees);
					break;
				case "search":
					pathData = (0, _shapes.SearchPath)(x, y, width, height, degrees);
					break;
				case "filter":
					pathData = (0, _shapes.FilterPath)(x, y, width, height, degrees);
					break;
				case "command":
					pathData = (0, _shapes.CommandPath)(x, y, width, height, degrees);
					break;
				default:
					pathData = (0, _shapes.ExclamationPath)(x, y, width, height, degrees);
			}

			return _react2.default.createElement(
				"g",
				{
					className: "react-stockcharts-enable-interaction " + interactiveCursorClass,
					fill: fill
				},
				_react2.default.createElement("path", {
					d: pathData,
					onClick: function onClick() {
						return console.log(111);
					},
					onMouseMove: function onMouseMove() {
						onHover(_extends({}, moreProps, { hovering: true, show: true }));
					}
				})
			);
		}
	}, {
		key: "render",
		value: function render() {
			var _props4 = this.props,
			    interactiveCursorClass = _props4.interactiveCursorClass,
			    selected = _props4.selected,
			    onDragStart = _props4.onDragStart,
			    onDrag = _props4.onDrag,
			    onDragComplete = _props4.onDragComplete,
			    onHover = _props4.onHover,
			    onUnHover = _props4.onUnHover;


			return _react2.default.createElement(_GenericChartComponent2.default, {
				isHover: this.isHover,
				svgDraw: this.renderSVG,
				canvasDraw: this.drawOnCanvas,
				canvasToDraw: _GenericComponent.getMouseCanvas,
				interactiveCursorClass: interactiveCursorClass,
				selected: selected,
				onDragStart: function onDragStart() {
					return console.log("onDragStart");
				},
				onDrag: function onDrag() {
					return console.log("onDrag");
				},
				onDragComplete: onDragComplete,
				onHover: onHover,
				onUnHover: onUnHover,
				drawOn: ["mousemove", "pan", "drag"]
			});
		}
	}]);

	return AnnotateShape;
}(_react.Component);

AnnotateShape.propTypes = {
	className: _propTypes2.default.string,
	usingProps: _propTypes2.default.object,
	stroke: _propTypes2.default.string.isRequired,
	fill: _propTypes2.default.string.isRequired,
	opacity: _propTypes2.default.number.isRequired
};

AnnotateShape.defaultProps = {
	className: "react-stockcharts-annotate react-stockcharts-default-cursor",
	degrees: 0
};

exports.default = AnnotateShape;
//# sourceMappingURL=AnnotateShape.js.map