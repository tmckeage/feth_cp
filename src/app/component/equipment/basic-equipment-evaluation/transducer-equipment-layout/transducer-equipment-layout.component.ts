import { Component, OnInit, Input } from '@angular/core';
import { EquipmentService } from 'src/app/services/equipment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-transducer-equipment-layout',
    templateUrl: './transducer-equipment-layout.component.html',
    styleUrls: ['./transducer-equipment-layout.component.scss']
})
export class TransducerEquipmentLayoutComponent implements OnInit {
    
    transducerDataEditNote: string = '';
    
    @Input() tranSubDetails:any;
    @Input() scanner:any;
    @Input() transducerId: any;
    @Input() transdIndex: any;
    @Input() categoryIndex:any;
    
    constructor(private equipmentService: EquipmentService, public toastr: ToastrService) { }
    
    ngOnInit(): void {
    }
    
    evDetailsAssessmentValue(transducerId: any, equDetails:any, assessmentValue:string, scannerType:any) {
        const data = { assessment: assessmentValue };
        const parentCategory = equDetails?.value?.parentCategory || equDetails?.parentCategory;
        const category = equDetails?.value?.category || equDetails?.category; 
        
        this.equipmentService.changeEvaluationDetailsAssesment(transducerId, category, data, scannerType).subscribe( value => {
            this.scanner.transducers.map( (transducerResult: any) => {
                if(transducerResult.transducer_id === value.transducer_id){
                    transducerResult.last_evaluation[parentCategory][category].assessment = assessmentValue;
                    this.toastr.success('Assessment Updated successfully', '', { timeOut: 1500});
                }
            });
        }, error => {
            this.toastr.success('Please try again', '', { timeOut: 1500});
        });
    }
    
    async overallAssessmenFunction(scannerData:any){
        let overallAssessmen = true;
        scannerData.newOverallAssessmen = Object.values({ 
            ...scannerData?.last_evaluation?.display_performance, 
            ...scannerData?.last_evaluation?.physical_condition 
        });
        await scannerData?.newOverallAssessmen.map( (overAssesment: any) => {
            if(overAssesment?.assessment === 'fail') overallAssessmen = false;
        });
        scannerData.overallAssessmen = overallAssessmen ? 'pass' : 'fail';
    } 
    
    evDetailsEditNote(scannerId: any, equDetails:any, scannerType:any) {
        const data = { note: equDetails?.data?.note };
        const title = equDetails?.value?.title || equDetails?.title;
        const category = equDetails?.value?.category || equDetails?.category;
        
        this.transducerDataEditNote = this.transducerDataEditNote !== title ? title : '';
        if(!this.transducerDataEditNote) this.editNotesApiCall(scannerId, category, data, scannerType);	
    }
    
    editNotesApiCall(scannerId:any, category:any, data:any, scannerType:any){
        this.equipmentService.updateAssesmentNote(scannerId, category, data, scannerType).subscribe( result => { 
            this.toastr.success('Note Updated successfully', '', { timeOut: 1500});
        }, error => {
            this.toastr.success('Please try again', '', { timeOut: 1500});
        });
    }
    
}
