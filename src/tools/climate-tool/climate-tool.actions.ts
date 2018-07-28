import { dispatch } from "@angular-redux/store";
import { Injectable } from "@angular/core";
import { FluxStandardAction } from "flux-standard-action";
import { IChartMeta, ISite } from "./climate-tool.models";

type StandardAction = FluxStandardAction<any, null>;

@Injectable()
export class ClimateToolActions {
  static readonly SELECT_SITE = "SELECT_SITE";
  static readonly UPDATE_SITE = "UPDATE_SITE";
  static readonly SELECT_CHART = "SELECT_CHART";
  static readonly RESET_STATE = "RESET_STATE";

  @dispatch()
  selectSite = (site: ISite): StandardAction => ({
    type: ClimateToolActions.SELECT_SITE,
    meta: null,
    payload: site
***REMOVED***);
  @dispatch()
  updateSite = (sitePartial): StandardAction => ({
    type: ClimateToolActions.UPDATE_SITE,
    meta: null,
    payload: sitePartial
***REMOVED***);
  @dispatch()
  selectChart = (chart: IChartMeta): StandardAction => ({
    type: ClimateToolActions.SELECT_CHART,
    meta: null,
    payload: chart
***REMOVED***);
  @dispatch()
  resetState = (): StandardAction => ({
    type: ClimateToolActions.RESET_STATE,
    meta: null,
    payload: null
***REMOVED***);
}
