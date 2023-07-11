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
    evaluationsData:any;
    
    constructor(private router: Router, private toastr: ToastrService, public modalService: NgbModal, private evaluationsService: EvaluationsService,  private equipmentService: EquipmentService, private activatedRoute: ActivatedRoute) { }
    
    ngOnInit(){
        this.scannerId = this.activatedRoute.snapshot.paramMap.get('scannerId');

        // TODO
        this.evaluationsService.getScannerEvaluations(this.scannerId).subscribe( async (scData) => {
            // console.log(scData);

            // Gets Transducers Title
            await scData.transducer_evaluation.map( async (transducerData:any) => {
                await this.evaluationsService.getTransducerData(transducerData.transducer_id).subscribe( tdData => {
                    transducerData.manufacturer = tdData.manufacturer;
                    transducerData.model = tdData.model;
                    transducerData.serial_number = tdData.serial_number;
                });
            });
            
            // Gets Scanner Title
            await this.evaluationsService.getScannerData(scData.scanner_id).subscribe( scannerData => {
                scData.manufacturer = scannerData.manufacturer;
                scData.model = scannerData.model;
                scData.serial_number = scannerData.serial_number;
            });
            
            this.evaluationsData = scData;
            setTimeout(() => {
                this.loading = false;
            }, 1500);
        });
    }
}
