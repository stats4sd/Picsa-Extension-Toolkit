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
  groups?: string[];
  permissions?: IUserPerimissions;
  defaults?: IUserDefaults;
}

interface IUserDefaults {
  country: string;
}

interface IUserPerimissions {
  canViewDiscussionsPage: boolean;
  canViewRecordDataPage: boolean;
  canViewViewDataPage: boolean;
  privateWhatsappGroups: { ["id"]: boolean }[];
}

// users can register to groups which provide specific access
// group order specifies a hierarchy which can be used to handle overrides
// if overriding permissions or defaults for multiple groups
export interface IGroup {
  name: string;
  id: string;
  permissions: IUserPerimissions;
  defaults: any;
  order: number;
}

// data stored locally and sync'd from online
// meta fields with '_' are not sync'd, all other data should come as arrays to populate collection
export interface IData {
  _version?: number;
  resources?: IResource[] | IVideoResource[];
  forms?: IForm[];
  whatsappGroups?: IWhatsAppGroup[];
}

export interface IForm {}

export interface IResource {
  _key: string;
  name: string;
  filename: string;
  type: string;
  weblink: string;
  group: string;
}
export interface IVideoResource extends IResource {
  description: string;
  youtubeID: string;
}

export interface IResourceGroup {
  name: string;
  resources: IResource[] | IVideoResource[];
}

// Climate Tool
export interface ISite {
  name: string;
  fileName: string;
  filePath: string;
  latitude: number;
  longitude: number;
}
