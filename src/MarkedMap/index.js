import { scaleSqrt, max } from "d3";
import { Marks } from "./Marks";
import { useRef, useState, useEffect, useMemo } from "react";

export const MarkedMap = ({ data, worldAtlas }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  useEffect(() => {
    console.log(selectedRegion);
  }, [selectedRegion]);
  return (
    <g>
      <rect
        width={800}
        height={600}
        onMouseMove={(event) =>
          setSelectedRegion([event.screenX, event.screenY])
        }
        fill="#e4ebed"
      ></rect>
      <Marks worldAtlas={worldAtlas} />
    </g>
  );
};
