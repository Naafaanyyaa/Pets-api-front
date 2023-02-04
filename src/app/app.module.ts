import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule} from "@angular/router";

import { AppComponent } from './app.component';
import {InputComponent} from "./shared/components/input/input.component";
import { LoginComponent } from './authentication/login/login.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentTestComponent } from './component-test/component-test.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { Page404Component } from './pages/page404/page404.component';
import { LoginButtonComponent } from './shared/components/login-button/login-button.component';
import {AuthInterceptor} from "./shared/services/user.service.Interceptor";
import {UserService} from "./shared/services/user.service";

const routes: Routes = [

  {path: 'login', component: LoginComponent, data: {isLoginMode:true}},
  {path: 'registration', component: RegistrationComponent},
  {path: 'components', component: ComponentTestComponent},
  {path: '**', component: Page404Component}
];

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    LoginComponent,
    ComponentTestComponent,
    ErrorComponent,
    RegistrationComponent,
    Page404Component,
    LoginButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [ UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


