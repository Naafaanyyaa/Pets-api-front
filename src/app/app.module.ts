import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AuthInterceptor} from "./shared/services/user.service.interceptor";
import {UserService} from "./shared/services/user.service";
import {AppRoutingModule} from "./app-routing.module";
import {Page404Module} from "./pages/page404/page404.module";
import {LoginModule} from "./authentication/login/login.module";
import {HeaderModule} from "./shared/components/header/header.module";
import {MainButtonModule} from "./shared/components/main-button/main-button.module";
import {InputModule} from "./shared/components/input/input.module";
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      closeButton: true,
      maxOpened: 2
    }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule,
    Page404Module,
    LoginModule,
    HeaderModule,
    MainButtonModule,
    InputModule,
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: (http:HttpClient) => {return new TranslateHttpLoader(http, './assets/i18n/', '.json');},
        deps: [HttpClient]
      }
    })
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

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}


