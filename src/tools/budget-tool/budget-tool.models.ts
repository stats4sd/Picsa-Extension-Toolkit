export interface IBudget {
  _key: string;
  title: string;
  archived: boolean;
  periods: periods;
  description: string;
  enterprise: string;
  enterpriseType: string;
  scale: string;
  created: string;
  data: BudgetEntry[];
  apiVersion: number;
  view: string;
}

export interface IBudgetMeta {
  templates?: IBudget[];
  activities?: IBudgetCard[];
  enterprises?: IBudgetCard[];
  outputs?: IBudgetCard[];
  inputs?: IBudgetCard[];
}

interface periods {
  labels: string[];
  starting: string;
  scale: string;
  total: number;
}

export interface IBudgetCard {
  group?: string;
  name: string;
  id: string;
}

export interface ICustomBudgetCard extends IBudgetCard {
  custom: boolean;
  customImg: string;
  created: string;
  createdBy: string;
}

export interface IActivityCard extends IBudgetCard {
  // Type: "activity";
}
export interface IInputCard extends IBudgetCard {
  // Type: "input";
  quantity?: number;
  total?: number;
  dots?: any[];
  cost?: number;
}
export interface IOutputCard extends IBudgetCard {
  // Type: "output";
  quantity?: number;
  total?: number;
  dots?: any[];
  cost?: number;
  consumed?: number;
}

export interface ICustomCards {
  enterprises: IBudgetCard[];
  inputs: IInputCard[];
  outputs: IOutputCard[];
}

interface FamilyLabourCard {
  people: number;
  days: number;
}

interface BalanceCounter {
  total: number;
  dots: any[];
}

interface BudgetEntry extends IBudgetData {
  label: string;
  index: number;
  familyLabour: FamilyLabourCard;
  balance: {
    inputs: BalanceCounter;
    outputs: BalanceCounter;
    consumed: BalanceCounter;
    monthly: BalanceCounter;
    running: BalanceCounter;
  };
}

export interface IBudgetData {
  activities: IActivityCard[];
  inputs: IInputCard[];
  outputs: IOutputCard[];
}

export interface IBudgetPublicData {
  customCards?: { ["id"]: ICustomBudgetCard };
  templates?: { ["id"]: IBudget };
}
