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



@NgModule({
  declarations: [
    ClinicListComponent,
    ClinicViewPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'clinic-list', component: ClinicListComponent}
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
