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
  horizontal_distance: any[] = [];
  date: any;
  unitName: any;
  horizontal_R_One: any;
  horizontal_R_Two: any;
  constructor(private equipment: EquipmentService) { }

  ngOnInit(): void {
    this.datalist = this.equipment.getScanner();
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
            if (data.name == 'horizontal_distance') {
              this.horizontal_distance = Object.values(data.value);
              // let result = data.value.row_one;
              //   result.forEach((res: any) => {
           
              // });
            }
          });
        });
      });
    });
  }

}
