import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { EquipmentComponent } from './component/equipment/equipment.component';
import { ReviewComponent } from './component/review/review.component';
import { ReportsComponent } from './component/reports/reports.component';
import { AnalysisComponent } from './component/analysis/analysis.component';
import { UsersComponent } from './component/users/users.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SetPasswordComponent } from './component/set-password/set-password.component';
import { RequestReceivedComponent } from './component/request-received/request-received.component';

// AWS
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Fontawesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// toster masange
import { ToastrModule } from 'ngx-toastr';

// Angular material
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { NavbarComponent } from './component/navbar/navbar.component';
import { VerifyUserComponent } from './component/verify-user/verify-user.component';
import { DatePipe } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TransducerComponent } from './component/review/transducer/transducer.component';
import { VerticalDistanceComponent } from './component/review/vertical-distance/vertical-distance.component';
import { HorizontalDistanceComponent } from './component/review/horizontal-distance/horizontal-distance.component';
import { UniformityComponent } from './component/review/uniformity/uniformity.component';

// Import ngx-barcode module
import { NgxBarcode6Module } from 'ngx-barcode6';
import {NgxPrintModule} from 'ngx-print';
import { LineChartComponent } from '../app/component/review/line-chart/line-chart.component';
// line chart 
import { ChartsModule } from 'ng2-charts'; 


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
    SetPasswordComponent,
    RequestReceivedComponent,
    NavbarComponent,
    VerifyUserComponent,
    TransducerComponent,
    VerticalDistanceComponent,
    HorizontalDistanceComponent,
    UniformityComponent,
    LineChartComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    AgGridModule.withComponents([]),
    NgbModule,
    AngularMaterialModule,
    AmplifyAngularModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule, 
    NgxBarcode6Module,
    NgxPrintModule,
    ChartsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    AmplifyService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
