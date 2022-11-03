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
  format,
  deviation,
} from "d3";
import { useRef, useState, useEffect, useMemo } from "react";
import { Marks } from "./Marks";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
const margin = { top: 0, right: 30, bottom: 200, left: 200 };
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 30;
const xAxisTickFormat = timeFormat("%b");
const yAxisTickFormat = format("~s");

const xAxisLabel = "Time";
const xV = (d) => d.x;
const yV = (d) => d.y;
const sV = (d) => d.s;
const width = 960;
const height = 500;

export const AllDataLineChart = ({
  data,
  // width,
  // height,
  xValue,
  yValue,
  yAxisLabel,
  setHeatMapMomentExtent,
}) => {
  const innerHeight = height - margin.top - margin.bottom + 100;
  const innerWidth = width - margin.left - margin.right;
  const xScale = useMemo(() => {
    return scaleTime()
      .domain(extent(data, xValue))
      .range([0, innerWidth])
      .nice();
  }, [data, xValue, innerWidth]);
  const binnedData = useMemo(() => {
    const [start, stop] = extent(data, xValue);

    return bin()
      .value(xValue)
      .domain(extent(data, xValue))
      .thresholds(timeMonths(start, stop))(data)
      .map((array) => ({
        y: mean(array, yValue),
        x: array.x0,
        s: deviation(array, yValue),
      }));
  }, [xValue, yValue, xScale, data]);

  const yScale = useMemo(() => {

    return scaleLinear()
      .domain([
        min(binnedData, (d) => d.y) - max(binnedData, (d) => d.s),
        max(binnedData, (d) => d.y) + max(binnedData, (d) => d.s),
      ])
      .range([innerHeight, 0]);
  }, [binnedData, innerHeight]);

  return (
    <>
      {/* <svg width={width} height={height}> */}
      {/* <g ref={brushRef}> */}
      <rect
        width={width}
        height={height}
        fill="#e4ebed"
        onMouseMove={(event) =>
          setHeatMapMomentExtent(
            [event.screenX - 220, event.screenX - 180].map(xScale.invert)
          )
        }
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
        transform={`translate(40,${innerHeight / 2}) rotate(-90)`}
      >
        {yAxisLabel}
      </text>
      <AxisLeft
        yScale={yScale}
        innerWidth={innerWidth}
        tickFormat={yAxisTickFormat}
        tickOffset={5}
      />
      {/* <text className="axis-label" x={300} y={220} textAnchor="middle">
            {xAxisLabel}
          </text> */}
      <text
        className="axis-label"
        x={450}
        y={innerHeight + xAxisLabelOffset}
        textAnchor="middle"
      >
        {xAxisLabel}
      </text>
      <g transform={`translate(100,0)`}>
        <Marks
          binnedData={binnedData}
          xScale={xScale}
          yScale={yScale}
          xValue={xV}
          yValue={yV}
          sValue={sV}
        />
      </g>
      {/* </g> */}
      {/* </svg> */}
    </>
  );
};
