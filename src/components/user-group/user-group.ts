import { select } from "@angular-redux/store";
import { Component, Input } from "@angular/core";
import { AlertController } from "ionic-angular";
import { Observable } from "rxjs";
import { UserActions } from "../../actions/user.actions";
import { IUser, IUserGroup } from "../../models/models";

@Component({
  selector: "user-group",
  templateUrl: "user-group.html"
})
export class UserGroupComponent {
  @Input("group") group: IUserGroup;
  @select("user") user$: Observable<IUser>;
  user: IUser;
  joined: boolean;

  constructor(
    private alertCtrl: AlertController,
    private actions: UserActions
  ) {}

  ngOnInit(): void {
    // subscribe after group input bind so can use group key
    this.user$.subscribe(user => {
      if (user) {
        this.userUpdate(user);
      }
    });
  }

  userUpdate(user: IUser) {
    // set joined status
    this.joined = user && user.groups && user.groups.includes(this.group._key);
    console.log("user updated", user);
    this.user = user;
  }

  joinGroup() {
    if (!this.user.groups) {
      this.user.groups = [];
    }
    if (!this.user.groups.includes(this.group._key)) {
      this.user.groups.push(this.group._key);
    }
    this.user.authenticated = true;
    this.actions.updateUser(this.user);
    // set user as authenticated if not
    // add group to joined groups
    // apply any settings (country, language, available pages etc.)
    // join notifications channels
  }

  joinGroupClicked() {
    console.log("joining group", this.group);
    const alert = this.alertCtrl.create({
      title: `Join ${this.group.name}`,
      inputs: [
        {
          name: "key",
          placeholder: "Access Key",
          type: "password"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Join",
          handler: data => {
            console.log("data", data);
            if (data.key == this.group.accessKey) {
              // logged in!
              this.joinGroup();
            } else {
              // invalid login
              alert.data.message = `<div class="invalid-key">Invalid access key</div>`;
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }
}
