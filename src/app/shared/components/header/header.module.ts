import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {IconButtonModule} from "../icon-button/icon-button.module";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IconButtonModule,
    RouterLink,
    TranslateModule
  ]
})
export class HeaderModule { }
