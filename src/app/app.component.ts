import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../environments/environment";
import {UserService} from "./shared/services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front';

  constructor(private translateService: TranslateService, private userService: UserService) {}
  ngOnInit(): void {
    this.translateService.setDefaultLang(environment.defaultLocale);
    this.translateService.addLangs(['en', 'uk']);
    this.translateService.use(this.userService.getCultureParam() || 'en');

    this.userService.cultureChange.subscribe(() => {
      this.translateService.use(this.userService.getCultureParam() || 'en');
    });
  }


}
