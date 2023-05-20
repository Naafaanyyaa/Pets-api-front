import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MainButtonInterface} from "../../../shared/components/main-button/models/main-button.interface";
import {faCheck, faPhone, faAddressCard, faSignature, faUser, faXmark} from "@fortawesome/free-solid-svg-icons";
import {IInput} from "../../../shared/components/input/models/input.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {ToastrService} from "ngx-toastr";
import {ClinicService} from "../clinic-service/ClinicService.service";
import {ClinicRequestBodyModel} from "../models/ClinicRequestBody.model";
import {ClinicResponseModel} from "../models/ClinicResponse.model";

@Component({
  selector: 'app-clinic-add-page',
  templateUrl: './clinic-add-page.component.html',
  styleUrls: ['./clinic-add-page.component.css']
})
export class ClinicAddPageComponent implements OnInit{

  addUserForm!: FormGroup;
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

  public addressConfig: IInput = {
      type: 'default',
      placeholder: 'Address',
      isDisabled: false,
      error:"Error",
      icon: faAddressCard
  }
  public phoneConfig: IInput = {
      type: 'default',
      placeholder: 'Phone',
      isDisabled: false,
      error:"Error",
      icon: faPhone
  }
  constructor(private clinicService: ClinicService, private route: ActivatedRoute,private router: Router, private  userService: UserService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      "name": new FormControl("", Validators.minLength(2)),
      "description": new FormControl("",
        [Validators.minLength(2)
        ]),
      "address": new FormControl("",
        [Validators.minLength(2)
        ]),
      "phone": new FormControl("",
        [Validators.minLength(2)
        ])
    })
  }

  validateControl = (controlName: string) => {
    return this.addUserForm.get(controlName)?.invalid && this.addUserForm.get(controlName)?.touched
  }
  cancel() : void{
    this.router.navigate(["/clinic-list"])
  }

  submit = (addUserFormValue:any) => {

    const info = {...addUserFormValue};

    const clinicObject: ClinicRequestBodyModel = {
      name: info.name,
      address: info.address,
      description: info.description,
      phone: info.phone
    }

    this.clinicService.addClinic(clinicObject).subscribe({
      next: (data: ClinicResponseModel) => {
        this.toastr.success("Added successfully");
        this.router.navigate(["/clinic-list"])
      },
      error: error => {
        this.toastr.error(error.error.message);
      }
    });
  }

}
