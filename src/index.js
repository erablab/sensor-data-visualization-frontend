import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useWorldAtlas } from "./useWorldAtlas";
import { useData } from "./useData";
import ReactDropdown from "react-dropdown";
import { BubbleMap } from "./BubbleMap/index.js";
import { MarkedMap } from "./MarkedMap/index.js";
import { DateHistogram } from "./DateHistogram/index.js";
import { LineChart } from "./LineChart/index.js";
import Axios from "axios";
import { allData } from "./getAllSensorData";
import { useRef } from "react";
// import { dropdownMenu } from "./DropdownMenu";
import "./styles.css";
import {
  scaleLinear,
  scaleTime,
  max,
  timeParse,
  extent,
  bin,
  timeMonths,
  sum,
  brushX,
  select,
  event,
} from "d3";
const width = 600;
const height = 300;
const dateHistogramSize = 0.2;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xValue = (d) => d["timestamp"];

const initialYAttribute = "temp_hmd_pres_alt_sensor/t";

const attributes = [
  { value: "temp_hmd_pres_alt_sensor/t", label: "Air Temperature" },
  { value: "temp_hmd_pres_alt_sensor/p", label: "Air Pressure" },
  { value: "temp_hmd_pres_alt_sensor/a", label: "Altitude" },
  { value: "temp_hmd_pres_alt_sensor/h", label: "Air Humidity" },
  { value: "soil_sensor/mSoil", label: "Soil Moisture" },
  { value: "soil_sensor/tSoil", label: "Soil Temperature" },
  { value: "light_sensor/lVis", label: "Visible Light" },
  { value: "light_sensor/lIR", label: "Infrared Light" },
  { value: "light_sensor/lLux", label: "Luminous Light" },
  { value: "light_sensor/lFull", label: "Total Light" },
  { value: "air_quality_sensor/tvoc", label: "Total Volatile Organic Compounds" },
  { value: "air_quality_sensor/eco2", label: "CO2" },
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
  const sensorData = yAttribute.split("/")[1];
  console.log(sensorData);
  const [data, setData] = useState(null);
  const yAxisLabel = getLabel(yAttribute);
  const worldAtlas = useWorldAtlas();
  // const data = useData();
  const yValue = (d) => d[sensorData];

  const [brushExtent, setBrushExtent] = useState();
  useEffect(() => {
    const route = "http://localhost:3100/" + yAttribute;
    Axios.get(route, {}).then(
      (response) => {
        setData(response.data.result);
      }
    );
    console.log(route);
  }, [yAttribute]);

  if (!worldAtlas || !data) {
    return <pre>Loading...</pre>;
  }
  console.log(data);

  data.map(d => {
    const parseTime = timeParse("%Y-%m-%dT%H:%M:%S.000Z");
    d.timestamp = parseTime(d.timestamp);
    return d;
  });
  console.log(data);

  const filteredData = brushExtent
    ? data.filter((d) => {
        const date = xValue(d);
        return date > brushExtent[0] && date < brushExtent[1];
      })
    : data;

  return (
    <div>
      <svg width={width} height={height}>
        <MarkedMap worldAtlas={worldAtlas} />
        {/* <dropdownMenu 
        options={}
        onOptionClicked=
      /> */}
        {/* <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
          <DateHistogram
            data={data}
            width={width}
            height={dateHistogramSize * height}
            setBrushExtent={setBrushExtent}
            xValue={xValue}
          />
        </g> */}
      </svg>
      <div className="menu-container">
        <span className="dropdown-label">Select Sensor Data</span>
        <ReactDropdown
          options={attributes}
          value={yAttribute}
          onChange={({ value }) => setYAttribute(value)}
        />
      </div>
      <svg width={width} height={dateHistogramSize * height}>
          <LineChart
            data={data}
            width={width}
            height={dateHistogramSize * height}
            setBrushExtent={setBrushExtent}
            xValue={xValue}
            yValue={yValue}
          />
      </svg>
      {/* <svg width={width} height={height}> */}
        {/* <BubbleMap
          data={data}
          filteredData={filteredData}
          worldAtlas={worldAtlas}
        /> */}
        {/* <dropdownMenu 
        options={}
        onOptionClicked=
      /> */}
      {/* </svg> */}
    </div>
  );
};
// const rootElement = document.getElementById('root');
// ReactDOM.render(<App />, rootElement);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />, document.getElementById("root"));

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
