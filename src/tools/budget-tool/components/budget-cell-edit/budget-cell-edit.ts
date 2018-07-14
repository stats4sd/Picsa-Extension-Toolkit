import { NgRedux } from "@angular-redux/store";
import { Component, Input } from "@angular/core";
import { AppState } from "../../../../reducers/reducers";
import { BudgetToolActions } from "../../budget-tool.actions";

@Component({
  selector: "budget-cell-edit",
  templateUrl: "budget-cell-edit.html"
})
export class BudgetCellEditComponent {
  @Input("rowIndex") rowIndex: number;
  @Input("type") type: string;
  cellData: any;
  constructor(
    private NgRedux: NgRedux<AppState>,
    private actions: BudgetToolActions
  ) {}
  ngOnInit() {}
}
