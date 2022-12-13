import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalysisService } from 'src/app/services/analysis.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})

export class AnalysisComponent implements OnInit {
  chart:any;
  selectedGraphValue: any;
  selectedPlot: any;
  plot: any;
  filePlot:any;
  horizontalPoints: any;
  selectWire1:any;
  selectWire2:any;
  selectedTransducer: any;
  verticalDistanceAccuracy: any;
  selectHorizontalPlot: any;
  selectHorizontalWire1: any;
  selectHorizontalWire2: any;
  horizontalPoint: any;
  wireOptions:any;
  selectedWireType: any;
  selectAxialPlot:any;
  selectLateralPlot:any;
  selectElevationalPlot:any;
  axialPosition:any
  dataPoints: any = [];
  dataPlots: any = [];
  depthPenetrationPlot: any = [];
  depth_of_penetration_review_plot: any = [];
  vertical_distance_accuracy: any= [];
  filePlots: any = [];
  dataAccuracy: any = [];
  plotValue: any = [];
  unique: any = [];
  verticalSelectedPlots: any = [];
  uniqueArr: any = [];
  firstWireValues: any = [];
  horizontalSelectedPlots: any = [];
  depth_of_penetration: any = [];
  horizontal_distance_accuracy: any = [];
  axialPlots: any = [];
  axial_dropdown: any = [];
  axialGraphPlots: any = [];
  axialPoints: any = [];
  axialSelectedPlots: any = [];
  axial_resolution_plot: any = [];
  lateralPlots: any = [];
  lateralComaSaperated: any = [];
  lateral_dropdown:any = [];
  elevational_dropdown:any = [];
  lateralPoints: any = [];
  lateralSelectedPlots: any = [];
  lateral_resolution_plot: any = [];
  elevationalPoints: any = [];
  elevationalSelectedPlots:any = [];
  elevational_resolution_plot: any = [];
  lateralGraphPlots: any = [];
  elevationalGraphPlots: any = [];
  elevationalPlots: any = [];
  elevationalComaSaperated: any = [];
  lateralPosition:any;
  elevationalPosition:any;

  constructor(private router: Router, private analysisService:AnalysisService) {}

  	// Plots
	graphs = [
		{value: 'depth-of-penetration', viewValue: 'Analysis Plot 1: Depth of Penetration Trending'},
		{value: 'depth-of-penetration-review-plot', viewValue: 'Analysis Plot 2: Depth of Penetration Detail Plot'},
		{value: 'vertical-distance-accuracy', viewValue: 'Analysis Plot 3: Vertical Distance Accuracy'},
		{value: 'horizontal-distance-plot', viewValue: 'Analysis Plot 4: Horizontal Distance Accuracy'},
		{value: 'axial-resolution', viewValue: 'Analysis Plot 5: Axial Resolution'},
		{value: 'lateral-resolution', viewValue: 'Analysis Plot 6: Lateral Resolution'},
		{value: 'elevational-resolution', viewValue: 'Analysis Plot 7: Elevational Resolution'}
	];

	// Single default transducer
	transducers = [
		{value: 'philips-c6-2-Transducer-453561652583', viewValue: 'Philips C6-2 Transducer 453561652583'},
	];

	// Types of wires
	wires = [
		{value: 'shallow_wires', viewValue: 'Shallow wires'},
		{value: 'deep_wires', viewValue: 'Deep wires'}
	];

	ngOnInit(): void { }

	//Select Graph Report Selection
	selectPlot(event: any) {
		this.selectedGraphValue = event.value;
		switch (this.selectedGraphValue) {
			case 'depth-of-penetration':
				this.dataPoints = [];
				this.plot = this.analysisService.analysis_plots;
				for(let i = 0; i< this.plot.depth_of_penetration.length; i++) {
					this.dataPoints.push({
						x: i,
						y: this.plot.depth_of_penetration[i].value
					});
				}
				this.refreshData(this.dataPoints);
			break;

			case 'depth-of-penetration-review-plot':
				this.filePlot = this.analysisService.analysis_plots.depth_of_penetration_review_plot;
				for(let j = 0; j < this.filePlot.length; j++) {
					this.depthPenetrationPlot.push({value:this.filePlot[j].fileName})
				}
			break;

			case 'vertical-distance-accuracy':				
				this.verticalDistanceAccuracy = this.analysisService.analysis_plots.vertical_distance_accuracy;
				for(let i = 0; i < this.verticalDistanceAccuracy.length; i++) {
					this.dataAccuracy = [];
					this.plotValue = this.verticalDistanceAccuracy[i].value.split(',');
					this.plotValue = this.plotValue.map(Number);
					this.plotValue = this.plotValue.sort();
					this.unique = this.plotValue.filter(function(elem: any, index: any, self: string | any[]) {
						return index === self.indexOf(elem);
					});
					for(let j = 0; j < this.unique.length; j++) {
						this.dataAccuracy.push({
							x: j,
							y: this.unique[j]
						});
					}
				}
				
				this.vertical_distance_accuracy = {
					animationEnabled: true,
					exportEnabled: true,
					toolTip:{
						enabled: true,
						content:"x: {x}, y: {y}"
					},
					axisY: {
						gridThickness: 0,
						stripLines: [
							{
								value: 5,
								showOnTop: true,
								color: "red",
								lineDashType: "dash",
								thickness: 2,
							},
							{
								value: 1,
								showOnTop: true,
								color: "blue",
								lineDashType: "dash",
								thickness: 2,
							},
							{
								value: 3,
								showOnTop: true,
								color: "blue",
								lineDashType: "dash",
								thickness: 2,
							}
						],
						title: "Depth of Penetration (cm)",
						beginAtZero: false,
						minimum : 0,
						maximum: 5,
						interval: 0.5
					},
					axisX: {
					title: "Measurement Number",
					lineDashType: "dash",
					lineColor: "red",
					minimum : 0,
					maximum: 19,
					interval: 1
					},
					data: [{
						type: 'line',
						xValueFormatString: "#,###.##",
						yValueFormatString: "#,###.##",
						dataPoints: this.dataAccuracy
					}]
				}
			break;

			case 'horizontal-distance-plot':
				this.horizontalPoints = this.analysisService.analysis_plots.horizontal_distance_accuracy;
				this.horizontal_distance_accuracy = {
					animationEnabled: true,
					exportEnabled: true,
					toolTip:{
						enabled: true,
						content:"x: {x}, y: {y}"
					},
					axisY: {
						gridThickness: 0,
						stripLines: [
							{
								value: 1,
								showOnTop: true,
								color: "blue",
								lineDashType: "dash",
								thickness: 2,
							},
							{
								value: 3,
								showOnTop: true,
								color: "red",
								lineDashType: "dash",
								thickness: 2,
							},
						],
						title: "Depth of Penetration (cm)",
						beginAtZero: false,
						minimum : 0,
						maximum: 5,
						interval: 0.5
					},
					axisX: {
					title: "Measurement Number",
					lineDashType: "dash",
					lineColor: "red",
					minimum : 0,
					maximum: 5,
					interval: 1
					},
					data: [{
						type: 'line',
						xValueFormatString: "#,###.##",
						yValueFormatString: "#,###.##",
						dataPoints: []
					}]
				}
			break;

			case 'axial-resolution':
				this.axialPlots = this.analysisService.analysis_plots.axial_resolution;
				this.axial_dropdown = this.axialPlots[0].value.split(',');
				this.axial_dropdown = this.axial_dropdown.map(Number);
			break;

			case 'lateral-resolution':
				this.lateralPlots = this.analysisService.analysis_plots.lateral_resolution;
				this.lateralComaSaperated = this.lateralPlots[0].value.split(',');
				this.lateralComaSaperated = this.lateralComaSaperated.map(Number);
				console.log(this.lateralComaSaperated);
				for(let i =0; i < this.lateralComaSaperated.length; i++) {
					if (i % 2 == 0) {
						this.lateral_dropdown.push(this.lateralComaSaperated[i]);
					}
				}
				//initial graph points
				this.lateral_resolution_plot = {
					animationEnabled: true,
					exportEnabled: true,
					toolTip:{
						enabled: true,
						content:"x: {x}, y: {y}"
					},
					axisY: {
						gridThickness: 0,
						stripLines: [
							{
								value: 2,
								showOnTop: true,
								color: "blue",
								thickness: 2,
								lineDashType: "dash"
							}
						],
						title: "Depth of Penetration (cm)",
						minimum : 0,
						maximum: 3,
						interval: 0.5
					},
					axisX: {
					title: "Measurement Number",
					minimum : 0,
					maximum: 10,
					interval: 1,
					lineDashType: "dash",
					lineColor: "red",
					ticks:{
						beginAtZero: true,
					}
					},
					data: [{
						type: "line",
						xValueFormatString: "#,###.##",
						yValueFormatString: "#,###.##",
						dataPoints: this.lateralGraphPlots
					}]
				}
			break;

			case 'elevational-resolution':
				this.elevationalPlots = this.analysisService.analysis_plots.elevational_resolution;
				this.elevationalComaSaperated = this.elevationalPlots[0].value.split(',');
				this.elevationalComaSaperated = this.elevationalComaSaperated.map(Number);
				for(let i =0; i < this.elevationalComaSaperated.length; i++) {
					if (i % 2 !== 0) {
						this.elevational_dropdown.push(this.elevationalComaSaperated[i]);
					}
				}
				//initial graph points
				this.elevational_resolution_plot = {
					animationEnabled: true,
					exportEnabled: true,
					toolTip:{
						enabled: true,
						content:"x: {x}, y: {y}"
					},
					axisY: {
						gridThickness: 0,
						stripLines: [
							{
								value: 2,
								showOnTop: true,
								color: "blue",
								thickness: 2,
								lineDashType: "dash"
							}
						],
						title: "Depth of Penetration (cm)",
						minimum : 0,
						maximum: 3,
						interval: 0.5
					},
					axisX: {
					title: "Measurement Number",
					minimum : 0,
					maximum: 10,
					interval: 1,
					lineDashType: "dash",
					lineColor: "red",
					ticks:{
						beginAtZero: true,
					}
					},
					data: [{
						type: "line",
						xValueFormatString: "#,###.##",
						yValueFormatString: "#,###.##",
						dataPoints: this.elevationalGraphPlots
					}]
				}
			break;	
			default:
			break;
		}
		
		//unset all deopdown selectors
		this.selectedTransducer = null;
		this.selectWire1 = null;
		this.selectWire2 = null;
		this.selectedPlot = null;
		this.selectHorizontalWire1 = null;
		this.selectHorizontalWire2 = null;
	}
	
	//Select Transducer Section
	selectTransducer(event: any) {
		this.selectedTransducer = event.value;
	}

	//Analysis Plot 2 : Depth of Penetration Review Plot
	selectCsvFile(event: any) {
		this.depth_of_penetration_review_plot = [];
		this.filePlots = [];
		this.selectedPlot = event.value;
		for(let p= 0; p < this.filePlot.length; p++) {		
			if(this.selectedPlot == this.filePlot[p].fileName) {
				let brightnessValue = this.filePlot[p].brightness.split(',');
				for(let i = 0; i < brightnessValue.length; i++) {
					this.filePlots.push({
						x: i,
						y: parseInt(brightnessValue[i])
					  });
				}
				this.refreshData(this.filePlots, 'spline', this.filePlot[p].noiseLevelOfTheImage);				
			}
		}	
	}

	//Vertical accuracy selected points plot
	selectWires(event:any) {
		this.uniqueArr = [];
		this.verticalSelectedPlots = [];
		// Disable select box value which is less than selected value
		for(let i = 0; i < this.unique.length; i++) {
			if(this.unique[i] > this.selectWire1) {
				this.uniqueArr.push(this.unique[i]);
			}
		}

		//if both points are selected then only plot graph
		if(this.selectWire1 && this.selectWire2) {
			for(let i = 0; i < this.unique.length; i++) {
				if((this.unique[i] >= this.selectWire1) && (this.unique[i] <= this.selectWire2)) {
					this.verticalSelectedPlots.push({
						x: i,
						y: this.unique[i]
					});
				}
			}
			this.refreshData(this.verticalSelectedPlots);
		}
	}

	//horizontal accuracy graph
	selectHorizontalCsvFile(event:any) {
		this.selectHorizontalPlot = event.value;
		//when change in csv file unset wire1 and wire2 selectbox
		this.wireOptions = null;
		this.selectHorizontalWire1 = null;
		this.selectHorizontalWire2 = null;
		this.firstWireValues = [];
	}

	//shallow deep wire type selection
	selectWireType(event:any) {
		this.selectedWireType = event.value;
		//when change in wire type unset wire1 and wire2 selectbox
		this.selectHorizontalWire1 = null;
		this.selectHorizontalWire2 = null;
		for(let i = 0; i < this.horizontalPoints.length; i++) {
			if(this.selectHorizontalPlot == this.horizontalPoints[i].fileName) {
				if (this.selectedWireType == 'shallow_wires') {
					for(let j = 0; j < this.horizontalPoints[i].first_value.length; j++){
						this.horizontalPoint = this.horizontalPoints[i].first_value.split(',');
						this.firstWireValues = this.horizontalPoint.map(Number);
					}
				} else {
					for(let k = 0; k < this.horizontalPoints[i].second_value.length; k++){
						this.horizontalPoint = this.horizontalPoints[i].second_value.split(',');
						this.firstWireValues = this.horizontalPoint.map(Number); 
					}
				}
			}
		}
	}

	//horizontal accuracy selected points plot
	selectHorizontalWires(event:any) {
		//if both points are selected then only plot graph
		if(this.selectHorizontalWire1 || this.selectHorizontalWire2) {
			this.horizontalSelectedPlots = [];
			for(let i = 0; i < this.firstWireValues.length; i++) {
				if((this.selectHorizontalWire1 < this.selectHorizontalWire2) && 
					(this.firstWireValues[i] >= this.selectHorizontalWire1) 
					&& (this.firstWireValues[i] <= this.selectHorizontalWire2)) {
					this.horizontalSelectedPlots.push({
						x: i,
						y: this.firstWireValues[i]
					});
				} else if((this.selectHorizontalWire1 > this.selectHorizontalWire2) && 
				(this.firstWireValues[i] <= this.selectHorizontalWire1) && 
				(this.firstWireValues[i] >= this.selectHorizontalWire2)) {
					this.horizontalSelectedPlots.push({
						x: i,
						y: this.firstWireValues[i]
					});
				}
			}
			this.refreshData(this.horizontalSelectedPlots);		 	
		}	
	}

	//axial resolution
	selectAxialWire(event:any) {
		this.axialPoints = [];
		this.axialSelectedPlots = [];
		this.selectAxialPlot = event.value;
		//initial graph object
		this.axial_resolution_plot = {
			animationEnabled: true,
			exportEnabled: true,
			toolTip:{
				enabled: true,
				content:"x: {x}, y: {y}"
			},
			axisY: {
				gridThickness: 0,
				stripLines: [
					{
						value: 2,
						showOnTop: true,
						color: "blue",
						thickness: 2,
						lineDashType: "dash"
					}
				],
				title: "Depth of Penetration (cm)",
				minimum : 0,
				maximum: 3,
				interval: 0.5
			},
			axisX: {
			title: "Measurement Number",
			minimum : 0,
			maximum: 10,
			interval: 1,
			lineDashType: "dash",
			lineColor: "red",
			ticks:{
				beginAtZero: true,
			}
			},
			data: [{
				type: "line",
				xValueFormatString: "#,###.##",
				yValueFormatString: "#,###.##",
				dataPoints: this.axialSelectedPlots
			}]
		}

		for(let i= 0; i< this.axial_dropdown.length; i++) {
			if(this.axial_dropdown[i] == this.selectAxialPlot) {
				this.axialPosition = i;
			}
		}

		for(let k= 0; k < this.axialPlots.length; k++) {
			this.axialGraphPlots = this.axialPlots[k].value.split(',');
			this.axialGraphPlots = this.axialGraphPlots.map(Number);
			this.axialPoints.push(this.axialGraphPlots[this.axialPosition]);
		}

		for(let j= 0; j < this.axialPoints.length; j++) {
			this.axialSelectedPlots.push({
				x: j,
				y: this.axialPoints[j]
			});
		}
		this.refreshData(this.axialSelectedPlots);
	}

	//lateral resolution
	selectLateralWire(event:any) {
		this.selectLateralPlot = event.value;
		this.lateralPoints = [];
		this.lateralSelectedPlots = [];
		for(let i= 0; i < this.lateralComaSaperated.length; i++) {
			if(this.selectLateralPlot == this.lateralComaSaperated[i]) {
				this.lateralPosition = i;
			}
		}

		for(let j= 0; j < this.lateralPlots.length; j++) {
			this.lateralGraphPlots = this.lateralPlots[j].value.split(',');
			this.lateralGraphPlots = this.lateralGraphPlots.map(Number);
			this.lateralPoints.push(this.lateralGraphPlots[this.lateralPosition]);
		}

		for(let j= 0; j < this.lateralPoints.length; j++) {
			this.lateralSelectedPlots.push({
				x: j,
				y: this.lateralPoints[j]
			});
		}
		this.refreshData(this.lateralSelectedPlots);
	}

	selectElevationalWire(event:any) {
		this.selectElevationalPlot = event.value;
		this.elevationalPoints = [];
		this.elevationalSelectedPlots = [];
		for(let i= 0; i < this.elevationalComaSaperated.length; i++) {
			if(this.selectElevationalPlot == this.elevationalComaSaperated[i]) {
				this.elevationalPosition = i;
			}
		}

		for(let j= 0; j < this.elevationalPlots.length; j++) {
			this.elevationalGraphPlots = this.elevationalPlots[j].value.split(',');
			this.elevationalGraphPlots = this.elevationalGraphPlots.map(Number);
			this.elevationalPoints.push(this.elevationalGraphPlots[this.elevationalPosition]);
		}

		for(let j= 0; j < this.elevationalPoints.length; j++) {
			this.elevationalSelectedPlots.push({
				x: j,
				y: this.elevationalPoints[j]
			});
		}
		console.log(this.elevationalSelectedPlots);
		this.refreshData(this.elevationalSelectedPlots);
	}

	getChartInstance(Chart: object) {
		this.chart = Chart;
	}

	refreshData(dataPlots = [], type = 'line', threshold = '') {
		switch (this.selectedGraphValue) {
			case 'depth-of-penetration':
				this.depth_of_penetration = {
					animationEnabled: true,
					exportEnabled: true,
					toolTip:{
						enabled: true,
						content:"x: {x}, y: {y}"
					},
					axisY: {
						gridThickness: 0,
						stripLines: [
							{
								value: 14.8,
								showOnTop: true,
								color: "blue",
								thickness: 2,
								lineDashType: "dash"
							}
						],
						title: "Depth of Penetration (cm)",
						maximum: 15.5,
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
						xValueFormatString: "#,###.##",
						yValueFormatString: "#,###.##",
						dataPoints: dataPlots
					}]
				}
			break;

			case 'depth-of-penetration-review-plot':
				this.depth_of_penetration_review_plot = {
					animationEnabled: true,
					exportEnabled: true,
					toolTip:{
						enabled: true,
						content:"x: {x}, y: {y}"
					},
					axisY: {
						gridThickness: 0,
						stripLines: [
							{
								value: threshold,
								showOnTop: true,
								color: "orange",
								thickness: 2,
							}
						],
						title: "Depth of Penetration (cm)",
						beginAtZero: false,
						minimum : -0,
						maximum: 100,
						interval: 20
					},
					axisX: {
					title: "Measurement Number",
					minimum : 0,
					maximum: 500,
					interval: 50
					},
					data: [{
						type: type,
						xValueFormatString: "#,###.##",
						yValueFormatString: "#,###.##",
						dataPoints: dataPlots
					}]
				}
			break;

			case 'vertical-distance-accuracy':
				this.chart.options.data[0].dataPoints = dataPlots;
				this.chart.render();
			break;

			case 'horizontal-distance-plot':
				this.chart.options.data[0].dataPoints = dataPlots;
				this.chart.render();
			break;

			case 'axial-resolution':
				this.chart.options.data[0].dataPoints = dataPlots;
				this.chart.render();
			break;

			case 'lateral-resolution':
				this.chart.options.data[0].dataPoints = dataPlots;
				this.chart.render();
			break;

			case 'elevational-resolution':
				this.chart.options.data[0].dataPoints = dataPlots;
				this.chart.render();
			break;

			default:
			break;
		}	
	}
}