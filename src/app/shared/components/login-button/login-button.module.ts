import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginButtonComponent} from "./login-button/login-button.component";

@NgModule({
  declarations: [
    LoginButtonComponent
  ],
  exports: [
    LoginButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LoginButtonModule { }
