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
    basicLuminance: any;
    luminanceUniformity: any;
    
    physicalConditionTitle:any [] = [
        {controls:'Controls'},
        {housing:'Housing'},
        {ports:'Ports'},
        {power_cord:'Power Cord'},
        {wheels:'Wheels'}
    ];
    displayPerformanceTitle:any [] = [];
    
    constructor(private equipmentService: EquipmentService, public toastr: ToastrService) {
        
    }
    
    ngOnInit(): void {
        // console.log(this.scannerData);
        
        // Basic Luminance
        if(this.scannerData?.display_performance?.luminance){
            let luminance = this.scannerData?.display_performance?.luminance;
            
            if(parseFloat(luminance.ambient) >= 0 && parseFloat(luminance[1]) >= 0 && parseFloat(luminance[18]) > 0){
                let ambianceRatio = (parseFloat(luminance['ambient']) / parseFloat(luminance[1])).toFixed(3); // A Value
                let lMin = parseFloat(luminance['ambient']) + parseFloat(luminance[1]); // C Value
                let lMax = parseFloat(luminance['ambient']) + parseFloat(luminance[18]); // D Value
                let luminanceRatio = Math.round(lMax/lMin); // B Value
                
                this.basicLuminance = { 
                    ambianceRatio: ambianceRatio, 
                    luminanceRatio: luminanceRatio, 
                    lMin: lMin, 
                    lMax: lMax,
                    assessment: 'pass',
                };
            }
        }

         // Luminance Uniformity
         if(this.scannerData?.display_performance?.test_pattern && this.scannerData?.display_performance?.luminance){
            let ambient = parseFloat(this.scannerData?.display_performance?.luminance?.ambient);
            let testPattern = this.scannerData?.display_performance?.test_pattern;
            let testPatternValues = true;
            
            if(ambient >= 0){
                Object.keys(testPattern).forEach( (key, index) => {
                    
                    testPattern[key] = parseFloat(testPattern[key]);
                    if( testPattern[key] <= 0 && testPatternValues){
                        testPatternValues = false;
                    }
                })
                
                if(ambient > 0 && testPatternValues){
                    let arrayOfTestPattern:any[] = Object.values(testPattern);
                    let max = Math.max(...arrayOfTestPattern);
                    let min = Math.min(...arrayOfTestPattern);
                    let maximumDeviation = (200 * (max - min) / (max + min + 2 * ambient)).toFixed(0);
                    
                    this.luminanceUniformity = { 
                        ambient: ambient,
                        testPattern: testPattern, 
                        maximumDeviation: maximumDeviation, 
                        assessment: 'pass',
                    };
                }
            }
        }
        
        
        this.scannerEquipmentDetails = [
            {
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
            {
                layout: this.basicLuminance ? 'basicLuminance' : this.basicLuminance,
                title: this.basicLuminance ? 'Basic Luminance' : this.basicLuminance,
                parentCategory: this.basicLuminance ? 'display_performance' : this.basicLuminance,
                category: this.basicLuminance ? 'luminance' : this.basicLuminance,
                data: this.basicLuminance
            },
            {
                layout: 'luminanceResponse',
                title: 'Luminance Response',
                parentCategory: 'luminanceResponse',
                category: 'luminanceResponse',
                data: this.scannerData?.display_performance?.luminance
            },
            {
                layout: this.luminanceUniformity ? 'luminanceUniformity' : this.luminanceUniformity,
                title: this.luminanceUniformity ? 'Luminance Uniformity' : this.luminanceUniformity,
                parentCategory: this.luminanceUniformity ? 'display_performance' : this.luminanceUniformity,
                category: this.luminanceUniformity ? 'test_pattern' : this.luminanceUniformity,
                data: this.luminanceUniformity
            },
        ];
    }
    
    ascOrderObject = (a:any, b:any) =>{
        if(a.key > b.key) return b.key;
    }
    
    evDetailsAssessmentValue(scannerId: any, equDetails:any, assessmentValue:string, scannerType:any) {
        
        const data = { assessment: assessmentValue };
        const parentCategory = equDetails?.value?.parentCategory || equDetails?.parentCategory;
        const category = equDetails?.value?.category || equDetails?.category; 
        
        this.equipmentService.changeEvaluationDetailsAssesment(scannerId, category, data, scannerType).subscribe(value => {
            if(value.scanner_id){
                this.scannerData[parentCategory][category].assessment = assessmentValue;
                this.toastr.success('Assessment Updated successfully', '', { timeOut: 1500});
            } else {
                this.toastr.error('Please try again', '', { timeOut: 1500});
            }
        }, error => {
            this.toastr.error('Please try again', '', { timeOut: 1500});
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
            if(result.scanner_id){
                this.toastr.success('Note Updated successfully', '', { timeOut: 1500});
            } else {
                this.toastr.error('Please try again', '', { timeOut: 1500});
            }
        }, 
        error => {
            this.toastr.error('Please try again', '', { timeOut: 1500});
        });
    }
    
}
