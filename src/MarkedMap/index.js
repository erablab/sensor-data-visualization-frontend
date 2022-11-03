import { scaleSqrt, max } from "d3";
import { Marks } from "./Marks";
import { useRef, useState, useEffect, useMemo } from "react";

export const MarkedMap = ({ data, worldAtlas, setSelectedRegion }) => {
  // useEffect(() => {
  //   console.log(selectedRegion);
  // }, [selectedRegion]);
  return (
    <g>
      <Marks worldAtlas={worldAtlas} setSelectedRegion={setSelectedRegion} />
    </g>
  );
};
