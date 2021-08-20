import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';

@Component({
	selector: 'app-equipment',
	templateUrl: './equipment.component.html',
	styleUrls: ['./equipment.component.scss']
})

export class EquipmentComponent implements OnInit {
	closeResult = '';
	scanners: any;
	showModalTitle: any = '';
	viewData: any;
	makeObj: any;
	scannerFormGroup: FormGroup;
	columnDefs: any;
	rowData: any;
	makeOptions: any[] = [];
	facilityOptions:any[] = [];
	modelOptions: any[] = [];
	roomOptions: any[] = [];
	filteredMake: Observable<any[]> | undefined;
	filteredFacility: Observable<any[]> | undefined;
	filteredModel: Observable<any[]> | undefined;
	filteredRoom: Observable<any[]> | undefined;

	constructor(private modalService: NgbModal) {
		// scanner form
		this.scannerFormGroup = new FormGroup({
			"make": new FormControl('', [Validators.required]),
			"model": new FormControl('', [Validators.required]),
			"room": new FormControl('', []),
			"facility": new FormControl('', []),
			"sn": new FormControl('', [Validators.required]),
		});
		// select options 
		this.makeOptions = [
			{name: 'GE'},
			{name: 'GE1'}
		];
		this.facilityOptions = [
			{name: 'CIRS'},
			{name: 'Fathom'}
		];
		this.modelOptions = [
			{name: 'Logiq'},
			{name: 'Logiq1'}
		];
		this.roomOptions = [
			{name: 'RM1'},
			{name: 'RM2'}
		];
	}

	ngOnInit(): void {
		// filter values in autocomplete
		this.filteredMake = this.scannerFormGroup.controls.make.valueChanges.pipe(
			startWith(''),
			map(value => typeof value === 'string' ? value : value.name),
			map(name => name ? this._filterMake(name) : this.makeOptions.slice())
		);

		this.filteredFacility = this.scannerFormGroup.controls.facility.valueChanges.pipe(
			startWith(''),
			map(value => typeof value === 'string' ? value : value.name),
			map(name => name ? this._filterFacility(name) : this.facilityOptions.slice())
		);

		this.filteredModel = this.scannerFormGroup.controls.model.valueChanges.pipe(
			startWith(''),
			map(value => typeof value === 'string' ? value : value.name),
			map(name => name ? this._filterModel(name) : this.modelOptions.slice())
		);

		this.filteredRoom = this.scannerFormGroup.controls.room.valueChanges.pipe(
			startWith(''),
			map(value => typeof value === 'string' ? value : value.name),
			map(name => name ? this._filterRoom(name) : this.roomOptions.slice())
		);

        // show for nested ag-grid table
		this.scanners = [
			{ 
				name: "GE Logiq: L12345678", 
				cirs: "CIRS", 
				rm: "RM 1", 
				due: "7/31/21",
				transducer: [
					{ scan: 'C26:L1q234', scan1: 'L412:M1234', scan2: 'E27:L1234' },
					{ scan: 'C26:L1q235', scan1: 'L412:M1234', scan2: 'E27:L1234' },
					{ scan: 'C26:L1q236', scan1: 'L412:M1234', scan2: 'E27:L1234' },
					{ scan: 'C26:L1q237', scan1: 'L412:M1234', scan2: 'E27:L1234' },
				]
			},
			{ 
				name: "Philips: M12345678", 
				cirs: "CIRS", 
				rm: "RM 2", 
				due: "7/31/21",
				transducer: [
					{ scan: 'C26:L1q234', scan1: 'L412:M1234', scan2: 'E27:L1234' },
					{ scan: 'C26:L1q235', scan1: 'L412:M1234', scan2: 'E27:L1234' },
					{ scan: 'C26:L1q236', scan1: 'L412:M1234', scan2: 'E27:L1234' },
					{ scan: 'C26:L1q237', scan1: 'L412:M1234', scan2: 'E27:L1234' },
				]
			}
		];

		// This is temp JSON, once API's gets integrate then this will be get remove
		// this.columnDefs = [
		// 	{ field: 'Name', sortable: true, filter: true },
		// 	{ field: 'Job Type', sortable: true, filter: true },
		// 	{ field: 'Facility', sortable: true, filter: true }
		// ];
	}

    // autocomplete display
	displayOption(scanner: any): string {
		return scanner && scanner.name ? scanner.name : '';
	}

	// autocomplete button filter
	private _filterMake(name: string): any[] {
		const filterValue = name.toLowerCase();
		return this.makeOptions.filter(option => option.name.toLowerCase().includes(filterValue));
	}

	private _filterFacility(name: string): any[] {
		const filterValue = name.toLowerCase();
		return this.facilityOptions.filter(option => option.name.toLowerCase().includes(filterValue));
	}

	private _filterModel(name: string): any[] {
		const filterValue = name.toLowerCase();
		return this.modelOptions.filter(option => option.name.toLowerCase().includes(filterValue));
	}

	private _filterRoom(name: string): any[] {
		const filterValue = name.toLowerCase();
		return this.roomOptions.filter(option => option.name.toLowerCase().includes(filterValue));
	}
	
	// add scanner modal
	onScanner(content: any) {
		this.showModalTitle = 'New Scanner';
		this.setMake('');
		this.setModel('');
		this.setFacility('');
		this.setRoom('');
		this.setSN('');
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}

	// on scanner click open view modal
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
		this.setModel(1);
		this.setFacility(1);
		this.setRoom(1);
		this.setSN(sn);
		this.modalService.dismissAll();
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});	
	}
	
	setMake(inputVal: any) { this.scannerFormGroup.controls.make.setValue(inputVal) }
	setModel(inputVal: any) { this.scannerFormGroup.controls.model.setValue(inputVal) }
	setSN(inputVal: any) { this.scannerFormGroup.controls.sn.setValue(inputVal) }
	setRoom(inputVal: any) { this.scannerFormGroup.controls.room.setValue(inputVal) }
	setFacility(inputVal: any) { this.scannerFormGroup.controls.facility.setValue(inputVal) }
	get scannerForm() { return this.scannerFormGroup.controls; }
}