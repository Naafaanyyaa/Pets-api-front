import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import {RouterModule} from "@angular/router";
import {HeaderModule} from "../../shared/components/header/header.module";
import {StateStream, Store} from "@ngxs/store";
import {InternalStateOperations} from "@ngxs/store/src/internal/state-operations";
import {MainButtonModule} from "../../shared/components/main-button/main-button.module";
import {ProfileEditComponent} from "./profile-edit/profile-edit.component";



@NgModule({
  declarations: [
    ProfileComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
          {path: 'profile/:id', component: ProfileComponent},
          {path: 'profile/edit/:id', component: ProfileEditComponent}
        ]),
        HeaderModule,
        MainButtonModule,
    ]
})
export class ProfileModule { }
