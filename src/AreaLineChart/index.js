import {
  scaleLinear,
  scaleTime,
  max,
  timeFormat,
  extent,
  bin,
  mean,
  select,
  event,
  min,
  timeDays,
  timeWeeks,
} from "d3";
import { useRef, useState, useEffect, useMemo } from "react";
import { Marks } from "./Marks";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
const margin = { top: 20, right: 30, bottom: 200, left: 200 };
const xAxisLabelOffset = 0;
const yAxisLabelOffset = 0;
const xAxisTickFormat = timeFormat("%m/%d");
const xAxisLabel = "Time";
const xCoord = (d) => d["latitude"];
const yCoord = (d) => d["longitude"];
const xTime = (d) => d["timestamp"];
const width = 960;
const height = 500;

export const AreaLineChart = ({
  data,
  // width,
  // height,
  xValue,
  yValue,
  yAxisLabel,
  heatMapAreaExtent,
  heatMapMomentExtent,
}) => {
  const innerHeight = height - margin.top - margin.bottom +100;
  const innerWidth = width - margin.left - margin.right;
  const timeScale = useMemo(
    () =>
      scaleTime()
        .domain(heatMapMomentExtent ? heatMapMomentExtent : [0, 0])
        .range([0, innerWidth])
        .nice(),
    [heatMapMomentExtent, innerWidth]
  );
  const xScale = useMemo(
    () =>
      scaleLinear()
        .domain(
          heatMapAreaExtent
            ? [heatMapAreaExtent[0], heatMapAreaExtent[1]]
            : [0, 0]
        )
        .range([0, innerWidth])
        .nice(),
    [heatMapAreaExtent, innerWidth]
  );

  const filteredData =
    heatMapAreaExtent && heatMapMomentExtent
      ? data.filter((d) => {
          const time = xTime(d);
          const x = xCoord(d);
          const y = yCoord(d);
          return (
            x > heatMapAreaExtent[0] &&
            x < heatMapAreaExtent[1] &&
            y > heatMapAreaExtent[2] &&
            y < heatMapAreaExtent[3] &&
            time > heatMapMomentExtent[0] &&
            time < heatMapMomentExtent[1]
          );
        })
      : [];
  const binnedData = useMemo(() => {
    const [start, stop] = extent(filteredData, xValue);
    return bin()
      .value(xValue)
      .domain(extent(filteredData, xValue))
      .thresholds(timeWeeks(start, stop))(filteredData)
      .map((array) => ({
        y: mean(array, yValue),
        x: array.x0,
      }));
  }, [xValue, yValue, xScale, filteredData]);

  const valueScale = useMemo(
    () =>
      scaleLinear()
        .domain(extent(binnedData, (d) => d.y))
        .range([innerHeight, 0]),
    [binnedData, innerHeight]
  );

  return (
    <>
      <svg width={width} height={height} id="dataviz_brushing1D">
        <g>
          <rect width={width} height={height} fill="#e4ebed" />
          <AxisBottom
            xScale={timeScale}
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
          <AxisLeft yScale={valueScale} innerWidth={innerWidth} tickOffset={5} />
          {/* <text className="axis-label" x={300} y={220} textAnchor="middle">
            {xAxisLabel}
          </text> */}
          <text
            className="axis-label"
            x={400}
            y={450}
            textAnchor="middle"
          >
            {xAxisLabel}
          </text>
          <g transform={`translate(100,0)`}>
            <Marks
              binnedData={binnedData}
              xScale={timeScale}
              yScale={valueScale}
              xValue={(d) => d.x}
              yValue={(d) => d.y}
            />
          </g>
        </g>
      </svg>
    </>
  );
};
