import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RoleEnum} from "../../admin-page/models/role-enum.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ClinicService} from "../clinic-service/ClinicService.service";
import {ClinicResponseModel} from "../models/ClinicResponse.model";
import {UserInformationCollectorService} from "../../../shared/services/userInformationCollector.service";

@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrls: ['./clinic-list.component.css', '../../../../util.css']
})
export class ClinicListComponent implements OnInit{
  public clinicList? : ClinicResponseModel[];
  constructor(private userInformation: UserInformationCollectorService,private clinicService: ClinicService, private route: ActivatedRoute,private router: Router, private toastr: ToastrService, private cdRef: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.refreshClinicList();

  }
  public get isAdmin() {
    if (this.userInformation.userInfo) {
      for (let role of this.userInformation.userInfo.role) {
        if (role == "Admin") return true;
      }
    }
    return false;
  }
  banClinic(clinicId : string) : void{
    this.clinicService.banClinic(clinicId).subscribe({
      next:() => {
        this.toastr.warning("Clinic access changed");
        this.refreshClinicList();
      },
      error: error => {
        console.log(error);
        this.toastr.error(error.error);
      }
    });
  }
  refreshClinicList(): void {
    this.clinicService.getClinicList().subscribe({
      next: (data?: ClinicResponseModel[]) => {
        this.clinicList = data;
      },
      error: error => console.log(error)
    })
  }

  filterClinic() : void{
    const searchingString = (document.querySelector('#searchingString') as HTMLInputElement).value;
    this.clinicService.getClinicList(searchingString).subscribe({
      next: (data?:ClinicResponseModel[]) => {
        this.clinicList = data;
      },
      error: err => {
        this.toastr.error(err.error)
      }
    });
  }

  getClinic(clinicId: string) : void{
    this.router.navigate([`clinic/${clinicId}`]);
  }
}
