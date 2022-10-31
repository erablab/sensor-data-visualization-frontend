import { useMemo } from "react";

export const Marks = ({ data, opacityScale, opacityValue, xScale, yScale }) => (
  <g className="heat-map-marks">
    {data.map((d) => {
      const x = xScale(d.latitude);
      const y = yScale(d.longitude);

      return (
        <svg height="300" width="300">
          <defs>
            <filter id="f1" x="0" y="0">
              <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
            </filter>
          </defs>
          <circle
            cx={x}
            cy={y}
            r={80}
            fillOpacity={opacityScale(opacityValue(d))}
            filter="url(#f1)"
          />
        </svg>
      );
    })}
  </g>
);
