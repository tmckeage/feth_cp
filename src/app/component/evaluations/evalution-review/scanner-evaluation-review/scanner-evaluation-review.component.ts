import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-scanner-evaluation-review',
    templateUrl: './scanner-evaluation-review.component.html',
    styleUrls: ['./scanner-evaluation-review.component.scss']
})
export class ScannerEvaluationReviewComponent implements OnInit {

    @Input() scannerData:any;
    @Input() scannerId:any;
    scannerEquipmentDetails:any[] = []

    physicalConditionTitle:any [] = [
        {controls:'Controls'},
        {housing:'Housing'},
        {ports:'Ports'},
        {power_cord:'Power Cord'},
        {wheels:'Wheels'}
    ];
    displayPerformanceTitle:any [] = [];

    constructor() {}
    
    ngOnInit(): void {

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
            layout: 'withoutImg',
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
}
