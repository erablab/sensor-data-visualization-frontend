import { line, curveNatural, bin } from 'd3';
export const Marks = ({
  binnedData,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
  circleRadius
}) => (
  <g className="marks">
    <path
      fill="none"
      stroke="black"
      d={line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(curveNatural)(binnedData)}
    />
    {/* {
      data.map(d => (
        <circle cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius}>
          <title>{tooltipFormat(xValue(d))}</title>
        </circle>
      ))
    } */}
  </g>
);