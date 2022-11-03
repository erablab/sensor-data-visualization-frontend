import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';
import { useRef, useState, useEffect, useMemo } from "react";
import { Regions } from './Regions';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({
  worldAtlas: { land, interiors },
}) => {
  const [hoverRegion, setHoverRegion] = useState(false);
  return(
  <g className="marks">
    {useMemo(
      () => (
        <>
          <path className="sphere" d={path({ type: 'Sphere' })} />
          <path className="graticules" d={path(graticule())} />
          {land.features.map(feature => (
            <path className="land" d={path(feature)} />
          ))}
          <path className="interiors" d={path(interiors)} />
        </>
      ),
      [path, graticule, land, interiors]
    )}
    {Regions.map(d => {
      const [x, y] = projection([d.longitude,d.latitude]);
      return <circle cx={x} cy={y} r={d.radius} />;
    })}
  </g>);
};

