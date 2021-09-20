import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn  } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map, startWith } from 'rxjs/operators';
import { EquipmentService } from 'src/app/services/equipment.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'app-equipment',
	templateUrl: './equipment.component.html',
	styleUrls: ['./equipment.component.scss']
})

export class EquipmentComponent implements OnInit {
	closeResult = '';
	scanners: any;
	addModalTitle: any = '';
	transducerModalTitle: any = '';
	viewData: any;
	viewTransducer: any;
	dueDate: FormGroup;
	scannerFormGroup: FormGroup;
	transducerFormGroup: FormGroup;
	makeOptions: any[] = [];
	facilityOptions:any[] = [];
	modelOptions: any[] = [];
	roomOptions: any[] = [];
	scannerOptions: any[] = [];
	imageOptions: any[] = [];
	modelTransducerOption:any[] = [];
	makeTransducerOption:any[] = [];
	filteredMake: Observable<any[]> | undefined;
	filteredFacility: Observable<any[]> | undefined;
	filteredModel: Observable<any[]> | undefined;
	filteredRoom: Observable<any[]> | undefined;
	filteredScanner: Observable<any[]> | undefined;
	filteredMakeTransducer:Observable<any[]> | undefined;
	filteredModelTransducer: Observable<any[]> | undefined;
	filteredSnTransducer: Observable<any[]> | undefined;
	filteredImageTransducer: Observable<any[]> | undefined;
	isMake:boolean = false;
	isModel:boolean = false;
	isEmpty:boolean = false;
	isTab:boolean = false;
	facilityName:any;
	roomName:any;
	scannerList: any;
	selectedFacility: any = 0;
	selectedRoom: any = 0 ;
	make: any = '';
	model: any = ''
	sn: any = ''; 
	fathomUserDetails: any;
	startDate:any;
	endDate:any;

	constructor(private modalService: NgbModal, private equipmentService:EquipmentService, private datePipe: DatePipe, private router: Router) {
		// select options 
		this.makeOptions = ['GE', 'GE1'];
		this.facilityOptions = ['CIRS', 'Fathom'];
		this.modelOptions = ['Logiq', 'Logiq1'];
		this.roomOptions = ['RM1', 'RM2'];
		this.scannerOptions = ['scanner1','scanner2'];
		this.imageOptions = ['Default','Default1'];	
		this.makeTransducerOption = ['GE1', 'GE2'];
		this.modelTransducerOption = ['Logiq1', 'Logiq2'];

		// scanner form 
		this.scannerFormGroup = new FormGroup({
			"make": new FormControl('', [Validators.required]),
			"model": new FormControl('', [Validators.required]),
			"room": new FormControl('', []),
			"facility": new FormControl('', []),
			"sn": new FormControl('', [Validators.required]),
		}); 

        // due date calendar form
		this.dueDate = new FormGroup({
			start: new FormControl(),
			end: new FormControl()
		});

		// Transducer form
		this.transducerFormGroup = new FormGroup({
			"makeTransducer": new FormControl('', [Validators.required]),
			"modelTransducer": new FormControl('', [Validators.required]),
			"scannerTransducer": new FormControl('', []),
			"snTransducer": new FormControl('', [Validators.required]),
			"image": new FormControl('', []),
		});
	}

	ngOnInit(): void {
		// check login session
		this.fathomUserDetails = sessionStorage.fathomUserDetails ? JSON.parse(sessionStorage.fathomUserDetails) : '';
		if (!this.fathomUserDetails.username){
			this.router.navigate(['']);
		}
		
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

		this.filteredMakeTransducer = this.transducerFormGroup.controls.makeTransducer.valueChanges.pipe(
			startWith(''),
			map(value => typeof value === 'string' ? value : value.name),
			map(name => name ? this._filterMakeTransducer(name) : this.makeTransducerOption.slice())
		);

		this.filteredModelTransducer = this.transducerFormGroup.controls.modelTransducer.valueChanges.pipe(
			startWith(''),
			map(value => typeof value === 'string' ? value : value.name),
			map(name => name ? this._filterModelTransducer(name) : this.modelTransducerOption.slice())
		);

		this.filteredScanner = this.transducerFormGroup.controls.scannerTransducer.valueChanges.pipe(
			startWith(''),
			map(value => typeof value === 'string' ? value : value.name),
			map(name => name ? this._filterScanner(name) : this.scannerOptions.slice())
		);

		this.filteredImageTransducer = this.transducerFormGroup.controls.image.valueChanges.pipe(
			startWith(''),
			map(value => typeof value === 'string' ? value : value.name),
			map(name => name ? this._filterImageTransducer(name) : this.imageOptions.slice())
		);

        // show for dropDown list
		this.scanners = this.equipmentService.scanners;
		this.roomName = this.equipmentService.roomTransducer;
		this.facilityName = this.equipmentService.facilityTransducer;
	}
	
	// equipment filter
	equipmentFilter() {
		let scannerList = this.equipmentService.scanners;
		// facility filter
		if (this.selectedFacility != 0) {
		    scannerList = scannerList.filter(item => {
				return item.cirs === this.selectedFacility;
			});
		}
		// room filter
		if (this.selectedRoom != 0) {
		    scannerList = scannerList.filter(item => {
				return item.rm === this.selectedRoom;
			});
		}
		// due date filter
		if (this.dueDate.value.start != null) {
			this.startDate = this.dueDate.value.start;
			this.startDate = this.datePipe.transform(this.startDate, 'MM/dd/yy');
			console.log(this.startDate);
		    scannerList = scannerList.filter(item => {
				return item.due >= this.startDate;
			});
		}
		if (this.dueDate.value.end != null) {
			this.endDate = this.dueDate.value.end;
			this.endDate = this.datePipe.transform(this.endDate, 'MM/dd/yy');
			console.log(this.endDate);
		    scannerList = scannerList.filter(item => {
				return item.due <= this.endDate;
			});
		}
		this.scanners = scannerList;
	}
	
	// autocomplete button filter
	private _filterMake(name: string): any[] {
		const filterValue = name.toLowerCase();
		return this.makeOptions.filter(option => option.toLowerCase().includes(filterValue));
	}

	private _filterFacility(name: string): any[] {
		const filterValue = name.toLowerCase();
		return this.facilityOptions.filter(option => option.toLowerCase().includes(filterValue));
	}

	private _filterModel(name: string): any[] {
		const filterValue = name.toLowerCase();
		return this.modelOptions.filter(option => option.toLowerCase().includes(filterValue));
	}

	private _filterRoom(name: string): any[] {
		const filterValue = name.toLowerCase();
		return this.roomOptions.filter(option => option.toLowerCase().includes(filterValue));
	}

	private _filterScanner(name: string): any[] {
		const filterValue = name.toLowerCase();
		return this.scannerOptions.filter(option => option.toLowerCase().includes(filterValue));
	}

	private _filterMakeTransducer(name: string): any[] {
		const filterValue = name.toLowerCase();
		return this.makeTransducerOption.filter(option => option.toLowerCase().includes(filterValue));
	}

	private _filterModelTransducer(name: string): any[] {
		const filterValue = name.toLowerCase();
		return this.modelTransducerOption.filter(option => option.toLowerCase().includes(filterValue));
	}

	private _filterImageTransducer(name: string): any[] {
		const filterValue = name.toLowerCase();
		return this.imageOptions.filter(option => option.toLowerCase().includes(filterValue));
	}

	// add scanner modal
	onScanner(content: any) {
		this.addModalTitle = 'New Scanner';
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
	scannerDetail(scanner: any, view: any) {
		const [name, snNo] = scanner.name.split(':');
		this.viewData = scanner;
		scanner.make = name;
		scanner.sn = snNo;
		this.modalService.open(view, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}
	
	// view transducer modal
	onTransducerDetail(equipment: any, scanner:any, transducerView:any){
		const [name, snNo] = scanner.name.split(':');
	    this.viewTransducer = equipment;
		this.viewTransducer.make = name;
		this.viewTransducer.sn = snNo;
		this.viewTransducer.model = name;
		this.modalService.dismissAll();
		this.modalService.open(transducerView, { ariaLabelledBy: 'modal-basic-title', size:'lg' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}

	// Edit scanner modal
	onScannerEdit(viewData: any, content: any) {
		this.addModalTitle = 'Edit Scanner';
		const [name, sn] = viewData.name.split(':');
		this.setMake(name);
		this.setModel(name);  
		this.setFacility(viewData.cirs);
		this.setRoom(viewData.rm);
		this.setSN(sn);
		this.modalService.dismissAll();
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});	
	}

	// on change make for transducer
	onChangeMakeTransducer(makeTransducer: any){
       let changeMakeValue = makeTransducer; 
	   if(changeMakeValue){
        this.isMake = true;
	    }
	}

	// on change model for transducer
	onChangeModalTransducer(modelTransducer: any) {
		let changeModalValue = modelTransducer; 
		if (changeModalValue && this.isMake === true) {
		   this.isModel = true;
	    } else {
		   this.isEmpty = true;
		}
	}

	// Enter new value in input make
	onKey(event: any, makeTransducer: any){
	  let modelValue = event.target.value;
	  this.modelOptions.forEach(item =>{
		if (modelValue == item && this.isMake === true) {
			this.isModel = true;
			this.isEmpty = false;
		} else if (modelValue == "" && this.isMake === false ) {
			this.isEmpty = false; 
			this.isModel = false;
		} else {
			if (modelValue && this.isModel == false){
				this.isEmpty = true; 
			} else{
				this.isEmpty = false; 
				this.isModel = false;
			}
		}
	  })
	}

    // transducer edit modal
	onTransducerEdit(viewTransducer: any, transducerModal: any){
		this.transducerModalTitle = 'Edit Transducer';
		this.setMakeTransducer(viewTransducer.make);
		this.setModelTransducer(viewTransducer.model);  
		this.setSNTransducer(viewTransducer.sn);
		this.setScannerTransducer(viewTransducer.scan);
		this.setImageTransducer(viewTransducer.scan1);
		this.isModel = true;
		this.modalService.dismissAll();
		this.modalService.open(transducerModal, { ariaLabelledBy: 'modal-basic-title',size:'lg' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});	
	}

	// add transducer modal
	onTransducer(transducerModal: any) {
		this.transducerModalTitle = 'New Transducer';
		this.setMakeTransducer('');
		this.setModelTransducer('');  
		this.setSNTransducer('');
		this.setScannerTransducer('');
		this.setImageTransducer('');
		this.isModel = false;
		this.modalService.open(transducerModal, { ariaLabelledBy: 'modal-basic-title',size:'lg' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}
	
	// Reports Cancel 
	reportsCancel(transducerModal: any){
		this.modalService.dismissAll();
		this.modalService.open(transducerModal, { ariaLabelledBy: 'modal-basic-title',size:'lg' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}

	// Reports Error
	onReportsError(reportsError: any){
		this.modalService.dismissAll();
		this.modalService.open(reportsError, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});	
	}

	setMake(inputVal: any) { this.scannerFormGroup.controls.make.setValue(inputVal) }
	setModel(inputVal: any) { this.scannerFormGroup.controls.model.setValue(inputVal) }
	setSN(inputVal: any) { this.scannerFormGroup.controls.sn.setValue(inputVal) }
	setRoom(inputVal: any) { this.scannerFormGroup.controls.room.setValue(inputVal) }
	setFacility(inputVal: any) { this.scannerFormGroup.controls.facility.setValue(inputVal) }
	setMakeTransducer(inputVal: any) { this.transducerFormGroup.controls.makeTransducer.setValue(inputVal) }
	setModelTransducer(inputVal: any) { this.transducerFormGroup.controls.modelTransducer.setValue(inputVal) }
	setSNTransducer(inputVal: any) { this.transducerFormGroup.controls.snTransducer.setValue(inputVal) }
	setScannerTransducer(inputVal: any) { this.transducerFormGroup.controls.scannerTransducer.setValue(inputVal) }
	setImageTransducer(inputVal: any) { this.transducerFormGroup.controls.image.setValue(inputVal) }
	get scannerForm() { return this.scannerFormGroup.controls; }
	get transducerForm() { return this.transducerFormGroup.controls;}
}
