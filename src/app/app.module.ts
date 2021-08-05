import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { EquipmentComponent } from './component/equipment/equipment.component';
import { ReviewComponent } from './component/review/review.component';
import { ReportsComponent } from './component/reports/reports.component';
import { AnalysisComponent } from './component/analysis/analysis.component';
import { UsersComponent } from './component/users/users.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EquipmentComponent,
    ReviewComponent,
    ReportsComponent,
    AnalysisComponent,
    UsersComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
