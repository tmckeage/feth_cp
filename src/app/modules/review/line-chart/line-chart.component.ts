import { Component, ElementRef, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/services/equipment.service';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';




@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
    public barChartOptions: ChartOptions = { responsive: true };
    public barChartLabels: Label[] = ['100', '200', '300', '400', '500', '600', '700', '800'];
    public barChartType: ChartType = 'line';
    public barChartLegend = true;
    public barChartPlugins = [];

    data:any[] = [65, 59, 80, 81, 56, 55, 40];
    
    lineChartColors: Color[] = [{ 
        // dark grey
        backgroundColor: '#FFFF',
        borderColor: 'rgba(77,83,96,1)',
    }];
    
    public barChartData: ChartDataSets[] = [{
        data: this.data, 
        label: 'Series A' 
    }];
    
    constructor() {}
    
    ngOnInit() {}
    
}





