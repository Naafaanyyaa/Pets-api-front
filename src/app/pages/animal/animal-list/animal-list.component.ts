import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserInformationCollectorService} from "../../../shared/services/userInformationCollector.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AnimalResponseModel} from "../models/animal-response.model";
import {AnimalService} from "../service/animal-service.service";
import {ClinicResponseModel} from "../../clinic/models/ClinicResponse.model";
import {UserProfileModel} from "../../profile/models/user-profile.model";
import {AdminService} from "../../admin-page/services/admin-service.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit{
  animalList?: AnimalResponseModel[];
  constructor(private adminService: AdminService, private userInformation: UserInformationCollectorService,private animalService: AnimalService, private route: ActivatedRoute,private router: Router, private toastr: ToastrService, private cdRef: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.refreshAnimalList();
  }
  public get checkRole() {
    if (this.userInformation.userInfo) {
      for (let role of this.userInformation.userInfo.role) {
        if (role == "Doctor") return true;
      }
    }
    return false;
  }
  addAnimal(){
    this.router.navigate(['add-animal'])
  }
  viewAnimal(){
    this.router.navigate(['view-animal'])
  }
  refreshAnimalList(): void {
    this.animalService.getAnimalList().subscribe({
      next: (data?: AnimalResponseModel[]) => {
        this.animalList = data;
      },
      error: error => console.log(error)
    })
  }


  filterAnimal() : void{
    const searchingString: string = (document.querySelector('#searchingString') as HTMLInputElement)?.value ?? "";

    this.animalService.getAnimalList(searchingString).subscribe({
      next: (data: AnimalResponseModel[]) => {
        this.animalList = data;
      },
      error: (error) =>{
        this.toastr.error(error.error)
      }
    })
  }
}
