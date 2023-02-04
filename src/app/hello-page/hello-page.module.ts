import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloPageComponent } from './hello-page/hello-page.component';
import {RouterModule} from "@angular/router";



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
    ])
  ],
  exports: [
    HelloPageComponent
  ]
})
export class HelloPageModule { }
