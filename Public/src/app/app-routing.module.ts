import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { authGuard, authGuardChild } from './common/auth.guard';
import { PasswordRestartComponent } from './components/password-restart/password-restart.component';
import { PasswordTokenComponent } from './components/password-token/password-token.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { HomeComponent } from './components/auth/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { InfoComponent } from './components/auth/repositopry/info/info.component';
import { UsersSettingsComponent } from './components/auth/users-settings/users-settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent, canActivateChild: [authGuardChild] },
  { path: 'restart-password', component: PasswordRestartComponent, canActivateChild: [authGuardChild] },
  { path: 'paswword-token', component: PasswordTokenComponent, canActivateChild: [authGuardChild] },
  { path: 'new-password', component: NewPasswordComponent, canActivateChild: [authGuardChild] },
  { path: 'registration', component: RegistrationComponent, canActivate: [authGuard] },
  { path: 'user-settings', component: UsersSettingsComponent, canActivateChild: [authGuardChild] },
  { path: 'repositoru/:repositoryName', component: InfoComponent, canActivateChild: [authGuardChild] },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
