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
  group,
  scaleOrdinal,
  sum,
} from "d3";
import { useRef, useState, useEffect, useMemo } from "react";
import { Marks } from "./Marks";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { ColorLegend } from "./ColorLegend";
const margin = { top: 0, right: 30, bottom: 200, left: 200 };
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 30;
const xAxisTickFormat = timeFormat("%b");
const yAxisTickFormat = format("~s");

const xAxisLabel = "Time";
const xV = (d) => d.x;
const yV = (d) => d.y;
const colorValue = (d) => d.i;
const colorLegendLabel = "Bot Index";
const fadeOpacity = 0.2;
const width = 960;
const height = 500;

export const PowerSensorLineChart = ({
  data,
  // width,
  // height,
  xValue,
  yValue,
  yAxisLabel,
}) => {
  const innerHeight = height - margin.top - margin.bottom + 100;
  const innerWidth = width - margin.left - margin.right;
  const [hoveredValue, setHoveredValue] = useState(null);
  const xScale = useMemo(
    () =>
      scaleTime().domain(extent(data, xValue)).range([0, innerWidth]).nice(),
    [data, xValue, innerWidth]
  );

  const categorizedData = group(data, (d) => d.botIndex);

  console.log(hoveredValue);
  function binData(data) {
    const [start, stop] = extent(data, xValue);
    return bin()
      .value(xValue)
      .domain(extent(data, xValue))
      .thresholds(timeMonths(start, stop))(data)
      .map((array) => ({
        y: mean(array, yValue),
        x: array.x0,
        i: data[0].botIndex,
      }));
  }
  const binnedData = binData(data);
  const binnedData0 = binData(categorizedData.get(0));
  const binnedData1 = binData(categorizedData.get(1));
  const binnedData2 = binData(categorizedData.get(2));
  const binnedData3 = binData(categorizedData.get(3));
  const binnedData4 = binData(categorizedData.get(4));
  const binnedData5 = binData(categorizedData.get(5));
  const binnedData6 = binData(categorizedData.get(6));
  const binnedData7 = binData(categorizedData.get(7));
  const binnedData8 = binData(categorizedData.get(8));
  const binnedData9 = binData(categorizedData.get(9));
  const binnedData10 = binData(categorizedData.get(10));
  const binnedData11 = binData(categorizedData.get(11));
  const binnedData12 = binData(categorizedData.get(12));
  const binnedData13 = binData(categorizedData.get(13));
  const binnedData14 = binData(categorizedData.get(14));
  const binnedData15 = binData(categorizedData.get(15));
  const binnedData16 = binData(categorizedData.get(16));
  const binnedData17 = binData(categorizedData.get(17));
  const binnedData18 = binData(categorizedData.get(18));
  const binnedData19 = binData(categorizedData.get(19));

  const allBinneddata = [
    binnedData0,
    binnedData1,
    binnedData2,
    binnedData3,
    binnedData4,
    binnedData5,
    binnedData6,
    binnedData7,
    binnedData8,
    binnedData9,
    binnedData10,
    binnedData11,
    binnedData12,
    binnedData13,
    binnedData14,
    binnedData15,
    binnedData16,
    binnedData17,
    binnedData18,
    binnedData19,
  ];
  const filteredData = hoveredValue
    ? [binData(categorizedData.get(hoveredValue))]
    : allBinneddata;
  console.log(filteredData);
  const colorScale = scaleOrdinal()
    .domain(data.map((d) => d.botIndex))
    .range([
      "#E97777",
      "#9ED5C5",
      "#8D72E1",
      "#8D9EFF",
      "#FF8DC7",
      "#A3C7D6",
      "#FF731D",
      "#FFD384",
      "#00FFD1",
      "#7895B2",
      "#937DC2",
      "#FF9494",
      "#B1B2FF",
      "#8EC3B0",
      "#6B728E",
      "#829460",
      "#A3C7D6",
      "#7D6E83",
      "#D0B8A8",
      "#C98474"
    ]);
  // const binnedData = useMemo(() => {
  //   const [start, stop] = extent(categorizedData.get(3), xValue);
  //   console.log(start);
  //   console.log(stop);
  //   console.log(xValue);
  //   console.log(yValue);
  //   return bin()
  //     .value(xValue)
  //     .domain(extent(categorizedData.get(3), xValue))
  //     .thresholds(timeMonths(start, stop))(categorizedData.get(3))
  //     .map((array) => ({
  //       y: mean(array, yValue),
  //       x: array.x0,
  //     }));
  // }, [xValue, yValue, xScale, categorizedData]);

  const yScale = useMemo(
    () => scaleLinear().domain(extent(data, yValue)).range([innerHeight, 0]),
    [binnedData1, innerHeight]
  );
  // const brushRef = useRef();

  return (
    <>
      {/* <svg width={width} height={height}> */}
      {/* <g ref={brushRef}> */}
      <rect width={width} height={height} fill="#e4ebed" />
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

      <g transform={`translate(${innerWidth + 150}, 40)`}>
        <text x={0} y={-25} className="axis-label" textAnchor="middle">
          {colorLegendLabel}
        </text>
        <ColorLegend
          tickSpacing={22}
          tickSize={10}
          tickTextOffset={12}
          colorScale={colorScale}
          onHover={setHoveredValue}
          hoveredValue={hoveredValue}
          fadeOpacity={fadeOpacity}
        />
      </g>

      <g
        transform={`translate(100,0)`}
        opacity={hoveredValue ? fadeOpacity : 1}
      >
        <Marks
          binnedData={allBinneddata}
          xScale={xScale}
          yScale={yScale}
          xValue={xV}
          yValue={yV}
          colorScale={colorScale}
          colorValue={colorValue}
        />
      </g>

      <g transform={`translate(100,0)`}>
        <Marks
          binnedData={filteredData}
          xScale={xScale}
          yScale={yScale}
          xValue={xV}
          yValue={yV}
          colorScale={colorScale}
          colorValue={colorValue}
        />
      </g>
      {/* </g> */}
      {/* </svg> */}
    </>
  );
};
