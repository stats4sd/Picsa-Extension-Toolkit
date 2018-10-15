import { IBudget } from "./budget-tool.models";

/*  this file contains methods to make incremental changes to budgets 
    to upgrade for api changes
*/

export const upgradeBudget = (budget: IBudget) => {
  console.log("upgrading budget");
  const version = budget.apiVersion;
  switch (version) {
    case 1:
      return v1Upgrade(budget);
    case 2:
      return v2Upgrade(budget);
    default:
      throw new Error(`could not upgrade budget: ${JSON.stringify(budget)}`);
***REMOVED***
***REMOVED***

// Legacy upgrade, not expected to find any budgets in this format and upgrade method not known
// as budget type might have changed need to also type as any
const v1Upgrade = (budget: IBudget | any) => {
  console.log("upgrading budget from v1");
  try {
***REMOVED*** catch (error) {
    budget.apiVersion = -1;
***REMOVED***
***REMOVED***

// 15/10/2018
// recase budget period data period from string to number
const v2Upgrade = (budget: IBudget | any) => {
  console.log("upgrading budget from v1");
  try {
    if (budget.periods && budget.periods.total) {
      budget.periods.total = Number(budget.periods.total);
  ***REMOVED***
    budget.apiVersion = 3;
***REMOVED*** catch (error) {
    budget.apiVersion = -1;
***REMOVED***
  return budget;
***REMOVED***
