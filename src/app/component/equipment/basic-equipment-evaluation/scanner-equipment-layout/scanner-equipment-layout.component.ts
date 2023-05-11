import { Component, OnInit, Input } from '@angular/core';
import { EquipmentService } from 'src/app/services/equipment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-scanner-equipment-layout',
    templateUrl: './scanner-equipment-layout.component.html',
    styleUrls: ['./scanner-equipment-layout.component.scss']
})
export class ScannerEquipmentLayoutComponent implements OnInit {
    
    scannerDataEditNote: string = '';
    
    @Input() equDetails:any;
    @Input() categoryIndex:any;
    @Input() scanner:any;
    @Input() scannerId: any;
    
    constructor(private equipmentService: EquipmentService, public toastr: ToastrService) {}
    
    ngOnInit(): void {}
    
    evDetailsAssessmentValue(scannerId: any, equDetails:any, assessmentValue:string, scannerType:any) {
        
        const data = { assessment: assessmentValue };
        const parentCategory = equDetails?.value?.parentCategory || equDetails?.parentCategory;
        const category = equDetails?.value?.category || equDetails?.category; 
        
        this.equipmentService.changeEvaluationDetailsAssesment(scannerId, category, data, scannerType).subscribe( value => {
            if(this.scanner.scanner_id === value.scanner_id){
                this.scanner.last_evaluation[parentCategory][category].assessment = assessmentValue;
                this.toastr.success('Assessment Updated successfully', '', { timeOut: 1500});
                setTimeout(() => {
                    this.overallAssessmenFunction(this.scanner);						
                }, 800);
            }
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
        const data = { note: equDetails?.value?.data?.note };
        const title = equDetails?.value?.title || equDetails?.title;
        const category = equDetails?.value?.category || equDetails?.category;
        
        this.scannerDataEditNote = this.scannerDataEditNote !== title ? title : '';
        if(!this.scannerDataEditNote) this.editNotesApiCall(scannerId, category, data, scannerType);
    }
    
    editNotesApiCall(scannerId:any, category:any, data:any, scannerType:any){
        this.equipmentService.updateAssesmentNote(scannerId, category, data, scannerType).subscribe( result => { 
            this.toastr.success('Note Updated successfully', '', { timeOut: 1500});
        }, error => {
            this.toastr.success('Please try again', '', { timeOut: 1500});
        });
    }
    
}
