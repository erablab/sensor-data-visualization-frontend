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
const margin = { top: 0, right: 30, bottom: 20, left: 45 };
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 30;
const xAxisTickFormat = timeFormat("%m/%d/%Y");

const xAxisLabel = "Time";
let brushWindowBegin = null;
let brushWindowEnd = null;
const xCoord = (d) => d["latitude"];
const yCoord = (d) => d["longitude"];
const xTime = (d) => d["timestamp"];

export const AreaLineChart = ({
  data,
  width,
  height,
  xValue,
  yValue,
  yAxisLabel,
  heatMapAreaExtent,
  heatMapMomentExtent,
}) => {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const [hoverMoment, setHoverMoment] = useState();
  const timeScale = useMemo(
    () => scaleTime().domain(heatMapMomentExtent?heatMapMomentExtent:[0,0]).range([0, innerWidth]).nice(),
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
  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain(
          heatMapAreaExtent
            ? [heatMapAreaExtent[2], heatMapAreaExtent[3]]
            : [0, 0]
        )
        .range([innerHeight, 0]),
    [heatMapAreaExtent, innerHeight]
  );
  const filteredAreaData =
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
    const [start, stop] = extent(filteredAreaData, xValue);
    return bin()
      .value(xValue)
      .domain(extent(filteredAreaData, xValue))
      .thresholds(timeWeeks(start, stop))(filteredAreaData)
      .map((array) => ({
        y: mean(array, yValue),
        x: array.x0,
      }));
  }, [xValue, yValue, xScale, filteredAreaData]);
  const valueScale = useMemo(
    () =>
      scaleLinear()
        .domain(extent(binnedData, d=>d.y))
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
            xScale={timeScale}
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
          <AxisLeft yScale={valueScale} innerWidth={innerWidth} tickOffset={5} />
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
            xScale={timeScale}
            yScale={valueScale}
            xValue={(d) => d.x}
            yValue={(d) => d.y}
          />
        </g>
      </svg>
    </>
  );
};
