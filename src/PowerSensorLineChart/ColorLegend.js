export const ColorLegend = ({
  colorScale,
  tickSpacing = 20,
  tickSize = 10,
  tickTextOffset = 20,
  onHover,
  hoveredValue,
  fadeOpacity,
}) => {
  const domainValues = colorScale
    .domain()
    .sort(function(a, b){return a - b});

  return domainValues.map((domainValue, i) => (
    <g
      className="tick"
      transform={`translate(0,${i * tickSpacing})`}
      onMouseEnter={() => {
        onHover(domainValue);
      }}
      onMouseOut={() => {
        onHover(null);
      }}
      opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1}
    >
      <circle fill={colorScale(domainValue)} r={tickSize} />
      <text x={tickTextOffset} dy=".32em">
        {domainValue}
      </text>
    </g>
  ));
};
