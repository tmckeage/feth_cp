import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from '../component/analysis/analysis.component';
import { EquipmentComponent } from '../component/equipment/equipment.component';
import { LoginComponent } from '../component/login/login.component';
import { ReportsComponent } from '../component/reports/reports.component';
import { ReviewComponent } from '../component/review/review.component';
import { UsersComponent } from '../component/users/users.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'analysis', component: AnalysisComponent },
    { path: 'equipment', component: EquipmentComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'review', component: ReviewComponent },
    { path: 'users', component: UsersComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
