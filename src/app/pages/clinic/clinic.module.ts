import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicListComponent } from './clinic-list/clinic-list.component';
import {RouterModule} from "@angular/router";
import {HeaderModule} from "../../shared/components/header/header.module";
import {MainButtonModule} from "../../shared/components/main-button/main-button.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputModule} from "../../shared/components/input/input.module";
import {UserInformationCollectorService} from "../../shared/services/userInformationCollector.service";
import { ClinicViewPageComponent } from './clinic-view-page/clinic-view-page.component';
import { ClinicAddPageComponent } from './clinic-add-page/clinic-add-page.component';
import { ClinicUpdateComponent } from './clinic-update/clinic-update.component';
import { ClinicRegisterDoctorComponent } from './clinic-register-doctor/clinic-register-doctor.component';
import {LoginButtonModule} from "../../shared/components/login-button/login-button.module";



@NgModule({
  declarations: [
    ClinicListComponent,
    ClinicViewPageComponent,
    ClinicAddPageComponent,
    ClinicUpdateComponent,
    ClinicRegisterDoctorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'clinic-list', component: ClinicListComponent},
      {path: 'clinic/:id', component: ClinicViewPageComponent},
      {path: 'add-clinic', component: ClinicAddPageComponent},
      {path: 'update-clinic/:id', component: ClinicUpdateComponent},
      {path: 'clinic/add-doctor/:id', component: ClinicRegisterDoctorComponent},
    ]),
    HeaderModule,
    MainButtonModule,
    FormsModule,
    InputModule,
    ReactiveFormsModule,
    LoginButtonModule,
  ],
  providers: [UserInformationCollectorService]
})
export class ClinicModule { }
