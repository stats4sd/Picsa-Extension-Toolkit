import { IWhatsAppGroup } from "../components/whatsapp-group/whatsapp-group";
import { IBudget, IBudgetMeta } from "../tools/budget-tool/budget-tool.models";

// user doc format stored locally under 'user' key and reflected to firebase
export interface IUser {
  name?: string;
  type?: string;
  id?: string;
  budgets?: { ["key"]?: IBudget ***REMOVED***
  submittedForms?: any;
  email?: string;
  verified?: boolean;
  lang?: string;
}

// data stored locally and sync'd from online
// meta fields with '_' are not sync'd, all other data should come as arrays to populate collection
export interface IData {
  _version?: number;
  resources?: IResource[];
  forms?: IForm[];
  whatsappGroups?: IWhatsAppGroup[];
}

export interface IForm {}

export interface IResource {}

// Climate Tool
export interface ISite {
  name: string;
  fileName: string;
  filePath: string;
  latitude: number;
  longitude: number;
}
