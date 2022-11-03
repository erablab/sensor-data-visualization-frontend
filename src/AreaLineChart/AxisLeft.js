// import { useRef, useEffect } from 'react';
// import { select, axisLeft } from 'd3';

// export const AxisLeft = ({ yScale, innerWidth }) => {
//   const ref = useRef();
//   useEffect(() => {
//     const yAxisG = select(ref.current);
//     const yAxis = axisLeft(yScale)
//       .tickSize(-innerWidth)
//       .tickPadding(18);
//     yAxisG.call(yAxis);
//   }, []);
//   return <g ref={ref} />;
// };

export const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) => 
  yScale.ticks().map((tickValue) => (
    <g className="tick" transform={`translate(100,${yScale(tickValue)})`}>
      <line x2={innerWidth} />
      <text
        key={tickValue}
        style={{ textAnchor: "end" }}
        x={-20}
        dy="1em"
      >
        {tickValue}
      </text>
    </g>
  ));