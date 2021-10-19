import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, NavigationStart } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-transducer',
  templateUrl: './transducer.component.html',
  styleUrls: ['./transducer.component.scss']
})
export class TransducerComponent implements OnInit {
  fathomUserDetails: any;
  visualList: any[] = [];
  analysisList: any
  imgData: any;
  closeResult: any;
  viewType: any;
  date: any;
  constructor(private modalService: NgbModal, private router: Router,  private equipmentService:EquipmentService) { }

  ngOnInit(): void {
    	// check login session
    	this.fathomUserDetails = sessionStorage.fathomUserDetails ? JSON.parse(sessionStorage.fathomUserDetails) : '';
		if (!this.fathomUserDetails.username) {
			this.router.navigate(['']);
		}
    this.visualList = [
      {type:"Cables"},
      {type:'Cracks/Discoloration'},
      {type: 'Connectors'}
    ];
    
    this.analysisList = this.equipmentService.getScanner();
    this.analysisList.forEach((res:any)=>{
      this.date = res.last_study.date_performed;
    });
    this.imgData = [
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
  onNotes(isImgView:any, content: any){ 
   this.viewType = content;  
   this.date = this.date; 
  // this.modalService.dismissAll();
  this.modalService.open(isImgView, { ariaLabelledBy: 'modal-basic-title',size:'lg' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  });
  }
  onImg(isImgView: any, content: any){
    this.viewType = content;
    this.date =  this.date; 
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

}
