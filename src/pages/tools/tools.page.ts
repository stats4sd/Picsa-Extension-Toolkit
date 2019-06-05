import { Component } from "@angular/core";
import { TranslationsProvider } from "src/providers/translations";
import { Router } from "@angular/router";

@Component({
  selector: "app-tools",
  templateUrl: "./tools.page.html",
  styleUrls: ["./tools.page.scss"]
})
export class ToolsPage {
  tools: ITool[];

  constructor(
    private translations: TranslationsProvider,
    private router: Router
  ) {
    this.tools = [
      {
        name: "Climate Tool",
        image: "assets/img/climate-tool.svg",
        url: "/tools/climate"
      },
      {
        name: "Budget Tool",
        image: "assets/img/budget-tool.svg",
        url: "/tools/budget"
      }
    ];
  }

  async loadTool(tool: ITool) {
    const loader = await this.translations.createTranslatedLoader({
      message: `Loading...`
    });
    await loader.present();
    this.router.navigate([tool.url]);
    loader.dismiss();
  }
}

interface ITool {
  name: string;
  image: string;
  url: string;
}
