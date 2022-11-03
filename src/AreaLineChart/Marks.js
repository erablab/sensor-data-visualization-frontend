import { line, curveBasis, area } from "d3";
export const Marks = ({ binnedData, xScale, yScale, xValue, yValue, sValue }) => {
  console.log(binnedData);
  console.log(binnedData["0"].x);
  console.log(yScale(7));

  return (
    <g className="line-chart-marks">
      <path
        fill="#8BBCCC"
        stroke="none"
        opacity={0.7}
        d={area()
          .x((d) => xScale(xValue(d)))
          .y0((d) => yScale(yValue(d) - sValue(d)))
          .y1((d) => yScale(yValue(d) + sValue(d)))
          .curve(curveBasis)(binnedData)}
      />
      <path
        fill="none"
        stroke="white"
        stroke-width={"5px"}
        d={line()
          .x((d) => xScale(xValue(d)))
          .y((d) => yScale(yValue(d)))
          .curve(curveBasis)(binnedData)}
      />
    </g>
  );
};
