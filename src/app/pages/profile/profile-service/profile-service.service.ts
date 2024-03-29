import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../../../environments/environment.prod";
import {Observable} from "rxjs";
import {UserProfileModel} from "../models/user-profile.model";
import {UserEditRequest} from "../models/user-edit-request.model";
import {UserPasswordRequest} from "../models/user-password-request.model";
import {SubLinkResponse} from "../models/sub-ink.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileService{
  private readonly api = environment.urlAddress;
  constructor(private http: HttpClient , private cookieService: CookieService) { }

  getUserProfile():Observable<UserProfileModel>{
    return this.http.get<UserProfileModel>(`${this.api}/api/User/GetUserInfo`);
  }

  deleteUserProfile() : void{
    this.http.delete(`${this.api}/api/User/DeleteAccount`).subscribe(
      () => {
        // Success handler
        this.cookieService.deleteAll();
      },
      (error) => {
        // Error handler
        console.error(error);
      }
    );
  }

  editUserProfile(user: UserEditRequest):Observable<UserProfileModel>{
    const body = {firstName:user.firstName, lastName:user.lastName, userName:user.userName, email:user.email};
    return this.http.put<UserProfileModel>(`${this.api}/api/User/UpdateUserInfo`, body);
  }

  editUserPassword(user: UserPasswordRequest):Observable<UserProfileModel>{
    const body = {oldPassword:user.oldPassword, newPassword:user.newPassword};
    return this.http.patch<UserProfileModel>(`${this.api}/api/User/UpdatePassword`, body);
  }
  createSubscription(): Observable<SubLinkResponse>{
    const body = {type: 10}
    return this.http.post<SubLinkResponse>(`${this.api}/api/PayPal/CreatePayment`, body);
  }
}
