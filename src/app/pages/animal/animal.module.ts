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
import { AnimalEditComponent } from './animal-edit/animal-edit.component';
import { DiseaseAddPageComponent } from './disease-add-page/disease-add-page.component';
import { DiseaseEditPageComponent } from './disease-edit-page/disease-edit-page.component';



@NgModule({
  declarations: [
    AnimalListComponent,
    AnimalAddPageComponent,
    AnimalViewComponent,
    AnimalEditComponent,
    DiseaseAddPageComponent,
    DiseaseEditPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'animal-panel', component: AnimalListComponent},
      {path: 'add-animal', component: AnimalAddPageComponent},
      {path: 'view-animal/:id', component: AnimalViewComponent},
      {path: 'edit-animal/:id', component: AnimalEditComponent},
      {path: 'add-disease/:id', component: DiseaseAddPageComponent},
      {path: 'edit-disease/:id', component: DiseaseEditPageComponent},
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
