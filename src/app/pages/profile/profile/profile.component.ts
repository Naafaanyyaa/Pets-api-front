import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../profile-service/profile-service.service";
import {UserProfileModel} from "../models/user-profile.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MainButtonInterface} from "../../../shared/components/main-button/models/main-button.interface";
import {faTrash, faPencil, faKey, faMoneyBill} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../../../shared/services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './../../../../util.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit{

  public isUserExists : boolean = false;
  public isUserIsHospitalHost : boolean = false;
  public userInfo!: UserProfileModel;
  public deleteButton: MainButtonInterface = {
    classes: "red",
    icon: faTrash,
    size: "default",
    text: "Delete"
  }
  public editButton: MainButtonInterface = {
    classes: "yellow",
    icon: faPencil,
    link: `/profile/edit`,
    size: "default",
    text: "Edit"
  }
  public subscriptionButton: MainButtonInterface = {
    classes: "green",
    icon: faMoneyBill,
    size: "default",
    text: "Create subscription"
  }
  public changePasswordButton: MainButtonInterface = {
    classes: "yellow",
    icon: faKey,
    link: `/profile/changePassword`,
    size: "default",
    text: "Change password"
  }

  public get isUserHospitalHost() : boolean{
    const decodedToken = this.userService.getDecodedAccessToken(this.userService.getToken());
    const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    return Array.isArray(roles) && roles.includes('HospitalHost');
  }
  constructor(private profileService: ProfileService, private route: ActivatedRoute,private router: Router, private  userService: UserService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe({
      next:(data:UserProfileModel) => {
        this.isUserExists = true;
        this.userInfo = data;
        this.isUserIsHospitalHost = this.isUserHospitalHost;
        console.log(this.isUserIsHospitalHost)
      },
      error: error => console.log(error)
    })
  }

  deleteUserAccount() : void{
    this.toastr.warning("Account deleted");
    this.profileService.deleteUserProfile();
    this.router.navigate(["/login"]);
  }
  editUserAccount(): void {
    console.log("deleted")
  }
  editPasswordAccount(): void {
    console.log("deleted")
  }
}
