import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AuthInterceptor} from "./shared/services/user.service.interceptor";
import {UserService} from "./shared/services/user.service";
import {AppRoutingModule} from "./app-routing.module";
import {Page404Module} from "./pages/page404/page404.module";
import {LoginModule} from "./authentication/login/login.module";
import { ProfileEditComponent } from './pages/profile/profile-edit/profile-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileEditComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      closeButton:true,
      maxOpened:2
    }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule,
    Page404Module,
    LoginModule
  ],
  providers: [UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


