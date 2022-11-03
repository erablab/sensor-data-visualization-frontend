import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useWorldAtlas } from "./useWorldAtlas";
import { useData } from "./useData";
import ReactDropdown from "react-dropdown";
import { Dropdown } from "./Dropdown";

import { BubbleMap } from "./BubbleMap/index.js";
import { MarkedMap } from "./MarkedMap/index.js";
import { DateHistogram } from "./DateHistogram/index.js";
import { AllDataLineChart } from "./AllDataLineChart/index.js";
import { AreaLineChart } from "./AreaLineChart/index.js";
import Axios from "axios";
import { allData } from "./getAllSensorData";
import { useRef } from "react";
import { HeatMap } from "./HeatMap/index.js";
import { ContourMap } from "./ContourMap/index";
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
const width = 800;
const height = 600;
const dateHistogramSize = 0.4;
const heatMapSize = 0.5;
const margin = { top: 20, right: 30, bottom: 0, left: 90 };
const xValue = (d) => d["timestamp"];
const xCoord = (d) => d["latitude"];
const yCoord = (d) => d["longitude"];
const xTestValue = (d) => d["Reported Date"];

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
  {
    value: "air_quality_sensor/tvoc",
    label: "Total Volatile Organic Compounds",
  },
  { value: "power_sensor/eco2", label: "CO2" },
  { value: "power_sensor/pb", label: "Power from the Battery" },
  { value: "power_sensor/vb", label: "Voltage of the Battery" },
  { value: "power_sensor/ib", label: "Current from the Battery" },
  { value: "power_sensor/pc", label: "Power from the Circuit" },
  { value: "power_sensor/vc", label: "Voltage of the Circuit" },
  { value: "power_sensor/ic", label: "Current from the Circuit" },
];

const getLabel = (value) => {
  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].value === value) {
      return attributes[i].label;
    }
  }
};

const App = () => {
  const [yAttribute, setYAttribute] = useState();
  const sensorData = yAttribute ? yAttribute.split("/")[1] : null;
  const [data, setData] = useState();
  const yAxisLabel = getLabel(yAttribute);
  const worldAtlas = useWorldAtlas();
  const testData = useData();
  const yValue = (d) => d[sensorData];
  const [testBrushExtent, setTestBrushExtent] = useState();
  const [brushExtent, setBrushExtent] = useState();
  const [heatMapMomentExtent, setHeatMapMomentExtent] = useState();
  const [heatMapAreaExtent, setHeatMapAreaExtent] = useState();
  const [selectedRegion, setSelectedRegion] = useState([null]);

  useEffect(() => {
    if (yAttribute) {
      console.log(yAttribute);
      const route = "http://localhost:3100/" + yAttribute;
      Axios.get(route, {}).then((response) => {
        console.log(response);
        console.log(response.data.result);
        setData(response.data.result);
      });
    }
  }, [yAttribute, heatMapMomentExtent, heatMapAreaExtent, sensorData]);

  console.log(heatMapAreaExtent);

  if (data) {
    data.map((d) => {
      const parseTime = timeParse("%Y-%m-%dT%H:%M:%S.000Z");
      d.timestamp = parseTime(d.timestamp);
      return d;
    });
  }

  if (!worldAtlas) {
    return <pre>Loading...</pre>;
  }

  const filteredTestData = testBrushExtent
    ? testData.filter((d) => {
        const date = xTestValue(d);
        return date > testBrushExtent[0] && date < testBrushExtent[1];
      })
    : testData;

  const filteredTemperalData = heatMapMomentExtent
    ? data.filter((d) => {
        const date = xValue(d);
        return date > heatMapMomentExtent[0] && date < heatMapMomentExtent[1];
      })
    : data;

  return (
    <div>
      <div className="label">
        <label>Choose an Area to Get Started </label>
      </div>
      <div className="section">
        <svg width={width} height={height}>
          <MarkedMap
            worldAtlas={worldAtlas}
            setSelectedRegion={setSelectedRegion}
          />
          {/* <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
          <DateHistogram
            data={testData}
            width={width}
            height={dateHistogramSize * height}
            setBrushExtent={setTestBrushExtent}
            xValue={xTestValue}
          />
        </g> */}
        </svg>
      </div>

      {selectedRegion[0] != null && (
        <g>
          <div className="section label">
            <label for="sensor-type-select">Select Sensor Data: </label>
            <Dropdown
              options={attributes}
              id="sensor-type-select"
              selectedValue={yAttribute}
              onSelectedValueChange={setYAttribute}
            />
          </div>
          {/* <ContourMap data={data}/> */}
          {/* <svg width={width} height={height}>
        <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <rect width={width} height={height} fill="black" onMouseMove={event => console.log(event.screenX)}/>
        </g>
      </svg> */}

          {data && (
            <g>
              <svg width={960} height={500}>
                <AllDataLineChart
                  data={data}
                  width={width}
                  height={dateHistogramSize * height}
                  xValue={xValue}
                  yValue={yValue}
                  yAxisLabel={yAxisLabel}
                  setHeatMapMomentExtent={setHeatMapMomentExtent}
                />
              </svg>
              {heatMapMomentExtent && (
                <g>
                  <div className="section">
                    <svg width={400} height={400} className="ContourMap">
                      <ContourMap
                        data={data}
                        sensorData={sensorData}
                        setBrushExtent={setHeatMapAreaExtent}
                        width={400}
                        height={400}
                        heatMapMomentExtent={heatMapMomentExtent}
                      />
                    </svg>
                  </div>
                  {heatMapAreaExtent && (
                    <div>
                      <svg width={960} height={500}>
                        <AreaLineChart
                          data={data}
                          width={width}
                          height={dateHistogramSize * height}
                          xValue={xValue}
                          yValue={yValue}
                          yAxisLabel={yAxisLabel}
                          heatMapMomentExtent={heatMapMomentExtent}
                          heatMapAreaExtent={heatMapAreaExtent}
                        />
                      </svg>
                    </div>
                  )}
                </g>
              )}
            </g>
          )}

          {/* <svg width={width} height={height}>
        <HeatMap
          data={data}
          filteredData={filteredTemperalData}
          sensorData={sensorData}
        />
      </svg> */}
          {/* <svg width={width} height={height}>
        <BubbleMap
          data={testData}
          filteredData={filteredTestData}
          worldAtlas={worldAtlas}
        />
      </svg> */}
        </g>
      )}
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
