import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { EquipmentComponent } from './component/equipment/equipment.component';
import { ReviewComponent } from './modules/review/review/review.component';
import { ReportsComponent } from './component/reports/reports.component';
import { UsersComponent } from './component/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RequestReceivedComponent } from './component/request-received/request-received.component';

// Interceptors
import { AuthTokenInterceptor } from './interceptor/AuthTokenInterceptor';

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
import { DatePipe } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TransducerComponent } from './modules/review/transducer/transducer.component';
import { VerticalDistanceComponent } from './modules/review/vertical-distance/vertical-distance.component';
import { HorizontalDistanceComponent } from './modules/review/horizontal-distance/horizontal-distance.component';
import { UniformityComponent } from './modules/review/uniformity/uniformity.component';
import { LineChartComponent } from './modules/review/line-chart/line-chart.component';

// Import ngx-barcode module
import { NgxBarcode6Module } from 'ngx-barcode6';
import { NgxPrintModule } from 'ngx-print';

// line chart 
import { ChartsModule } from 'ng2-charts';
import { AuthService } from './services/auth.service';

// Authentication module
import { AuthenticationModule } from './modules/authentication/authentication.module';

// Review module
import { ReviewModule } from './modules/review/review.module';
import { AnalysisComponent } from './component/analysis/analysis.component';

import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { BasicEquipmentEvaluationComponent } from './component/equipment/basic-equipment-evaluation/basic-equipment-evaluation.component';
import { ScannerEquipmentLayoutComponent } from './component/equipment/basic-equipment-evaluation/scanner-equipment-layout/scanner-equipment-layout.component';
import { TransducerEquipmentLayoutComponent } from './component/equipment/basic-equipment-evaluation/transducer-equipment-layout/transducer-equipment-layout.component';
import { EvaluationsComponent } from './component/evaluations/evaluations.component';
import { EvalutionReviewComponent } from './component/evaluations/evalution-review/evalution-review.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  declarations: [
    AppComponent,
    CanvasJSChart,
    EquipmentComponent,
    ReportsComponent,
    UsersComponent,
    RequestReceivedComponent,
    NavbarComponent,
    AnalysisComponent,
    BasicEquipmentEvaluationComponent,
    ScannerEquipmentLayoutComponent,
    TransducerEquipmentLayoutComponent,
    EvaluationsComponent,
    EvalutionReviewComponent
  ],
  imports: [
    AuthenticationModule,
    CommonModule,
    ReviewModule,
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
    AuthService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true, deps: [AuthService]}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
