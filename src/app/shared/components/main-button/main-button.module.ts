import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainButtonComponent } from './main-button/main-button.component';
import {RouterLink} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
    declarations: [
        MainButtonComponent
    ],
    exports: [
        MainButtonComponent
    ],
  imports: [
    CommonModule,
    RouterLink,
    FontAwesomeModule
  ]
})
export class MainButtonModule { }
