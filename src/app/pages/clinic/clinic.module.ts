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



@NgModule({
  declarations: [
    ClinicListComponent,
    ClinicViewPageComponent,
    ClinicAddPageComponent,
    ClinicUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'clinic-list', component: ClinicListComponent},
      {path: 'clinic/:id', component: ClinicViewPageComponent},
      {path: 'add-clinic', component: ClinicAddPageComponent},
      {path: 'update-clinic/:id', component: ClinicAddPageComponent},
    ]),
    HeaderModule,
    MainButtonModule,
    FormsModule,
    InputModule,
    ReactiveFormsModule,
  ],
  providers: [UserInformationCollectorService],
})
export class ClinicModule { }
