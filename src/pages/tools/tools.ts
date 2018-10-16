import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { TranslationsProvider } from "../../providers/translations";

@IonicPage({
  defaultHistory: ["HomePage"]
})
@Component({
  selector: "page-tools",
  templateUrl: "tools.html"
})
export class ToolsPage {
  tools: any;

  constructor(
    public navCtrl: NavController,
    public translations: TranslationsProvider
  ) {
    this.tools = [
      {
        name: "Climate Tool",
        image: "assets/img/climate-tool.svg",
        page: "ClimateToolPage"
      },
      {
        name: "Budget Tool",
        image: "assets/img/budget-tool.svg",
        page: "BudgetToolPage"
      }
    ];
  }

  async loadTool(tool) {
    await this.translations.presentTranslatedLoader({
      content: `Loading...`,
      dismissOnPageChange: true
    });
    if (tool.page) {
      this.navCtrl.push(tool.page);
    } else {
      this.navCtrl.push("IframePage", tool);
    }
  }
}
