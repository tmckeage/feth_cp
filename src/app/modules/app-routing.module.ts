import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from '../component/analysis/analysis.component';
import { EquipmentComponent } from '../component/equipment/equipment.component';
import { ReportsComponent } from '../component/reports/reports.component';
import { ReviewComponent } from '../component/review/review.component';
import { UsersComponent } from '../component/users/users.component';
import { TransducerComponent } from '../component/review/transducer/transducer.component';
import { VerticalDistanceComponent } from '../component/review/vertical-distance/vertical-distance.component';
import { HorizontalDistanceComponent } from '../component/review/horizontal-distance/horizontal-distance.component';
import { UniformityComponent } from '../component/review/uniformity/uniformity.component';
import {LineChartComponent} from '../component/review/line-chart/line-chart.component';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
    { path: '', component: EquipmentComponent, canActivate: [AuthGuard]},
    { path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard] },
    { path: 'analysis', component: AnalysisComponent, canActivate: [AuthGuard] },
    { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
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
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
