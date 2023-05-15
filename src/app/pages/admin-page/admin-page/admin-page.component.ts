import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProfileService} from "../../profile/profile-service/profile-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {ToastrService} from "ngx-toastr";
import {AdminService} from "../services/admin-service.service";
import {UserProfileModel} from "../../profile/models/user-profile.model";
import {AuthenticationResponseModel} from "../../../models/authenticationResponseModel.interface";
import {RoleEnum} from "../models/role-enum.model";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css', '../../../../util.css']
})
export class AdminPageComponent implements OnInit{
  public userList? : UserProfileModel[];
  public selectedRole?: RoleEnum;
  public userRole: RoleEnum = RoleEnum.User;
  public adminRole: RoleEnum = RoleEnum.Admin;
  public hospitalHost: RoleEnum = RoleEnum.HospitalHost;
  public doctor: RoleEnum = RoleEnum.Doctor;
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

  changeUserRole(userId: string, role?: RoleEnum): void {
    this.adminService.changeRole(userId, role).subscribe({
      next: () => {
        this.toastr.success("Role changed")
      },
      error: err => {
        this.toastr.error(err.error)
      }
    });
  }
}
