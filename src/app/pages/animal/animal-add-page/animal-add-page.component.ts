import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MainButtonInterface} from "../../../shared/components/main-button/models/main-button.interface";
import { faCheck, faSignature, faUser, faXmark} from "@fortawesome/free-solid-svg-icons";
import {IInput} from "../../../shared/components/input/models/input.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {ToastrService} from "ngx-toastr";
import {UserInformationCollectorService} from "../../../shared/services/userInformationCollector.service";
import {AnimalTypeEnum} from "../models/animal-type.enum";
import {UserProfileModel} from "../../profile/models/user-profile.model";
import {AdminService} from "../../admin-page/services/admin-service.service";
import {AnimalRequestModel} from "../models/animal-request.model";
import {AnimalService} from "../service/animal-service.service";
import {AnimalResponseModel} from "../models/animal-response.model";

@Component({
  selector: 'app-animal-add-page',
  templateUrl: './animal-add-page.component.html',
  styleUrls: ['./animal-add-page.component.css']
})
export class AnimalAddPageComponent implements OnInit{
  checkDoctorRole: boolean = false;
  addUserForm!: FormGroup;
  userList: UserProfileModel[] = [];
  file?: File;
  public confirmButton: MainButtonInterface = {
    classes: "green",
    icon: faCheck,
    size: "default",
    text: "Confirm"
  }
  public cancelButton: MainButtonInterface = {
    classes: "yellow",
    icon: faXmark,
    link: `/profile/edit`,
    size: "default",
    text: "Cancel"
  }
  public nameConfig: IInput = {
    type: 'default',
    placeholder: 'Name',
    isDisabled: false,
    error:"Error",
    icon: faUser
  }
  public descriptionConfig: IInput = {
    type: 'default',
    placeholder: 'Description',
    isDisabled: false,
    error:"Error",
    icon: faSignature
  }

  constructor( private userInformation: UserInformationCollectorService,private animalService: AnimalService, private adminService: AdminService, private route: ActivatedRoute,private router: Router, private  userService: UserService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      "name": new FormControl("", Validators.minLength(2)),
      "description": new FormControl("",
        [Validators.minLength(2)
        ]),
      "selectedItem": new FormControl(null),
      "selectedUser": new FormControl(null)
    })
    this.checkDoctorRole = this.isDoctor;
    if (this.isDoctor){
      this.adminService.getUserList().subscribe({
        next:(data: UserProfileModel[]) => {
          this.userList = data;
        },
        error:(err) =>{
          this.toastr.error(err.error)
        }
      })
    }
  }

  public get isDoctor() {
    if (this.userInformation.userInfo) {
      for (let role of this.userInformation.userInfo.role) {
        if (role == "Doctor") return true;
      }
    }
    return false;
  }

  validateControl = (controlName: string) => {
    return this.addUserForm.get(controlName)?.invalid && this.addUserForm.get(controlName)?.touched
  }
  cancel() : void{
    this.router.navigate(["/animal-list"])
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.file = file;
  }

  //TODO: change endpoint
  submit = (addUserFormValue:any) => {

    const info = {...addUserFormValue};

    let animalObject: AnimalRequestModel = {
      AnimalType: info.selectedItem,
      UserId: info.selectedUser,
      AnimalName: info.name,
      AnimalDescription: info.description
    }

    if (!this.isDoctor){
      animalObject.UserId = this.userInformation.userInfo.id
    }

    this.animalService.addAnimal(animalObject, this.file).subscribe({
      next: (data: AnimalResponseModel) => {
        this.toastr.success("Added successfully");
        this.router.navigate(["/animal-panel"])
      },
      error: error => {
        this.toastr.error(error.error.message);
      }
    });
  }
  protected readonly AnimalTypeEnum = AnimalTypeEnum;
}
