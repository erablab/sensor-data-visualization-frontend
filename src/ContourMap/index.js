import { useRef, useEffect } from "react";
import { select } from "d3";
import { viz } from "./Marks";

export const ContourMap = ({ data, sensorData, refValue }) => {
  const ref = useRef(null);

  const width = 300;
  const height = 300;

  useEffect(() => {
    while (ref.current.lastChild) {
      ref.current.removeChild(ref.current.lastChild);
    }
    viz(select(ref.current), {
      data,
      xValue: (d) => d.latitude,
      yValue: (d) => d.longitude,
      width,
      height,
      sensorData,
      margin: {
        top: 20,
        right: 20,
        bottom: 40,
        left: 40,
      },
      circleRadius: 40,
    });
  }, [data, sensorData, refValue]);
  return <svg width={width} height={height} ref={ref} />;
};
