import { Component, OnInit } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { AppState } from "src/app/store/store.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-error",
  templateUrl: "./error.page.html",
  styleUrls: ["./error.page.scss"]
})
export class ErrorPage implements OnInit {
  reloading: boolean;
  errorMessage: string;
  constructor(private ngRedux: NgRedux<AppState>, private router: Router) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.errorMessage = this.ngRedux.getState().platform.error;
  }

  reloadPage() {
    this.reloading = true;
    window.location.reload();
  }
}
