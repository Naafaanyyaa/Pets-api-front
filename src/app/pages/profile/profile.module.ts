import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import {RouterModule} from "@angular/router";
import {HeaderModule} from "../../shared/components/header/header.module";
import {StateStream, Store} from "@ngxs/store";
import {InternalStateOperations} from "@ngxs/store/src/internal/state-operations";
import {MainButtonModule} from "../../shared/components/main-button/main-button.module";
import {ProfileEditComponent} from "./profile-edit/profile-edit.component";
import { ProfileEditPasswordComponent } from './profile-edit-password/profile-edit-password.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputModule} from "../../shared/components/input/input.module";



@NgModule({
  declarations: [
    ProfileComponent,
    ProfileEditComponent,
    ProfileEditPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'profile', component: ProfileComponent},
      {path: 'profile/edit', component: ProfileEditComponent},
      {path: 'profile/changePassword', component: ProfileEditPasswordComponent}
    ]),
    HeaderModule,
    MainButtonModule,
    FormsModule,
    InputModule,
    ReactiveFormsModule,
  ]
})
export class ProfileModule { }
