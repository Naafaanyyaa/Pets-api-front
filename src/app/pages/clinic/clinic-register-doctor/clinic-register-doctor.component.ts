import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MainButtonInterface} from "../../../shared/components/main-button/models/main-button.interface";
import {faAddressCard, faCheck, faPhone, faSignature, faUser, faXmark} from "@fortawesome/free-solid-svg-icons";
import {IInput} from "../../../shared/components/input/models/input.interface";
import {ClinicService} from "../clinic-service/ClinicService.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {ToastrService} from "ngx-toastr";
import {ClinicRequestBodyModel} from "../models/ClinicRequestBody.model";
import {ClinicResponseModel} from "../models/ClinicResponse.model";
import {DoctorRequestModel} from "../models/DoctorRequest.model";

@Component({
  selector: 'app-clinic-register-doctor',
  templateUrl: './clinic-register-doctor.component.html',
  styleUrls: ['./clinic-register-doctor.component.css']
})
export class ClinicRegisterDoctorComponent implements OnInit{
  clinicId: string = "";
  addDoctorForm!: FormGroup;
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
  public usernameConfig: IInput = {
    type: 'default',
    placeholder: 'Username',
    isDisabled: false,
    error:"Error",
    icon: faUser
  }
  public firstnameConfig: IInput = {
    type: 'default',
    placeholder: 'Firstname',
    isDisabled: false,
    error:"Error",
    icon: faSignature
  }

  public lastnameConfig: IInput = {
    type: 'default',
    placeholder: 'Lastname',
    isDisabled: false,
    error:"Error",
    icon: faAddressCard
  }
  public passwordConfig: IInput = {
    type: 'default',
    placeholder: 'Password',
    isDisabled: false,
    error:"Error",
    icon: faPhone
  }
  public emailConfig: IInput = {
    type: 'default',
    placeholder: 'Email',
    isDisabled: false,
    error:"Error",
    icon: faPhone
  }
  constructor(private clinicService: ClinicService, private route: ActivatedRoute,private router: Router, private  userService: UserService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.clinicId = this.route.snapshot.paramMap.get('id')!;
    this.addDoctorForm = new FormGroup({
      "userName": new FormControl("", Validators.minLength(2)),
      "firstname": new FormControl("",
        [Validators.minLength(2)
        ]),
      "lastname": new FormControl("",
        [Validators.minLength(2)
        ]),
      "email": new FormControl("",
        [Validators.minLength(2)
        ]),
      "password": new FormControl("",
        [Validators.minLength(2)
        ])
    })
  }

  validateControl = (controlName: string) => {
    return this.addDoctorForm.get(controlName)?.invalid && this.addDoctorForm.get(controlName)?.touched
  }
  cancel() : void{
    this.router.navigate(["/clinic-list"])
  }

  submit = (addDoctorToClinicFormValue:any) => {

    const info = {...addDoctorToClinicFormValue};

    const doctorObject: DoctorRequestModel = {
      firstname: info.firstname,
      lastname: info.lastname,
      userName: info.userName,
      email: info.email,
      password: info.password
    }

    this.clinicService.createDoctor(doctorObject, this.clinicId).subscribe({
      next: (data: ClinicResponseModel) => {
        this.toastr.success("Created successfully");
        this.router.navigate(["/clinic-list"])
      },
      error: error => {
        this.toastr.error(error.error.message);
      }
    });
  }
}
