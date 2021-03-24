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

var _GenericChartComponent = require("../../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _GenericComponent = require("../../GenericComponent");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LabelArrow = function (_Component) {
	_inherits(LabelArrow, _Component);

	function LabelArrow(props) {
		_classCallCheck(this, LabelArrow);

		var _this = _possibleConstructorReturn(this, (LabelArrow.__proto__ || Object.getPrototypeOf(LabelArrow)).call(this, props));

		_this.calculateTextWidth = true;

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		_this.isHover = _this.isHover.bind(_this);
		return _this;
	}

	_createClass(LabelArrow, [{
		key: "isHover",
		value: function isHover(moreProps) {
			var _props = this.props,
			    onHover = _props.onHover,
			    type = _props.type,
			    getHoverInteractive = _props.getHoverInteractive;


			if ((0, _utils.isDefined)(onHover)) {
				var _helper = helper(this.props, moreProps, type),
				    rect = _helper.rect;

				var _moreProps$mouseXY = _slicedToArray(moreProps.mouseXY, 2),
				    x = _moreProps$mouseXY[0],
				    y = _moreProps$mouseXY[1];

				if (x >= rect.x && y >= rect.y && x <= rect.x + rect.width && y <= rect.y + rect.height) {
					if (getHoverInteractive) {
						getHoverInteractive(true);
					}
					return true;
				}
			}
			if (getHoverInteractive) {
				getHoverInteractive(false);
			}
			return false;
		}
	}, {
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			// const {
			//     bgFill,
			//     bgOpacity,
			//     bgStrokeWidth,
			//     bgStroke,
			//     textFill,
			//     fontFamily,
			//     fontSize,
			//     fontStyle,
			//     fontWeight,
			//     text,
			// } = this.props;
			// if (this.calculateTextWidth) {
			//     ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
			//     const { width } = ctx.measureText(text);
			//     this.textWidth = width;
			//     this.calculateTextWidth = false;
			// }
			// const { selected } = this.props;
			// const { x, y, rect } = helper(this.props, moreProps, this.textWidth);
			// ctx.fillStyle = hexToRGBA(bgFill, bgOpacity);
			// ctx.beginPath();
			// ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
			// if (selected) {
			//     ctx.strokeStyle = bgStroke;
			//     ctx.lineWidth = bgStrokeWidth;
			//     ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
			// }
			// ctx.fillStyle = textFill;
			// ctx.textBaseline = "middle";
			// ctx.textAlign = "center";
			// ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
			// ctx.beginPath();
			// ctx.fillText(text, x, y);
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var _props2 = this.props,
			    id = _props2.id,
			    type = _props2.type,
			    fill = _props2.fill;

			var _helper2 = helper(this.props, moreProps, this.textWidth),
			    x = _helper2.x,
			    y = _helper2.y;

			var position = type === "OPEN" ? "M " + x + " " + (y + 50) + " " + x + "," + y : "M " + x + " " + (y - 50) + " " + x + "," + y;
			return _react2.default.createElement(
				"g",
				null,
				_react2.default.createElement(
					"defs",
					null,
					_react2.default.createElement(
						"marker",
						{
							id: "red-arrowhead-" + id,
							viewBox: "0 0 10 10",
							refX: "7",
							refY: "5",
							markerUnits: "strokeWidth",
							markerWidth: "4",
							markerHeight: "3",
							orient: "auto"
						},
						_react2.default.createElement("path", {
							d: "M 0 0 L 10 5 L 0 10 z",
							stroke: "none",
							fill: fill
						})
					)
				),
				_react2.default.createElement("path", {
					d: position // DOWN
					, stroke: fill,
					strokeWidth: "8",
					fill: fill,
					markerEnd: "url(#red-arrowhead-" + id + ")"
				})
			);
		}
	}, {
		key: "render",
		value: function render() {
			var _props3 = this.props,
			    selected = _props3.selected,
			    interactiveCursorClass = _props3.interactiveCursorClass;
			var _props4 = this.props,
			    onHover = _props4.onHover,
			    onUnHover = _props4.onUnHover;
			var _props5 = this.props,
			    onDragStart = _props5.onDragStart,
			    onDrag = _props5.onDrag,
			    onDragComplete = _props5.onDragComplete;


			return _react2.default.createElement(_GenericChartComponent2.default, {
				isHover: this.isHover,
				svgDraw: this.renderSVG,
				canvasToDraw: _GenericComponent.getMouseCanvas,
				interactiveCursorClass: interactiveCursorClass,
				selected: selected,
				onDragStart: onDragStart,
				onDrag: onDrag,
				onDragComplete: onDragComplete,
				onHover: onHover,
				onUnHover: onUnHover,
				drawOn: ["mousemove", "pan", "drag"]
			});
		}
	}]);

	return LabelArrow;
}(_react.Component);

function helper(props, moreProps, type) {
	var position = props.position,
	    width = props.width;
	var xScale = moreProps.xScale,
	    yScale = moreProps.chartConfig.yScale;

	var _position = _slicedToArray(position, 2),
	    xValue = _position[0],
	    yValue = _position[1];

	var x = xScale(xValue);
	var y = yScale(yValue);

	var rect = {};

	switch (type) {
		case "OPEN":
			{
				rect = {
					x: x - width / 2,
					y: y,
					width: width,
					height: 50
				};
				break;
			}
		case "CLOSE":
			{
				rect = {
					x: x - width / 2,
					y: y - 50,
					width: width,
					height: 50
				};
				break;
			}
	}

	return {
		x: x,
		y: y,
		rect: rect
	};
}

LabelArrow.propTypes = {
	onDragStart: _propTypes2.default.func.isRequired,
	onDrag: _propTypes2.default.func.isRequired,
	onDragComplete: _propTypes2.default.func.isRequired,
	onHover: _propTypes2.default.func,
	onUnHover: _propTypes2.default.func,

	defaultClassName: _propTypes2.default.string,
	interactiveCursorClass: _propTypes2.default.string,

	selected: _propTypes2.default.bool.isRequired,
	type: _propTypes2.default.oneOf(["OPEN", "CLOSE"]).isRequired
};

LabelArrow.defaultProps = {
	onDragStart: _utils.noop,
	onDrag: _utils.noop,
	onDragComplete: _utils.noop,
	type: "OPEN",

	width: 40,
	fontWeight: "normal", // standard dev

	selected: false
};

exports.default = LabelArrow;
//# sourceMappingURL=LabelArrow.js.map