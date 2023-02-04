import { HttpClient } from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment.prod";
import {AuthenticationRequestModel} from "../../models/authenticationRequestModel.interface";
import {RegistrationRequestModel} from "../../models/registrationRequestModel.interface";
import {map, Observable} from "rxjs";
import {IUserResponse} from "../../models/IUserResponseModel.interface";
import {AuthenticationResponseModel} from "../../models/authenticationResponseModel.interface";

@Injectable()
export class UserService{
  private readonly api = environment.urlAddress;
  private response : any;
  constructor(private http: HttpClient) {}

  loginUser(user:AuthenticationRequestModel):Observable<AuthenticationResponseModel>{
    const body = {userName:user.name, password:user.password};
    this.response = this.http.post<AuthenticationResponseModel>(`${this.api}/api/Login/Login`, body);
    // this.response.subscribe((data: AuthenticationResponseModel) => {
    //   localStorage.setItem('token', data.token);
    // })

    return this.response;
  }

  public getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
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
    return this.http.post<IUserResponse>(`${this.api}/api/Login/Register`, body);
  }
}
