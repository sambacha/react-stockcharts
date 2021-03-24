import React, { Component } from "react";
import PropTypes from "prop-types";

import GenericChartComponent from "../GenericChartComponent";
import { getAxisCanvas } from "../GenericComponent";

import StackedBarSeries, {
    drawOnCanvasHelper,
    drawOnCanvas2,
    getBarsSVG2,
    svgHelper,
    identityStack,
} from "./StackedBarSeries";

import { functor, isDefined } from "../utils";

class BarSeries extends Component {
    constructor(props) {
        super(props);
        this.renderSVG = this.renderSVG.bind(this);
        this.drawOnCanvas = this.drawOnCanvas.bind(this);
    }
    drawOnCanvas(ctx, moreProps) {
        if (this.props.swapScales) {
            const { xAccessor } = moreProps;
            drawOnCanvasHelper(
                ctx,
                this.props,
                moreProps,
                xAccessor,
                identityStack
            );
        } else {
            const bars = getBars(this.props, moreProps);
            drawOnCanvas2(this.props, ctx, bars);
        }
    }
    renderSVG(moreProps) {
        const gAttr = {
            className: this.props.className,
        };

        if (this.props.swapScales) {
            const { xAccessor } = moreProps;
            return (
                <g {...gAttr}>
                    {svgHelper(this.props, moreProps, xAccessor, identityStack)}
                </g>
            );
        } else {
            const bars = getBars(this.props, moreProps);
            return <g {...gAttr}>{getBarsSVG2(this.props, bars)}</g>;
        }
    }
    render() {
        const { clip } = this.props;

        return (
            <GenericChartComponent
                clip={clip}
                svgDraw={this.renderSVG}
                canvasToDraw={getAxisCanvas}
                canvasDraw={this.drawOnCanvas}
                drawOn={["pan"]}
            />
        );
    }
}

BarSeries.propTypes = {
    baseAt: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    stroke: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    yAccessor: PropTypes.func.isRequired,
    opacity: PropTypes.number,
    fill: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    clip: PropTypes.bool,
    swapScales: PropTypes.bool,
    minHeight: PropTypes.number,
};

BarSeries.defaultProps = StackedBarSeries.defaultProps;

export default BarSeries;

/*
 Initially, this program was using StackedBarSeries.getBars
 to benefit from code reuse and having a single place that
 contains the logic for drawing all types of bar charts
 simple, grouped, horizontal, but turnes out
 making it highly cuztimizable also made it slow for the
 most simple case, a regular bar chart.
 This function contains just the necessary logic
 to create bars
*/
function getBars(props, moreProps) {
    const { baseAt, fill, stroke, yAccessor, minHeight } = props;
    const {
        xScale,
        xAccessor,
        plotData,
        chartConfig: { yScale },
    } = moreProps;

    const getFill = functor(fill);
    const getBase = functor(baseAt);

    const widthFunctor = functor(props.width);

    const width = widthFunctor(props, {
        xScale,
        xAccessor,
        plotData,
    });
    /*
	const barWidth = Math.round(width);
	const offset = Math.round(barWidth === 1 ? 0 : 0.5 * barWidth);
	*/
    const offset = Math.floor(0.5 * width);

    const bars = plotData
        .filter((d) => isDefined(yAccessor(d)))
        .map((d) => {
            const yValue = yAccessor(d);
            let y = yScale(yValue);

            const x = Math.round(xScale(xAccessor(d))) - offset;
            let h = getBase(xScale, yScale, d) - yScale(yValue);

            if (h < 0) {
                y = y + h;
                h = -h;
            }

            if (minHeight && yValue > 0) {
                const height = Math.round(h);

                if (height < minHeight) {
                    y = getBase(xScale, yScale, d) - minHeight;
                    h = minHeight;
                }
            }

            return {
                // type: "line"
                x,
                y: Math.round(y),
                height: Math.round(h),
                width: offset * 2,
                fill: getFill(d, 0),
                stroke: stroke ? getFill(d, 0) : "none",
            };
        });

    return bars;
}
