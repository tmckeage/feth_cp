import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../../../services/equipment.service';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';


@Component({
  selector: 'app-uniformity',
  templateUrl: './uniformity.component.html',
  styleUrls: ['./uniformity.component.scss']
})
export class UniformityComponent implements OnInit {
  transducer: any;
  datalist: any[] = [];
  measurementList: any;
  horizontal_distance: any;
  date: any;
  data: any[] = [];
  margin = { top: 20, right: 20, bottom: 30, left: 50 };
  width: number;
  height: number;
  x: any;
  y: any;
  svg: any;
  line!: d3Shape.Line<[number, number]>;
  scannerName: any;
  constructor(private equipment: EquipmentService) {
    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit(): void {
    this.buildSvg();
    this.addXandYAxis();
    this.drawLineAndPath();
    this.datalist = this.equipment.getScanner();
    // scanner name 
    this.equipment.isScannerList.subscribe((res: any) => {
      this.scannerName = res.make +""+ " : " +""+ res.model +""+ res.serial_number;
      this.date = res.next_Study_Due.date;
    });

    this.datalist.forEach((res: any) => {
      this.transducer = res.transducers;
      this.transducer.forEach((data: any) => {
        this.date = data.last_study.date_performed;
        this.measurementList = data.last_study.data;
        this.measurementList.forEach((item: any) => {
          this.horizontal_distance = item.imaging.horizontal_distance;
        });
      });
    });

    this.data = [
      { date: new Date('2010-01-01'), value: 80 },
      { date: new Date('2010-01-04'), value: 90 },
      { date: new Date('2010-01-05'), value: 95 },
      { date: new Date('2010-01-06'), value: 100 },
      { date: new Date('2010-01-07'), value: 110 },
      { date: new Date('2010-01-08'), value: 120 },
      { date: new Date('2010-01-09'), value: 130 },
      { date: new Date('2010-01-10'), value: 140 },
      { date: new Date('2010-01-11'), value: 150 },
    ];

  }

  buildSvg() {
    this.svg = d3.select('svg')
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }
  addXandYAxis() {
    // range of data configuring
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(this.data, (d) => d.date));
    this.y.domain(d3Array.extent(this.data, (d) => d.value));

    // Configure the Y Axis
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
    // Configure the Y Axis
    this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y));
  }

  drawLineAndPath() {
    this.line = d3Shape.line()
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.value));
    // Configuring line path
    this.svg.append('path')
      .datum(this.data)
      .attr('class', 'line')
      .attr('d', this.line);
  }
}
