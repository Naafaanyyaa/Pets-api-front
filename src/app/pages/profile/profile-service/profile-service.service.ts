import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../../../environments/environment.prod";
import {Observable} from "rxjs";
import {UserProfileModel} from "../models/user-profile.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileService{
  private readonly api = environment.urlAddress;
  constructor(private http: HttpClient) { }

  getUserProfile(userId:string):Observable<UserProfileModel>{
    return this.http.get<UserProfileModel>(`${this.api}/api/Account/get-account/${userId}`);
  }
}
