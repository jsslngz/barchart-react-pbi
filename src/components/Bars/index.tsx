import React from 'react';

import { getMeasures } from '../utils';
import './style.less';

const Bars = ({ dataPoints, width, height, xScale, yScale, barColor }) => {
  const { margin, innerWidth, innerHeight } = getMeasures(width, height);

  return (
    <g className="rects">
      {dataPoints.map(d => (
        <rect
          className="bar"
          x={xScale(d.category)}
          y={yScale(d.value)}
          width={xScale.bandwidth()}
          height={innerHeight - yScale(d.value)}
          fill={barColor}
        ></rect>
      ))}
    </g>
  );
};

export default Bars;
