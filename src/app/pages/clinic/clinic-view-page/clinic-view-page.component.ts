import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserInformationCollectorService} from "../../../shared/services/userInformationCollector.service";
import {ClinicService} from "../clinic-service/ClinicService.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ClinicResponseModel} from "../models/ClinicResponse.model";

@Component({
  selector: 'app-clinic-view-page',
  templateUrl: './clinic-view-page.component.html',
  styleUrls: ['./clinic-view-page.component.css']
})
export class ClinicViewPageComponent implements OnInit{
  clinicId: string = "";
  clinicData?: ClinicResponseModel;
  constructor(private userInformation: UserInformationCollectorService,private clinicService: ClinicService, private route: ActivatedRoute,private router: Router, private toastr: ToastrService, private cdRef: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.clinicId = this.route.snapshot.paramMap.get('id')!;

    this.clinicService.getClinicById(this.clinicId).subscribe({
      next:(data: ClinicResponseModel) => {
        this.clinicData = data;
      },
      error: error => {
        console.log(error);
        this.toastr.error(error.error);
      }
    });
  }

  deleteClinic(): void {
    this.clinicService.deleteClinic(this.clinicId).subscribe({
      next: () => {
       this.toastr.success("Clinic was deleted")
      },
      error: err => {
        this.toastr.error(err.error)
      }
    });
  }
  updateClinic(): void{
    this.router.navigate([`update-clinic/${this.clinicId}`])
  }
  createDoctor():void{
    this.router.navigate([`clinic/add-doctor/${this.clinicId}`])
  }
}
