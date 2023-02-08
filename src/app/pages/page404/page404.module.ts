import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {Page404Component} from "./page404/page404.component";




@NgModule({
  declarations: [
    Page404Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '**',
        component: Page404Component,
      }
    ]),
  ]
})
export class Page404Module { }
