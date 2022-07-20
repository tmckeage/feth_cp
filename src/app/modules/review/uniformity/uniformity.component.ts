import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../../../services/equipment.service';
import { Location } from '@angular/common';
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
  scannerName: any;
  data:any;
  constructor(private equipment: EquipmentService, private location: Location) {

  }

  ngOnInit(): void {
    this.datalist = this.equipment.getScanner();
    
    // current scanner name in strore on session 
    this.scannerName = sessionStorage.getItem('currentScanner');
    this.date = sessionStorage.getItem('currentScannerDate');

    this.data = [
      {
        "value": 20,
        "date": "2020-05-12T12:19:00+00:00"
      },
      {
        "value": 50,
        "date": "2020-05-14T12:19:00+00:00"
      },
      {
        "value": 30,
        "date": "2020-05-16T12:19:00+00:00"
      },
      {
        "value": 80,
        "date": "2020-05-18T12:19:00+00:00"
      },
      {
        "value": 55,
        "date": "2020-05-20T12:19:00+00:00"
      },
      {
        "value": 60,
        "date": "2020-05-22T12:19:00+00:00"
      },
      {
        "value": 45,
        "date": "2020-05-24T12:19:00+00:00"
      },
      {
        "value": 30,
        "date": "2020-05-26T12:19:00+00:00"
      },
      {
        "value": 40,
        "date": "2020-05-28T12:19:00+00:00"
      },
      {
        "value": 70,
        "date": "2020-05-30T12:19:00+00:00"
      },
      {
        "value": 63,
        "date": "2020-06-01T12:19:00+00:00"
      },
      {
        "value": 40,
        "date": "2020-06-03T12:19:00+00:00"
      },
      {
        "value": 50,
        "date": "2020-06-05T12:19:00+00:00"
      },
      {
        "value": 75,
        "date": "2020-06-07T12:19:00+00:00"
      },
      {
        "value": 20,
        "date": "2020-06-09T12:19:00+00:00"
      },
      {
        "value": 50,
        "date": "2020-06-11T12:19:00+00:00"
      },
      {
        "value": 80,
        "date": "2020-06-13T12:19:00+00:00"
      },
      {
        "value": 75,
        "date": "2020-06-15T12:19:00+00:00"
      },
      {
        "value": 82,
        "date": "2020-06-17T12:19:00+00:00"
      },
      {
        "value": 55,
        "date": "2020-06-19T12:19:00+00:00"
      },
      {
        "value": 35,
        "date": "2020-06-21T12:19:00+00:00"
      },
      {
        "value": 34,
        "date": "2020-06-23T12:19:00+00:00"
      },
      {
        "value": 45,
        "date": "2020-06-25T12:19:00+00:00"
      },
      {
        "value": 58,
        "date": "2020-06-27T12:19:00+00:00"
      },
      {
        "value": 34,
        "date": "2020-06-29T12:19:00+00:00"
      },
      {
        "value": 60,
        "date": "2020-07-01T12:19:00+00:00"
      },
      {
        "value": 75,
        "date": "2020-07-03T12:19:00+00:00"
      },
      {
        "value": 80,
        "date": "2020-07-05T12:19:00+00:00"
      },
      {
        "value": 29,
        "date": "2020-07-07T12:19:00+00:00"
      },
      {
        "value": 40,
        "date": "2020-07-09T12:19:00+00:00"
      },
      {
        "value": 54,
        "date": "2020-07-11T12:19:00+00:00"
      },
      {
        "value": 67,
        "date": "2020-07-13T12:19:00+00:00"
      },
      {
        "value": 90,
        "date": "2020-07-15T12:19:00+00:00"
      },
      {
        "value": 84,
        "date": "2020-07-17T12:19:00+00:00"
      },
      {
        "value": 43,
        "date": "2020-07-19T12:19:00+00:00"
      }
  
    ];

    // this.datalist.forEach((res: any) => {
    //   this.transducer = res.transducers;
    //   this.transducer.forEach((data: any) => {
    //     this.date = data.last_study.date_performed;
    //     this.measurementList = data.last_study.data;
    //     this.measurementList.forEach((item: any) => {
    //       this.horizontal_distance = item.imaging.horizontal_distance;
    //     });
    //   });
    // });
  }

  actionBack() {
    this.location.back();
  }

 }
