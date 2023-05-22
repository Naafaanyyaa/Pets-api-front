import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalListComponent } from './animal-list/animal-list.component';
import {RouterModule} from "@angular/router";
import {HeaderModule} from "../../shared/components/header/header.module";
import {MainButtonModule} from "../../shared/components/main-button/main-button.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputModule} from "../../shared/components/input/input.module";
import {LoginButtonModule} from "../../shared/components/login-button/login-button.module";
import {UserInformationCollectorService} from "../../shared/services/userInformationCollector.service";
import { AnimalAddPageComponent } from './animal-add-page/animal-add-page.component';
import { AnimalViewComponent } from './animal-view/animal-view.component';



@NgModule({
  declarations: [
    AnimalListComponent,
    AnimalAddPageComponent,
    AnimalViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'animal-panel', component: AnimalListComponent},
      {path: 'add-animal', component: AnimalAddPageComponent},
    ]),
    HeaderModule,
    MainButtonModule,
    FormsModule,
    InputModule,
    ReactiveFormsModule,
    LoginButtonModule,
  ],
  providers: [UserInformationCollectorService]
})
export class AnimalModule { }
