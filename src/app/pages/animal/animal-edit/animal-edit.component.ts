import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MainButtonInterface} from "../../../shared/components/main-button/models/main-button.interface";
import {faCheck, faSignature, faUser, faXmark} from "@fortawesome/free-solid-svg-icons";
import {IInput} from "../../../shared/components/input/models/input.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {ToastrService} from "ngx-toastr";
import {UserInformationCollectorService} from "../../../shared/services/userInformationCollector.service";
import {AnimalService} from "../service/animal-service.service";
import {AdminService} from "../../admin-page/services/admin-service.service";
import {AnimalResponseModel} from "../models/animal-response.model";
import {AnimalUpdateRequestModel} from "../models/animal-update-request.model";
import {AnimalTypeEnum} from "../models/animal-type.enum";

@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.component.html',
  styleUrls: ['./animal-edit.component.css']
})
export class AnimalEditComponent implements OnInit{
  animalId: string = "";
  editAnimalForm!: FormGroup;
  animalInfo!: AnimalResponseModel;

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
    this.animalId = this.route.snapshot.paramMap.get('id')!;
    this.editAnimalForm = new FormGroup({
      "name": new FormControl("", Validators.minLength(2)),
      "description": new FormControl("",
        [Validators.minLength(2)
        ]),
      "selectedItem": new FormControl(null)
    })

    this.animalService.getAnimalById(this.animalId).subscribe({
      next: (data: AnimalResponseModel) => {
        this.animalInfo = data;
      },
      error: error => {
        this.toastr.error(error.error.message);
      }
    });
  }

  validateControl = (controlName: string) => {
    return this.editAnimalForm.get(controlName)?.invalid && this.editAnimalForm.get(controlName)?.touched
  }
  cancel() : void{
    this.router.navigate(["/clinic-list"])
  }

  submit = (editAnimalFormValue:any) => {

    const info = {...editAnimalFormValue};

    const animalObject: AnimalUpdateRequestModel = {
      animalName: info.name,
      animalDescription: info.description,
      animalType: info.selectedItem
    }

    this.animalService.updateAnimal(animalObject, this.animalId).subscribe({
      next: (data: AnimalResponseModel) => {
        this.toastr.success("Updated successfully");
        this.router.navigate(["/animal-panel"])
      },
      error: error => {
        this.toastr.error(error.error.message);
      }
    });
  }

  protected readonly AnimalTypeEnum = AnimalTypeEnum;
}
