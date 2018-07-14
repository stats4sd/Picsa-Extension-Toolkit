import { dispatch } from "@angular-redux/store";
import { Injectable } from "@angular/core";
import { FluxStandardAction } from "flux-standard-action";
import { IData } from "../models/models";

export type DataAction = FluxStandardAction<any, string>;

@Injectable()
export class DataActions {
  static readonly LOAD_DATA = "[data] load";
  static readonly SYNC_DATA = "[data] sync";

  @dispatch()
  loadData = (data: IData, src: string): DataAction => ({
    type: DataActions.LOAD_DATA,
    meta: src,
    payload: data
***REMOVED***);

  @dispatch()
  syncData = (data: IData, src: string): DataAction => ({
    type: DataActions.SYNC_DATA,
    meta: src,
    payload: data
***REMOVED***);
}
