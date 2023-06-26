import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EvaluationsService } from 'src/app/services/evaluations.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
    selector: 'app-evaluations',
    templateUrl: './evaluations.component.html',
    styleUrls: ['./evaluations.component.scss']
})
export class EvaluationsComponent implements OnInit {
    loading: boolean = true;
    evaluationsData:any[] = [];
    
    constructor(private router: Router, private toastr: ToastrService, public modalService: NgbModal, private evaluationsService: EvaluationsService,  private equipmentService: EquipmentService) { 
        this.loading = true;
        
        this.equipmentService.getAllEquipments().subscribe( equipment => {
            this.evaluationsService.getEvaluations().subscribe( evaluations => {
                evaluations?.scanner_evaluations.map( (filter:any) => {
                    if(!filter?.date_approved){
                        let scannerName = equipment.scanners.findIndex((topic:any) => topic.scanner_id === filter.scanner_id);
                        filter.scannerName = `${equipment.scanners[scannerName].manufacturer} ${equipment.scanners[scannerName].model} : ${equipment.scanners[scannerName].serial_number}`;
                        filter.transducerLength = filter?.transducer_evaluation?.length ?? '';
                        filter.date_performed = filter?.date_performed ?? '';
                        this.evaluationsData.push(filter);
                    }
                });
                this.loading = false;
            },error => {
                console.log(error);
                this.loading = false;
            })
        },error => {
            console.log(error);
            this.loading = false;
        });
    }
    
    ngOnInit(): void {
        
    }
}
