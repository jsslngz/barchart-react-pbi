'use strict';

import { dataViewObjectsParser } from 'powerbi-visuals-utils-dataviewutils';
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;

export class BarChartSettings {
  public barColor: string = '#5FDAD5';
}

export class VisualSettings extends DataViewObjectsParser {
  public barChart: BarChartSettings = new BarChartSettings();
}
