import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ReportService {

  constructor(private http: HttpClient) {}
  reports = {
      annual_servey: {
          name:'Ultrasound Equipment Annual Survey Summary',
          facility_name:'cirs',
          unit:'001',
          serial:'USD1610981',
          manufacturer:'Philips',
          model:'Sparq',
          uap:'n/a',
          report:'10/20/22',
          scanner_survey:'08/15/22',
          physicist:'Ted Lynch',
          signature:''
      },
      equipment_evaluation_tests: [
        {test: 'Phys & Mech Inspection: Scanner', total_pass:'0', total_fail:'0', comments:''},
        {test:'Phys & Mech Inspection: Transducers', total_pass:'3', total_fail:'0', comments:''},
        {test:'Image Uniformity & Artifact Survey', total_pass:'2', total_fail:'1', comments:'B30MK8 sent in for repair'},
        {test:'Geometric Accuracy', total_pass:'3', total_fail:'0', comments:''},
        {test:'System Sensitivity', total_pass:'2', total_fail:'1', comments:'B30MK8'},
        {test:'Scanner Display Performance', total_pass:'1', total_fail:'0', comments:''},
        {test:'Prim. Interpretation Display', total_pass:'n/a', total_fail:'n/a', comments:''},
        {test:'Contrast Resolution', total_pass:'3', total_fail:'0', comments:''},
        {test:'Spatial Resolution', total_pass:'3', total_fail:'0', comments:''}
      ],
      transducers_tested: [
        {model:'C6-2',serial_number:'453561652563', date:'08/15/22'},
        {model:'L12-4',serial_number:'453561652583', date:'08/15/22'},
        {model:'L15-7io',serial_number:'B30MK8', date:'08/15/22'}
      ]				
    }
}