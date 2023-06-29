import { Component, Input, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/services/equipment.service';
import { ToastrService } from 'ngx-toastr';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-scanner-evaluation-review',
    templateUrl: './scanner-evaluation-review.component.html',
    styleUrls: ['./scanner-evaluation-review.component.scss']
})
export class ScannerEvaluationReviewComponent implements OnInit {

    @Input() scannerData:any;
    @Input() scannerId:any;
    scannerEquipmentDetails:any[] = [];
    scannerDataEditNote: string = '';

    physicalConditionTitle:any [] = [
        {controls:'Controls'},
        {housing:'Housing'},
        {ports:'Ports'},
        {power_cord:'Power Cord'},
        {wheels:'Wheels'}
    ];
    displayPerformanceTitle:any [] = [];

    constructor(private equipmentService: EquipmentService, public toastr: ToastrService) {}
    
    ngOnInit(): void {
        console.log(this.scannerData)
        this.scannerEquipmentDetails = [{
            layout: 'withImg',
            title:'Housing',
            parentCategory: 'physical_condition',
            category: 'housing',
            data: this.scannerData?.physical_condition?.housing 
        },
        {
            layout: 'withImg',
            title: 'Power Cord',
            parentCategory: 'physical_condition',
            category: 'power_cord',
            data: this.scannerData?.physical_condition?.power_cord 
        },
        {
            layout: 'withImg',
            title: 'Wheels',
            parentCategory: 'physical_condition',
            category: 'wheels',
            data: this.scannerData?.physical_condition?.wheels 
        },
        {
            layout: 'withImg',
            title: 'Controls',
            parentCategory: 'physical_condition',
            category: 'controls',
            data: this.scannerData?.physical_condition?.controls 
        },
        {
            layout: 'withImg',
            title: 'Ports',
            parentCategory: 'physical_condition',
            category: 'ports',
            data: this.scannerData?.physical_condition?.ports 
        },
        {
            layout: 'qualitativeDP',
            title: 'Qualitative Display Performance',
            parentCategory: 'display_performance',
            category: 'qualitative',
            data: this.scannerData?.display_performance?.qualitative,
        },
        /*{
            layout: this.basicLuminance ? 'basicLuminance' : this.basicLuminance,
            title: this.basicLuminance ? 'Basic Luminance' : this.basicLuminance,
            parentCategory: this.basicLuminance ? 'display_performance' : this.basicLuminance,
            category: this.basicLuminance ? 'luminance' : this.basicLuminance,
            data: this.basicLuminance
        },*/
        {
            layout: 'luminanceResponse',
            title: 'Basic Luminance',
            parentCategory: 'luminanceResponse',
            category: 'luminanceResponse',
            data: this.scannerData?.display_performance?.luminance
        },
        {
            layout: 'luminanceResponse',
            title: 'Luminance Response',
            parentCategory: 'luminanceResponse',
            category: 'luminanceResponse',
            data: this.scannerData?.display_performance?.luminance
        },
        {
            layout: 'luminanceResponse',
            title: 'Luminance Uniformity',
            parentCategory: 'luminanceResponse',
            category: 'luminanceResponse',
            data: this.scannerData?.display_performance?.luminance
        },
        /*{
            layout: this.luminanceUniformity ? 'luminanceUniformity' : this.luminanceUniformity,
            title: this.luminanceUniformity ? 'Luminance Uniformity' : this.luminanceUniformity,
            parentCategory: this.luminanceUniformity ? 'display_performance' : this.luminanceUniformity,
            category: this.luminanceUniformity ? 'test_pattern' : this.luminanceUniformity,
            data: this.luminanceUniformity
        },*/
        ];
    }
    
    ascOrderObject = (a:any, b:any) =>{
        if(a.key > b.key) return b.key;
    }

    evDetailsAssessmentValue(scannerId: any, equDetails:any, assessmentValue:string, scannerType:any) {
        
        const data = { assessment: assessmentValue };
        const parentCategory = equDetails?.value?.parentCategory || equDetails?.parentCategory;
        const category = equDetails?.value?.category || equDetails?.category; 
        
        this.equipmentService.changeEvaluationDetailsAssesment(scannerId, category, data, scannerType).subscribe( value => {
            console.log(value)
            // if(this.scanner.scanner_id === value.scanner_id){
                this.scannerData[parentCategory][category].assessment = assessmentValue;
                this.toastr.success('Assessment Updated successfully', '', { timeOut: 1500});
            // }
        }, error => {
            this.toastr.success('Please try again', '', { timeOut: 1500});
        });
    }

    evDetailsEditNote(scannerId: any, equDetails:any, scannerType:any) {
        const data = { note: equDetails?.data?.note };
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
