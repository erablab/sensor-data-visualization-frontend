import {
  scaleLinear,
  scaleTime,
  max,
  timeFormat,
  extent,
  bin,
  timeMonths,
  sum,
  brushX,
  brush,
  select,
  event,
} from "d3";
import { useRef, useEffect, useMemo } from "react";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

const margin = { top: 0, right: 30, bottom: 20, left: 45 };
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 30;
const xAxisTickFormat = timeFormat("%m/%d/%Y");

const xAxisLabel = "Time";
let brushWindowBegin = null;
let brushWindowEnd = null;
const yValue = (d) => d["Total Dead and Missing"];
const yAxisLabel = "Total Dead and Missing";

export const DateHistogram = ({
  data,
  width,
  height,
  setBrushExtent,
  xValue,
}) => {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = useMemo(
    () =>
      scaleTime().domain(extent(data, xValue)).range([0, innerWidth]).nice(),
    [data, xValue, innerWidth]
  );
  const binnedData = useMemo(() => {
    const [start, stop] = xScale.domain();
    return bin()
      .value(xValue)
      .domain(xScale.domain())
      .thresholds(timeMonths(start, stop))(data)
      .map((array) => ({
        y: sum(array, yValue),
        x0: array.x0,
        x1: array.x1,
      }));
  }, [xValue, yValue, xScale, data]);

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, max(binnedData, (d) => d.y)])
        .range([innerHeight, 0]),
    [binnedData, innerHeight]
  );

  const brushRef = useRef();

  useEffect(() => {
    const brush = brushX().extent([
      [0, 0],
      [innerWidth, innerHeight],
    ]);
    brush(select(brushRef.current));
    brush.on("brush end", () => {
      const rectBeginX =
        brushRef["current"].getElementsByClassName("handle--w")["0"][
          "attributes"
        ]["x"];
      const rectEndX =
        brushRef["current"].getElementsByClassName("handle--e")["0"][
          "attributes"
        ]["x"];
      brushWindowBegin = rectBeginX ? rectBeginX["value"] : null;
      brushWindowEnd = rectEndX ? rectEndX["value"] : null;
      if (!brushWindowBegin && !brushWindowEnd) {
        setBrushExtent(null);
      } else {
        setBrushExtent([brushWindowBegin, brushWindowEnd].map(xScale.invert));
      }
    });
  }, [innerWidth, innerHeight, brushWindowBegin, brushWindowEnd]);

  return (
    <>
      <rect width={width} height={height} fill="white" />
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={5}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <Marks
          binnedData={binnedData}
          xScale={xScale}
          yScale={yScale}
          tooltipFormat={(d) => d}
          circleRadius={2}
          innerHeight={innerHeight}
        />
        <g ref={brushRef} />
        <svg width={width} height={height} id="dataviz_brushing1D"></svg>
      </g>
    </>
  );
};
