import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {InputModule} from "../../shared/components/input/input.module";
import {LoginButtonModule} from "../../shared/components/login-button/login-button.module";
import {HeaderModule} from "../../shared/components/header/header.module";



@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputModule,
        LoginButtonModule,
        RouterModule.forChild([
            {
                path: '',
                component: LoginComponent,
            }
        ]),
        HeaderModule

    ],
})
export class LoginModule { }
