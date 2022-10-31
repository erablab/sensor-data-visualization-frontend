import { line, curveNatural } from "d3";
export const Marks = ({
  binnedData,
  xScale,
  yScale,
  xValue,
  yValue,
}) => {
  console.log(binnedData);
  console.log(xScale);
  console.log(yScale);
  console.log(xValue);
  console.log(yValue);
  return (<g className="line-chart-marks">
    <path
      fill="none"
      stroke="black"
      d={line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue(d)))
        .curve(curveNatural)(binnedData)}
    />
  </g>)
};
