import { Component, OnInit, Input } from '@angular/core';
import { EquipmentService } from 'src/app/services/equipment.service';
import { ToastrService } from 'ngx-toastr';
import { Chart } from 'chart.js';

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
    
    // meas_luminance:any = [1.32, 2.60, 4.55, 7.31, 11.09, 16.37, 23.02, 31.78, 43.09, 57.62, 76.37, 99.81, 130.31, 168.00, 216.66, 278.19, 355.31, 452.26]; // this valu come from API
    // greyLevel = [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255]; // In future that will get replce with API
    // ambient:any = 0.10; // this valu come from API
    
    masterTableData: any[] = [];
    jndPlotTableData: any[] = [];
    glPlotTableData: any[] = [];
    
    
    constructor(private equipmentService: EquipmentService, public toastr: ToastrService) {}
    
    async ngOnInit() {
        
        if(this.equDetails?.value?.category == "luminanceResponse") {
            let data = this.equDetails?.value?.data;         
            let meas_luminance:any [] = []; // this value come from API
            let ambient:any; // this value come from API
            let greyLevel:any = [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255]; // In future that will get replce with API
            
            await Object.keys(data).forEach( key => {
                if(key !== "ambient") {
                    data[key] = parseFloat(data[key]);
                    meas_luminance.push(data[key]);
                } else if(key === "ambient") {
                    ambient = parseFloat(data[key]);
                }
            }); 
            
            this.buildDemo(meas_luminance, greyLevel, ambient);
            // this.buildDemo(this.meas_luminance, this.greyLevel, this.ambient);
        }
    }
    
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
    
    
    
    
    
    
    
    
    
    getLprime(luminanceData:any, ambientValue:any){
        return luminanceData.map((lum:any, i:any) => {return lum + ambientValue;});
    }
    
    getMeasuredJND(lPrimeData:any){
        return lPrimeData.map((lum:any, i:any) => {
            let l = Math.log10(lum);
            let a = 71.498068;
            let b = 94.593053;
            let c = 41.912053;
            let d = 9.8247004;
            let e = 0.28175407;
            let f = 1.1878455;
            let g = 0.18014349;
            let h = 0.14710899;
            let k = 0.017046845;
            return a + b*l + c*l**2 + d*l**3 + e*l**4 - f*l**5 - g*l**6 + h*l**7 - k*l**8;
        });
        
    }
    
    getMeanJndPerStep(measuredJNDMax:any, measuredJNDMin:any, ttlLvls:any, lvlsPerStep:any){
        return (measuredJNDMax - measuredJNDMin) * lvlsPerStep / ttlLvls;
    }
    
    getGSDFjnd(meas_jnd_data:any, mean_jnd_per_step:any) {
        let ret = [ meas_jnd_data[0] ]
        for (let i = 0; i < 17; i++){
            ret.push(mean_jnd_per_step + ret[i]);
        }
        return ret
    }
    
    getGSDFLPrime(gsdfJNDData:any){
        return gsdfJNDData.map((gj:any, i:any) => {
            let l = Math.log(gj);
            let a = 0.080242636;
            let b = 0.13646699;
            let c = 0.025468404;
            let d = 0.0013635334;
            let e = 1.3011877;
            let f = 0.025840191;
            let g = 0.10320229;
            let h = 0.02874562;
            let k = 0.0031978977;
            let m = 0.00012992634;
            let p = (a*l + b*l**2 - c*l**3 + d*l**4 - e) / (1 - f*l - g*l**2 + h*l**3 - k*l**4 + m*l**5);
            return 10**p
        })
    }
    
    calculateLuminanceResponse(meas_luminance:any, greyLevel:any, ambientValue:any){
        let ret:any = {
            greyLevel: greyLevel,
            meas_luminance : meas_luminance,
        }
        ret.l_prime = this.getLprime(ret.meas_luminance, ambientValue);
        ret.meas_jnd = this.getMeasuredJND(ret.l_prime);
        ret.mean_jnd_per_step = this.getMeanJndPerStep(ret.meas_jnd.slice(-1), ret.meas_jnd[0], 255, 15);
        ret.gsdf_jnd = this.getGSDFjnd(ret.meas_jnd, ret.mean_jnd_per_step);
        ret.gsdf_l_prime = this.getGSDFLPrime(ret.gsdf_jnd);
        ret.meas_dl_per_l_per_jnd = this.getDl_per_l_per_jnd(ret.l_prime, ret.mean_jnd_per_step);
        ret.gsdf_dl_per_l_per_jnd = this.getDl_per_l_per_jnd(ret.gsdf_l_prime, ret.mean_jnd_per_step);
        ret.dl_per_l_per_jnd_error =  this.getDevErr(ret.meas_dl_per_l_per_jnd, ret.gsdf_dl_per_l_per_jnd);
        ret.l_prime_error = this.getDevErr(ret.l_prime, ret.gsdf_l_prime);
        ret.gsdfp20 = this.getPercentLimit(0.2, ret.gsdf_dl_per_l_per_jnd);
        ret.gsdfp10 = this.getPercentLimit(0.1, ret.gsdf_dl_per_l_per_jnd);
        ret.gsdfn10 = this.getPercentLimit(-0.1, ret.gsdf_dl_per_l_per_jnd);
        ret.gsdfn20 = this.getPercentLimit(-0.2, ret.gsdf_dl_per_l_per_jnd);
        return ret
    }
    
    populateTbls(meas_luminance:any, data:any){
        // this.populateMasterTbl(meas_luminance, data);
        this.populateJNDPlotTbl(meas_luminance, data);
        this.populateGLPlotTbl(meas_luminance, data);
    }
    
    // Used to create Table
    populateColumn(tblName:any, colName:any, data:any, digits = 2, appendText = '') {
        let elements:any = document.querySelectorAll("." + tblName + " ." + colName);
        elements = Array.from(elements);
        elements.map((element:any, i:any) => element.textContent = data[i].toFixed(digits) + appendText );
    }  
    
    // Used to create Table
    /* populateMasterTbl(meas_luminance:any, data:any){        
        for(let i=0; i < meas_luminance.length; i++){
            let master_tbl = {
                grey_level: data?.greyLevel[i] !== undefined ? data.greyLevel[i].toFixed(0) : '',
                measured_luminance: data?.meas_luminance[i] !== undefined ? data.meas_luminance[i].toFixed(2) : '',
                l_prime: data?.l_prime[i] !== undefined ? data.l_prime[i].toFixed(2) : '',
                measured_jnd: data?.meas_jnd[i] !== undefined ? data.meas_jnd[i].toFixed(2) : '',
                gsdf_jnd: data?.gsdf_jnd[i] !== undefined ? data.gsdf_jnd[i].toFixed(2) : '',
                gsdf_l_prime: data?.gsdf_l_prime[i] !== undefined ? data.gsdf_l_prime[i].toFixed(2) : '',
                meas_dl_per_l_per_jnd: i > 0 && data?.meas_dl_per_l_per_jnd[i-1] !== undefined ? data.meas_dl_per_l_per_jnd[i-1].toFixed(4) : '',
                gsdf_dl_per_l_per_jnd: i > 0 && data?.gsdf_dl_per_l_per_jnd[i-1] !== undefined ? data.gsdf_dl_per_l_per_jnd[i-1].toFixed(4) : '',
                dl_per_l_per_jnd_error: i > 0 && data?.dl_per_l_per_jnd_error[i-1] !== undefined ? data.dl_per_l_per_jnd_error[i-1].toFixed(1) + '%' : '',
            }
            this.masterTableData.push(master_tbl);
        }
    } */
    
    // Used for calculations
    getGreatestIndex(data:any){
        let gIndex = 0;
        let gValue = Math.abs(data[0]);
        for (let i = 1; i < data.length; i++){
            if(Math.abs(data[i]) > gValue){
                gIndex = i;
                gValue = Math.abs(data[i]);
            }
        }
        return gIndex;
    }

    // Used to create Table
    populateJNDPlotTbl(meas_luminance:any, data:any){
        let getLargestIndex = this.getGreatestIndex(data.dl_per_l_per_jnd_error);
        let className = '';
        
        if (Math.abs(data.dl_per_l_per_jnd_error[getLargestIndex]) > 20){
            className = 'greatestRed';
        } else if (Math.abs(data.dl_per_l_per_jnd_error[getLargestIndex]) > 10) {
            className = 'greatestYellow';
        } else {
            className = 'greatestGreen';
        }
        
        for(let i=1; i < meas_luminance.length; i++){            
            let jnd_plot = {
                measured_jnd: data?.meas_jnd[i] !== undefined ? data.meas_jnd[i].toFixed(2) : '',
                gsdf_jnd: data?.gsdf_jnd[i] !== undefined ? data.gsdf_jnd[i].toFixed(2) : '',
                meas_dl_per_l_per_jnd: data?.meas_dl_per_l_per_jnd[i-1] !== undefined ? data.meas_dl_per_l_per_jnd[i-1].toFixed(4) : '',
                gsdf_dl_per_l_per_jnd: data?.gsdf_dl_per_l_per_jnd[i-1] !== undefined ? data.gsdf_dl_per_l_per_jnd[i-1].toFixed(4) : '',
                dl_per_l_per_jnd_error: data?.dl_per_l_per_jnd_error[i-1] !== undefined ? data.dl_per_l_per_jnd_error[i-1].toFixed(1) + '%' : '',
                className: i-1 == getLargestIndex ? className : '',
            }
            this.jndPlotTableData.push(jnd_plot);
        } 
    }
    
    // Used to create Table
    populateGLPlotTbl(meas_luminance:any, data:any){
        let className = this.getGreatestIndex(data.l_prime_error);
        
        for(let i=0; i < meas_luminance.length; i++){
            let gl_plot = {
                grey_level: data?.greyLevel[i] !== undefined ? data.greyLevel[i].toFixed(0) : '',
                measured_luminance: data?.meas_luminance[i] !== undefined ? data.meas_luminance[i].toFixed(2) : '',
                l_prime: data?.l_prime[i] !== undefined ? data.l_prime[i].toFixed(2) : '',
                gsdf_l_prime: data?.gsdf_l_prime[i] !== undefined ? data.gsdf_l_prime[i].toFixed(2) : '',
                l_prime_error: data?.l_prime_error[i] !== undefined ? data.l_prime_error[i].toFixed(1)+ '%' : '',
                className: i == className ? 'greatest' : '',
            }
            this.glPlotTableData.push(gl_plot);
        }
    }
    
    // Used for calculations
    getDl_per_l_per_jnd(l_prime_data:any, mean_jnd_per_step:any) {
        let ret = []
        for (let i = 1; i < 18; i++){
            let prev_lp = l_prime_data[i-1];
            let this_lp = l_prime_data[i];
            let dif = this_lp - prev_lp;
            let sum = this_lp + prev_lp;
            ret.push((2 * dif) / (sum * mean_jnd_per_step));
        }
        return ret
    }
    
    // Used for calculations
    getDevErr(measDPLPJ:any, gsdfDPLPJ:any){
        return gsdfDPLPJ.map((gsdf:any, i:any) => { 
            return 100 * (measDPLPJ[i] - gsdf) / gsdf 
        })
    }
    
    // Used for calculations
    getPercentLimit(percent:any, ideal:any){
        return ideal.map((value:any) => { return value + value * percent } )
    }
    
    buildDataset(xArray:any, yArray:any){
        return xArray.map((elem:any, i:any) => {return {x: elem, y: yArray[i]}});
    }
    
    // Used to populate graph
    buildJNDChart(data:any){
        
        let gsdfPoints = this.buildDataset(data.gsdf_jnd.slice(1), data.gsdf_dl_per_l_per_jnd);
        let gsdfP20Points =  this.buildDataset(data.gsdf_jnd.slice(1), data.gsdfp20);
        let gsdfP10Points =  this.buildDataset(data.gsdf_jnd.slice(1), data.gsdfp10);
        let gsdfN10Points =  this.buildDataset(data.gsdf_jnd.slice(1), data.gsdfn10);
        let gsdfN20Points =  this.buildDataset(data.gsdf_jnd.slice(1), data.gsdfn20);
        let measuredPoints = this.buildDataset(data.meas_jnd.slice(1), data.meas_dl_per_l_per_jnd);
        
        new Chart('JNDChart', {
            type: 'line',
            data: {
                datasets: [{
                    label: "Measured",
                    type: 'scatter',
                    pointRadius: 4,
                    borderWidth: 2,
                    borderColor: 'rgb(0, 0, 0)',
                    data: measuredPoints,
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                },
                {
                    label: "GSDF",
                    type: 'line',
                    data: gsdfPoints,
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                },
                {
                    label: "GSDF +20%",
                    type: 'line',
                    data: gsdfP20Points,
                    pointRadius: 0,
                    borderDash: [5, 5],
                    cubicInterpolationMode: 'monotone',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                },
                {
                    label: "GSDF +10%",
                    type: 'line',
                    data: gsdfP10Points,
                    pointRadius: 0,
                    borderDash: [5, 5],
                    cubicInterpolationMode: 'monotone',
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                },
                {
                    label: "GSDF -10%",
                    type: 'line',
                    data: gsdfN10Points,
                    pointRadius: 0,
                    borderDash: [5, 5],
                    cubicInterpolationMode: 'monotone',
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                },
                {
                    label: "GSDF -20%",
                    type: 'line',
                    data: gsdfN20Points,
                    pointRadius: 0,
                    borderDash: [5, 5],
                    cubicInterpolationMode: 'monotone',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                    }]
                },
                responsive: true
            }
        });
        
    }
    
    // Used to populate graph
    buildGLChart(data:any){
        let measuredLPrimePoints = this.buildDataset(data.greyLevel, data.l_prime);
        let gsdfLPrimePoints = this.buildDataset(data.greyLevel, data.gsdf_l_prime);
        
        new Chart('GLChart', {
            type: 'line',
            data: {
                datasets: [{
                    label: "Measured L'",
                    type: 'scatter',
                    pointRadius: 4,
                    borderWidth: 2,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgb(255, 99, 132)',
                    data: measuredLPrimePoints,
                },{
                    label: "GSDF L'",
                    type: 'line',
                    data: gsdfLPrimePoints,
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                    }]
                },
                responsive: true
            }
        });
    }
    
    async buildDemo(meas_luminance:any, greyLevel:any, ambientValue:any){
        let data = await this.calculateLuminanceResponse(meas_luminance, greyLevel, ambientValue);
        await this.populateTbls(meas_luminance, data); // used to create tables
        await this.buildJNDChart(data); // Graph
        await this.buildGLChart(data); // Graph
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
}
