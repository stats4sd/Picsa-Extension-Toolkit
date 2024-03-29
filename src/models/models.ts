import { IWhatsAppGroup } from "../components/whatsapp-group/whatsapp-group";
import { IBudget, IBudgetMeta } from "../tools/budget-tool/budget-tool.models";

// user doc format stored locally under 'user' key and reflected to firebase
export interface IUser {
  appVersion?: string;
  name?: string;
  type?: string;
  id?: string;
  budgets?: { ["key"]?: IBudget };
  budgetCustomCards?: IBudgetMeta;
  submittedForms?: any;
  email?: string;
  verified?: boolean;
  lang?: string;
  groups?: string[];
  authenticated?: boolean;
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

// data stored locally and sync'd from online
// meta fields with '_' are not sync'd, all other data should come as arrays to populate collection
export interface IData {
  _version?: number;
  resources?: IResource[] | IVideoResource[];
  forms?: IForm[];
  groups?: IUserGroup[];
  whatsappGroups?: IWhatsAppGroup[];
}

// users can register to groups which provide specific access
// group order specifies a hierarchy which can be used to handle overrides
// if overriding permissions or defaults for multiple groups
export interface IUserGroup {
  _key: string;
  name: string;
  accessKey: string;
  defaults: any;
  order: any;
  isHidden?: boolean;
}

export interface IForm {
  _key: string;
  name: string;
  groups?: string[];
  icon?: string;
  isActive: boolean;
  surveyJson: any;
}

export interface IFormResponse {
  _key: string;
  _userID: string;
  _submitted: string;
  ["questionKey"]?: any;
}

export interface IResource {
  _key: string;
  name: string;
  filename: string;
  type: string;
  image: string;
  weblink: string;
  viewableBy?: string[];
  group: string;
  region?: regions;
  description?: string;
  youtubeID?: string;
  filepath?: string;
}
export interface IVideoResource extends IResource {
  description: string;
  youtubeID: string;
}

export interface IResourceGroup {
  name: string;
  resources: IResource[] | IVideoResource[];
}

export type regions = "Malawi" | "Kenya";

export interface IEnvironment {
  production: boolean;
  usesCordova: boolean;
  firebase: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}
