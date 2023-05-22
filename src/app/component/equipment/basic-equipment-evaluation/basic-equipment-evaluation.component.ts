import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EquipmentService } from 'src/app/services/equipment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-basic-equipment-evaluation',
    templateUrl: './basic-equipment-evaluation.component.html',
    styleUrls: ['./basic-equipment-evaluation.component.scss']
})
export class BasicEquipmentEvaluationComponent implements OnInit {
    closeResult = '';
    scannersObject: any;
    evaluationData: any[] = [];
    scannerEquipmentDetails: any[] = [];
    transducerEvaluationData: any[] = [];
    scannerDataEditNote: string = '';
    transducerDataEditNote: string = '';
    scannerId: any;
    transducerId: any;
    basicLuminance: any;
    
    @Input() scanner:any;
    
    constructor(public modalService: NgbModal, private equipmentService: EquipmentService, public toastr: ToastrService,) { }
    
    ngOnInit(): void {
        this.evaluationData = [this.scanner];
        this.overallAssessmenFunction(this.scanner);
        this.scannerId = this.scanner?.scanner_id;
        
        const transducerImageAnalysis = [{
            layout: 'uniformityArtifact',
            title: 'Uniformity and Artifact',
            parentCategory: undefined,
            category: undefined,
            data: {
                assessment: 'pass'
            }
        },
        {
            layout: 'depthOfPenetration',
            title: 'Depth of Penetration',
            parentCategory: undefined,
            category: undefined,
            data: {
                assessment: 'pass'
            }
        },
        {
            layout: 'verticalDistance',
            title: 'Vertical Distance',
            parentCategory: undefined,
            category: undefined,
            data: {
                assessment: 'pass'
            }
        },
        {
            layout: 'horizontalDistance',
            title: 'Horizontal Distance',
            parentCategory: undefined,
            category: undefined,
            data: {
                assessment: 'pass'
            }
        },
        {
            layout: 'axialResolution',
            title: 'Axial Resolution',
            parentCategory: undefined,
            category: undefined,
            data: {
                assessment: 'pass'
            }
        },
        {
            layout: 'leteralResolution',
            title: 'Leteral Resolution',
            parentCategory: undefined,
            category: undefined,
            data: {
                assessment: 'pass'
            }
        },
        {
            layout: 'elevationResolution',
            title: 'Elevation Resolution',
            parentCategory: undefined,
            category: undefined,
            data: {
                assessment: 'pass'
            }
        },
        {
            layout: 'contrastResolution',
            title: 'Contrast Resolution',
            parentCategory: undefined,
            category: undefined,
            data: {
                assessment: 'pass'
            }
        }];
        
        this.scanner.transducers.map( (transData:any) => {
            this.transducerEvaluationData = [];
            Object.keys(transData.last_evaluation.physical_condition).map( (keyData:any) => {
                if(keyData !== 'transducerEvaluationData'){
                    this.transducerEvaluationData.push({
                        layout: 'withImg',
                        title: keyData,
                        parentCategory: 'physical_condition',
                        category: keyData,
                        data: transData.last_evaluation.physical_condition[keyData]
                    });
                }
            });
            
            // transducerImageAnalysis;
            transData.last_evaluation.physical_condition.transducerEvaluationData = [...this.transducerEvaluationData, ... transducerImageAnalysis];
        });

        if(this.scanner?.last_evaluation?.display_performance?.luminance){
            let luminance = this.scanner?.last_evaluation?.display_performance?.luminance;

            if(parseFloat(luminance.ambient) > 0 && parseFloat(luminance[1]) > 0 && parseFloat(luminance[18]) > 0){
                let a = (parseFloat(luminance['ambient']) / parseFloat(luminance[1])).toFixed(3);
                let c = parseFloat(luminance['ambient']) + parseFloat(luminance[1]);
                let d = parseFloat(luminance['ambient']) + parseFloat(luminance[18]);
                let b = Math.round(d/c);
                
                this.basicLuminance = { a: a, b: b, c: c, d: d };
            }
        }
        
        this.scannerEquipmentDetails = [
            {
                layout: 'withImg',
                title:'Housing',
                parentCategory: 'physical_condition',
                category: 'housing',
                data: this.scanner?.last_evaluation?.physical_condition?.housing 
            },
            {
                layout: 'withImg',
                title: 'Power Cord',
                parentCategory: 'physical_condition',
                category: 'power_cord',
                data: this.scanner?.last_evaluation?.physical_condition?.power_cord 
            },
            {
                layout: 'withImg',
                title: 'Wheels',
                parentCategory: 'physical_condition',
                category: 'wheels',
                data: this.scanner?.last_evaluation?.physical_condition?.wheels 
            },
            {
                layout: 'withImg',
                title: 'Controls',
                parentCategory: 'physical_condition',
                category: 'controls',
                data: this.scanner?.last_evaluation?.physical_condition?.controls 
            },
            {
                layout: 'withoutImg',
                title: 'Ports',
                parentCategory: 'physical_condition',
                category: 'ports',
                data: this.scanner?.last_evaluation?.physical_condition?.ports 
            },
            {
                layout: 'withoutImg',
                title: 'Greyscale',
                parentCategory: 'display_performance',
                category: 'greyscale',
                data: this.scanner?.last_evaluation?.display_performance?.greyscale 
            },
            {
                layout: 'withoutImg',
                title: 'Geometric Distortion',
                parentCategory: 'display_performance',
                category: 'distortion',
                data: this.scanner?.last_evaluation?.display_performance?.distortion 
            },
            {
                layout: 'withoutImg',
                title: 'High Constrast Line Pattern',
                parentCategory: 'display_performance',
                category: 'hc_line_patterns',
                data: this.scanner?.last_evaluation?.display_performance?.hc_line_patterns 
            },
            {
                layout: 'withoutImg',
                title: 'Low Constrast Line Pattern',
                parentCategory: 'display_performance',
                category: 'lc_line_patterns',
                data: this.scanner?.last_evaluation?.display_performance?.lc_line_patterns 
            },
            {
                layout: 'withoutImg',
                title: 'Display Resolution',
                parentCategory: 'display_performance',
                category: 'resolution',
                data: this.scanner?.last_evaluation?.display_performance?.resolution 
            },
            {
                layout: 'withoutImg',
                title: 'Missing Pixels',
                parentCategory: 'display_performance',
                category: 'pixels',
                data: this.scanner?.last_evaluation?.display_performance?.pixels 
            },
            {
                layout: this.basicLuminance ? 'layoutThree' : this.basicLuminance,
                title: this.basicLuminance ? 'Basic Luminance' : this.basicLuminance,
                parentCategory: this.basicLuminance ? 'display_performance' : this.basicLuminance,
                category: this.basicLuminance ? 'luminance' : this.basicLuminance,
                data: this.basicLuminance
            }
        ];
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
    
    // Sort array in ascending order
    ascOrderObject = (a:any, b:any) =>{
        if(a.key > b.key) return b.key;
    }
    
}
