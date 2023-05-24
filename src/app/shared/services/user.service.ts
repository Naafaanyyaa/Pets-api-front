import { HttpClient } from "@angular/common/http";
import {EventEmitter, Injectable} from "@angular/core";
import {environment} from "../../../environments/environment.prod";
import {AuthenticationRequestModel} from "../../models/authenticationRequestModel.interface";
import {RegistrationRequestModel} from "../../models/registrationRequestModel.interface";
import {map, Observable} from "rxjs";
import {IUserResponse} from "../../models/IUserResponseModel.interface";
import {AuthenticationResponseModel} from "../../models/authenticationResponseModel.interface";
import jwt_decode from "jwt-decode";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class UserService{
  private readonly api = environment.urlAddress;
  public cultureChange: EventEmitter<void> = new EventEmitter<void>();
  constructor(private http: HttpClient, public cookieService: CookieService) {}

  loginUser(user:AuthenticationRequestModel):Observable<AuthenticationResponseModel>{
    const body = {userName:user.name, password:user.password};
    return this.http.post<AuthenticationResponseModel>(`${this.api}/api/Authentication/Login`, body);
  }

  //TODO: do logout method

  logout(){
    this.cookieService.deleteAll();
  }

  public getCultureParam(): string {
    return this.cookieService.get('culture');
  }

  public updateCulture(culture: string): void {
    this.cookieService.set('culture', culture);
    this.cultureChange.emit();
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  public getToken(): string {
    return this.cookieService.get('token') ?? '';
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether the token is expired
    return token == '' ? false : true;
  }

  registerUser(user:RegistrationRequestModel) : Observable<IUserResponse>{
    const body = {
      Firstname: user.Firstname,
      Lastname: user.Lastname,
      UserName: user.UserName,
      Email: user.Email,
      Password: user.Password,
      Role: 100
    }
    return this.http.post<IUserResponse>(`${this.api}/api/Authentication/Registration`, body);
  }
}
