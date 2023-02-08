import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloPageComponent } from './hello-page/hello-page.component';
import {RouterModule} from "@angular/router";
import {HeaderModule} from "../shared/components/header/header.module";



@NgModule({
  declarations: [
    HelloPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component:HelloPageComponent,
      }
    ]),
    HeaderModule
  ],
  exports: [
    HelloPageComponent
  ]
})
export class HelloPageModule { }
