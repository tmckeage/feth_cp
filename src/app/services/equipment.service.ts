import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EquipmentService {
  facilityTransducer: any[] = [];
  roomTransducer: any[] = [];
  typeTransducer: any[] = [];


  constructor() {
    this.facilityTransducer = ['CIRS', 'Fathom'];
    this.roomTransducer = ['RM1', 'RM2', 'RM3'];
    this.typeTransducer = ['Monthly', 'Quarterly', 'Annual', 'Acceptance ']
  }

  scanners = [
    {
      name: "GE Logiq: L12345678",
      cirs: "CIRS",
      rm: "RM1",
      due: "09/14/21",
      lastStudy: "Complete",
      transducer: [
        { name: 'RM1', scan: 'C26:L1q234', scan1: 'L412:M1234', scan2: 'E27:L1234' },
        { name: 'RM2', scan: 'C26:L1q235', scan1: 'L412:M1234', scan2: 'E27:L1234' },
        { name: 'RM3', scan: 'C26:L1q236', scan1: 'L412:M1234', scan2: 'E27:L1234' },
        { name: 'RM3', scan: 'C26:L1q237', scan1: 'L412:M1234', scan2: 'E27:L1234' }
      ]
    },
    {
      name: "Philips: M12345678",
      cirs: "Fathom",
      rm: "RM2",
      due: "09/01/21",
      lastStudy: "Acceptance",
      transducer: [
        { name: 'RM1', scan: 'C26:L1q234', scan1: 'L412:M1234', scan2: 'E27:L1234' },
        { name: 'RM2', scan: 'C26:L1q235', scan1: 'L412:M1234', scan2: 'E27:L1234' },
        { name: 'RM3', scan: 'C26:L1q236', scan1: 'L412:M1234', scan2: 'E27:L1234' },
        { name: 'RM3', scan: 'C26:L1q237', scan1: 'L412:M1234', scan2: 'E27:L1234' }
      ]
    }
  ];

  getScanner() {
    const scanner1 = [
      {
        "id": '1',
        "make": "GE Logiq: L12345678",
        "model": "GE Logiq: L12345678",
        "facility": "CIRS",
        "room": "RM1",
        "barcode": "123456",
        "serial_number": "12345",
        "next_study_due": {
          "date": "07/09/2021",
          "type": "Quarterly"
        },
        "last_study": {
          "id": "4b684df6-d0d0-4634-a5bb-7fa2e52a5df4",
          "type": "Quarterly",
          "finalized": true,
          "date_performed": "2021-9-20",
          "assessment": "pass",
          "data": {
              "physical": [
                {
                  "assessment": "pass",
                  "display_name": "Control Panel",
                  "img": "",
                  "notes": []
                },
                {
                  "assessment": "fail",
                  "display_name": "Wheels",
                  "img": "",
                  "notes": []
                },
                {
                  "assessment": "fail",
                  "display_name": "Cords",
                  "img": "https://coolimages.com/384784936",
                  "notes": [{ "timestamp": "2021-9-20", "type": "eval", "text": 'cords frayed at plug' }]
                },
                {
                  "assessment": "pass",
                  "display_name": "Air Filter",
                  "img": "",
                  "notes": []
                }
              ],
              "display": [
                {
                  "assessment": "fail",
                  "display_name": "Visible Transitions",
                  "img": "",
                  "notes": []
                },
                {
                  "assessment": "fail",
                  "display_name": "Distinct Line Pairs",
                  "img": "",
                  "notes": []
                },
                {
                  "assessment": "pass",
                  "display_name": "Smooth Greyscale",
                  "img": "",
                  "notes": []
                },
                {
                  "assessment": "fail",
                  "display_name": "Consistent with PACS",
                  "img": "",
                  "notes": []
                }
              ]
          }
        },
        "transducers": [
          {
            "id": '1',
            "make": "C26:L1q237",
            "model": "C26:L1q237",
            "facility": "CIRS",
            "room": "RM1",
            "barcode": "123456",
            "serial_number": "123456",
            "next_study_due": {
              "date": "ISO 8601",
              "type": "Quarterly"
            },
            "last_study": {
              "id": "1",
              "type": "Annual",
              "finalized": "true",
              "date_performed": "07/09/2021",
              "assessment": "pass",
              "data": [{
                "physical": [
                  {
                    "assessment": "pass",
                    "display_name": "Control Panel",
                    "img": "",
                    "notes": []
                  },
                  {
                    "assessment": "fail",
                    "display_name": "Wheels",
                    "img": "",
                    "notes": []
                  },
                  {
                    "assessment": "fail",
                    "display_name": "Cords",
                    "img": "https://coolimages.com/384784936",
                    "notes": [{ "timestamp": "2021-9-20", "type": "eval", "text": 'cords frayed at plug' }]
                  },
                  {
                    "assessment": "pass",
                    "display_name": "Air Filter",
                    "img": "",
                    "notes": []
                  }],
                "image": "",
                "uniformity": {},
                "imaging": {
                  "sensitivity": {},
                  "vertical_distance": [{
                    "unit": "",
                    "display_name": "vertical distance",
                    "baseline": 12345,
                    "measured": 21212,
                    "tolerance": []
                  }],
                  "horizontal_distance": {},
                  "axial_resolution": [{
                    "unit": "",
                    "display_name": "axial resolution",
                    "baseline": 12345,
                    "measured": 21212,
                    "tolerance": []
                  }],
                  "lateral_resolution": [{
                    "unit": "",
                    "display_name": "lateralresolution",
                    "baseline": 12345,
                    "measured": 21212,
                    "tolerance": []
                  }],
                  "elevational_resolution": [{
                    "unit": "",
                    "display_name": "",
                    "baseline": 12345,
                    "measured": 21212,
                    "tolerance": []
                    }],
                    "contrast_resolution": [{
                      "unit": "",
                      "display_name": "",
                      "baseline": 12345,
                      "measured": 21212,
                      "tolerance": []
                  }]
                }
              }]
            }
          }]

      },
      {
        "id": '2',
        "make": "Philips: M12345678",
        "model": "Philips: M12345678",
        "facility": "Fathom",
        "room": "RM2",
        "barcode": "123456",
        "serial_number": "45678",
        "next_study_due": {
          "date": "09/01/2021",
          "type": "annual"
        },
        "last_study": {
          "id": "4b684df6-d0d0-4634-a5bb-7fa2e52a5df5",
          "type": "annual",
          "finalized": false,
          "date_performed": "2021-9-20",
          "assessment": "pass",
          "data": 
            {
              "physical": [
                {
                  "assessment": "pass",
                  "display_name": "Control Panel",
                  "img": "",
                  "notes": []
                },
                {
                  "assessment": "fail",
                  "display_name": "Wheels",
                  "img": "",
                  "notes": []
                },
                {
                  "assessment": "fail",
                  "display_name": "Cords",
                  "img": "https://coolimages.com/384784936",
                  "notes": [{ "timestamp": "2021-9-20", "type": "eval", "text": 'cords frayed at plug' }]
                },
                {
                  "assessment": "pass",
                  "display_name": "Air Filter",
                  "img": "",
                  "notes": []
                }
              ],
            
            
              "display": [
                {
                  "assessment": "pass",
                  "display_name": "Visible Transitions",
                  "img": "",
                  "notes": []
                },
                {
                  "assessment": "pass",
                  "display_name": "Distinct Line Pairs",
                  "img": "",
                  "notes": []
                },
                {
                  "assessment": "pass",
                  "display_name": "Smooth Greyscale",
                  "img": "",
                  "notes": []
                },
                {
                  "assessment": "fail",
                  "display_name": "Consistent with PACS",
                  "img": "",
                  "notes": []
                }
              ]
            }
          
        },
        "transducers": [
          {
            "id": '2',
            "make": "C26:L1q234",
            "model": "C26:L1q234",
            "facility": "CIRS",
            "room": "RM1",
            "barcode": "123456",
            "serial_number": "123455",
            "next_study_due": {
              "date": "ISO 8601",
              "type": "Acceptance"
            },
            "last_study": {
              "id": "2",
              "type": "Acceptance",
              "finalized": "false",
              "date_performed": "07/09/2021",
              "assessment": "pass",
              "data": [{
                "physical": [
                  {
                    "assessment": "pass",
                    "display_name": "Control Panel",
                    "img": "",
                    "notes": []
                  },
                  {
                    "assessment": "fail",
                    "display_name": "Wheels",
                    "img": "",
                    "notes": []
                  },
                  {
                    "assessment": "fail",
                    "display_name": "Cords",
                    "img": "https://coolimages.com/384784936",
                    "notes": [{ "timestamp": "2021-9-20", "type": "eval", "text": 'cords frayed at plug' }]
                  },
                  {
                    "assessment": "pass",
                    "display_name": "Air Filter",
                    "img": "",
                    "notes": []
                  }],
                "image": "",
                "uniformity": {},
                "imaging": {
                  "sensitivity": {},
                  "vertical_distance": [{
                    "unit": "",
                    "display_name": "vertical distance",
                    "baseline": 12345,
                    "measured": 21212,
                    "tolerance": []
                  }],
                  "horizontal_distance": {},
                  "axial_resolution": [{
                    "unit": "",
                    "display_name": "axial resolution",
                    "baseline": 12345,
                    "measured": 21212,
                    "tolerance": []
                  }],
                  "lateral_resolution": [{
                    "unit": "",
                    "display_name": "lateralresolution",
                    "baseline": 12345,
                    "measured": 21212,
                    "tolerance": []
                  }],
                  "elevational_resolution": [{
                    "unit": "",
                    "display_name": "",
                    "baseline": 12345,
                    "measured": 21212,
                    "tolerance": []
                    }],
                    "contrast_resolution": [{
                      "unit": "",
                      "display_name": "",
                      "baseline": 12345,
                      "measured": 21212,
                      "tolerance": []
                  }]
                }
              }]
            }
          }]
      },
      {
        "id": '3',
        "make": "GE Logiq1",
        "model": "GE Logiq1",
        "facility": "CIRS",
        "room": "RM3",
        "barcode": "123456",
        "serial_number": "78945",
        "next_study_due": {
          "date": "ISO 8601",
          "type": "Annual"
        },
        "last_study": {
          "id": "4b684df6-d0d0-4634-a5bb-7fa2e52a5df6",
          "type": "annual",
          "finalized": false,
          "date_performed": "2021-9-20",
          "assessment": "pass",
          "data": 
            {
              "physical": [
                {
                  "assessment": "pass",
                  "display_name": "Control Panel",
                  "img": "",
                  "notes": []
                },
                {
                  "assessment": "pass",
                  "display_name": "Wheels",
                  "img": "",
                  "notes": []
                },
                {
                  "assessment": "fail",
                  "display_name": "Cords",
                  "img": "https://coolimages.com/384784936",
                  "notes": [{ "timestamp": "2021-9-20", "type": "eval", "text": 'cords frayed at plug' }]
                },
                {
                  "assessment": "pass",
                  "display_name": "Air Filter",
                  "img": "",
                  "notes": []
                }
              ],
              "display": [
                {
                  "assessment": "pass",
                  "display_name": "Visible Transitions",
                  "img": "",
                  "notes": []
                },
                {
                  "assessment": "pass",
                  "display_name": "Distinct Line Pairs",
                  "img": "",
                  "notes": []
                },
                {
                  "assessment": "pass",
                  "display_name": "Smooth Greyscale",
                  "img": "",
                  "notes": []
                },
                {
                  "assessment": "pass",
                  "display_name": "Consistent with PACS",
                  "img": "",
                  "notes": []
                }
              ]
            }
        },
        "transducers": [
          {
            "id": '4',
            "make": "C26:L1q236",
            "model": "C26:L1q236",
            "facility": "CIRS",
            "room": "RM1",
            "barcode": "123456",
            "serial_number": "123451",
            "next_study_due": {
              "date": "ISO 8601",
              "type": "Acceptance"
            },
            "last_study": {
              "id": "3",
              "type": "Quarterly",
              "finalized": "false",
              "date_performed": "07/09/2021",
              "assessment": "pass",
              "data": [{
                "physical": [
                  {
                    "assessment": "pass",
                    "display_name": "Control Panel",
                    "img": "",
                    "notes": []
                  },
                  {
                    "assessment": "fail",
                    "display_name": "Wheels",
                    "img": "",
                    "notes": []
                  },
                  {
                    "assessment": "fail",
                    "display_name": "Cords",
                    "img": "https://coolimages.com/384784936",
                    "notes": [{ "timestamp": "2021-9-20", "type": "eval", "text": 'cords frayed at plug' }]
                  },
                  {
                    "assessment": "pass",
                    "display_name": "Air Filter",
                    "img": "",
                    "notes": []
                  }],
                "image": "",
                "uniformity": {},
                "imaging": {
                  "sensitivity": {},
                  "vertical_distance": [{
                    "unit": "",
                    "display_name": "vertical distance",
                    "baseline": 12345,
                    "measured": 21212,
                    "tolerance": []
                  }],
                  "horizontal_distance": {},
                  "axial_resolution": [{
                    "unit": "",
                    "display_name": "axial resolution",
                    "baseline": 12345,
                    "measured": 21212,
                    "tolerance": []
                  }],
                  "lateral_resolution": [{
                    "unit": "",
                    "display_name": "lateralresolution",
                    "baseline": 12345,
                    "measured": 21212,
                    "tolerance": []
                  }],
                  "elevational_resolution": [{
                    "unit": "",
                    "display_name": "",
                    "baseline": 12345,
                    "measured": 21212,
                    "tolerance": []
                    }],
                    "contrast_resolution": [{
                      "unit": "",
                      "display_name": "",
                      "baseline": 12345,
                      "measured": 21212,
                      "tolerance": []
                  }]
                }
              }]
            }
          }]
      }
    ];
    return scanner1;
  }
}

