import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import ENVIRONMENT from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
// auth guards used to limit which pages can be accessed to users
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // currently just blocking admin on production
    return ENVIRONMENT.production;
  }
}
