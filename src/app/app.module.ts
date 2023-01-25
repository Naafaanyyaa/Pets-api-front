import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule} from "@angular/router";

import { AppComponent } from './app.component';
import {InputComponent} from "./shared/components/input/input.component";
import { LoginComponent } from './authentication/login/login.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [

  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,

    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


