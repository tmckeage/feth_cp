import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EquipmentService {
  facilityTransducer: any[] = [];
  roomTransducer: any[] = [];
  typeTransducer: any[] = [];
  
  constructor(private http: HttpClient) {
    this.facilityTransducer = ['CIRS', 'Fathom'];
    this.roomTransducer = ['RM1', 'RM2', 'RM3'];
    this.typeTransducer = ['Monthly', 'Quarterly', 'Annual', 'Acceptance']
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
        "transducers": [{
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
            "id": '36f483cd-99fb-494d-a8e0-8ee1f75ddb10',
            "type": 'annual',
            "finalized": false,
            "date_performed": '2021-07-10',
            "assessment": "none",
            "data": {
              "physical": [
                {
                  "assessment": "pass",
                  "display_name": "Cables",
                  "img": "",
                  "notes": []
                }, {
                  "assessment": "pass",
                  "display_name": "Cracks/Discoloration",
                  "img": "",
                  "notes": []
                }, {
                  "assessment": "fail",
                  "display_name": "Connectors",
                  "img": "https://www.fathom.com/img/934322856",
                  "notes": [
                    {
                      "timestamp": "2021-7-10T12:28",
                      "type": "eval",
                      "text": "Connector loose; falls out if bumped"
                    }
                  ]
                }
              ],
              "image": "https://www.fathom.com/img/567822856",
              "uniformity": "",
              "imaging": {
                "sensitivity": "",
                "vertical_distance": [
                  {
                    "unit": "cm",
                    "display_name": "1",
                    "baseline": -1.3,
                    "measured": -1.2,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "2",
                    "baseline": -1.1,
                    "measured": -1.0,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "3",
                    "baseline": -0.9,
                    "measured": -0.8,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "4",
                    "baseline": -0.7,
                    "measured": -0.6,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "5",
                    "baseline": -0.5,
                    "measured": -0.4,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "6",
                    "baseline": 0,
                    "measured": 0,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "7",
                    "baseline": 0.5,
                    "measured": 0.5,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "8",
                    "baseline": 1.0,
                    "measured": 1.0,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "9",
                    "baseline": 1.5,
                    "measured": 1.4,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "10",
                    "baseline": 2.0,
                    "measured": 1.9,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "11",
                    "baseline": 2.5,
                    "measured": 2.4,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "12",
                    "baseline": 3.0,
                    "measured": 2.9,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "13",
                    "baseline": 3.5,
                    "measured": 3.4,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "14",
                    "baseline": 4.0,
                    "measured": 3.9,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "15",
                    "baseline": 4.5,
                    "measured": 4.4,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "16",
                    "baseline": 5.0,
                    "measured": 4.9,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "17",
                    "baseline": 5.5,
                    "measured": 5.4,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "18",
                    "baseline": 6.0,
                    "measured": 5.9,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "19",
                    "baseline": 6.5,
                    "measured": 6.4,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "20",
                    "baseline": 1.0,
                    "measured": 6.9,
                    "tolerance": "",
                  },
                ],
                "horizontal_distance": {
                  "row_one": [
                    {
                      "unit": "cm",
                      "display_name": "1",
                      "baseline": -1.45,
                      "measured": -1.5,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "2",
                      "baseline": 0,
                      "measured": 0,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "3",
                      "baseline": 1.47,
                      "measured": 1.5,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "4",
                      "baseline": "",
                      "measured": "",
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "5",
                      "baseline": "",
                      "measured": "",
                      "tolerance": "",
                    }
                  ],
                  "row_two": [
                    {
                      "unit": "cm",
                      "display_name": "1",
                      "baseline": -4,
                      "measured": -3.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "2",
                      "baseline": -2.0,
                      "measured": -2.0,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "3",
                      "baseline": 0,
                      "measured": 0,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "4",
                      "baseline": 2.1,
                      "measured": 2.0,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "5",
                      "baseline": 4.1,
                      "measured": 4.0,
                      "tolerance": "",
                    }
                  ],
                },
                "axial_resolution": [
                  {
                    "unit": "cm",
                    "display_name": "2",
                    "baseline": 0.15,
                    "measured": 0.17,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "4",
                    "baseline": 0.13,
                    "measured": 0.14,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "6",
                    "baseline": 0.13,
                    "measured": 0.13,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "8",
                    "baseline": 0.12,
                    "measured": 0.11,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "10",
                    "baseline": 0.11,
                    "measured": 0.11,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "12",
                    "baseline": 0.11,
                    "measured": 0.10,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "14",
                    "baseline": 0.10,
                    "measured": 0.09,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "16",
                    "baseline": 0.09,
                    "measured": 0.09,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "18",
                    "baseline": 0.09,
                    "measured": 0.10,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "20",
                    "baseline": 0.08,
                    "measured": 0.08,
                    "tolerance": "",
                  }
                ],
                "lateral_resolution": [
                  {
                    "unit": "cm",
                    "display_name": "2",
                    "baseline": 0.07,
                    "measured": 0.07,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "4",
                    "baseline": 0.07,
                    "measured": 0.08,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "6",
                    "baseline": 0.06,
                    "measured": 0.07,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "8",
                    "baseline": 0.08,
                    "measured": 0.08,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "10",
                    "baseline": 0.07,
                    "measured": 0.09,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "12",
                    "baseline": 0.08,
                    "measured": 0.07,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "14",
                    "baseline": 0.07,
                    "measured": 0.08,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "16",
                    "baseline": 0.07,
                    "measured": 0.07,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "18",
                    "baseline": 0.06,
                    "measured": 0.06,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "20",
                    "baseline": 0.06,
                    "measured": 0.06,
                    "tolerance": "",
                  }
                ],
                "elevational_resolution": [
                  {
                    "unit": "cm",
                    "display_name": "1",
                    "baseline": 0.25,
                    "measured": 0.27,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "3",
                    "baseline": 0.23,
                    "measured": 0.24,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "5",
                    "baseline": 0.23,
                    "measured": 0.23,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "7",
                    "baseline": 0.22,
                    "measured": 0.21,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "9",
                    "baseline": 0.21,
                    "measured": 0.21,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "11",
                    "baseline": 0.21,
                    "measured": 0.21,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "13",
                    "baseline": 0.20,
                    "measured": 0.19,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "15",
                    "baseline": 0.19,
                    "measured": 0.19,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "17",
                    "baseline": 0.19,
                    "measured": 0.20,
                    "tolerance": "",
                  }, {
                    "unit": "cm",
                    "display_name": "19",
                    "baseline": 0.18,
                    "measured": 0.18,
                    "tolerance": "",
                  }
                ],

                "contrast_resolution": [],
              }
            }
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
          "type": "Annual"
        },
        "last_study": {
          "id": "4b684df6-d0d0-4634-a5bb-7fa2e52a5df5",
          "type": "Annual",
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
              "type": "Annual"
            },
            "last_study": {
              "id": '36f483cd-99fb-494d-a8e0-8ee1f75ddb11',
              "type": 'annual',
              "finalized": false,
              "date_performed": '2021-07-10',
              "assessment": "none",
              "data": {
                "physical": [
                  {
                    "assessment": "pass",
                    "display_name": "Cables",
                    "img": "",
                    "notes": []
                  }, {
                    "assessment": "pass",
                    "display_name": "Cracks/Discoloration",
                    "img": "",
                    "notes": []
                  }, {
                    "assessment": "fail",
                    "display_name": "Connectors",
                    "img": "https://www.fathom.com/img/934322856",
                    "notes": [
                      {
                        "timestamp": "2021-7-10T12:28",
                        "type": "eval",
                        "text": "Connector loose; falls out if bumped"
                      }
                    ]
                  }
                ],
                "image": "https://www.fathom.com/img/567822856",
                "uniformity": "",
                "imaging": {
                  "sensitivity": "",
                  "vertical_distance": [
                    {
                      "unit": "cm",
                      "display_name": "1",
                      "baseline": -1.3,
                      "measured": -1.2,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "2",
                      "baseline": -1.1,
                      "measured": -1.0,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "3",
                      "baseline": -0.9,
                      "measured": -0.8,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "4",
                      "baseline": -0.7,
                      "measured": -0.6,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "5",
                      "baseline": -0.5,
                      "measured": -0.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "6",
                      "baseline": 0,
                      "measured": 0,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "7",
                      "baseline": 0.5,
                      "measured": 0.5,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "8",
                      "baseline": 1.0,
                      "measured": 1.0,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "9",
                      "baseline": 1.5,
                      "measured": 1.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "10",
                      "baseline": 2.0,
                      "measured": 1.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "11",
                      "baseline": 2.5,
                      "measured": 2.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "12",
                      "baseline": 3.0,
                      "measured": 2.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "13",
                      "baseline": 3.5,
                      "measured": 3.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "14",
                      "baseline": 4.0,
                      "measured": 3.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "15",
                      "baseline": 4.5,
                      "measured": 4.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "16",
                      "baseline": 5.0,
                      "measured": 4.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "17",
                      "baseline": 5.5,
                      "measured": 5.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "18",
                      "baseline": 6.0,
                      "measured": 5.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "19",
                      "baseline": 6.5,
                      "measured": 6.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "20",
                      "baseline": 7.0,
                      "measured": 6.9,
                      "tolerance": "",
                    },
                  ],
                  "horizontal_distance": {
                    "row_one": [
                      {
                        "unit": "cm",
                        "display_name": "1",
                        "baseline": -1.45,
                        "measured": -1.5,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "2",
                        "baseline": 0,
                        "measured": 0,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "3",
                        "baseline": 1.47,
                        "measured": 1.5,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "4",
                        "baseline": "",
                        "measured": "",
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "5",
                        "baseline": "",
                        "measured": "",
                        "tolerance": "",
                      }
                    ],
                    "row_two": [
                      {
                        "unit": "cm",
                        "display_name": "1",
                        "baseline": -4,
                        "measured": -3.9,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "2",
                        "baseline": -2.0,
                        "measured": -2.0,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "3",
                        "baseline": 0,
                        "measured": 0,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "4",
                        "baseline": 2.1,
                        "measured": 2.0,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "5",
                        "baseline": 4.1,
                        "measured": 4.0,
                        "tolerance": "",
                      }
                    ],
                  },
                  "axial_resolution": [
                    {
                      "unit": "cm",
                      "display_name": "2",
                      "baseline": 0.15,
                      "measured": 0.17,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "4",
                      "baseline": 0.13,
                      "measured": 0.14,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "6",
                      "baseline": 0.13,
                      "measured": 0.13,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "8",
                      "baseline": 0.12,
                      "measured": 0.11,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "10",
                      "baseline": 0.11,
                      "measured": 0.11,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "12",
                      "baseline": 0.11,
                      "measured": 0.10,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "14",
                      "baseline": 0.10,
                      "measured": 0.09,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "16",
                      "baseline": 0.09,
                      "measured": 0.09,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "18",
                      "baseline": 0.09,
                      "measured": 0.10,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "20",
                      "baseline": 0.08,
                      "measured": 0.08,
                      "tolerance": "",
                    }
                  ],
                  "lateral_resolution": [
                    {
                      "unit": "cm",
                      "display_name": "2",
                      "baseline": 0.07,
                      "measured": 0.07,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "4",
                      "baseline": 0.07,
                      "measured": 0.08,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "6",
                      "baseline": 0.06,
                      "measured": 0.07,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "8",
                      "baseline": 0.08,
                      "measured": 0.08,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "10",
                      "baseline": 0.07,
                      "measured": 0.09,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "12",
                      "baseline": 0.08,
                      "measured": 0.07,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "14",
                      "baseline": 0.07,
                      "measured": 0.08,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "16",
                      "baseline": 0.07,
                      "measured": 0.07,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "18",
                      "baseline": 0.06,
                      "measured": 0.06,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "20",
                      "baseline": 0.06,
                      "measured": 0.06,
                      "tolerance": "",
                    }
                  ],
                  "elevational_resolution": [
                    {
                      "unit": "cm",
                      "display_name": "1",
                      "baseline": 0.25,
                      "measured": 0.27,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "3",
                      "baseline": 0.23,
                      "measured": 0.24,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "5",
                      "baseline": 0.23,
                      "measured": 0.23,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "7",
                      "baseline": 0.22,
                      "measured": 0.21,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "9",
                      "baseline": 0.21,
                      "measured": 0.21,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "11",
                      "baseline": 0.21,
                      "measured": 0.21,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "13",
                      "baseline": 0.20,
                      "measured": 0.19,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "15",
                      "baseline": 0.19,
                      "measured": 0.19,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "17",
                      "baseline": 0.19,
                      "measured": 0.20,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "19",
                      "baseline": 0.18,
                      "measured": 0.18,
                      "tolerance": "",
                    }
                  ],

                  "contrast_resolution": [],
                }
              }
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
          "type": "Acceptance"
        },
        "last_study": {
          "id": "4b684df6-d0d0-4634-a5bb-7fa2e52a5df6",
          "type": "Acceptance",
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
              "id": '36f483cd-99fb-494d-a8e0-8ee1f75ddb12',
              "type": 'annual',
              "finalized": false,
              "date_performed": '2021-07-10',
              "assessment": "none",
              "data": {
                "physical": [
                  {
                    "assessment": "pass",
                    "display_name": "Cables",
                    "img": "",
                    "notes": []
                  }, {
                    "assessment": "pass",
                    "display_name": "Cracks/Discoloration",
                    "img": "",
                    "notes": []
                  }, {
                    "assessment": "fail",
                    "display_name": "Connectors",
                    "img": "https://www.fathom.com/img/934322856",
                    "notes": [
                      {
                        "timestamp": "2021-7-10T12:28",
                        "type": "eval",
                        "text": "Connector loose; falls out if bumped"
                      }
                    ]
                  }
                ],
                "image": "https://www.fathom.com/img/567822856",
                "uniformity": "",
                "imaging": {
                  "sensitivity": "",
                  "vertical_distance": [
                    {
                      "unit": "cm",
                      "display_name": "1",
                      "baseline": -1.3,
                      "measured": -1.2,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "2",
                      "baseline": -1.1,
                      "measured": -1.0,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "3",
                      "baseline": -0.9,
                      "measured": -0.8,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "4",
                      "baseline": -0.7,
                      "measured": -0.6,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "5",
                      "baseline": -0.5,
                      "measured": -0.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "6",
                      "baseline": 0,
                      "measured": 0,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "7",
                      "baseline": 0.5,
                      "measured": 0.5,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "8",
                      "baseline": 1.0,
                      "measured": 1.0,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "9",
                      "baseline": 1.5,
                      "measured": 1.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "10",
                      "baseline": 2.0,
                      "measured": 1.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "11",
                      "baseline": 2.5,
                      "measured": 2.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "12",
                      "baseline": 3.0,
                      "measured": 2.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "13",
                      "baseline": 3.5,
                      "measured": 3.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "14",
                      "baseline": 4.0,
                      "measured": 3.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "15",
                      "baseline": 4.5,
                      "measured": 4.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "16",
                      "baseline": 5.0,
                      "measured": 4.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "17",
                      "baseline": 5.5,
                      "measured": 5.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "18",
                      "baseline": 6.0,
                      "measured": 5.9,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "19",
                      "baseline": 6.5,
                      "measured": 6.4,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "20",
                      "baseline": 7.0,
                      "measured": 6.9,
                      "tolerance": "",
                    },
                  ],
                  "horizontal_distance": {
                    "row_one": [
                      {
                        "unit": "cm",
                        "display_name": "1",
                        "baseline": -1.45,
                        "measured": -1.5,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "2",
                        "baseline": 0,
                        "measured": 0,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "3",
                        "baseline": 1.47,
                        "measured": 1.5,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "4",
                        "baseline": "",
                        "measured": "",
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "5",
                        "baseline": "",
                        "measured": "",
                        "tolerance": "",
                      }
                    ],
                    "row_two": [
                      {
                        "unit": "cm",
                        "display_name": "1",
                        "baseline": -4,
                        "measured": -3.9,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "2",
                        "baseline": -2.0,
                        "measured": -2.0,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "3",
                        "baseline": 0,
                        "measured": 0,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "4",
                        "baseline": 2.1,
                        "measured": 2.0,
                        "tolerance": "",
                      }, {
                        "unit": "cm",
                        "display_name": "5",
                        "baseline": 4.1,
                        "measured": 4.0,
                        "tolerance": "",
                      }
                    ],
                  },
                  "axial_resolution": [
                    {
                      "unit": "cm",
                      "display_name": "2",
                      "baseline": 0.15,
                      "measured": 0.17,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "4",
                      "baseline": 0.13,
                      "measured": 0.14,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "6",
                      "baseline": 0.13,
                      "measured": 0.13,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "8",
                      "baseline": 0.12,
                      "measured": 0.11,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "10",
                      "baseline": 0.11,
                      "measured": 0.11,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "12",
                      "baseline": 0.11,
                      "measured": 0.10,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "14",
                      "baseline": 0.10,
                      "measured": 0.09,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "16",
                      "baseline": 0.09,
                      "measured": 0.09,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "18",
                      "baseline": 0.09,
                      "measured": 0.10,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "20",
                      "baseline": 0.08,
                      "measured": 0.08,
                      "tolerance": "",
                    }
                  ],
                  "lateral_resolution": [
                    {
                      "unit": "cm",
                      "display_name": "2",
                      "baseline": 0.07,
                      "measured": 0.07,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "4",
                      "baseline": 0.07,
                      "measured": 0.08,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "6",
                      "baseline": 0.06,
                      "measured": 0.07,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "8",
                      "baseline": 0.08,
                      "measured": 0.08,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "10",
                      "baseline": 0.07,
                      "measured": 0.09,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "12",
                      "baseline": 0.08,
                      "measured": 0.07,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "14",
                      "baseline": 0.07,
                      "measured": 0.08,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "16",
                      "baseline": 0.07,
                      "measured": 0.07,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "18",
                      "baseline": 0.06,
                      "measured": 0.06,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "20",
                      "baseline": 0.06,
                      "measured": 0.06,
                      "tolerance": "",
                    }
                  ],
                  "elevational_resolution": [
                    {
                      "unit": "cm",
                      "display_name": "1",
                      "baseline": 0.25,
                      "measured": 0.27,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "3",
                      "baseline": 0.23,
                      "measured": 0.24,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "5",
                      "baseline": 0.23,
                      "measured": 0.23,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "7",
                      "baseline": 0.22,
                      "measured": 0.21,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "9",
                      "baseline": 0.21,
                      "measured": 0.21,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "11",
                      "baseline": 0.21,
                      "measured": 0.21,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "13",
                      "baseline": 0.20,
                      "measured": 0.19,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "15",
                      "baseline": 0.19,
                      "measured": 0.19,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "17",
                      "baseline": 0.19,
                      "measured": 0.20,
                      "tolerance": "",
                    }, {
                      "unit": "cm",
                      "display_name": "19",
                      "baseline": 0.18,
                      "measured": 0.18,
                      "tolerance": "",
                    }
                  ],

                  "contrast_resolution": [],
                }
              }
            }
          }]
      }
    ];
    return scanner1;
  }
  
  addScanner(data: any): Observable<any> {
    return this.http.post(environment.api_url +'/scanner', data);
  }
  
  getScanners(): Observable<any> {
    return this.http.get(environment.api_url +'/scanner');
  }

  getAllTransducer(): Observable<any> {
    return this.http.get(environment.api_url +'/transducer');
  } 

  addTranducer(data: any): Observable<any> {
    return this.http.post(environment.api_url +'/transducer', data);
  }

  getAllScanner(): Observable<any> {
    return this.http.get(environment.api_Url);
  }
  
}

