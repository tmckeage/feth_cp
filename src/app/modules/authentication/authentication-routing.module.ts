import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/modules/authentication/login/login.component';
import { ForgotPasswordComponent } from 'src/app/modules/authentication/forgot-password/forgot-password.component';
import { SetPasswordComponent } from 'src/app/modules/authentication/set-password/set-password.component';
import { RequestReceivedComponent } from 'src/app/component/request-received/request-received.component';
import { VerifyUserComponent } from 'src/app/modules/authentication/verify-user/verify-user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'set-password', component: SetPasswordComponent },
  { path: 'request', component: RequestReceivedComponent },
  { path: 'verify-user/:userName/:code', component:VerifyUserComponent },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AuthenticationRoutingModule { }
