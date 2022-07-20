import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReviewComponent } from 'src/app/modules/review/review/review.component';
import { TransducerComponent } from 'src/app/modules/review/transducer/transducer.component';
import { VerticalDistanceComponent } from 'src/app/modules/review/vertical-distance/vertical-distance.component';
import { HorizontalDistanceComponent } from 'src/app/modules/review/horizontal-distance/horizontal-distance.component';
import { UniformityComponent } from 'src/app/modules/review/uniformity/uniformity.component';
import { LineChartComponent } from 'src/app/modules/review/line-chart/line-chart.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
    { path: 'review', children:[
        { path:'', component: ReviewComponent},
        { path:'transducer', component:TransducerComponent},
        { path:'vertical', component:VerticalDistanceComponent},
        { path:'horizontal', component:HorizontalDistanceComponent},
        { path:'uniformity', component:UniformityComponent},
        { path:'line-graph' , component:LineChartComponent, }
    ], canActivate: [AuthGuard]}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class ReviewRoutingModule { }