import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EvaluationsService } from 'src/app/services/evaluations.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
    selector: 'app-evaluations',
    templateUrl: './evaluations.component.html',
    styleUrls: ['./evaluations.component.scss']
})
export class EvaluationsComponent implements OnInit {
    loading: boolean = true;
    evaluationsData:any[] = [];
    
    constructor(private router: Router, private toastr: ToastrService, public modalService: NgbModal, private evaluationsService: EvaluationsService,) { 
        this.loading = true;
        
        this.evaluationsService.getEvaluations().subscribe( response => {
            response?.scanner_evaluations.map( (filter:any) => {
                if(!filter?.date_approved){
                    filter.transducerLength = filter?.transducer_evaluation?.length ?? '';
                    filter.date_performed = filter?.date_performed ?? '';
                    this.evaluationsData.push(filter);
                }
            });
            this.loading = false;
        },error => {
            console.log(error);
            this.loading = false;
        });
    }
    
    ngOnInit(): void {
        
    }
}
