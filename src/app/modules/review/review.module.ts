import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReviewComponent } from 'src/app/modules/review/review/review.component';
import { TransducerComponent } from 'src/app/modules/review/transducer/transducer.component';
import { VerticalDistanceComponent } from 'src/app/modules/review/vertical-distance/vertical-distance.component';
import { HorizontalDistanceComponent } from 'src/app/modules/review/horizontal-distance/horizontal-distance.component';
import { UniformityComponent } from 'src/app/modules/review/uniformity/uniformity.component';
import { LineChartComponent } from 'src/app/modules/review/line-chart/line-chart.component';
import { ReviewRoutingModule } from 'src/app/modules/review/review-routing.module';
// Import ngx-barcode module
import { NgxBarcode6Module } from 'ngx-barcode6';
import { NgxPrintModule } from 'ngx-print';

// line chart 
import { ChartsModule } from 'ng2-charts';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReviewComponent,
    TransducerComponent,
    VerticalDistanceComponent,
    HorizontalDistanceComponent,
    UniformityComponent,
    LineChartComponent
  ],
  imports: [
    CommonModule,
    ReviewRoutingModule,
    ChartsModule,
    NgxBarcode6Module,
    NgxPrintModule,
    AngularMaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    DatePipe 
  ],
  exports: [
    ReviewComponent,
    TransducerComponent,
    VerticalDistanceComponent,
    HorizontalDistanceComponent,
    UniformityComponent,
    LineChartComponent
  ]
})
export class ReviewModule { }