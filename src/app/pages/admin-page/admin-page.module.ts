import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';
import {HeaderModule} from "../../shared/components/header/header.module";
import {MainButtonModule} from "../../shared/components/main-button/main-button.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputModule} from "../../shared/components/input/input.module";
import {RouterModule} from "@angular/router";
import { AdminEditRolePageComponent } from './admin-edit-role-page/admin-edit-role-page.component';


@NgModule({
  declarations: [
    AdminPageComponent,
    AdminEditRolePageComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule.forChild([
      {path: 'admin-panel', component: AdminPageComponent}
    ]),
    MainButtonModule,
    FormsModule,
    InputModule,
    ReactiveFormsModule
  ]
})
export class AdminPageModule { }
