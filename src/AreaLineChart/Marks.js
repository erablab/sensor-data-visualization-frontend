import { line, curveNatural } from "d3";
export const Marks = ({ binnedData, xScale, yScale, xValue, yValue }) => {
console.log(binnedData);
console.log(binnedData["0"].x);
console.log(yScale(7));

  return (
    <g className="line-chart-marks">
      <path
        fill="none"
        stroke="black"
        d={line()
          .x((d) => xScale(xValue(d)))
          .y((d) => yScale(yValue(d)))
          .curve(curveNatural)(binnedData)}
      />
    </g>
  );
};
