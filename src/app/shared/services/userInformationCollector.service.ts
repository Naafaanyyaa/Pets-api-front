
import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {UserInfoFromTokenModelInterface} from "../../models/userInfoFromTokenModel.interface";

@Injectable()
export class UserInformationCollectorService{

  constructor(private cookieService: CookieService) {
  }
  public get userInfo():any{
    const userInfo = this.cookieService.get('user');
    if (userInfo){
      return JSON.parse(userInfo);
    }
    return null;
  }
  public get token():string{
    return this.cookieService.get('token');
  }
}
