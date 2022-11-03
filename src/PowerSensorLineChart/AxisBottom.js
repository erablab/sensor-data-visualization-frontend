export const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 30 }) =>
  xScale.ticks().map(tickValue => (
    <g
      className="tick"
      key={tickValue}
      transform={`translate(${xScale(tickValue)+100},0)`}
    >
      <line y2={innerHeight} />
      <text style={{ textAnchor: 'middle' }} dy=".71em" y={innerHeight + tickOffset}>
        {tickFormat(tickValue)}
      </text>
    </g>
  ));

