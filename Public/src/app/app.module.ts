import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { PasswordRestartComponent } from './components/password-restart/password-restart.component';
import { HomeComponent } from './components/auth/home/home.component';
import { AuthService } from './services/auth.service';
import { PasswordTokenComponent } from './components/password-token/password-token.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HeaderComponent } from './components/auth/common/header/header.component';
import { TableComponent } from './components/auth/common/table/table.component';
import { UsersSettingsComponent } from './components/auth/users-settings/users-settings.component';
import { CodeComponent } from './components/auth/repository/code/code.component';
import { IssuesComponent } from './components/auth/repository/issues/issues.component';
import { PullRequestesComponent } from './components/auth/repository/pull-requestes/pull-requestes.component';
import { SettingsComponent } from './components/auth/repository/settings/settings.component';
import { RepositoryComponent } from './components/auth/repository/repository/repository.component';
import { StatisticComponent } from './components/auth/repository/statistic/statistic.component';
import { MenuComponent } from './components/auth/repository/menu/menu.component';
import { AddFilesComponent } from './components/auth/repository/add-files/add-files.component';
import { AddIssuesComponent } from './components/auth/repository/add-issues/add-issues.component';
import { OpenIssuesComponent } from './components/auth/repository/open-issues/open-issues.component';
import { AddNewRepositoryComponent } from './components/auth/home/add-new-repository/add-new-repository.component';
import { GeneralComponent } from './components/auth/repository/settings/general/general.component';
import { CollaboratorsComponent } from './components/auth/repository/settings/collaborators/collaborators.component';
import { BranchesComponent } from './components/auth/repository/settings/branches/branches.component';
import { TagsComponent } from './components/auth/repository/settings/tags/tags.component';
import { UploadFilesComponent } from './components/auth/repository/upload-files/upload-files.component';
import { AllRepoComponent } from './components/auth/home/all-repo/all-repo.component';
import { AllProjectsComponent } from './components/auth/home/all-projects/all-projects.component';
import { OverviewComponent } from './components/auth/home/overview/overview.component';
import { EditProfileComponent } from './components/auth/home/edit-profile/edit-profile.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    PasswordRestartComponent,
    HomeComponent,
    PasswordTokenComponent,
    NewPasswordComponent,
    RegistrationComponent,
    HeaderComponent,
    TableComponent,
    UsersSettingsComponent,
    CodeComponent,
    IssuesComponent,
    PullRequestesComponent,
    SettingsComponent,
    RepositoryComponent,
    StatisticComponent,
    MenuComponent,
    AddFilesComponent,
    AddIssuesComponent,
    OpenIssuesComponent,
    AddNewRepositoryComponent,
    GeneralComponent,
    CollaboratorsComponent,
    BranchesComponent,
    TagsComponent,
    UploadFilesComponent,
    AllRepoComponent,
    AllProjectsComponent,
    OverviewComponent,
    EditProfileComponent
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
    HttpClientModule,
    PlotlyModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
