import { scaleLinear, extent, densityData, geoPath, contourDensity, min, max, useMemo } from "d3";

export const Marks = (
  selection,
  { data, xValue, yValue, width, height, margin, sensorData }
) => {
  const { top, right, bottom, left } = margin;

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([left, width - right]);

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([height - bottom, top]);

  const opacityValue = (d) => d[sensorData];

  const opacityScale = 
      scaleLinear()
        .domain([min(data, opacityValue), max(data, opacityValue)])
        .range([0, 1]);

  const densityData = contourDensity()
    .x(function (d) {
      return xScale(d.latitude);
    })
    .y(function (d) {
      return yScale(d.longitude);
    })
    .weight(function (d) {
      return opacityScale(opacityValue(d));
    })
    .bandwidth(10)(data);

  var colorArray = [
    "#2d69f8",
    "#4499f7",
    "#4499f7",
    "#5bc9f6",
    "#72faf5",
    "#73f792",
    "#f6fa3b",
    "#f09a2e",
    "#eb3b22",
  ];
  var step = scaleLinear()
    .domain([1, 15]) //8 steps of color
    .range([1, 15]); // range of frequency values

  var color = scaleLinear()
    .domain([
      -1,
      step(2),
      step(3),
      step(4),
      step(5),
      step(6),
      step(7),
      step(8),
      step(9),
      step(10),
      step(11),
      step(12),
      step(13),
      step(14),
      1,
    ])
    .range(colorArray);
  selection
    .append("g")
    .selectAll("path")
    .data(densityData)
    .join("path")
    .attr("fill", (d, i) => color(i))
    .attr("d", geoPath());
};
