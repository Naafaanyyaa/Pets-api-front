import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProfileService} from "../../profile/profile-service/profile-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {ToastrService} from "ngx-toastr";
import {AdminService} from "../services/admin-service.service";
import {UserProfileModel} from "../../profile/models/user-profile.model";
import {AuthenticationResponseModel} from "../../../models/authenticationResponseModel.interface";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css', '../../../../util.css']
})
export class AdminPageComponent implements OnInit{
  public userList? : UserProfileModel[];
  constructor(private adminService: AdminService, private route: ActivatedRoute,private router: Router, private toastr: ToastrService, private cdRef: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.refreshUserList();
  }

  banUser(userId : string) : void{
    this.adminService.banUser(userId).subscribe({
      next:() => {
        this.toastr.warning("Account access changed");
        this.refreshUserList();
      },
      error: error => {
        console.log(error);
        this.toastr.error(error.error);
      }
    });
  }
  refreshUserList(): void {
    this.adminService.getUserList().subscribe({
      next: (data?: UserProfileModel[]) => {
        this.userList = data;
      },
      error: error => console.log(error)
    })
  }

  filterUser() : void{
    const email = (document.querySelector('#email') as HTMLInputElement).value;
    const username = (document.querySelector('#username') as HTMLInputElement).value;
    this.adminService.getUserList(email, username).subscribe({
      next: (data?:UserProfileModel[]) => {
        this.userList = data;
      },
      error: err => {
        this.toastr.error(err.error)
      }
    });
  }

  changeUserRole(userId: string): void {
    this.router.navigate(['/change-role'], { queryParams: { id: userId } });
  }
}
