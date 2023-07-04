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
    
    ngOnInit(): void {
        this.scannerId = this.activatedRoute.snapshot.paramMap.get('scannerId');
        
        /* this.equipmentService.getAllEquipments().subscribe( equipment => {
            // console.log(equipment);
            equipment?.scanners.map( (scannerData:any) => {
                if(scannerData.scanner_id === this.scannerId){
                    this.evaluationsData = [scannerData];
                }
                this.loading = false;
            });
        }); */
        
        // TODO
        this.evaluationsService.getScannerEvaluations(this.scannerId).subscribe( scData => {
            // console.log(scData); 
            this.equipmentService.getAllEquipments().subscribe( equipment => {
                equipment?.scanners.map( (scannerData:any) => {
                    if(scannerData.scanner_id === scData.scanner_id){
                        // console.log(scannerData);

                        scData.manufacturer = scannerData.manufacturer;
                        scData.model = scannerData.model;
                        scData.serial_number = scannerData.serial_number;
                        
                        scannerData.transducers.map( (transducerData:any) => {
                            scData.transducer_evaluation.map( (newTData:any) => {
                                if(transducerData.transducer_id === newTData.transducer_id){
                                    newTData.manufacturer = transducerData.manufacturer;
                                    newTData.model = transducerData.model;
                                    newTData.serial_number = transducerData.serial_number;
                                }
                            });
                        });
                        this.evaluationsData = scData;
                        // console.log(this.evaluationsData);          
                        this.loading = false;
                    }
                });
            });
        });
    }
    
}
