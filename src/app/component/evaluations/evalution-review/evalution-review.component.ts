import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EvaluationsService } from 'src/app/services/evaluations.service';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
    selector: 'app-evalution-review',
    templateUrl: './evalution-review.component.html',
    styleUrls: ['./evalution-review.component.scss']
})
export class EvalutionReviewComponent implements OnInit {
    
    scannerId: any = '';
    loading: boolean = true;
    evaluationsData:any[] = [];
    
    constructor(private router: Router, private toastr: ToastrService, public modalService: NgbModal, private evaluationsService: EvaluationsService,  private equipmentService: EquipmentService, private activatedRoute: ActivatedRoute) { }
    
    ngOnInit(): void {
        this.scannerId = this.activatedRoute.snapshot.paramMap.get('scannerId');
       
        this.equipmentService.getAllEquipments().subscribe( equipment => {
            // console.log(equipment);
            equipment?.scanners.map( (scannerData:any) => {
                if(scannerData.scanner_id === this.scannerId){
                    this.evaluationsData = [scannerData];
                }
                this.loading = false;
            });
        });

        this.evaluationsService.getScannerEvaluations(this.scannerId).subscribe( scData => {
            // console.log(scData); // TODO
        });
    }
    
}
