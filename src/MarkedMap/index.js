import React, { useMemo } from 'react';
import { scaleSqrt, max } from 'd3';
import { Marks } from './Marks';

export const MarkedMap = ({ data, worldAtlas }) => {

  return (
    <Marks
      worldAtlas={worldAtlas}
    />
  );
};

