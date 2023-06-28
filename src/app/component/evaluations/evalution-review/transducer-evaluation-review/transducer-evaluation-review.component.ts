import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-transducer-evaluation-review',
    templateUrl: './transducer-evaluation-review.component.html',
    styleUrls: ['./transducer-evaluation-review.component.scss']
})
export class TransducerEvaluationReviewComponent implements OnInit {
    
    @Input() transducerData:any;
    @Input() transducerId:any;
    @Input() transdIndex:any;
    transducerEvaluationData:any[] = [];
    
    constructor() { }
    
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
            // transducerImageAnalysis;
            this.transducerEvaluationData = [...transducerEvData, ... transducerImageAnalysis];
        }
    }
    
    ascOrderObject = (a:any, b:any) =>{
        if(a.key > b.key) return b.key;
    }
}
