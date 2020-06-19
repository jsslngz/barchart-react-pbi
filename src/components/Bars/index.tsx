import React, { useState, useEffect, useRef } from 'react';

import * as d3 from 'd3';

import { getMeasures } from './utils';
import './style.less';

const Bars = ({ dataPoints, width, height }) => {
  const yAxisRef = useRef(null);

  const { margin, innerWidth, innerHeight } = getMeasures(width, height);

  let xScale = d3
    .scaleBand()
    .rangeRound([0, innerWidth])
    .padding(0.1)
    .domain(
      dataPoints.map(function (d) {
        return d.category;
      })
    );

  let yScale = d3
    .scaleLinear()
    .rangeRound([innerHeight, 0])
    .domain([0, d3.max<number>(dataPoints.map(d => d.value))]);

  useEffect(() => {
    d3.select(yAxisRef.current).call(
      d3.axisLeft(yScale).tickFormat(d3.format('.1s'))
    );
  }, [dataPoints, yAxisRef.current]);

  return (
    <g
      className="mainGroup"
      transform={`translate(${margin.left}, ${margin.top})`}
    >
      {dataPoints.map(d => (
        <rect
          className="bar"
          x={xScale(d.category)}
          y={yScale(d.value)}
          width={xScale.bandwidth()}
          height={innerHeight - yScale(d.value)}
          fill={'#5FDAD5'}
        ></rect>
      ))}
      <g>
        {/* <g transform={`translate(0, ${innerHeight})`} ref="xAxis"></g> */}
        <g className="yAxis" ref={yAxisRef}></g>
      </g>
    </g>
  );
};

export default Bars;
