import {
  scaleLinear,
  scaleTime,
  max,
  timeFormat,
  extent,
  bin,
  timeMonths,
  mean,
  sum,
  brushX,
  brush,
  select,
  event,
} from "d3";
import { useRef, useEffect, useMemo } from "react";
import { Marks } from "./Marks";

const margin = { top: 0, right: 30, bottom: 20, left: 45 };
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 30;
const xAxisTickFormat = timeFormat("%m/%d/%Y");

const xAxisLabel = "Time";
let brushWindowBegin = null;
let brushWindowEnd = null;
const yValue = (d) => d["Total Dead and Missing"];
const xV = (d) => d.x;
const yV = (d) => d.y;
const yAxisLabel = "Total Dead and Missing";

export const LineChart = ({
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
        x: array.x0,
      }));
  }, [xValue, yValue, xScale, data]);
  console.log(binnedData);
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
        <Marks
          binnedData={binnedData}
          xScale={xScale}
          yScale={yScale}
          xValue={xV}
          yValue={yV}
        />
        <g ref={brushRef} />
        <svg width={width} height={height} id="dataviz_brushing1D"></svg>
    </>
  );
};
