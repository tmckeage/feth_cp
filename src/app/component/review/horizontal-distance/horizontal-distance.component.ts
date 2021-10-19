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
  measurementList: any;
  horizontal_distance: any;
  date : any;
  constructor(private equipment: EquipmentService) { }

  ngOnInit(): void {
    this.datalist =  this.equipment.getScanner();
    this.datalist.forEach((res:any)=>{
      this.transducer = res.transducers;
      this.transducer.forEach((data:any)=>{
        this.date = data.last_study.date_performed;
        this.measurementList = data.last_study.data;
          this.measurementList.forEach((item:any)=>{
            this.horizontal_distance = item.imaging.horizontal_distance;
          });
      });
    });
  }

}
