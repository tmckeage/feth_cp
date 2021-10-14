import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipmentService } from 'src/app/services/equipment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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


	constructor(private modalService: NgbModal, private router: Router, private equipmentService: EquipmentService) { }

	ngOnInit(): void {
		// check login session
		this.fathomUserDetails = sessionStorage.fathomUserDetails ? JSON.parse(sessionStorage.fathomUserDetails) : '';
		if (!this.fathomUserDetails.username) {
			this.router.navigate(['']);
		}
		// show for dropDown list
		this.scanners = this.equipmentService.getScanner();
		this.roomName = this.equipmentService.roomTransducer;
		this.facilityName = this.equipmentService.facilityTransducer;
		this.typeName = this.equipmentService.typeTransducer;

	}

	// equipment filter
	equipmentFilter() {
		let scannerList = this.equipmentService.getScanner();
		// facility filter
		if (this.selectedFacility != 0) {
			scannerList = scannerList.filter(item => {
				return item.facility === this.selectedFacility;
			});
		}
		// room filter
		if (this.selectedRoom != 0) {
			scannerList = scannerList.filter(item => {
				return item.room === this.selectedRoom;
			});
		}
		// type filter
		if (this.selectedType != 0) {
			scannerList = scannerList.filter(item => {
				return item.last_study == this.selectedType;
			});
		}
		// s/n searching
		if (this.selectedSn != "") {
			scannerList = scannerList.filter(item => {
				return item.serial_number == this.selectedSn;
			});
		}
		this.scanners = scannerList;
	}

	// on scanner click open view modal
	scannerDetail(scanner: any, scannerView: any) {
		this.titleName = 'Scanner Acceptance Study';
		this.viewData = scanner.make;
		this.date = '07/10/2021';
		this.isFinalized = false;
		if (scanner.last_study.finalized === "true") {
			this.isFinalized = true;
		}
		this.reviewList = scanner.last_study.data;
		this.modalService.open(scannerView, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
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
		}, 3000);
	}

	reason(reason: any) {

	}

	// transducer detail
	onTransducerDetail(transducer: any) {
		this.reviewData = transducer.last_study;
		this.router.navigate(['/review/transducer']);

	}
}


