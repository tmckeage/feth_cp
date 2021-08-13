import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-equipment',
	templateUrl: './equipment.component.html',
	styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
	closeResult = '';
	scanners: any;
	equipment: any;
	showModalTitle: any = '';
	scanner: any;
	viewData: any;
	makeObj: any;
	scannerForms!: FormGroup;
	columnDefs: any;
	rowData: any;
	constructor(private modalService: NgbModal) { }
	ngOnInit(): void {
		this.scannerForms = new FormGroup({
			"make": new FormControl('Select', [Validators.required]),
			"modal": new FormControl('Select', [Validators.required]),
			"room": new FormControl('Select', [Validators.required]),
			"facility": new FormControl('Select', [Validators.required]),
			"sn": new FormControl('', [Validators.required])
		});

		this.scanners = [{ name: "GE Logiq: L12345678", cirs: "CIRS", rm: "RM 1", due: "7/31/21" }];
		this.scanner = [{ name: "Philips: M12345678", cirs: "CIRS", rm: "RM 2", due: "7/31/21" }];
		this.equipment = [{ scan: 'C26:L1q234', scan1: 'L412:M1234', scan2: 'E27:L1234' }];

		// This is temp JSON, once API's gets integrate then this will be get remove
		this.columnDefs = [
			{ field: 'Name', sortable: true, filter: true },
			{ field: 'Job Type', sortable: true, filter: true },
			{ field: 'Facility', sortable: true, filter: true }
		];

		this.rowData = [
			{ Name: 'Rhodes, Simon', 'Job Type': 'Manager', Facility: 'All', Email: '123@alohatechnologydev.com', 'User Type': 'Manager', },
			{ Name: 'Guzman, Crystal', 'Job Type': 'Manager', Facility: 'All', Email: '458@alohatechnologydev.com', 'User Type': 'Manager', },
			{ Name: 'Knight, Vera', 'Job Type': 'Tech', Facility: 'Leigh', Email: '789@alohatechnologydev.com', 'User Type': 'Manager', },
			{ Name: 'Chapman, Rick', 'Job Type': 'Tech', Facility: 'Norfolk General', Email: '748@alohatechnologydev.com', 'User Type': 'Manager', },
			{ Name: 'Rice, Dominic', 'Job Type': 'Tech', Facility: 'Beach General', Email: '749@alohatechnologydev.com', 'User Type': 'Manager', },
			{ Name: 'Freeman, Misty', 'Job Type': 'Tech', Facility: 'Careplex', Email: '7125@alohatechnologydev.com', 'User Type': 'Manager', },
			{ Name: 'Houseton, Jasmine', 'Job Type': 'Tech', Facility: 'Princess Anne', Email: 'nitinp@alohatechnologydev.com', 'User Type': 'Manager', }
		];
	}
	
	// add scanner modal
	onScanner(content: any) {
		this.showModalTitle = 'New Scanner';
		this.setMake('');
		this.setModal('');
		this.setFacility('');
		this.setRoom('');
		this.setSN('');
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}
	// on equipment click open view modal
	onView(event: any, view: any) {
		this.showModalTitle = 'Scanner Details';
		this.makeObj = this.scanners[0].name.split(':');
		this.viewData = this.scanners[0];
		this.modalService.open(view, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}
	// Edit modal
	onEdit($event: any, content: any) {
		this.showModalTitle = 'Edit Scanner';
		const [make, sn] = this.scanners[0].name.split(':');
		this.viewData = this.scanners[0];
		this.setMake(1);
		this.setModal(1);
		this.setFacility(1);
		this.setRoom(1);
		this.setSN(sn);
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}
	setMake(inputVal: any) { this.scannerForms.controls.make.setValue(inputVal) }
	setModal(inputVal: any) { this.scannerForms.controls.modal.setValue(inputVal) }
	setSN(inputVal: any) { this.scannerForms.controls.sn.setValue(inputVal) }
	setRoom(inputVal: any) { this.scannerForms.controls.room.setValue(inputVal) }
	setFacility(inputVal: any) { this.scannerForms.controls.facility.setValue(inputVal) }
}