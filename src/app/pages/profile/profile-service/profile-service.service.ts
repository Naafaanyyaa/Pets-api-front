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
}
