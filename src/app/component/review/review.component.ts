import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipmentService } from 'src/app/services/equipment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { toArray } from 'underscore';



@Component({
	selector: 'app-review',
	templateUrl: './review.component.html',
	styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
	fathomUserDetails: any;
	scanners: any;
	facilityName: any;
	roomName: any;
	typeName: any;
	selectedFacility: any = 0;
	selectedRoom: any = 0;
	selectedType: any = 0;
	selectedSn: any = "";
	viewData: any;
	closeResult: any;
	date: any;
	isFinalized: boolean = false;
	snResult: any;
	review: any;
	reviewList: any;
	reviewData: any;
	assessmentType: any;
	reasonTextArea: any;
	scannerAcceptance: any;
	noteValue: any;
	titleName: any;
	scannersObject: any;
	transducerList: any;
	viewTransducer: any;
	facilityList: any[] = [];
	roomList: any[] = [];
	typeList: any[] = [];
	isRoom: boolean = false;
	loading: boolean = true;
	physical: any[] = [];
	display: any[] = [];
	studies: any;



	constructor(private modalService: NgbModal, private router: Router, private equipmentService: EquipmentService) { }

	ngOnInit(): void {
		// check login session
		// this.fathomUserDetails = sessionStorage.fathomUserDetails ? JSON.parse(sessionStorage.fathomUserDetails) : '';
		// if (!this.fathomUserDetails.username) {
		// 	this.router.navigate(['']);
		// } 
		this.getAllScanner();
	}

	// get scannerList  
	getAllScanner() {
		this.equipmentService.getAllScanner()
			.subscribe(
				response => {
					this.loading = false;
					this.scanners = Object.values(response.scanners);
					this.scannersObject = Object.values(response.scanners);
					this.scanners.forEach((res: any) => {
						// facility list
						this.facilityList.push(res.facility);
						let result = this.facilityList.filter((val: any, index: any) => this.facilityList.indexOf(val) == index);
						this.facilityList = Object.values(result);
						// room list
						this.roomList.push(res.room);
						let room = this.roomList.filter((val: any, index: any) => this.roomList.indexOf(val) == index);
						this.roomList = Object.values(room);
						// type list
						this.typeList.push(res.next_Study_Due.type);
						let type = this.typeList.filter((val: any, index: any) => this.typeList.indexOf(val) == index);
						this.typeList = Object.values(type);
					});
				},
				error => {
					console.log(error);
				});
	}
    

	// equipment filter
	equipmentFilter() {
		let scannerList = this.scannersObject;
		// facility filter
		if (this.selectedFacility != 0) {
			this.isRoom = true;
			scannerList = scannerList.filter((item: any) => {
				return item.facility === this.selectedFacility;
			});
		}
		// room filter
		if (this.selectedRoom != 0) {
			scannerList = scannerList.filter((item: any) => {
				return item.room == this.selectedRoom && item.facility == this.selectedFacility;
			});
		}
		// type filter
		if (this.selectedType != 0) {
			scannerList = scannerList.filter((item: any) => {
				return item.last_study.type == this.selectedType;
			});
		}
		// s/n searching
		if (this.selectedSn != "") {
			scannerList = scannerList.filter((item: any) => {
				return item.serial_number == this.selectedSn;
			});
		}
		this.scanners = scannerList;
	}

	// selected facility then show particular room list
	onRoomList() {
		this.roomList = [];
		if (this.selectedFacility == 0) {
			this.isRoom = false;
		}
		this.scanners.forEach((item: any) => {
			this.roomList.push(item.room);
			let room = this.roomList.filter((val: any, index: any) => this.roomList.indexOf(val) == index);
			this.roomList = Object.values(room);
		});
	}

 



	// on scanner click open view modal
	scannerDetail(scanner: any, scannerView: any) {
		this.titleName = 'Scanner Acceptance Study';
		this.viewData = scanner.make +""+ " : " +""+ scanner.model +""+ scanner.serial_number;
		this.date = scanner.next_Study_Due.date;
		this.isFinalized = false;

		// if (scanner.last_study.finalized === true) {
		// 	this.isFinalized = true;
		// } 
		let data = '0iAZc35Xxhze_m9ZLInW2g';
		this.equipmentService.studieScanner(data).subscribe(
			response => {
				this.studies = response.studies;
			    console.log(this.studies); 
				 this.studies.forEach((res: any) => {
						this.physical = Object.entries(res.data.physical);
		                this.display = Object.entries(res.data.display);	
				 });

			});
		this.modalService.open(scannerView, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}); 
	}

	reason(e: any) { 

	}

	getKeys(list: any): Array<string> {
		return Object.keys(list);
	}

	// sub study icon clicking open model
	subStudy(subStudyView: any, review: any, res: any) {
		this.scannerAcceptance = review;
		this.noteValue = res.notes.text;
		this.modalService.open(subStudyView, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}

	// reason for change type
	onSubStudy(isSubStudyAvailable: any, e: any, value: any) {
		this.assessmentType = e.target.value;
		this.review = value;
		setTimeout(() => {
			this.modalService.open(isSubStudyAvailable, { ariaLabelledBy: 'modal-basic-title', size: 'md' }).result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
			});
		}, 200);
	}

	// transducer detail
	onTransducerDetail(transducer: any, scanner: any) {
		this.reviewData = transducer.last_study;
		let currentScannerName = scanner.make +""+ " : " +""+ scanner.model +""+ scanner.serial_number;
		let currentScannerDate = scanner.next_Study_Due.date;
		sessionStorage.setItem('currentScanner', currentScannerName);
		sessionStorage.setItem('currentScannerDate', currentScannerDate);
		this.router.navigate(['/review/transducer']);
	}
}


