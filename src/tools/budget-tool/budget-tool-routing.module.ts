import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// note, we're not lazy loading any of these routes as most likely all will be used in session
const routes: Routes = [
  {
    path: "",
    loadChildren: "./pages/budget-home/budget-home.module#BudgetHomePageModule"
  },
  {
    path: "create",
    loadChildren:
      "./pages/budget-create/budget-create.module#BudgetCreatePageModule"
  },
  {
    path: "view",
    loadChildren: "./pages/budget-view/budget-view.module#BudgetViewPageModule"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetToolRoutingModule {}
