import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from './icon-button/icon-button.component';
import {RouterLink} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [
    IconButtonComponent
  ],
  exports: [
    IconButtonComponent
  ],
    imports: [
        CommonModule,
        RouterLink,
        FontAwesomeModule
    ]
})
export class IconButtonModule { }
