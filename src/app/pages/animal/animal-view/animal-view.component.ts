import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AdminService} from "../../admin-page/services/admin-service.service";
import {UserInformationCollectorService} from "../../../shared/services/userInformationCollector.service";
import {AnimalService} from "../service/animal-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AnimalResponseModel} from "../models/animal-response.model";
import {MainButtonInterface} from "../../../shared/components/main-button/models/main-button.interface";
import {faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {DiseaseResponseModel} from "../models/disease-response.model";
import {DiseaseService} from "../service/disease-service.service";

@Component({
  selector: 'app-animal-view',
  templateUrl: './animal-view.component.html',
  styleUrls: ['./animal-view.component.css', '../../../../util.css']
})
export class AnimalViewComponent implements OnInit{
  animalId: string = "";
  animalInfo!: AnimalResponseModel;
  diseaseList?: DiseaseResponseModel[];
  isOwner: boolean = false;

  public deleteButton: MainButtonInterface = {
    classes: "red",
    icon: faTrash,
    size: "default",
    text: "Delete"
  }
  public editButton: MainButtonInterface = {
    classes: "yellow",
    icon: faPencil,
    size: "default",
    text: "Edit"
  }
  constructor(private diseaseService: DiseaseService, private userInformation: UserInformationCollectorService,private animalService: AnimalService, private route: ActivatedRoute,private router: Router, private toastr: ToastrService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.animalId = this.route.snapshot.paramMap.get('id')!;
    this.animalService.getAnimalById(this.animalId).subscribe({
      next:(data:AnimalResponseModel) => {
        this.animalInfo = data;
      },
      error: (error) =>{
        this.toastr.error(error.error)
      }
    });

    this.diseaseService.getDiseaseList(this.animalId).subscribe({
      next: (data : DiseaseResponseModel[]) =>{
        this.diseaseList = data;
      },
      error:(error) =>{
        this.toastr.error(error.error)
      }
    })
  }

  editAnimal(): void{
    this.router.navigate([`edit-animal/${this.animalId}`])
  }

  deleteAnimal(): void{
    this.animalService.deleteById(this.animalId).subscribe({
      next : () => {
        this.toastr.success("Deleted successfully")
        this.router.navigate(['/animal-panel'])
      },
      error: (err) =>{
        this.toastr.error(err.error)
      }
    })
  }

  addDisease(animalId:string):void{
    this.router.navigate([`add-disease/${animalId}`])
  }

  editDisease(diseaseId:string){
    this.router.navigate([`edit-disease/${diseaseId}`])
  }

  deleteDisease(diseaseId: string){
    this.diseaseService.deleteDiseaseById(diseaseId).subscribe({
      next:() =>{
        this.toastr.success("Deleted successfully")

      },
      error:(error) =>{
        this.toastr.error(error.error)
      }
    })
  }

  public get isOwnerCheck() {
    if(this.userInformation.userInfo && this.userInformation.userInfo.id == this.animalInfo.userId){
      return  true;
    }
    return false;
  }

  public get isDoctorCheck() {
    if (this.userInformation.userInfo) {
      for (let role of this.userInformation.userInfo.role) {
        if (role == "Doctor") return true;
      }
    }
    return false;
  }

}
