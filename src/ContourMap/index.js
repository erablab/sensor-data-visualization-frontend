import { useRef, useState, useEffect, useMemo } from "react";
import { scaleLinear, select, extent, brush } from "d3";
import { Marks } from "./Marks";

const margin = { top: 0, right: 30, bottom: 20, left: 45 };
const xValue = (d) => d["latitude"];
const yValue = (d) => d["longitude"];
const timeValue = (d) => d["timestamp"];
export const ContourMap = ({
  data,
  sensorData,
  setBrushExtent,
  width,
  height,
  heatMapMomentExtent,
}) => {
  const filteredTemperalData = heatMapMomentExtent
    ? data.filter((d) => {
        const date = timeValue(d);
        return date > heatMapMomentExtent[0] && date < heatMapMomentExtent[1];
      })
    : [];

  const ref = useRef(null);
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = useMemo(
    () =>
      scaleLinear()
        .domain(extent(filteredTemperalData, xValue))
        .range([0, innerWidth])
        .nice(),
    [data, xValue, innerWidth]
  );

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain(extent(filteredTemperalData, yValue))
        .range([0, innerHeight])
        .nice(),
    [data, yValue, innerHeight]
  );

  const brushRef = useRef();
  let brushWindowBeginX = null;
  let brushWindowEndX = null;
  let brushWindowBeginY = null;
  let brushWindowEndY = null;







////Grid Map Converter
  
function zeros(dimensions) {
  var array = [];

  for (var i = 0; i < dimensions[0]; ++i) {
    array.push(dimensions.length === 1 ? 0 : zeros(dimensions.slice(1)));
  }

  return array;
}

function softmax(arr) {
  return arr.map(function (value, index) {
    return (
      Math.exp(value) /
      arr
        .map(function (y /*value*/) {
          return Math.exp(y);
        })
        .reduce(function (a, b) {
          return a + b;
        })
    );
  });
}

function distanceCalc(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
const rowNumber = 100;
const columeNumber = 100;
const xGridScale = useMemo(
  () =>
    scaleLinear()
      .domain([0, rowNumber - 1])
      .range(extent(filteredTemperalData, xValue))
      .nice(),
  [extent(filteredTemperalData, xValue)]
);

const yGridScale = useMemo(
  () =>
    scaleLinear()
      .domain([0, columeNumber - 1])
      .range(extent(filteredTemperalData, yValue))
      .nice(),
  [extent(filteredTemperalData, yValue)]
);

const threshold = 2;
let grids = zeros([rowNumber, columeNumber]);
const filteredData = [];
grids.map(function (row, i) {
  return row.map(function (cell, j) {
    let distance_value_pairs = [];
    let inverse_distances = [];
    let percentages = [];
    filteredTemperalData.map((d) => {
      const x_pos = xGridScale(i);
      const y_pos = yGridScale(j);
      const collection_latitude = d.latitude;
      const collection_longitude = d.longitude;
      let distance = distanceCalc(
        x_pos,
        y_pos,
        collection_latitude,
        collection_longitude
      );
      if (distance < threshold) {
        distance_value_pairs.push([d[sensorData], distance]);
      }
      inverse_distances = distance_value_pairs.map(function (v) {
        return [v[0], 1 / v[1]];
      });
      percentages = softmax(
        inverse_distances.map(function (v) {
          return v[1];
        })
      );
      return d;
    });
    inverse_distances.map(function (d, k) {
      grids[i][j] += percentages[k] * d[0];
    });
    const jsonString =
      '{"latitude": ' +
      String(xGridScale.invert(i)) +
      ',"longitude":' +
      String(yGridScale.invert(j)) +
      ', "' +
      String(sensorData)+ '" : ' +
      grids[i][j] +
      "}";
    if (xGridScale.invert(i) && yGridScale.invert(j) && grids[i][j]) {
      filteredData.push(JSON.parse(jsonString));
    }
    //   console.log(i);
    //   console.log(xScale.invert(i));
    //   console.log(j);
    //   console.log(yScale.invert(j));
    //   console.log(jsonString);
    //   console.log(test);
    return cell;
  });
});








  useEffect(() => {
    const brushBox = brush().extent([
      [0, 0],
      [400, 400],
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
    while (ref.current.lastChild) {
      ref.current.removeChild(ref.current.lastChild);
    }
    Marks(select(ref.current), {
      data: filteredData,
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
      {/* {filteredTemperalData.length != 0 &&(<GridMapConverter
        filteredTemperalData={filteredTemperalData}
        sensorData={sensorData}
        xRange={extent(filteredTemperalData, xValue)}
        yRange={extent(filteredTemperalData, yValue)}
        // setFilteredData={setFilteredData}
      ></GridMapConverter>)} */}

      <rect width={width} height={height} fill="#e4ebed" />
      <svg width={width} height={height} ref={ref} />
      <g ref={brushRef} />
      <svg width={width} height={height} id="dataviz_brushing2D"></svg>
    </g>
  );
};
