import React, { useMemo } from "react";
import { Marks } from "./Marks";
import {
  scaleLinear,
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

const maxRadius = 50;
const innerHeight = 400;
const innerWidth = 400;

export const HeatMap = ({ data, filteredData, sensorData }) => {
  console.log(data);
  console.log(filteredData);
  console.log(sensorData);
  const opacityValue = (d) => d[sensorData];
  console.log(opacityValue);
  const opacityScale = useMemo(
    () =>
      scaleLinear()
        .domain([min(data, opacityValue), max(data, opacityValue)])
        .range([0, 1]),
    [data, opacityValue]
  );

  const xScale = useMemo(
    () =>
      scaleLinear()
        .domain([min(data, (d) => d.latitude), max(data, (d) => d.latitude)])
        .range([0, innerWidth]),
    [data, innerWidth]
  );

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([min(data, (d) => d.longitude), max(data, (d) => d.longitude)])
        .range([innerHeight, 0]),
    [data, innerHeight]
  );

  return (
    <>
      <rect width={300} height={300} fill="white" />
      <Marks
        data={filteredData}
        opacityScale={opacityScale}
        opacityValue={opacityValue}
        xScale={xScale}
        yScale={yScale}
      />
    </>
  );
};
