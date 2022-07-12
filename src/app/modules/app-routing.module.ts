import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from '../component/analysis/analysis.component';
import { EquipmentComponent } from '../component/equipment/equipment.component';
import { LoginComponent } from '../component/login/login.component';
import { ReportsComponent } from '../component/reports/reports.component';
import { ReviewComponent } from '../component/review/review.component';
import { UsersComponent } from '../component/users/users.component';
import { ForgotPasswordComponent } from '../component/forgot-password/forgot-password.component';
import { SetPasswordComponent } from '../component/set-password/set-password.component';
import { RequestReceivedComponent } from '../component/request-received/request-received.component';
import { VerifyUserComponent } from '../component/verify-user/verify-user.component';
import { TransducerComponent } from '../component/review/transducer/transducer.component';
import { VerticalDistanceComponent } from '../component/review/vertical-distance/vertical-distance.component';
import { HorizontalDistanceComponent } from '../component/review/horizontal-distance/horizontal-distance.component';
import { UniformityComponent } from '../component/review/uniformity/uniformity.component';
import {LineChartComponent} from '../component/review/line-chart/line-chart.component';
import { AuthGuard } from '../guard/auth.guard';
import { path } from 'd3';

const routes: Routes = [
    { path: '', component: EquipmentComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'set-password', component: SetPasswordComponent },
    { path: 'request', component: RequestReceivedComponent },
    { path: 'verify-user/:userName/:code', component:VerifyUserComponent },
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
