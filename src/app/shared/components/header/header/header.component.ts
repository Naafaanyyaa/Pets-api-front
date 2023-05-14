import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IIconButton} from "../../icon-button/models/icon-button.interface";
import {faUser, faArrowRightToBracket, faAddressCard} from "@fortawesome/free-solid-svg-icons";
import {UserInformationCollectorService} from "../../../services/userInformationCollector.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../../../../util.css'],
  providers: [UserInformationCollectorService, UserService]
})
export class HeaderComponent implements OnInit {

  public loginIcon: IIconButton = {
    classes: "default",
    icon: faUser,
    isOutside: false,
    link: '/login'
  }
  public logoutIcon: IIconButton = {
    classes: "default",
    icon: faArrowRightToBracket,
    isOutside: false,
    link: '/'
  }
  public userProfile: IIconButton = {
    classes: "default",
    icon: faAddressCard,
    isOutside: false,
    link: `/profile`
  }

  //TODO: changeable variables
  constructor(private userInformation: UserInformationCollectorService, private userService: UserService) {
  }

  ngOnInit(): void {

    }

  private get userId() {
    return this.userInformation.userInfo ? this.userInformation.userInfo.id : undefined;
  }

  public get isAuthenticate() {
    return this.userInformation.token ? true : false;
  }

  public get isAdmin() {
    if (this.userInformation.userInfo) {
      for (let role of this.userInformation.userInfo.role) {
        if (role == "Admin") return true;
      }
    }
    return false;
  }

  public logout() {
    this.userService.logout();
  }

}
