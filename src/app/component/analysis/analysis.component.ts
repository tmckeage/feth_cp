import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  fathomUserDetails: any;
  selectedValue: any;
  public chart: any;
  constructor(private router: Router) { }

  graphs = [
    {value: 'dop-plot', viewValue: 'DOP Plot'},
    {value: 'vertical-distance-plot', viewValue: 'Vertical Distance Plot'},
  ];

  ngOnInit(): void {}
	chartOptions = {
	  animationEnabled: true,
	  exportEnabled: true,
	   // title: {
		// text: "Line Chart",
		// fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
		// fontWeight: "bold",
	  // },
	  toolTip:{
		enabled: false,
	  },
	  axisY: {
		gridThickness: 0,
		stripLines: [
			{
			  value: 17,
			  showOnTop: true,
			  color: "blue",
			  thickness: 2,
			  lineDashType: "dash"
		}],
		title: "Depth of Penetration (cm)",
		beginAtZero: true,
		minimum : 16.4,
		maximum: 17.8,
		interval: 0.2
	  },
      axisX: {
			title: "Measurement Number",
			lineDashType: "dash",
			lineColor: "red",
			minimum: 0,
			ticks:{
				beginAtZero: true
			}
		},
	  data: [{
		type: "line",
		xValueFormatString: "YYYY",
		yValueFormatString: "#,###.##'",
		dataPoints: [
			{x: 0, y: 17.5},
			{x: 1, y: 17.3},
			{x: 2, y: 16.8},
			{x: 3, y: 17.6},
			{x: 4, y: 17.3},
			{x: 5, y: 16.7},
			{x: 6, y: 17.7},
			{x: 7, y: 17.6},
			{x: 8, y: 17.3},
			{x: 9, y: 16.9},
			{x: 10, y: 17.3},
			{x: 11, y: 17.7},
			{x: 12, y: 16.8},
			{x: 13, y: 17.7},
			{x: 14, y: 16.8},
			{x: 15, y: 17.7},
			{x: 16, y: 17.3},
			{x: 17, y: 17.4},
			{x: 18, y: 16.9},
			{x: 19, y: 17.1} 
		],
	  }]
	}
	//second
	chartOptions_vertical = {
		animationEnabled: true,
		exportEnabled: true,
		// title: {
		//  text: "Line Chart",
		//  fontFamily: "'Time New Roman'",
		//  fontWeight: "bold",
		// },
		toolTip:{
			enabled: false,
		},
		axisY: {
		  gridThickness: 0,
		  stripLines: [
				{
					value: 9.9,
					showOnTop: true,
					color: "blue",
					thickness: 2,
					lineDashType: "dash"
				},
				{
					value: 10.1,
					showOnTop: true,
					color: "blue",
					thickness: 2,
					lineDashType: "dash"
				},
				{
					value: 10.2,
					showOnTop: true,
					color: "red",
					thickness: 2,
					lineDashType: "dash"
				}
		  ],
		  title: "Depth of Penetration (cm)",
		  beginAtZero: true,
		  minimum : 9.8,
		  maximum: 10.2,
		  interval: 0.05
		},
		axisX: {
		title: "Measurement Number",
		lineDashType: "dash",
		lineColor: "red",
		minimum: 0,
		ticks:{
		  beginAtZero: true
		}
		},
		data: [{
		  type: "line",
		  xValueFormatString: "YYYY",
		  yValueFormatString: "#,###.##'",
		  dataPoints: [
			  {x: 0, y: 10.00},
			  {x: 1, y: 10.02},
			  {x: 2, y: 10.03},
			  {x: 3, y: 10.13},
			  {x: 4, y: 10.00},
			  {x: 5, y: 10.12},
			  {x: 6, y: 9.90},
			  {x: 7, y: 10.02},
			  {x: 8, y: 10.12},
			  {x: 9, y: 9.87},
			  {x: 10, y: 9.95},
			  {x: 11, y: 9.87},
			  {x: 12, y: 9.96},
			  {x: 13, y: 10.08},
			  {x: 14, y: 9.86},
			  {x: 15, y: 10.04},
			  {x: 16, y: 9.98},
			  {x: 17, y: 10.02},
			  {x: 18, y: 9.87},
			  {x: 19, y: 9.88}
			]
		}]
	}

	selectedReport(event: any) {
		this.selectedValue = event.value;
	}
}