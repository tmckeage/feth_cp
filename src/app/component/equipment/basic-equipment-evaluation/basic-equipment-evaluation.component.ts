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
    luminanceUniformity: any;
    
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
        
        // Basic Luminance
        if(this.scanner?.last_evaluation?.display_performance?.luminance){
            let luminance = this.scanner?.last_evaluation?.display_performance?.luminance;
            
            if(parseFloat(luminance.ambient) > 0 && parseFloat(luminance[1]) > 0 && parseFloat(luminance[18]) > 0){
                let ambianceRatio = (parseFloat(luminance['ambient']) / parseFloat(luminance[1])).toFixed(3); // A Value
                let lMin = parseFloat(luminance['ambient']) + parseFloat(luminance[1]); // C Value
                let lMax = parseFloat(luminance['ambient']) + parseFloat(luminance[18]); // D Value
                let luminanceRatio = Math.round(lMax/lMin); // B Value
                
                this.basicLuminance = { ambianceRatio: ambianceRatio, luminanceRatio: luminanceRatio, lMin: lMin, lMax: lMax };
            }
        }
        
        // Luminance Uniformity
        if(this.scanner?.last_evaluation?.display_performance?.test_pattern && this.scanner?.last_evaluation?.display_performance?.luminance){
            let ambient = parseFloat(this.scanner?.last_evaluation?.display_performance?.luminance?.ambient);
            let testPattern = this.scanner?.last_evaluation?.display_performance?.test_pattern;
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
                layout: this.basicLuminance ? 'basicLuminance' : this.basicLuminance,
                title: this.basicLuminance ? 'Basic Luminance' : this.basicLuminance,
                parentCategory: this.basicLuminance ? 'display_performance' : this.basicLuminance,
                category: this.basicLuminance ? 'luminance' : this.basicLuminance,
                data: this.basicLuminance
            },
            {
                layout: this.basicLuminance ? 'luminanceUniformity' : this.basicLuminance,
                title: this.basicLuminance ? 'Luminance Uniformity' : this.basicLuminance,
                parentCategory: this.basicLuminance ? 'display_performance' : this.basicLuminance,
                category: this.basicLuminance ? 'test_pattern' : this.basicLuminance,
                data: this.luminanceUniformity
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
