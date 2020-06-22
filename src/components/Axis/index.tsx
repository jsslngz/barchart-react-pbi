import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

import { getMeasures } from '../utils';

const Axis = ({ dataPoints, width, height, xScale, yScale }) => {
  const { margin, innerWidth, innerHeight } = getMeasures(width, height);
  const xAxisRef = useRef();
  const yAxisRef = useRef();

  useEffect(() => {
    d3.select(yAxisRef.current).call(
      d3.axisLeft(yScale).tickFormat(d3.format('.1s'))
    );
  }, [dataPoints, yAxisRef.current]);

  useEffect(() => {
    d3.select(xAxisRef.current).call(d3.axisBottom(xScale));
  }, [dataPoints, xAxisRef.current]);

  return (
    <g>
      <g
        className="xAxis"
        transform={`translate(0, ${innerHeight})`}
        ref={xAxisRef}
      ></g>
      <g className="yAxis" ref={yAxisRef}></g>
    </g>
  );
};

export default Axis;
