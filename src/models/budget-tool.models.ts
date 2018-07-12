export interface IBudget {
  title: string;
  archived: boolean;
  periods: periods;
  description: string;
  enterprise: string;
  scale: string;
  created: string;
  id: string;
  data: BudgetEntry[];
  apiVersion: number;
}

interface periods {
  labels: string[];
  starting: string;
  scale: string;
  total: number;
}

export interface IBudgetCard {
  type: string;
  name: string;
  id: string;
  custom?: boolean;
  customImg?: string;
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
export interface IEnterpriseOptions extends IBudgetCard {}

export interface ICustomCards {
  enterprises: {
    [id: string]: IBudgetCard;
  };
  inputs: {};
  outputs: {};
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
