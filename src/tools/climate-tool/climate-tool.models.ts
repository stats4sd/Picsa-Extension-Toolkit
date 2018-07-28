export interface IClimateState {
  site: ISite;
  chart?: IChartMeta;
}

export interface ICropRequirement {
  crop: string;
  variety: string;
  image: string;
  name: string;
  daysMin: number;
  daysMax: number;
  waterMin: number;
  waterMax: number;
}

export interface ISite {
  name: string;
  latitude: number;
  longitude: number;
  fileName: string;
  summaries?: any;
  view?: string;
}

export interface IChartSummary {
  Year: number;
  Start: number;
  StartDate: number;
  EndDay: number;
  EndDate: number;
  Length: number;
  Rainfall: number;
}

export interface IChartMeta {
  name: string;
  image: string;
  cropTableValue?: string;
  x: string;
  yFormat: string;
  tools: { line: boolean ***REMOVED***
  units: string;
  definition: string;
}
