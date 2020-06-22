import * as React from 'react';
import * as d3 from 'd3';

import ViewModel from './visual';
import Bars from './components/Bars';
import Axis from './components/Axis';
import { DataPoint } from './visual';

import { getMeasures } from './components/utils';

export interface State {
  width: number;
  height: number;
  viewModel: ViewModel;
  barColor: string;
}

export const initialState: State = {
  width: 200,
  height: 200,
  viewModel: {
    dataPoints: [{ category: '', value: 0 }],
  },
  barColor: '#fff',
};

export class BarChart extends React.Component<{}, State> {
  private static updateCallback: (data: object) => void = null;

  static update(newState: State) {
    if (typeof BarChart.updateCallback === 'function') {
      BarChart.updateCallback(newState);
    }
  }

  state: State = initialState;

  constructor(props: any) {
    super(props);
    this.state = initialState;
  }

  componentWillMount() {
    BarChart.updateCallback = (newState: State): void => {
      this.setState(newState);
    };
  }

  componentWillUnmount() {
    BarChart.updateCallback = null;
  }

  render() {
    const { width, height, viewModel, barColor } = this.state;
    const dataPoints: DataPoint[] = viewModel.dataPoints;
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

    return (
      <svg className="barChart" width={width} height={height}>
        <g
          className="mainGroup"
          transform={`translate(${margin.left}, ${margin.top})`}
        >
          <Bars
            dataPoints={dataPoints}
            width={width}
            height={height}
            xScale={xScale}
            yScale={yScale}
            barColor={barColor}
          />
          <Axis
            dataPoints={dataPoints}
            width={width}
            height={height}
            xScale={xScale}
            yScale={yScale}
          />
        </g>
      </svg>
    );
  }
}

export default BarChart;
