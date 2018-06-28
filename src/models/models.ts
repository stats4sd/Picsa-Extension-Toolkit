export interface IUser {
  name?: string;
  type?: string;
  lang: string;
}

// climate tool
export interface ISite {
  name: string;
  fileName: string;
  filePath: string;
  latitude: number;
  longitude: number;
}
