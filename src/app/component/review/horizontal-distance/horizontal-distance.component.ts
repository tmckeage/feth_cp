import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../../../services/equipment.service';

@Component({
  selector: 'app-horizontal-distance',
  templateUrl: './horizontal-distance.component.html',
  styleUrls: ['./horizontal-distance.component.scss']
})
export class HorizontalDistanceComponent implements OnInit {
  transducer: any;
  datalist: any[] = [];
  measurementList: any[] = [];
  horizontal_distance: any;
  date: any;
  unitName: any;
  horizontal_R_One: any;
  horizontal_R_Two: any;
  scannerName: any;
  h_pins: any[] = [];
   
  constructor(private equipment: EquipmentService) { }

  ngOnInit(): void {
    this.datalist = this.equipment.getScanner();
  
    this.equipment.getStudyList().subscribe(
      response => {
        console.log("thet", response);
        this.h_pins = response.h_pins;
        // this.h_pins.forEach((res: any) => {
          console.log("testing h_pins",  this.h_pins);
          let items: any = [];
          Object.entries(this.h_pins).forEach(([k, v]) => {
            this.measurementList.push({
              name: k,
              value: v 
            });
            console.log("measurementList", this.measurementList);
            this.measurementList.forEach((data: any) => {
                this.horizontal_distance = Object.values(data.value);
                console.log("horizintal", this.horizontal_distance);
                // this.measurementList.forEach((res: any) => {
                //   this.horizontal_distance = Object.values(res);
                // });
            });
          }); 
          
        // });
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
          // items.forEach((data: any) => {
          //   if (data.name == 'horizontal_distance') {
          //     this.measurementList = Object.values(data.value);
          //     this.measurementList.forEach((res: any) => {
          //       this.horizontal_distance = Object.values(res);
          //     });
          //   }
          // });
        });
      });
    });
  }
  

}
