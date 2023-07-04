import { Component, Input, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/services/equipment.service';
import { EvaluationsService } from 'src/app/services/evaluations.service';
import { ToastrService } from 'ngx-toastr';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-transducer-evaluation-review',
    templateUrl: './transducer-evaluation-review.component.html',
    styleUrls: ['./transducer-evaluation-review.component.scss']
})
export class TransducerEvaluationReviewComponent implements OnInit {
    
    @Input() transducerData:any;
    @Input() transducerId:any;
    @Input() transdIndex:any;
    @Input() scannerId:any;
    
    transducerEvaluationData:any[] = [];
    transducerDataEditNote: string = '';
    
    constructor(private equipmentService: EquipmentService, private evaluationsService: EvaluationsService, public toastr: ToastrService) { }
    
    ngOnInit(): void {
        const transducerImageAnalysis = [
            {
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
            }
        ];
        
        if(this.transducerData?.physical_condition){
            let transducerEvData:any[] = [];
            Object.keys(this.transducerData.physical_condition).map( (keyData:any) => {
                if(keyData !== 'transducerEvaluationData'){
                    transducerEvData.push({
                        layout: 'withImg',
                        title: keyData,
                        parentCategory: 'physical_condition',
                        category: keyData,
                        data: this.transducerData.physical_condition[keyData]
                    });
                }
            });
            this.transducerEvaluationData = [...transducerEvData, ... transducerImageAnalysis];
        }
    }
    
    ascOrderObject = (a:any, b:any) =>{
        if(a.key > b.key) return b.key;
    }
    
    evDetailsAssessmentValue(scannerId:any, transducerId: any, equDetails:any, assessmentValue:string) {
        const data = { assessment: assessmentValue };
        const parentCategory = equDetails?.value?.parentCategory || equDetails?.parentCategory;
        const category = equDetails?.value?.category || equDetails?.category; 
        
        if(category && parentCategory){
            this.evaluationsService.transducerAssesment(scannerId, transducerId, category, data).subscribe(
                value => { this.transducerData[parentCategory][category].assessment = assessmentValue;
                this.toastr.success('Assessment Updated successfully', '', { timeOut: 1500});
            }, error => {
                this.toastr.success('Please try again', '', { timeOut: 1500});
            });
        }else {
            this.toastr.error('Please try again', '', { timeOut: 1500});
        }
    }
    
    evDetailsEditNote(scannerId:any, transducerId: any, equDetails:any) {
        const data = { note: equDetails?.data?.note };
        const title = equDetails?.value?.title || equDetails?.title;
        const category = equDetails?.value?.category || equDetails?.category;
        
        this.transducerDataEditNote = this.transducerDataEditNote !== title ? title : '';
        if(!this.transducerDataEditNote) this.editNotesApiCall(scannerId, transducerId, category, data);	
    }
    
    editNotesApiCall(scannerId:any, transducerId:any, category:any, data:any){
        this.evaluationsService.transducerNote(scannerId, transducerId, category, data).subscribe(
            result => { this.toastr.success('Note Updated successfully', '', { timeOut: 1500});
        }, error => {
            this.toastr.success('Please try again', '', { timeOut: 1500});
        });
    }
}
