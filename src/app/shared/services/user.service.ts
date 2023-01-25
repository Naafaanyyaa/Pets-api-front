import { HttpClient } from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthenticationRequestModel} from "../../models/authenticationRequestModel.interface";

@Injectable()
export class UserService{
  constructor(private http: HttpClient) {}

  postData(user:AuthenticationRequestModel){
    const body = {userName:user.name, password:user.password};
    return this.http.post('https://localhost:7140/api/Login/Login', body)
  }
}
