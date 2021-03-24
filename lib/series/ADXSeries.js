"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _LineSeries = require("./LineSeries");

var _LineSeries2 = _interopRequireDefault(_LineSeries);

var _StraightLine = require("./StraightLine");

var _StraightLine2 = _interopRequireDefault(_StraightLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ADXSeries = function (_Component) {
	_inherits(ADXSeries, _Component);

	function ADXSeries(props) {
		_classCallCheck(this, ADXSeries);

		var _this = _possibleConstructorReturn(this, (ADXSeries.__proto__ || Object.getPrototypeOf(ADXSeries)).call(this, props));

		_this.yAccessorForPD = _this.yAccessorForPD.bind(_this);
		_this.yAccessorForMD = _this.yAccessorForMD.bind(_this);
		_this.yAccessorForADX = _this.yAccessorForADX.bind(_this);
		return _this;
	}

	_createClass(ADXSeries, [{
		key: "yAccessorForPD",
		value: function yAccessorForPD(d) {
			var yAccessor = this.props.yAccessor;

			return yAccessor(d) && yAccessor(d).plusDI;
		}
	}, {
		key: "yAccessorForMD",
		value: function yAccessorForMD(d) {
			var yAccessor = this.props.yAccessor;

			return yAccessor(d) && yAccessor(d).minusDI;
		}
	}, {
		key: "yAccessorForADX",
		value: function yAccessorForADX(d) {
			var yAccessor = this.props.yAccessor;

			return yAccessor(d) && yAccessor(d).adxValue;
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    stroke = _props.stroke,
			    refLineOpacity = _props.refLineOpacity;
			var _props2 = this.props,
			    overSold = _props2.overSold,
			    middle = _props2.middle,
			    overBought = _props2.overBought;

			return _react2.default.createElement(
				"g",
				{ className: className },
				_react2.default.createElement(_LineSeries2.default, { yAccessor: this.yAccessorForPD,
					stroke: stroke.dLine,
					fill: "none" }),
				_react2.default.createElement(_LineSeries2.default, { yAccessor: this.yAccessorForMD,
					stroke: stroke.kLine,
					fill: "none" }),
				_react2.default.createElement(_LineSeries2.default, { yAccessor: this.yAccessorForADX,
					stroke: stroke.ALine,
					fill: "none" })
			);
		}
	}]);

	return ADXSeries;
}(_react.Component);

ADXSeries.propTypes = {
	className: _propTypes2.default.string,
	yAccessor: _propTypes2.default.func.isRequired,
	stroke: _propTypes2.default.shape({
		dLine: _propTypes2.default.string.isRequired,
		kLine: _propTypes2.default.string.isRequired,
		ALine: _propTypes2.default.string.isRequired
	}).isRequired,
	overSold: _propTypes2.default.number.isRequired,
	middle: _propTypes2.default.number.isRequired,
	overBought: _propTypes2.default.number.isRequired,
	refLineOpacity: _propTypes2.default.number.isRequired
};

ADXSeries.defaultProps = {
	className: "react-stockcharts-stochastic-series",
	stroke: {
		dLine: "#EA2BFF",
		kLine: "#74D400",
		ALine: "#ff0000"
	},
	overSold: 100,
	middle: 50,
	overBought: 20,
	refLineOpacity: 0.3
};

exports.default = ADXSeries;
//# sourceMappingURL=ADXSeries.js.map