import { dispatch } from "@angular-redux/store";
import { Injectable } from "@angular/core";
import { FluxStandardAction } from "flux-standard-action";

export type UserAction = FluxStandardAction<any, null>;

@Injectable()
export class UserActions {
  static readonly SET_USER = "SET_USER";
  static readonly UPDATE_USER = "UPDATE_USER";

  @dispatch()
  setUser = (user: any): UserAction => ({
    type: UserActions.SET_USER,
    meta: null,
    payload: user
  });

  @dispatch()
  updateUser = (update: any): UserAction => ({
    type: UserActions.UPDATE_USER,
    meta: null,
    payload: update
  });
}
