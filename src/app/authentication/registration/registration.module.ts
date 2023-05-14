import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistrationComponent} from "./registration/registration.component";
import {ReactiveFormsModule} from "@angular/forms";
import {InputModule} from "../../shared/components/input/input.module";
import {LoginButtonModule} from "../../shared/components/login-button/login-button.module";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "../login/login/login.component";
import {HeaderModule} from "../../shared/components/header/header.module";



@NgModule({
  declarations: [
    RegistrationComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputModule,
        LoginButtonModule,
        RouterModule.forChild([
            {
                path: '',
                component: RegistrationComponent,
            }
        ]),
        HeaderModule

    ]
})
export class RegistrationModule { }
