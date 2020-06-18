import * as React from 'react';
import ViewModel from './visual';
import Bars from './components/bars';

export interface State {
  width: number;
  height: number;
  viewModel: ViewModel;
}

export const initialState: State = {
  width: 200,
  height: 200,
  viewModel: { dataPoints: [] },
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
    const { width, height, viewModel } = this.state;

    return (
      <svg width={width} height={height}>
        <Bars dataPoints={viewModel.dataPoints} width={width} height={height} />
      </svg>
    );
  }
}

export default BarChart;
