import { dispatch } from "@angular-redux/store";
import { Injectable } from "@angular/core";
import { FluxStandardAction } from "flux-standard-action";

export type UserAction = FluxStandardAction<any, null>;

interface SetWPMeta {
  source: "firebase" | "storage" | "default";
  set: string;
}

@Injectable()
export class UserActions {
  static readonly SET_USER = "SET_USER";

  @dispatch()
  setUser = (user: any): UserAction => ({
    type: UserActions.SET_USER,
    meta: null,
    payload: user
***REMOVED***);
}
