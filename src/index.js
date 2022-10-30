import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useWorldAtlas } from "./useWorldAtlas";
import { useData } from "./useData";
import ReactDropdown from "react-dropdown";
import { BubbleMap } from "./BubbleMap/index.js";
import { DateHistogram } from "./DateHistogram/index.js";
// import { dropdownMenu } from "./DropdownMenu";
import "./styles.css";
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
  select,
  event,
} from "d3";
const width = 960;
const height = 500;
const dateHistogramSize = 0.2;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xValue = (d) => d["Reported Date"];
const initialYAttribute = "Temperature";

const attributes = [
  { value: "t", label: "Air Temperature" },
  { value: "p", label: "Air Pressure" },
  { value: "a", label: "Altitude" },
  { value: "h", label: "Air Humidity" },
  { value: "mSoil", label: "Soil Moisture" },
  { value: "tSoil", label: "Soil Temperature" },
  { value: "lVis", label: "Visible Light" },
  { value: "lIR", label: "Infrared Light" },
  { value: "lLux", label: "Luminous Light" },
  { value: "lFull", label: "Total Light" },
  { value: "tvoc", label: "Total Volatile Organic Compounds" },
  { value: "eco2", label: "CO2" },
];

const getLabel = (value) => {
  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].value === value) {
      return attributes[i].label;
    }
  }
};

const App = () => {
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = (d) => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);
  const worldAtlas = useWorldAtlas();
  const data = useData();
  const [brushExtent, setBrushExtent] = useState();
  console.log(data); /////////
  if (!worldAtlas || !data) {
    return <pre>Loading...</pre>;
  }

  const filteredData = brushExtent
    ? data.filter((d) => {
        const date = xValue(d);
        return date > brushExtent[0] && date < brushExtent[1];
      })
    : data;

  return (
    <>
      <svg width={width} height={height}>
        <BubbleMap
          data={data}
          filteredData={filteredData}
          worldAtlas={worldAtlas}
        />
        {/* <dropdownMenu 
        options={}
        onOptionClicked=
      /> */}
        <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
          <DateHistogram
            data={data}
            width={width}
            height={dateHistogramSize * height}
            setBrushExtent={setBrushExtent}
            xValue={xValue}
          />
        </g>
      </svg>
      <div className="menu-container">
        <span className="dropdown-label">Select Sensor Data</span>
        <ReactDropdown
          options={attributes}
          value={yAttribute}
          onChange={({ value }) => setYAttribute(value)}
        />
      </div>
      <svg width={width} height={height}>
        <BubbleMap
          data={data}
          filteredData={filteredData}
          worldAtlas={worldAtlas}
        />
        {/* <dropdownMenu 
        options={}
        onOptionClicked=
      /> */}
        <div className="menu-container">
          <span className="dropdown-label">Select Sensor Data</span>
          <ReactDropdown
            options={attributes}
            value={yAttribute}
            onChange={({ value }) => setYAttribute(value)}
          />
        </div>
        <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
          <DateHistogram
            data={data}
            width={width}
            height={dateHistogramSize * height}
            setBrushExtent={setBrushExtent}
            xValue={xValue}
          />
        </g>
      </svg>
    </>
  );
};
// const rootElement = document.getElementById('root');
// ReactDOM.render(<App />, rootElement);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />, document.getElementById("root"));

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
