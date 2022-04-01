import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../../../services/equipment.service';

@Component({
  selector: 'app-vertical-distance',
  templateUrl: './vertical-distance.component.html',
  styleUrls: ['./vertical-distance.component.scss']
})
export class VerticalDistanceComponent implements OnInit {
  transducer: any;
  datalist: any[] = [];
  measurementList: any;
  vertical_distance: any[] = [];
  date: any;
  unitName: any;
  scannerName: any;
  v_pins: any[] = [];


  constructor(private equipment: EquipmentService) { }

  ngOnInit(): void {
    this.datalist = this.equipment.getScanner();

    // json file row datalist
    this.equipment.getStudyList().subscribe(
      response => {
        console.log("thet", response);
        this.v_pins = response.v_pins;
          console.log("testing v_pins",  this.v_pins); 
      //  this.vertical_distance = this.v_pins;    
    });
      
    // current scanner name in strore on session 
    this.scannerName = sessionStorage.getItem('currentScanner');
    this.date = sessionStorage.getItem('currentScannerDate');

    this.datalist.forEach((res: any) => {
      this.date = res.last_study.date_performed;
      let data = res.transducers;
      data.forEach((item: any) => {
        this.transducer = item.last_study.data;
        let imgList: any = [];
        imgList = item.last_study.data.imaging;
        let items: any = [];
        Object.entries(imgList).forEach(([k, v]) => {
          items.push({
            name: k,
            value: v
          });
          items.forEach((data: any) => {
            if (data.name == 'vertical_distance') {
              this.vertical_distance = data.value;
            }
          });
        });
      });
    });
  }
}
