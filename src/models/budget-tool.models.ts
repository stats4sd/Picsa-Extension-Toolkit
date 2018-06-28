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

interface BudgetCard {
  Type: string;
  Name: string;
  Image: string;
  ID: string;
}

export interface IActivityCard extends BudgetCard {
  // Type: "activity";
}
export interface IInputCard extends BudgetCard {
  // Type: "input";
  quantity?: number;
  total?: number;
  dots?: any[];
  cost?: number;
}
export interface IOutputCard extends BudgetCard {
  // Type: "output";
  quantity?: number;
  total?: number;
  dots?: any[];
  cost?: number;
  consumed?: number;
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
