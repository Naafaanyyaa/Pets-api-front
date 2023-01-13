import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { InputTextFieldComponent } from './shared/components/input-text-field/input-text-field.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InputTextFieldComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
