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
  Type: "actvity";
}
export interface IInputCard extends BudgetCard {
  Type: "input";
}
export interface IOutputCard extends BudgetCard {
  Type: "output";
}

interface FamilyLabourCard {
  people: number;
  days: number;
}

interface BalanceOutput extends IOutputCard {
  consumed: number;
  cost: number;
  quantity: number;
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
    outputs: BalanceOutput[];
    consumed: BalanceCounter;
    monthly: BalanceCounter;
    running: BalanceCounter;
***REMOVED***;
}

export interface IBudgetData {
  activities: IActivityCard[];
  inputs: IInputCard[];
  outputs: IOutputCard[];
}
