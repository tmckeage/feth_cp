import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router,ActivatedRoute, NavigationStart } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EquipmentService } from 'src/app/services/equipment.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-transducer',
  templateUrl: './transducer.component.html',
  styleUrls: ['./transducer.component.scss']
})
export class TransducerComponent implements OnInit {
  fathomUserDetails: any;
  visualList: any[] = [];
  dataList: any;
  analysisList: any
  imgData: any = [];
  closeResult: any;
  viewType: any;
  date: any;
  scannerName:any;
 


  constructor(private modalService: NgbModal, private router: Router, private routers:ActivatedRoute, private equipmentService:EquipmentService, private location: Location) {
   }

  ngOnInit(): void {
    	// check login session
    // 	this.fathomUserDetails = sessionStorage.fathomUserDetails ? JSON.parse(sessionStorage.fathomUserDetails) : '';
		// if (!this.fathomUserDetails.username) {
		// 	this.router.navigate(['']);
		// }
  
    // current scanner name in strore on session 
    this.scannerName = sessionStorage.getItem('currentScanner');
    this.date = sessionStorage.getItem('currentScannerDate');
   
    this.visualList = [
      {type:"Cables"},
      {type:'Cracks/Discoloration'},
      {type: 'Connectors'}
    ];
 
    this.analysisList = this.equipmentService.getScanner();
    this.analysisList.forEach((res: any) => {
      //this.date = res.last_study.date_performed;
      let data = res.transducers;
      data.forEach((item: any) => {
        this.dataList = item.last_study.data;
        let imgList: any = [];
        imgList = item.last_study.data.imaging;
        let items: any = [];
        Object.entries(imgList).forEach(([k, v]) => {
          items.push({
            name: k,
            value:v
          });
          this.imgData = items;
        });
        // this.imgData.name.replaceAll('_', '');
      });
    });

    this.visualList = [
      {type:'Uniformity', baseline:'0', measurement:'--', decision:'Review'},
      {type:'Sensitivity', baseline:'15.6 cm', measurement:'15.7 cm', decision:'Pass'},
      {type:'Vertical Distance', baseline:'9.95 cm', measurement:'10.2 cm', decision:'Pass'},
      {type:'Horizontal Distance', baseline:'2.19 cm', measurement:'', decision:'Pass'},
      {type:'Axial Resolution', baseline:'0.14 cm', measurement:'', decision:'Pass'},
      {type:'Lateral Resolution', baseline:'0.19 cm', measurement:'', decision:'Pass'},
      {type:'Elevations Resolution', baseline:'0. 32 cm', measurement:'', decision:'Pass'},
      {type:'Contrast Resolution', baseline:'0', measurement:'', decision:'Review'}

  ];

  }
  onNotes(isImgView:any, content: any, date: any){ 
   this.viewType = content;  
   this.date = date; 
  // this.modalService.dismissAll();
  this.modalService.open(isImgView, { ariaLabelledBy: 'modal-basic-title',size:'lg' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  });
  }
  onImg(isImgView: any, content: any,date: any){
    this.viewType = content;
    this.date =  date; 
    // this.modalService.dismissAll();
    this.modalService.open(isImgView, { ariaLabelledBy: 'modal-basic-title',size:'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }
  
  onDistance(type:any){ 
    if(type == 'Vertical Distance') {
      this.router.navigate(['/review/vertical']);
    }
    if(type == 'Horizontal Distance') {
      this.router.navigate(['/review/horizontal']);
    }
    if(type == 'Uniformity') {
      this.router.navigate(['/review/uniformity']);
    }
  }

  actionBack() {
    this.location.back();
  }
}
