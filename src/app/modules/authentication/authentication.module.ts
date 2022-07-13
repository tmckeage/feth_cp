import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from 'src/app/modules/authentication/login/login.component';
import { ForgotPasswordComponent } from 'src/app/modules/authentication/forgot-password/forgot-password.component';
import { SetPasswordComponent } from 'src/app/modules/authentication/set-password/set-password.component';
import { VerifyUserComponent } from 'src/app/modules/authentication/verify-user/verify-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    SetPasswordComponent,
    VerifyUserComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LoginComponent,
    ForgotPasswordComponent,
    SetPasswordComponent,
    VerifyUserComponent,
  ]
})
export class AuthenticationModule { }
