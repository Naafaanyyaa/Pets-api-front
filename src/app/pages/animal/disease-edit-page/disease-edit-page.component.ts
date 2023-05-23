import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MainButtonInterface} from "../../../shared/components/main-button/models/main-button.interface";
import {faCheck, faSignature, faUser, faXmark} from "@fortawesome/free-solid-svg-icons";
import {IInput} from "../../../shared/components/input/models/input.interface";
import {UserInformationCollectorService} from "../../../shared/services/userInformationCollector.service";
import {DiseaseService} from "../service/disease-service.service";
import {AdminService} from "../../admin-page/services/admin-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {ToastrService} from "ngx-toastr";
import {DiseaseRequestModel} from "../models/disease-request.model";
import {DiseaseResponseModel} from "../models/disease-response.model";

@Component({
  selector: 'app-disease-edit-page',
  templateUrl: './disease-edit-page.component.html',
  styleUrls: ['./disease-edit-page.component.css']
})
export class DiseaseEditPageComponent implements OnInit{
  addUserForm!: FormGroup;
  diseaseId: string = "";
  diseaseInfo!: DiseaseResponseModel;
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
    placeholder: 'Name of disease',
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
  public recommendationsConfig: IInput = {
    type: 'default',
    placeholder: 'Recommendations',
    isDisabled: false,
    error:"Error",
    icon: faSignature
  }
  constructor( private userInformation: UserInformationCollectorService,private diseaseService: DiseaseService, private adminService: AdminService, private route: ActivatedRoute,private router: Router, private  userService: UserService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.diseaseId = this.route.snapshot.paramMap.get('id')!;
    this.addUserForm = new FormGroup({
      "name": new FormControl("", Validators.minLength(2)),
      "description": new FormControl("",
        [Validators.minLength(2)
        ]),
      "recommendations": new FormControl("",
        [Validators.minLength(2)
        ])
    })

    this.diseaseService.getDiseaseById(this.diseaseId).subscribe({
      next:(data:DiseaseResponseModel) => {
        this.diseaseInfo = data;
      },
      error:(error)=>{
        this.toastr.error(error.error)
      }
    })
  }

  validateControl = (controlName: string) => {
    return this.addUserForm.get(controlName)?.invalid && this.addUserForm.get(controlName)?.touched
  }
  cancel() : void{
    this.router.navigate([`/animal-panel/`])
  }

  //TODO: change endpoint
  submit = (addDiseaseFormValue:any) => {

    const info = {...addDiseaseFormValue};

    let diseaseObject: DiseaseRequestModel = {
      nameOfDisease: info.name,
      diseaseDescription: info.description,
      recommendations: info.recommendations
    }
    this.diseaseService.updateDisease(diseaseObject, this.diseaseId).subscribe({
      next: (data: DiseaseResponseModel) => {
        this.toastr.success("Added successfully");
        this.router.navigate([`/animal-panel/`])
      },
      error: error => {
        this.toastr.error(error.error.message);
      }
    });
  }
}
