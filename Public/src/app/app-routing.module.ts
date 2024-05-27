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
import { UsersSettingsComponent } from './components/auth/users-settings/users-settings.component';
import { CodeComponent } from './components/auth/repository/code/code.component';
import { IssuesComponent } from './components/auth/repository/issues/issues.component';
import { PullRequestesComponent } from './components/auth/repository/pull-requestes/pull-requestes.component';
import { SettingsComponent } from './components/auth/repository/settings/settings.component';
import { RepositoryComponent } from './components/auth/repository/repository/repository.component';
import { AddNewRepositoryComponent } from './components/auth/home/add-new-repository/add-new-repository.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'new', component: AddNewRepositoryComponent },
  { path: 'login', component: LoginComponent, canActivateChild: [authGuardChild] },
  { path: 'restart-password', component: PasswordRestartComponent, canActivateChild: [authGuardChild] },
  { path: 'paswword-token', component: PasswordTokenComponent, canActivateChild: [authGuardChild] },
  { path: 'new-password', component: NewPasswordComponent, canActivateChild: [authGuardChild] },
  { path: 'registration', component: RegistrationComponent, canActivate: [authGuard] },
  { path: 'user-settings', component: UsersSettingsComponent, canActivateChild: [authGuardChild] },
  { path: 'repository/:repositoryId/:type', component: RepositoryComponent, canActivateChild: [authGuardChild] },
  { path: 'repository/:repositoryId/:type/folder/:folderName', component: RepositoryComponent, canActivate: [authGuardChild] },
  // { path: 'repository/:repositoryId', component: CodeComponent, canActivateChild: [authGuardChild] },
  // { path: 'repository/:repositoryId/issues', component: IssuesComponent, canActivateChild: [authGuardChild] },
  // { path: 'repository/:repositoryId/pull-requests', component: PullRequestesComponent, canActivateChild: [authGuardChild] },
  // { path: 'repository/:repositoryId/settings', component: SettingsComponent, canActivateChild: [authGuardChild] },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
