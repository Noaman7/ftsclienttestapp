import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { LoginComponent } from './login/login.component';
import { FetchUserComponent } from './fetch-user/fetch-user.component';
import { RouterModule, Routes } from '@angular/router'

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PendingApprovalsComponent } from './pending-approvals/pending-approvals.component';

import { UploadConfigComponent } from './upload-config/upload-config.component';

import { JwtInterceptor } from './helper/jwt.interceptor';
import { ErrorInterceptor } from './helper/error.interceptor';
import { NavtabComponent } from './navtab/navtab.component';
const routes: Routes = [
  { path: 'adduser', component: AddUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: FetchUserComponent },
  { path: '', component: LoginComponent },
  { path: 'pending', component: PendingApprovalsComponent },
  { path: 'upload', component: UploadConfigComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    LoginComponent,
    FetchUserComponent,
    PendingApprovalsComponent,
    UploadConfigComponent,
    NavtabComponent,


  ],
  exports: [RouterModule],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
