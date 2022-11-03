import { line, curveBasis } from "d3";
export const Marks = ({ binnedData, xScale, yScale, xValue, yValue, colorScale, colorValue }) => {
  return binnedData.map((p) => (
    <g className="line-chart-marks">
      <path
        fill="none"
        stroke={colorScale(colorValue(p[0]))}
        stroke-width="1.8px"
        d={line()
          .x((d) => xScale(xValue(d)))
          .y((d) => yScale(yValue(d)))
          .curve(curveBasis)(p)}
      />
    </g>
  ));
};
