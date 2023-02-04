import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from "./input/input.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations:
    [
      InputComponent,
    ],
  exports: [
    InputComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class InputModule { }
