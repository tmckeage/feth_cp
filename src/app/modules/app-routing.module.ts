import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from '../component/analysis/analysis.component';
import { EquipmentComponent } from '../component/equipment/equipment.component';
import { ReportsComponent } from '../component/reports/reports.component';
import { UsersComponent } from '../component/users/users.component';
import { AuthGuard } from '../guard/auth.guard';
import { EvaluationsComponent } from '../component/evaluations/evaluations.component';
import { EvalutionReviewComponent } from '../component/evaluations/evalution-review/evalution-review.component';

const routes: Routes = [
    { 
        path: '', component: EquipmentComponent, canActivate: [AuthGuard]
    },
    { 
        path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard] 
    },
    { 
        path: 'evaluation', component: EvaluationsComponent, canActivate: [AuthGuard],
        /*children: [
            {
                path: ':scannerId', component: EvalutionReviewComponent, canActivate: [AuthGuard],
            }
        ]*/
    },
    {
        path: 'evaluation/:scannerId', component: EvalutionReviewComponent, canActivate: [AuthGuard],
    },
    { 
        path: 'analysis', component: AnalysisComponent, canActivate: [AuthGuard] 
    },
    { 
        path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] 
    },
    { 
        path: 'users', component: UsersComponent, canActivate: [AuthGuard] 
    },
    { 
        path: '**', component: EquipmentComponent, canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
