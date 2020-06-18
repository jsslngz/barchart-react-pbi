'use strict';
import '@babel/polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import powerbi from 'powerbi-visuals-api';

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import DataView = powerbi.DataView;
import IViewport = powerbi.IViewport;

import VisualObjectInstance = powerbi.VisualObjectInstance;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;

import { BarChart, initialState } from './index';
import { VisualSettings } from './settings';
import './../style/visual.less';

interface DataPoint {
  category: string;
  value: number;
}

export default interface ViewModel {
  dataPoints: DataPoint[];
}

export class Visual implements IVisual {
  private target: HTMLElement;
  private reactRoot: React.ComponentElement<any, any>;
  private settings: VisualSettings;
  private viewport: IViewport;

  constructor(options: VisualConstructorOptions) {
    this.reactRoot = React.createElement(BarChart, {});
    this.target = options.element;

    ReactDOM.render(this.reactRoot, this.target);
  }

  public update(options: VisualUpdateOptions) {
    if (options.dataViews && options.dataViews[0]) {
      const viewModel: ViewModel = this.getViewModel(options);
      const dataView: DataView = options.dataViews[0];
      this.viewport = options.viewport;
      const { width, height } = this.viewport;

      this.settings = VisualSettings.parse(dataView) as VisualSettings;
      const object = this.settings.circle;

      BarChart.update({
        width,
        height,
        viewModel,
      });
    } else {
      this.clear();
    }
  }

  private clear() {
    BarChart.update(initialState);
  }

  public enumerateObjectInstances(
    options: EnumerateVisualObjectInstancesOptions
  ): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
    return VisualSettings.enumerateObjectInstances(
      this.settings || VisualSettings.getDefault(),
      options
    );
  }

  private getViewModel(options: VisualUpdateOptions): ViewModel {
    let dataView = options.dataViews;
    let viewModel: ViewModel = {
      dataPoints: [],
    };

    let view = dataView[0].categorical;

    // Grouping
    let categories: any = view.categories[0] || [];

    // Measures
    let values: any = view.values[0] || [];

    const maxLength = Math.max(categories.values.length);

    for (let i = 0, len = maxLength; i < len; i++) {
      viewModel.dataPoints.push({
        category: <string>categories.values[i],
        value: <number>+values.values[i],
      });
    }
    return viewModel;
  }
}
