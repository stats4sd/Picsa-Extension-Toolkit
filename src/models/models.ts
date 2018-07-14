import { IBudget } from "../tools/budget-tool/budget-tool.models";

// user doc format stored locally under 'user' key and reflected to firebase
export interface IUser {
  name?: string;
  type?: string;
  id?: string;
  budgets?: { ["key"]?: IBudget };
  submittedForms?: any;
  email?: string;
  verified?: boolean;
  lang: string;
}

// Climate Tool
export interface ISite {
  name: string;
  fileName: string;
  filePath: string;
  latitude: number;
  longitude: number;
}
