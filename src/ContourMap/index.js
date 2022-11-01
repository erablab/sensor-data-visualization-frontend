import { useRef, useEffect, useMemo } from "react";
import { scaleLinear, select, extent, brush } from "d3";
import { Marks } from "./Marks";

const margin = { top: 0, right: 30, bottom: 20, left: 45 };
const xValue = (d) => d["latitude"];
const yValue = (d) => d["longitude"];
const timeValue = (d) => d['timestamp'];
export const ContourMap = ({
  data,
  sensorData,
  setBrushExtent,
  width,
  height,
  heatMapMomentExtent,
}) => {
  // console.log(data);
  // console.log(heatMapMomentExtent);
  const filteredTemperalData = heatMapMomentExtent
  ? data.filter((d) => {
      const date = timeValue(d);
      return date > heatMapMomentExtent[0] && date < heatMapMomentExtent[1];
    })
  : [];
  // console.log(filteredTemperalData);

  const ref = useRef(null);
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = useMemo(
    () =>
      scaleLinear().domain(extent(filteredTemperalData, xValue)).range([0, innerWidth]).nice(),
    [data, xValue, innerWidth]
  );

  const yScale = useMemo(
    () =>
      scaleLinear().domain(extent(filteredTemperalData, yValue)).range([0, innerHeight]).nice(),
    [data, yValue, innerHeight]
  );

  const brushRef = useRef();
  let brushWindowBeginX = null;
  let brushWindowEndX = null;
  let brushWindowBeginY = null;
  let brushWindowEndY = null;
  useEffect(() => {
    const brushBox = brush().extent([
      [0, 0],
      [800, 800],
    ]);
    brushBox(select(brushRef.current));
    brushBox.on("brush end", () => {
      const rectBeginX =
        brushRef["current"].getElementsByClassName("selection")["0"][
          "attributes"
        ]["x"];
      const rectWidth =
        brushRef["current"].getElementsByClassName("selection")["0"][
          "attributes"
        ]["width"];
      const rectBeginY =
        brushRef["current"].getElementsByClassName("selection")["0"][
          "attributes"
        ]["y"];
      const rectHeight =
        brushRef["current"].getElementsByClassName("selection")["0"][
          "attributes"
        ]["height"];
      brushWindowBeginX = rectBeginX ? parseInt(rectBeginX["value"]) : null;
      brushWindowEndX = rectWidth
        ? parseInt(brushWindowBeginX) + parseInt(rectWidth["value"])
        : null;
      brushWindowBeginY = rectBeginY ? parseInt(rectBeginY["value"]) : null;
      brushWindowEndY = rectHeight
        ? parseInt(brushWindowBeginY) + parseInt(rectHeight["value"])
        : null;
      console.log(
        brushWindowBeginX,
        brushWindowBeginY,
        brushWindowEndX,
        brushWindowEndY
      );
      if (
        !brushWindowBeginX &&
        !brushWindowEndX &&
        !brushWindowBeginY &&
        !brushWindowEndX
      ) {
        setBrushExtent(null);
      } else {
        setBrushExtent(
          [brushWindowBeginX, brushWindowEndX]
            .map(xScale.invert)
            .concat([brushWindowBeginY, brushWindowEndY].map(yScale.invert))
        );
      }
    });
    // if (data.length == 0) {
      while (ref.current.lastChild) {
        ref.current.removeChild(ref.current.lastChild);
      }
    // }
    Marks(select(ref.current), {
      data: filteredTemperalData,
      xValue: (d) => d.latitude,
      yValue: (d) => d.longitude,
      width,
      height,
      sensorData,
      margin: {
        top: 20,
        right: 20,
        bottom: 40,
        left: 40,
      },
      circleRadius: 40,
    });
  }, [
    data,
    sensorData,
    brushWindowBeginX,
    brushWindowBeginY,
    brushWindowEndX,
    brushWindowEndY,
  ]);
  return (
    <g>
      <rect width={width} height={height} fill="white" />
      <svg width={width} height={height} ref={ref} />
      <g ref={brushRef} />
      <svg width={width} height={height} id="dataviz_brushing2D"></svg>
    </g>
  );
};
