import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EquipmentService {
  facilityTransducer:any[] = [];
  roomTransducer:any[] = [];

  constructor() {
    this.facilityTransducer = ['CIRS', 'Fathom'];
    this.roomTransducer = ['RM1', 'RM2', 'RM3'];
  }

  scanners = [
    {
      name: "GE Logiq: L12345678",
      circ: "CIRS",
      rm: "RM1",
      due: "09/14/21",
      transducer: [
        {name: 'RM1', scan: 'C26:L1q234', scan1: 'L412:M1234', scan2: 'E27:L1234' },
        {name: 'RM2', scan: 'C26:L1q235', scan1: 'L412:M1234', scan2: 'E27:L1234' },
        {name: 'RM3',scan: 'C26:L1q236', scan1: 'L412:M1234', scan2: 'E27:L1234' },
        {name: 'RM3',scan: 'C26:L1q237', scan1: 'L412:M1234', scan2: 'E27:L1234' },
      ]
    },
    {
      name: "Philips: M12345678",
      circ: "Fathom",
      rm: "RM2",
      due: "7/31/21",
      transducer: [
        {name: 'RM1', scan: 'C26:L1q234', scan1: 'L412:M1234', scan2: 'E27:L1234' },
        {name: 'RM2', scan: 'C26:L1q235', scan1: 'L412:M1234', scan2: 'E27:L1234' },
        {name: 'RM3', scan: 'C26:L1q236', scan1: 'L412:M1234', scan2: 'E27:L1234' },
        {name: 'RM3', scan: 'C26:L1q237', scan1: 'L412:M1234', scan2: 'E27:L1234' },
      ]
    }
  ];
}
