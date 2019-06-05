import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", loadChildren: "src/pages/home/home.module#HomePageModule" },
  {
    path: "admin",
    loadChildren: "src/pages/admin/admin.module#AdminPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "changelog",
    loadChildren: "src/pages/changelog/changelog.module#ChangelogPageModule"
  },
  { path: "data", loadChildren: "src/pages/data/data.module#DataPageModule" },
  {
    path: "data/record",
    loadChildren: "src/pages/data/record/record.module#RecordPageModule"
  },
  {
    path: "data/record/:formid",
    loadChildren: "src/pages/data/formView/formView.module#FormViewPageModule"
  },
  {
    path: "discussions",
    loadChildren:
      "src/pages/discussions/discussions.module#DiscussionsPageModule"
  },
  {
    path: "error",
    loadChildren: "src/pages/error/error.module#ErrorPageModule"
  },
  { path: "home", loadChildren: "src/pages/home/home.module#HomePageModule" },
  {
    path: "resources",
    loadChildren: "src/pages/resources/resources.module#ResourcesPageModule"
  },
  {
    path: "settings",
    loadChildren: "src/pages/settings/settings.module#SettingsPageModule"
  },
  {
    path: "tools",
    loadChildren: "src/pages/tools/tools.module#ToolsPageModule"
  },

  /*******************************************************************************************************
   *  Tool Pages
   ********************************************************************************************************/

  {
    path: "tools/climate",
    loadChildren:
      "src/tools/climate-tool/pages/climate-tool.module#ClimateToolPageModule"
  },
  {
    path: "tools/budget",
    loadChildren: "src/tools/budget-tool/budget-tool.module#BudgetToolModule"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
