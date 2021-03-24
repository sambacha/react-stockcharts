"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Path = exports.RectanglePath = exports.TrianglePath = exports.TrapezePath = exports.PolygonPath = exports.RightPath = exports.CrescentPath = exports.CursorPath = exports.FilterPath = exports.CommandPath = exports.SearchPath = exports.PinPath = exports.PencilPath = exports.FlagPath = exports.HomePath = exports.PlusePath = exports.ClosePath = exports.CirclePath = exports.LoverPath = exports.ExclamationPath = exports.StarPath = exports.Star = exports.Plus = exports.Circle = exports.Reactangle = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.helper = helper;

var _svgPathdata = require("svg-pathdata");

var _utils = require("../../utils");

var Reactangle = exports.Reactangle = function Reactangle(ctx, moreProps, props) {
	var fill = props.fill,
	    opacity = props.opacity,
	    width = props.width,
	    height = props.height,
	    degrees = props.degrees;

	var _helper = helper(props, moreProps),
	    x = _helper.x,
	    y = _helper.y;

	ctx.StrokeStyle = (0, _utils.hexToRGBA)(fill, 1);
	ctx.FillStyle = (0, _utils.hexToRGBA)(fill, 1);

	ctx.beginPath();
	ctx.fillRect(x - width / 2, y - height / 2, width, height);
	ctx.fill();

	ctx.stroke();
};

var Circle = exports.Circle = function Circle(ctx, moreProps, props) {
	var fill = props.fill,
	    opacity = props.opacity,
	    width = props.width,
	    height = props.height,
	    degrees = props.degrees;

	var _helper2 = helper(props, moreProps),
	    x = _helper2.x,
	    y = _helper2.y;

	ctx.StrokeStyle = (0, _utils.hexToRGBA)(fill, 1);
	ctx.FillStyle = (0, _utils.hexToRGBA)(fill, 1);

	ctx.beginPath();

	ctx.ellipse(x, y, width / 2, height / 2, degrees, 0, 2 * Math.PI);
	ctx.fill();

	ctx.stroke();
};

var Plus = exports.Plus = function Plus(ctx, moreProps, props) {
	var fill = props.fill,
	    opacity = props.opacity,
	    width = props.width,
	    height = props.height,
	    degrees = props.degrees;

	var _helper3 = helper(props, moreProps),
	    x = _helper3.x,
	    y = _helper3.y;

	ctx.StrokeStyle = (0, _utils.hexToRGBA)(fill, 1);
	ctx.FillStyle = (0, _utils.hexToRGBA)(fill, 1);

	ctx.beginPath();

	// ctx.ellipse(x, y, width / 2, height / 2, degrees, 0, 2 * Math.PI);
	ctx.fill();

	ctx.stroke();
};

var Star = exports.Star = function Star(ctx, moreProps, props) {};

function helper(props, moreProps) {
	var position = props.position,
	    width = props.width,
	    height = props.height;
	var xScale = moreProps.xScale,
	    yScale = moreProps.chartConfig.yScale;

	var _position = _slicedToArray(position, 2),
	    xValue = _position[0],
	    yValue = _position[1];

	var x = xScale(xValue);
	var y = yScale(yValue);

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

var StarPath = exports.StarPath = function StarPath(x, y, width, height, degrees) {
	return new _svgPathdata.SVGPathData("\n            M361.413,\n            137.674c-4.413-13.584-16.156-23.483-30.29-25.537l-80.052-11.632L215.276,\n            27.97c-6.32-12.809-19.365-20.917-33.647-20.917h-0.001c-14.282,\n            0-27.327,\n            8.109-33.648,\n            20.916l-35.798,\n            72.536l-80.053,\n            11.632c-14.134,\n            2.054-25.877,\n            11.954-30.291,\n            25.537c-4.413,\n            13.584-0.732,\n            28.495,\n            9.495,\n            38.465l57.926,\n            56.465L55.581,\n            312.33c-2.415,\n            14.077,\n            3.372,\n            28.305,\n            14.927,\n            36.7c11.556,\n            8.396,\n            26.875,\n            9.503,\n            39.517,\n            2.856l71.603-37.643l71.602,\n            37.643\n            c5.49,\n            2.887,\n            11.484,\n            4.311,\n            17.457,\n            4.311c7.78,\n            0,\n            15.522-2.417,\n            22.06-7.167c11.556-8.396,\n            17.342-22.623,\n            14.926-36.7l-13.677-79.727l57.924-56.466C362.146,\n            166.168,\n            365.827,\n            151.257,\n            361.413,\n            137.674z\n        ").scale(width * 0.2 / 100, height * 0.2 / 100).translate(x - width / 3, y - height / 3).rotate(degrees, x, y).encode();
};

var ExclamationPath = exports.ExclamationPath = function ExclamationPath(x, y, width, height, degrees) {
	return new _svgPathdata.SVGPathData("\n    M331.783,266.645L215.865,28.675C207.316,11.131,189.51,0,170,0\n\ts-37.316,11.131-45.865,28.675L8.217,266.645c-7.703,15.81-6.71,34.473,2.61,49.386C20.148,330.944,36.497,340,54.08,340h231.84\n\tc17.583,0,33.933-9.056,43.252-23.969C338.493,301.118,339.486,282.455,331.783,266.645z M170,284.167\n\tc-10.396,0-18.818-8.424-18.818-18.817c0-10.394,8.423-18.817,18.818-18.817c10.395,0,18.818,8.423,18.818,18.817\n\tC188.818,275.743,180.395,284.167,170,284.167z M186.448,223.357c-0.515,8.598-7.912,15.271-16.45,15.323\n\tc-8.532-0.054-15.942-6.723-16.445-15.323c-1.655-35.015-3.304-70.033-4.955-105.052c-0.18-13.54,12.115-21.198,21.399-21.138\n\tc9.291-0.062,21.581,7.598,21.405,21.138C189.749,153.325,188.091,188.339,186.448,223.357z\n        ").scale(width * 0.2 / 100, height * 0.2 / 100).translate(x - width / 3, y - height / 3).rotate(degrees, x, y).encode();
};

var LoverPath = exports.LoverPath = function LoverPath(x, y, width, height, degrees) {
	return new _svgPathdata.SVGPathData("\n        M339.266,65.896c-19.837-19.828-46.206-30.748-74.254-30.748c-16.248,0-31.708,3.528-45.949,10.487l-34.059,16.648\n        l-34.07-16.653c-14.237-6.955-29.694-10.483-45.939-10.483c-28.051,0-54.427,10.926-74.273,30.767\n        c-19.649,19.652-30.56,45.805-30.72,73.64c-0.16,27.803,10.422,54.059,29.798,73.93c0.824,0.845,1.68,1.662,2.565,2.441\n        l121.031,106.963c9.026,7.976,20.316,11.965,31.606,11.965c11.29,0,22.58-3.989,31.606-11.965l121.043-106.972\n        c0.888-0.787,1.748-1.602,2.576-2.454c19.365-19.874,29.939-46.127,29.772-73.93C369.831,111.702,358.92,85.555,339.266,65.896z\n    ").scale(width * 0.2 / 100, height * 0.2 / 100).translate(x - width / 3, y - height / 3).rotate(degrees, x, y).encode();
};

var CirclePath = exports.CirclePath = function CirclePath(x, y, width, height, degrees) {
	return new _svgPathdata.SVGPathData("M256,0C115.39,0,0,115.39,0,256s115.39,256,256,256s256-115.39,256-256S396.61,0,256,0z").scale(width * 0.15 / 100, height * 0.15 / 100).translate(x - width / 3, y - height / 3).rotate(degrees, x, y).encode();
};

var ClosePath = exports.ClosePath = function ClosePath(x, y, width, height, degrees) {
	return new _svgPathdata.SVGPathData("m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0").scale(width * 0.15 / 100, height * 0.15 / 100).translate(x - width / 4, y - height / 4).rotate(degrees, x, y).encode();
};

var PlusePath = exports.PlusePath = function PlusePath(x, y, width, height, degrees) {
	return new _svgPathdata.SVGPathData("m437.332031 192h-160v-160c0-17.664062-14.335937-32-32-32h-21.332031c-17.664062 0-32 14.335938-32 32v160h-160c-17.664062 0-32 14.335938-32 32v21.332031c0 17.664063 14.335938 32 32 32h160v160c0 17.664063 14.335938 32 32 32h21.332031c17.664063 0 32-14.335937 32-32v-160h160c17.664063 0 32-14.335937 32-32v-21.332031c0-17.664062-14.335937-32-32-32zm0 0").scale(width * 0.15 / 100, height * 0.15 / 100).translate(x - width / 3, y - height / 3).rotate(degrees, x, y).encode();
};

var HomePath = exports.HomePath = function HomePath(x, y, width, height, degrees) {
	return new _svgPathdata.SVGPathData("m503.871094 231.433594-236.800782-226.984375c-6.183593-5.933594-15.957031-5.933594-22.140624 0l-237.035157 227.21875c-5.015625 5.015625-7.894531 11.925781-7.894531 18.988281 0 14.699219 11.96875 26.667969 26.667969 26.667969h37.332031v202.664062c0 17.664063 14.335938 32 32 32h90.667969c8.832031 0 16-7.167969 16-16v-138.664062c0-2.925781 2.386719-5.335938 5.332031-5.335938h96c2.921875 0 5.332031 2.410157 5.332031 5.335938v138.664062c0 8.832031 7.167969 16 16 16h90.667969c17.664062 0 32-14.335937 32-32v-202.664062h37.332031c14.699219 0 26.667969-11.96875 26.667969-26.667969 0-7.0625-2.878906-13.972656-8.128906-19.222656zm0 0").scale(width * 0.12 / 100, height * 0.12 / 100).translate(x - width / 3, y - height / 3).rotate(degrees, x, y).encode();
};

var FlagPath = exports.FlagPath = function FlagPath(x, y, width, height, degrees) {
	return new _svgPathdata.SVGPathData("m378.878906 229.546875-115.5625-86.828125c-.722656-.574219-1.984375-1.875-1.984375-4.050781s1.261719-3.480469 1.707031-3.863281l115.863282-87.039063c6.632812-4.992187 10.429687-12.695313 10.429687-21.121094 0-14.675781-11.964843-26.644531-26.664062-26.644531h-341.335938c-11.796875 0-21.332031 9.558594-21.332031 21.332031v469.335938c0 11.773437 9.535156 21.332031 21.332031 21.332031s21.335938-9.558594 21.335938-21.332031v-213.335938h320c14.699219 0 26.664062-11.964843 26.664062-26.664062 0-8.429688-3.816406-16.109375-10.453125-21.121094zm0 0").scale(width * 0.15 / 100, height * 0.15 / 100).translate(x - width / 3, y - height / 3).rotate(degrees, x, y).encode();
};

var PencilPath = exports.PencilPath = function PencilPath(x, y, width, height, degrees) {
	return new _svgPathdata.SVGPathData("m304.140625 82.472656-270.976563 270.996094c-1.363281 1.367188-2.347656 3.09375-2.816406 4.949219l-30.035156 120.554687c-.898438 3.628906.167969 7.488282 2.816406 10.136719 2.003906 2.003906 4.734375 3.113281 7.527344 3.113281.855469 0 1.730469-.105468 2.582031-.320312l120.554688-30.039063c1.878906-.46875 3.585937-1.449219 4.949219-2.8125l271-270.976562zm0 0\"/><path d=\"m476.875 45.523438-30.164062-30.164063c-20.160157-20.160156-55.296876-20.140625-75.433594 0l-36.949219 36.949219 105.597656 105.597656 36.949219-36.949219c10.070312-10.066406 15.617188-23.464843 15.617188-37.714843s-5.546876-27.648438-15.617188-37.71875zm0 0").scale(width * 0.15 / 100, height * 0.15 / 100).translate(x - width / 3, y - height / 3).rotate(degrees, x, y).encode();
};

var PinPath = exports.PinPath = function PinPath(x, y, width, height, degrees) {
	return new _svgPathdata.SVGPathData("m501.0625 161.921875-150.847656-150.847656c-14.078125-14.101563-38.699219-14.101563-52.800782 0l-20.839843 20.839843c-14.722657 14.742188-19.777344 36.140626-13.207031 55.875 2.730468 8.167969.640624 17.023438-5.460938 23.125l-61.121094 61.160157c-5.054687 5.035156-11.730468 7.808593-18.855468 7.808593h-25.003907c-15.679687 0-30.421875 6.101563-41.472656 17.195313l-10.132813 10.113281c-7.0625 7.0625-10.945312 16.425782-10.945312 26.386719 0 9.964844 3.882812 19.351563 10.945312 26.390625l60.4375 60.4375-155.5 155.308594c-8.339843 8.320312-8.339843 21.824218-.019531 30.164062 4.179688 4.179688 9.640625 6.273438 15.101563 6.273438 5.460937 0 10.902344-2.09375 15.085937-6.230469l155.519531-155.328125 60.242188 60.246094c7.042969 7.058594 16.429688 10.941406 26.390625 10.941406 9.964844 0 19.351563-3.882812 26.390625-10.941406l10.132812-10.132813c11.09375-11.09375 17.195313-25.816406 17.195313-41.472656v-25.003906c0-7.019531 2.859375-13.886719 7.808594-18.859375l61.140625-61.140625c6.078125-6.101563 14.910156-8.214844 23.144531-5.460938 19.734375 6.570313 41.152344 1.492188 55.851563-13.207031l20.84375-20.839844c14.546874-14.550781 14.546874-38.230468-.023438-52.800781zm0 0").scale(width * 0.15 / 100, height * 0.15 / 100).translate(x - width / 3, y - height / 3).rotate(degrees, x, y).encode();
};

var SearchPath = exports.SearchPath = function SearchPath(x, y, width, height, degrees) {
	return new _svgPathdata.SVGPathData("m505.75 475.585938-145.601562-145.597657c28.203124-34.839843 45.183593-79.105469 45.183593-127.320312 0-111.742188-90.921875-202.66406275-202.664062-202.66406275-111.746094 0-202.667969 90.92187475-202.667969 202.66406275 0 111.746093 90.921875 202.667969 202.667969 202.667969 48.210937 0 92.480469-16.980469 127.316406-45.183594l145.601563 145.601562c4.15625 4.15625 9.621093 6.25 15.082031 6.25 5.460937 0 10.921875-2.09375 15.082031-6.25 8.339844-8.34375 8.339844-21.824218 0-30.167968zm0 0").scale(width * 0.15 / 100, height * 0.15 / 100).translate(x - width / 3, y - height / 3).rotate(degrees, x, y).encode();
};

var CommandPath = exports.CommandPath = function CommandPath(x, y, width, height, degrees) {
	return new _svgPathdata.SVGPathData("m416 512c-52.929688 0-96-43.070312-96-96v-53.332031h-128v53.332031c0 52.929688-43.070312 96-96 96s-96-43.070312-96-96 43.070312-96 96-96h53.332031v-128h-53.332031c-52.929688 0-96-43.070312-96-96s43.070312-96 96-96 96 43.070312 96 96v53.332031h128v-53.332031c0-52.929688 43.070312-96 96-96s96 43.070312 96 96-43.070312 96-96 96h-53.332031v128h53.332031c52.929688 0 96 43.070312 96 96s-43.070312 96-96 96zm-53.332031-149.332031v53.332031c0 29.398438 23.914062 53.332031 53.332031 53.332031s53.332031-23.933593 53.332031-53.332031-23.914062-53.332031-53.332031-53.332031zm-266.667969 0c-29.417969 0-53.332031 23.933593-53.332031 53.332031s23.914062 53.332031 53.332031 53.332031 53.332031-23.933593 53.332031-53.332031v-53.332031zm96-42.667969h128v-128h-128zm170.667969-170.667969h53.332031c29.417969 0 53.332031-23.933593 53.332031-53.332031s-23.914062-53.332031-53.332031-53.332031-53.332031 23.933593-53.332031 53.332031zm-266.667969-106.664062c-29.417969 0-53.332031 23.933593-53.332031 53.332031s23.914062 53.332031 53.332031 53.332031h53.332031v-53.332031c0-29.398438-23.914062-53.332031-53.332031-53.332031zm0 0").scale(width * 0.15 / 100, height * 0.15 / 100).translate(x - width / 3, y - height / 3).rotate(degrees, x, y).encode();
};

var FilterPath = exports.FilterPath = function FilterPath(x, y, width, height, degrees) {
	return new _svgPathdata.SVGPathData("m256 0c-42.753906 0-256 3.605469-256 74.667969v70.78125c0 19.050781 8.40625 36.972656 23.039062 49.175781l168.960938 140.714844v155.328125c0 8.085937 4.566406 15.464843 11.796875 19.09375 3.007813 1.492187 6.292969 2.238281 9.535156 2.238281 4.546875 0 9.046875-1.449219 12.800781-4.265625l76.777344-57.578125c10.691406-8.023438 17.089844-20.78125 17.089844-34.15625v-80.660156l168.960938-140.714844c14.632812-12.203125 23.039062-30.125 23.039062-49.175781v-70.78125c0-71.0625-213.246094-74.667969-256-74.667969zm0 42.667969c119.230469 0 190.976562 19.347656 209.984375 32-19.007813 12.648437-90.753906 32-209.984375 32s-190.976562-19.351563-209.984375-32c19.007813-12.652344 90.753906-32 209.984375-32zm0 0").scale(width * 0.2 / 100, height * 0.2 / 100).translate(x - width / 3, y - height / 3).rotate(degrees, x, y).encode();
};

var CursorPath = exports.CursorPath = function CursorPath(x, y, width, height, degrees) {
	return new _svgPathdata.SVGPathData("M473.15,9.402c-9.1-9.123-22.785-11.898-34.72-7.04l-418.4,169.6c-16.385,6.624-24.297,25.277-17.672,41.662\n    c3.717,9.193,11.485,16.143,21.032,18.818l177.28,49.44l49.44,177.28c3.669,13.175,15.307,22.562,28.96,23.36h1.76\n    c13.016-0.026,24.719-7.934,29.6-20l169.76-418.56C484.977,32.072,482.206,18.473,473.15,9.402z M286.43,351.962l-29.12-104.16\n    c-3.007-10.796-11.444-19.233-22.24-22.24l-104.48-29.44l261.92-106.08L286.43,351.962z").scale(width * 0.15 / 100, height * 0.15 / 100).translate(x - width / 3, y - height / 3).rotate(degrees, x, y).encode();
};

var CrescentPath = exports.CrescentPath = function CrescentPath(x, y, width, height, degrees) {
	return new _svgPathdata.SVGPathData("M296.548,0.938c-5.094-1.261-10.419-1.25-15.507,0.032c-17.138,4.318-27.53,21.71-23.213,38.848\n    c4.443,15.614,6.704,31.767,6.72,48c-0.004,16.215-2.25,32.352-6.672,47.952c-26.51,93.517-123.811,147.838-217.328,121.328\n    c-5.088-1.282-10.414-1.293-15.507-0.032c-17.155,4.247-27.62,21.597-23.373,38.752c28.731,103.84,123.139,175.807,230.88,176\n    c106.753-0.674,200.228-71.78,229.37-174.48C498.101,169.823,424.062,37.121,296.548,0.938z M328.548,380.047\n    c-81.625,52.779-190.581,29.395-243.36-52.229h3.36c132.548,0,240-107.452,240-240c0-1.12,0-2.24,0-3.36\n    c20.908,13.519,38.71,31.321,52.229,52.229C433.557,218.312,410.173,327.268,328.548,380.047z").scale(width * 0.15 / 100, height * 0.15 / 100).translate(x - width / 3, y - height / 3).rotate(degrees, x, y).encode();
};

var RightPath = exports.RightPath = function RightPath(x, y, width, height, degrees) {
	return new _svgPathdata.SVGPathData("M437.883,201.174c-0.008-0.008-0.017-0.017-0.025-0.025l-160-160c-12.552-12.441-32.813-12.351-45.254,0.201\n    c-0.983,0.992-1.9,2.047-2.746,3.159c-8.971,13.381-7.013,31.276,4.64,42.4l88.32,88.64c4.695,4.7,10.093,8.641,16,11.68\n    l9.76,5.12h-314.4c-16.099-0.677-30.349,10.332-33.76,26.08c-2.829,17.445,9.019,33.881,26.465,36.71\n    c1.83,0.297,3.682,0.434,5.535,0.41h315.52l-6.88,3.2c-6.713,3.135-12.83,7.412-18.08,12.64l-88.48,88.48\n    c-11.653,11.124-13.611,29.019-4.64,42.4c10.441,14.259,30.464,17.355,44.724,6.914c1.152-0.844,2.247-1.764,3.276-2.754l160-160\n    C450.361,233.939,450.372,213.678,437.883,201.174z").scale(width * 0.15 / 100, height * 0.15 / 100).translate(x - width / 3, y - height / 3).rotate(degrees, x, y).encode();
};

var PolygonPath = exports.PolygonPath = function PolygonPath(x, y, width, height, degrees) {
	return new _svgPathdata.SVGPathData("m496.239 185.411-235.027-170.757c-5.781-4.199-13.605-4.199-19.387 0l-235.026 170.757c-5.78 4.199-8.198 11.643-5.991 18.437l89.772 276.291c2.208 6.794 8.539 11.395 15.684 11.395h290.51c7.145 0 13.476-4.6 15.684-11.395l89.772-276.291c2.207-6.794-.211-14.238-5.991-18.437z").scale(width * 0.15 / 100, height * 0.15 / 100).translate(x - width / 2.7, y - height / 2.7).rotate(degrees, x, y).encode();
};

var TrapezePath = exports.TrapezePath = function TrapezePath(x, y, width, height, degrees) {
	return new _svgPathdata.SVGPathData("m506.983 383.272-151.034-273.433c-2.902-5.255-8.432-8.517-14.435-8.517h-289.966c-8.297 0-15.302 6.164-16.356 14.394l-35.056 273.433c-1.264 9.854 6.424 18.587 16.356 18.587h476.056c12.535 0 20.502-13.482 14.435-24.464z").scale(width * 0.15 / 100, height * 0.15 / 100).translate(x - width / 2.7, y - height / 2.7).rotate(degrees, x, y).encode();
};

var TrianglePath = exports.TrianglePath = function TrianglePath(x, y, width, height, degrees) {
	return new _svgPathdata.SVGPathData("m497.86 375.494-473.118-273.433c-10.967-6.341-24.742 1.583-24.742 14.277v273.434c0 9.107 7.383 16.49 16.491 16.49h473.118c16.813 0 22.807-22.357 8.251-30.768z").scale(width * 0.15 / 100, height * 0.15 / 100).translate(x - width / 2.7, y - height / 2.7).rotate(degrees, x, y).encode();
};

var RectanglePath = exports.RectanglePath = function RectanglePath(x, y, width, height, degrees) {
	return new _svgPathdata.SVGPathData("m489.609 0h-473.118c-9.108 0-16.491 7.383-16.491 16.491v473.118c0 9.107 7.383 16.491 16.491 16.491h473.119c9.107 0 16.49-7.383 16.49-16.491v-473.118c0-9.108-7.383-16.491-16.491-16.491z").scale(width * 0.15 / 100, height * 0.15 / 100).translate(x - width / 2.7, y - height / 2.7).rotate(degrees, x, y).encode();
};

// TEST
var Path = exports.Path = function Path(x, y, width, height, degrees) {
	return new _svgPathdata.SVGPathData("").scale(width * 0.2 / 100, height * 0.2 / 100).translate(x - width / 3, y - height / 3).rotate(degrees, x, y).encode();
};
//# sourceMappingURL=shapes.js.map