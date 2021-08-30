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
import {TransducerComponent} from '../component/transducer/transducer.component';


const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'analysis', component: AnalysisComponent },
    { path: 'equipment', component: EquipmentComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'review', component: ReviewComponent },
    { path: 'users', component: UsersComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    {path: 'set-password', component: SetPasswordComponent},
    {path: 'request', component: RequestReceivedComponent},
    {path:'transducer', component:TransducerComponent},
 
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
