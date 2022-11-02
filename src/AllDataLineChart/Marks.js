import { line, curveNatural } from "d3";
export const Marks = ({ binnedData, xScale, yScale, xValue, yValue }) => {
  console.log(
    <path
      fill="none"
      stroke="black"
      d={line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue(d)))
        .curve(curveNatural)(binnedData)}
    />
  );

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
