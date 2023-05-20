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

@Component({
  selector: 'app-clinic-update',
  templateUrl: './clinic-update.component.html',
  styleUrls: ['./clinic-update.component.css']
})
export class ClinicUpdateComponent implements OnInit{
  clinicId: string = "";
  editClinicForm!: FormGroup;
  clinicInfo!: ClinicResponseModel;

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
    this.clinicId = this.route.snapshot.paramMap.get('id')!;
    this.editClinicForm = new FormGroup({
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

    this.clinicService.getClinicById(this.clinicId).subscribe({
      next: (data: ClinicResponseModel) => {
        this.clinicInfo = data;
      },
      error: error => {
        this.toastr.error(error.error.message);
      }
    });
  }

  validateControl = (controlName: string) => {
    return this.editClinicForm.get(controlName)?.invalid && this.editClinicForm.get(controlName)?.touched
  }
  cancel() : void{
    this.router.navigate(["/clinic-list"])
  }

  submit = (editClinicFormValue:any) => {

    const info = {...editClinicFormValue};

    const clinicObject: ClinicRequestBodyModel = {
      name: info.name,
      address: info.address,
      description: info.description,
      phone: info.phone
    }

    this.clinicService.updateClinic(clinicObject, this.clinicId).subscribe({
      next: (data: ClinicResponseModel) => {
        this.toastr.success("Updated successfully");
        this.router.navigate(["/clinic-list"])
      },
      error: error => {
        this.toastr.error(error.error.message);
      }
    });
  }
}
