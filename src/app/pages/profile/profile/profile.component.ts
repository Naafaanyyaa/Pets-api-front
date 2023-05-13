import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../profile-service/profile-service.service";
import {UserProfileModel} from "../models/user-profile.model";
import {ActivatedRoute} from "@angular/router";
import {MainButtonInterface} from "../../../shared/components/main-button/models/main-button.interface";
import {faTrash, faPencil} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './../../../../util.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit{

  public isUserExists : boolean = false;
  public userInfo!: UserProfileModel;
  public deleteButton: MainButtonInterface = {
    classes: "red",
    icon: faTrash,
    link: `/`,
    size: "default",
    text: "Delete"
  }
  public editButton: MainButtonInterface = {
    classes: "yellow",
    icon: faPencil,
    link: `/profile/edit/${this.userId}`,
    size: "default",
    text: "Edit"
  }

  public get userId(){
    return this.route.snapshot.paramMap.get('id')!;
  }
  constructor(private profileService: ProfileService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.profileService.getUserProfile(this.userId).subscribe({
      next:(data:UserProfileModel) => {
        this.isUserExists = true;
        this.userInfo = data;
        console.log("1")
        console.log(this.userInfo)
      },
      error: error => console.log(error)
    })
  }

  // ngOnInit(): void {
  //   this.userInfo = this.store.selectSnapshot(ProfileState.selectProfile)
  // }


}
