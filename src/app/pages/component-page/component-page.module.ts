import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentPageComponent } from './component-page/component-page.component';
import {RouterModule} from "@angular/router";
import {IconButtonModule} from "../../shared/components/icon-button/icon-button.module";
import {HeaderModule} from "../../shared/components/header/header.module";


@NgModule({
  declarations: [
    ComponentPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComponentPageComponent,
      }
    ]),
    IconButtonModule,
    HeaderModule
  ]
})
export class ComponentPageModule { }
