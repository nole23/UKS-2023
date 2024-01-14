import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { PasswordRestartComponent } from './components/password-restart/password-restart.component';
import { HomeComponent } from './components/auth/home/home.component';
import { AuthService } from './services/auth.service';
import { PasswordTokenComponent } from './components/password-token/password-token.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    PasswordRestartComponent,
    HomeComponent,
    PasswordTokenComponent,
    NewPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
      newestOnTop: false,
      timeOut: 5000,
      extendedTimeOut: 1000,
      // druge opcije...
    }),
    HttpClientModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
