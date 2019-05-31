import { Component } from "@angular/core";
import { APP_VERSION } from "src/environments/version";
import REGIONAL_SETTINGS from "src/environments/region";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage {
  links: ILink[];
  name: string;
  version = APP_VERSION;
  subtitle: string = REGIONAL_SETTINGS.subtitle;

  constructor(private router: Router) {
    this.links = [
      {
        name: "Resources",
        icon: "book",
        url: "/resources"
      },
      {
        name: "Tools",
        icon: "tablet-portrait",
        url: "/tools"
      },
      {
        name: "Discussions",
        icon: "chatbubbles",
        url: "/discussions"
      },
      {
        name: "Data Collection",
        img: "data-collection",
        url: "/data"
      },
      {
        name: "Settings",
        icon: "settings",
        url: "/settings"
      }
    ];
  }
  linkClicked(link: ILink) {
    this.router.navigate([link.url]);
  }
}

interface ILink {
  name: string;
  icon?: string;
  img?: string;
  url: string;
}
