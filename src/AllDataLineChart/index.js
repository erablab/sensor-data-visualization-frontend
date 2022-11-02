import {
  scaleLinear,
  scaleTime,
  max,
  timeFormat,
  extent,
  bin,
  timeMonths,
  mean,
  brushX,
  brush,
  select,
  event,
  min,
} from "d3";
import { useRef, useState, useEffect, useMemo } from "react";
import { Marks } from "./Marks";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
const margin = { top: 0, right: 30, bottom: 20, left: 45 };
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 30;
const xAxisTickFormat = timeFormat("%m/%d/%Y");

const xAxisLabel = "Time";
let brushWindowBegin = null;
let brushWindowEnd = null;
const xV = (d) => d.x;
const yV = (d) => d.y;

export const AllDataLineChart = ({
  data,
  width,
  height,
  xValue,
  yValue,
  yAxisLabel,
  setHeatMapMomentExtent,
}) => {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const [hoverMoment, setHoverMoment] = useState();
  const xScale = useMemo(
    () =>
      scaleTime().domain(extent(data, xValue)).range([0, innerWidth]).nice(),
    [data, xValue, innerWidth]
  );

  const binnedData = useMemo(() => {
    const [start, stop] = extent(data, xValue);

    return bin()
      .value(xValue)
      .domain(extent(data, xValue))
      .thresholds(timeMonths(start, stop))(data)
      .map((array) => ({
        y: mean(array, yValue),
        x: array.x0,
      }));
  }, [xValue, yValue, xScale, data]);
  console.log(binnedData);
  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([min(binnedData, (d) => d.y), max(binnedData, (d) => d.y)])
        .range([innerHeight, 0]),
    [binnedData, innerHeight]
  );
  const brushRef = useRef();

  useEffect(() => {
    // const brush = brushX().extent([
    //   [0, 0],
    //   [innerWidth, innerHeight],
    // ]);
    // brush(select(brushRef.current));
    // brush.on("brush end", () => {
    //   const rectBeginX =
    //     brushRef["current"].getElementsByClassName("handle--w")["0"][
    //       "attributes"
    //     ]["x"];
    //   const rectEndX =
    //     brushRef["current"].getElementsByClassName("handle--e")["0"][
    //       "attributes"
    //     ]["x"];
    //   brushWindowBegin = rectBeginX ? rectBeginX["value"] : null;
    //   brushWindowEnd = rectEndX ? rectEndX["value"] : null;
    //   if (!brushWindowBegin && !brushWindowEnd) {
    //     setBrushExtent(null);
    //   } else {
    //     setBrushExtent([brushWindowBegin, brushWindowEnd].map(xScale.invert));
    //   }
    // });
    setHeatMapMomentExtent(
      [hoverMoment - 20, hoverMoment + 20].map(xScale.invert)
    );
  }, [innerWidth, innerHeight, hoverMoment]);

  return (
    <>
      <svg width={width} height={height} id="dataviz_brushing1D">
        <g ref={brushRef}>
          <rect
            width={width}
            height={height}
            fill="white"
            onMouseMove={(event) => setHoverMoment(event.screenX)}
          />
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
            xValue={xV}
            yValue={yV}
          />
        </g>
      </svg>
    </>
  );
};
