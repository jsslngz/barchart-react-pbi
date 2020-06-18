import React, { useState } from 'react';
import * as d3 from 'd3';

const Bars = ({ dataPoints, width, height }) => {
  // const [dataset, setDataset] = useState(dataPoints);
  const margin = { top: 10, right: 10, bottom: 10, left: 10 };
  let innerHeight = height - margin.top - margin.bottom;
  let innerWidth = width - margin.left - margin.right;

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

  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
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
    </g>
  );
};

export default Bars;
