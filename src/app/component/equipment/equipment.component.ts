import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map, startWith } from 'rxjs/operators';
import { EquipmentService } from 'src/app/services/equipment.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
	selector: 'app-equipment',
	templateUrl: './equipment.component.html',
	styleUrls: ['./equipment.component.scss']
})

export class EquipmentComponent implements OnInit {
	closeResult = '';
	scanners: any;
	scannersObject: any;
	transducerList: any;
	addModalTitle: any = '';
	transducerModalTitle: any = '';
	viewData: any;
	viewTransducer: any;
	image_analysis: any;
	uniformity_analysis: any;
	dueDate: FormGroup;
	scannerFormGroup: FormGroup;
	transducerFormGroup: FormGroup;
	makeOptions: any[] = [];
	modelOptions: any[] = [];
	roomOptions: any[] = [];
	facilityOptions: any[] = [];
	imageOptions: any[] = [];
	modelTransducerOption: any[] = [];
	makeTransducerOption: any[] = [];
	filteredMake: Observable<any[]>;
	filteredFacility: Observable<any[]>;
	filteredModel: Observable<any[]>;
	filteredRoom: Observable<any[]>;
	// filteredScanner: Observable<any[]>;
	filteredMakeTransducer: Observable<any[]>;
	filteredModelTransducer: Observable<any[]>;
	filteredImageTransducer: Observable<any[]>;
	filteredType: Observable<any[]>;
	isMake: boolean = false;
	isModel: boolean = false;
	isEmpty: boolean = false;
	scannerList: any;
	selectedFacility: any = 0;
	selectedRoom: any = 0;
	make: any = '';
	model: any = ''
	serial_number: any = '';
	isTab: boolean = false;
	fathomUserDetails: any;
	startDate: any;
	endDate: any;
	isRoom: boolean = false;
	facilityList: any[] = [];
	roomList: any[] = [];
	loading: boolean = true;
	scannerLists: any[] = [];
	typeOptions: any;
	typeTransducerOption: any;
	makeNameList: any[] = [];
	modelNameList: any[] = [];
	makeTranducerNameList: any[] = [];
	modelTranducerNameList: any[] = [];
	unassignedTransducers: any[] = [];
	clicked: boolean = false;
	barcodeValue: any;
	selectedMake: any;
	selectedTransducerModel: any;
	isUniformityAnalysis: boolean = false;
	isDeleteFlag: any = '0';
	box:any;

	constructor(private toastr: ToastrService, private modalService: NgbModal, private equipmentService: EquipmentService, private datePipe: DatePipe, private router: Router) {

		// Type list 
		this.typeTransducerOption = [
			{ name: 'Linear', value: 'linear' },
			{ name: 'Endocavity', value: 'endocavity' },
			{ name: 'Phased Array', value: 'phased_array' },
			{ name: 'Abdominal', value: 'abdominal' },
		];

		// scanner form 
		this.scannerFormGroup = new FormGroup({
			"make": new FormControl('', [Validators.required]),
			"model": new FormControl('', [Validators.required]),
			"room": new FormControl('', []),
			"facility": new FormControl('', []),
			"serial_number": new FormControl('', [Validators.required])
		});

		// due date calendar form
		this.dueDate = new FormGroup({
			start: new FormControl(),
			end: new FormControl()
		});

		// Transducer form 
		this.transducerFormGroup = new FormGroup({
			"make": new FormControl('', [Validators.required]),
			"model": new FormControl('', [Validators.required]),
			"scanner": new FormControl('', []),
			"serial_number": new FormControl('', [Validators.required]),
			"type": new FormControl('', [Validators.required]),
			"image": new FormControl('', []),
			"p0_x": new FormControl('', []),
			"p0_y": new FormControl('', []),
			"p1_x": new FormControl('', []),
			"p1_y": new FormControl('', []),
			"radius_one": new FormControl('', []),
			"radius_two": new FormControl('', []),
			"theta": new FormControl('', [])
		});

		// filter values in autocomplete
		this.filteredMake = this.scannerFormGroup.controls['make'].valueChanges.pipe(
			startWith(''),
			map(value => this.make_filter(value))
		);

		this.filteredFacility = this.scannerFormGroup.controls['facility'].valueChanges.pipe(
			startWith(''),
			map(value => this.facility_filter(value))
		);

		this.filteredModel = this.scannerFormGroup.controls['model'].valueChanges.pipe(
			startWith(''),
			map(value => this.model_filter(value))
		);

		this.filteredRoom = this.scannerFormGroup.controls['room'].valueChanges.pipe(
			startWith(''),
			map(value => this.room_filter(value))
		);

		this.filteredMakeTransducer = this.transducerFormGroup.controls['make'].valueChanges.pipe(
			startWith(''),
			map(value => this.makeTransducer_filter(value))
		);

		this.filteredModelTransducer = this.transducerFormGroup.controls['model'].valueChanges.pipe(
			startWith(''),
			map(value => this.modelTransducer_filter(value))
		);

		this.filteredType = this.transducerFormGroup.controls['type'].valueChanges.pipe(
			startWith(''),
			map(values => typeof values === 'string' ? values : values.name),
			map(name => name ? this.type_filter(name) : this.typeTransducerOption.slice())
		);

		this.filteredImageTransducer = this.transducerFormGroup.controls['image'].valueChanges.pipe(
			startWith(''),
			map(value => this.image_filter(value))
		);
	}

	ngOnInit(): void {

		// scanner model is select make show model 
		this.scannerFormGroup.controls['model'].disable();
		this.transducerFormGroup.controls['model'].disable();


		this.getAllScanner();  // scanner API 
	}

	// type list finding
	getType(typeId: any) {
		return this.typeTransducerOption.find((type: any) => type.value == typeId).name;
	}

	// get scannerList  
	getAllScanner() {
		this.equipmentService.getAllScanner()
			.subscribe(
				response => {
					this.loading = false;
					this.scanners = Object.values(response.scanners);
					this.unassignedTransducers = Object.values(response.unassigned_transducers);
					this.scanners.forEach((res: any) => {
						// facility list
						this.facilityList.push(res.facility);
						let result = this.facilityList.filter((val: any, index: any) => this.facilityList.indexOf(val) == index);
						this.facilityOptions = Object.values(result);

						// room list
						this.roomList.push(res.room);
						let room = this.roomList.filter((val: any, index: any) => this.roomList.indexOf(val) == index);
						this.roomOptions = Object.values(room);

						//make list
						this.makeNameList.push(res.make);
						let make = this.makeNameList.filter((val: any, index: any) => this.makeNameList.indexOf(val) == index);
						this.makeOptions = Object.values(make);

						// transducer make list
						let tranducerObj = res.transducers;
						tranducerObj.forEach((response: any) => {
							//make list
							this.makeTranducerNameList.push(response.make);
							let make = this.makeTranducerNameList.filter((val: any, index: any) => this.makeTranducerNameList.indexOf(val) == index);
							this.makeTransducerOption = Object.values(make);
						});
					});
					this.scannersObject = Object.values(response.scanners);
					console.log("", response.scanners);
				},
				error => {
					console.log(error);
				});
	}

	// scanner id
	getScannerId(scanner_id: any) {
		var scannerNameList: any;
		// scanner list 
		this.scannerLists.forEach((res: any) => {
			let scannerName: any[] = [];
			scannerName.push(res.make + " " + res.model + "" + ' : ' + "" + res.serial_number);
			let sName = scannerName.filter((val: any, index: any) => scannerName.indexOf(val) == index);
			scannerNameList = [
				{ scanner_id: res.scanner_id, scannerName: sName }
			]
		});
		return this.scannerLists.find((scanner: any) => scanner.scanner_id == scanner_id).scannerName;
	}

	// modelNameList filter on make 
	modelFilter(make: any) {
		this.modelNameList = [];
		this.selectedMake = make;
		if (this.selectedMake) {
			// duplicate value remove in model list
			this.scannerFormGroup.controls['model'].enable()
			let modelName = this.scannersObject.filter((item: any) => { return item.make == this.selectedMake });
			modelName.forEach((item: any) => {
				this.modelNameList.push(item.model);
				this.modelOptions = [...this.modelNameList.reduce((p, c) => p.set(c, true), new Map()).keys()];
			});
		} else {
			this.scannerFormGroup.controls['model'].disable();
			this.modelNameList = [];
		}

	}

	// modelNameList filter on make
	modelTranducerFilter(make: any) {
		this.selectedTransducerModel = make;
		let transducerList: any[] = [];
		this.modelTranducerNameList = [];
		// transducer list
		this.scannersObject.forEach((res: any) => {
			transducerList.push(res.transducers);
		});

		if (this.selectedTransducerModel) {
			// duplicate value remove in model list
			this.transducerFormGroup.controls['model'].enable();
			transducerList.forEach((res: any) => {
				// unassigned Transducers list
				this.unassignedTransducers.forEach((elements: any) => {
					transducerList.push(elements);
				});
				let modelName = res.filter((item: any) => { return item.make == this.selectedTransducerModel });
				modelName.forEach((item: any) => {
					this.modelTranducerNameList.push(item.model);
					this.modelTransducerOption = [...this.modelTranducerNameList.reduce((p, c) => p.set(c, true), new Map()).keys()];
				});
			});

		} else {
			this.transducerFormGroup.controls['model'].disable();
		}
	}

	// equipment filter
	equipmentFilter() {
		let scannerList = this.scanners;
		// facility filter
		if (this.selectedFacility != 0) {
			this.isRoom = true;
			scannerList = scannerList.filter((item: any) => {
				return item.facility == this.selectedFacility;
			});
		}
		// room filter
		if (this.selectedRoom != 0) {
			scannerList = scannerList.filter((item: any) => {
				return item.room == this.selectedRoom && item.facility == this.selectedFacility;
			});
		}

		// due date filter
		if (this.dueDate.value.start != null) {
			this.startDate = this.dueDate.value.start;
			this.startDate = this.datePipe.transform(this.startDate, 'MM/dd/yy');
			scannerList = scannerList.filter((item: any) => {
				let start: any = this.datePipe.transform(item.next_Study_Due.date, 'MM/dd/yy');
				return start >= this.startDate;
			});
		}
		if (this.dueDate.value.end != null) {
			this.endDate = this.dueDate.value.end;
			this.endDate = this.datePipe.transform(this.endDate, 'MM/dd/yy');
			console.log(this.endDate);
			scannerList = scannerList.filter((item: any) => {
				let due: any = this.datePipe.transform(item.next_Study_Due.date, 'MM/dd/yy');
				return due <= this.endDate;
			});
		}
		this.scannersObject = scannerList;
	}
	// selected facility then show particular room list
	onRoomList() {
		this.roomList = [];
		if (this.selectedFacility == 0) {
			this.isRoom = false;
		}
		this.scannersObject.forEach((item: any) => {
			this.roomList.push(item.room);
			let room = this.roomList.filter((val: any, index: any) => this.roomList.indexOf(val) == index);
			this.roomList = Object.values(room);
		});
	}

	//scanner make autocomplete
	private make_filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.makeOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
	}
	// scanner model autocomplete
	private model_filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.modelOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
	}
	//scanner room autocomplete
	private room_filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.roomOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
	}

	//scanner facility autocomplete
	private facility_filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.facilityOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
	}

	//scanner scanner autocomplete
	private scanner_filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.scannerLists.filter(option => option.name.toLowerCase().includes(filterValue));
	}

	// Transducer model autocomplete
	private modelTransducer_filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.modelTransducerOption.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
	}
 
	// Transducer make autocomplete
	private makeTransducer_filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.makeTransducerOption.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
	}

	// Transducer type autocomplete
	private type_filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.typeTransducerOption.filter((option: string) => option.toLowerCase().indexOf(filterValue) === 0);
	}

	// Transducer image autocomplete
	private image_filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.imageOptions.filter((option: string) => option.toLowerCase().indexOf(filterValue) === 0);
	}

	// add scanner modal
	onScanner(content: any) {
		this.addModalTitle = 'New Scanner';
		this.setMake('');
		this.setModel('');
		this.setFacility('');
		this.setRoom('');
		this.setSN('');
		let make = '';
		this.modelFilter(make);
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}

	//save scanner 
	onSubmitScanner() {
		let data = this.scannerFormGroup.value;
		let obj = { "scanner": { ...data } };
		this.equipmentService.addScanner(JSON.stringify(obj))
			.subscribe(
				response => {
					this.getAllScanner();
					this.toastr.success('Scanner saved successfully', '');
					this.modalService.dismissAll();
				},
				error => {
					console.log(error);
				});
	}

	// save tranducer 
	onSubmitTranducer() {
		let data = this.transducerFormGroup.value;
		let obj = {
			"transducer": {
				"make": data.make,
				"model": data.model,
				"serial_number": data.serial_number,
				"type": data.type,
				"scanner_id": data.scanner,
				"analysis_parameters": {
					"x_0": 7,
					"y_0": 6,
					"x_1": 5,
					"y_1": 4,
					"theta": 3,
					"inner_radius": 2,
					"outter_radius": 1
				}

			}
		};

		this.equipmentService.addTranducer(obj)
			.subscribe(
				response => {
					this.getAllScanner();
					this.toastr.success('Transducer saved successfully', '');
					this.modalService.dismissAll();
				},
				error => {
					console.log(error);
				});

	}

	// on scanner click open view modal
	scannerDetail(scanner: any, view: any) {
		this.viewData = scanner;
		this.modalService.open(view, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}

	// view transducer modal
	onTransducerDetail(equipment: any, scanner: any, transducerView: any) {
		var scannerName: any;
		if (scanner == 'scanner') {
			scannerName = '';
		} else {
			scannerName = scanner.make + " " + scanner.model + "" + ' : ' + "" + scanner.serial_number;
		}

		this.viewTransducer = {
			make: equipment.make,
			model: equipment.model,
			serial_number: equipment.serial_number,
			barcode: equipment.barcode,
			scanner: scannerName,
			type: equipment.type,
			transducer_id :equipment.transducer_id
		};

		let imageAnalysis = equipment.analysis_parameters.image_quality_analysis;
		let uniformityAnalysis = equipment.analysis_parameters.uniformity_analysis;

		if (imageAnalysis == undefined || uniformityAnalysis == undefined) {
			this.modalService.dismissAll();
			this.modalService.open(transducerView, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
			});
		}
		
		this.image_analysis = {
			p0: imageAnalysis.p0,
			p1: imageAnalysis.p1,
			radius_one: imageAnalysis.radius_one,
			radius_two: imageAnalysis.radius_two,
			theta: imageAnalysis.theta,
			img: imageAnalysis.img
		}

		this.uniformity_analysis = {
			p0: uniformityAnalysis.p0,
			p1: uniformityAnalysis.p1,
			radius_one: uniformityAnalysis.radius_one,
			radius_two: uniformityAnalysis.radius_two,
			theta: uniformityAnalysis.theta,
			img: uniformityAnalysis.img
		}

		this.modalService.dismissAll();
		this.modalService.open(transducerView, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}

	// Edit scanner modal
	onScannerEdit(viewData: any, content: any) {
		this.addModalTitle = 'Edit Scanner';
		this.scannerFormGroup.controls['model'].enable();
		this.setMake(viewData.make);
		this.setModel(viewData.model);
		this.setFacility(viewData.facility);
		this.setRoom(viewData.room);
		this.setSN(viewData.serial_number);
		this.modalService.dismissAll();
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}

	isDelete(viewData: any, deleteScanner: any) {
		this.modalService.open(deleteScanner, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}

	TransducerDelete(viewTransducer: any, deleteScanner: any) {
		this.modalService.open(deleteScanner, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}

	// delete scanner  scanner_id
	deleteValue(id: any, deleteScanner: any) {
		let data = id.scanner_id;
		this.equipmentService.deleteScanner(data)
			.subscribe(
				response => {
					this.toastr.success('Scanner delete successfully', '');
					this.getAllScanner();
					this.modalService.dismissAll();
				},
				error => {
					console.log(error);
				});
	}

	// delete deleteTransducer
	deleteTransducerValue(id: any) {
		this.equipmentService.deleteTranducer(id.transducer_id)
			.subscribe(
				response => {
					this.getAllScanner();
					this.toastr.success('Transducer delete successfully', '');
					this.modalService.dismissAll();
				},
				error => {
					console.log(error);
				});
	}


	// on change make for transducer
	onChangeMakeTransducer(makeTransducer: any) {
		let changeMakeValue = makeTransducer;
		if (changeMakeValue) {
			this.isMake = true;
		}
	}

	// print barcode 
	onPrint(viewPrint: any) {
		this.modalService.dismissAll();
		this.modalService.open(viewPrint, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
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
	onKey(event: any, makeTransducer: any) {
		let modelValue = event.target.value;
		this.onChangeMakeTransducer(modelValue);
		this.filteredModelTransducer.forEach(item => {
			 item.forEach(res => {
				if (modelValue == res && this.isMake == true) {
					this.isModel = true;
					this.isEmpty = false;
				} else if (modelValue == "" && this.isMake == false) {
					this.isEmpty = false;
					this.isModel = false;
				} else {
					if (modelValue && this.isModel == false) {
						this.isEmpty = true;
					} else {
						this.isEmpty = false;
						this.isModel = false;
					}
				}

			 });
		})
	}


	// transducer edit modal
	onTransducerEdit(viewTransducer: any, transducerModal: any, image_analysis: any, uniformity_analysis: any) {
		this.transducerModalTitle = 'Edit Transducer';
		this.transducerFormGroup.controls['model'].enable();

		this.setMakeTransducer(viewTransducer.make);
		this.setModelTransducer(viewTransducer.model);
		this.setSNTransducer(viewTransducer.serial_number);
		this.setScannerTransducer(viewTransducer.scanner);
		this.setTypeTransducer(viewTransducer.type);

		this.isModel = true;
		this.modalService.dismissAll();
		this.modalService.open(transducerModal, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}

	// add transducer modal
	onTransducer(transducerModal: any) {
		this.transducerModalTitle = 'New Transducer';
		this.scannerLists = [];

		// scanner list 
		this.scannersObject.forEach((res: any) => {
			let scannerNameList: any[] = [];
			scannerNameList.push(res.make + " " + res.model + "" + ' : ' + "" + res.serial_number);
			let result = scannerNameList.filter((val: any, index: any) => scannerNameList.indexOf(val) == index);
			let obj = { scanner_id: res.scanner_id, scannerName: result };
			this.scannerLists.push(obj);
		});

		this.setMakeTransducer('');
		this.setModelTransducer('');
		this.setSNTransducer('');
		this.setScannerTransducer('');
		this.setTypeTransducer('');
		this.isModel = false;
		this.modalService.open(transducerModal, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}

	// Reports Cancel 
	reportsCancel(transducerModal: any) {
		this.modalService.dismissAll();
		this.modalService.open(transducerModal, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}

	// Reports Error
	onReportsError(reportsError: any) {
		this.modalService.dismissAll();
		this.modalService.open(reportsError, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}
	// scanner print
	printScanner(barcode: any) {
		this.barcodeValue = barcode;
	}

	// on select make autocomplete display model list
	onModel() {
		this.modelNameList = [];
		if (this.selectedMake) {
			// duplicate value remove in model list
			this.scannerFormGroup.controls['model'].enable()
			let modelName = this.scannersObject.filter((item: any) => { return item.make == this.selectedMake });
			modelName.forEach((item: any) => {
				this.modelNameList.push(item.model);
				this.modelOptions = [...this.modelNameList.reduce((p, c) => p.set(c, true), new Map()).keys()];
			});
		} else {
			this.scannerFormGroup.controls['model'].disable();
			this.modelNameList = [];
		}
	}

	// on select transducer popup make autocomplete display model list
	onModelTranducer() {
		let transducerList: any[] = [];
		this.modelTranducerNameList = [];
		// transducer list
		this.scannersObject.forEach((res: any) => {
			transducerList.push(res.transducers);
		});

		if (this.selectedTransducerModel) {
			// duplicate value remove in model list
			this.transducerFormGroup.controls['model'].enable();
			transducerList.forEach((res: any) => {
				// unassigned Transducers list
				this.unassignedTransducers.forEach((elements: any) => {
					transducerList.push(elements);
				});
				let modelName = res.filter((item: any) => { return item.make == this.selectedTransducerModel });
				modelName.forEach((item: any) => {
					this.modelTranducerNameList.push(item.model);
					this.modelTransducerOption = [...this.modelTranducerNameList.reduce((p, c) => p.set(c, true), new Map()).keys()];
				});
			});

		} else {
			this.transducerFormGroup.controls['model'].disable();
		}
	}


	setMake(inputVal: any) { this.scannerFormGroup.controls.make.setValue(inputVal) }
	setModel(inputVal: any) { this.scannerFormGroup.controls.model.setValue(inputVal) }
	setSN(inputVal: any) { this.scannerFormGroup.controls.serial_number.setValue(inputVal) }
	setRoom(inputVal: any) { this.scannerFormGroup.controls.room.setValue(inputVal) }
	setFacility(inputVal: any) { this.scannerFormGroup.controls.facility.setValue(inputVal) }
	setMakeTransducer(inputVal: any) { this.transducerFormGroup.controls.make.setValue(inputVal) }
	setModelTransducer(inputVal: any) { this.transducerFormGroup.controls.model.setValue(inputVal) }
	setSNTransducer(inputVal: any) { this.transducerFormGroup.controls.serial_number.setValue(inputVal) }
	setScannerTransducer(inputVal: any) { this.transducerFormGroup.controls.scanner.setValue(inputVal) }
	setTypeTransducer(inputVal: any) { this.transducerFormGroup.controls.type.setValue(inputVal) }
	setImageTransducer(inputVal: any) { this.transducerFormGroup.controls.image.setValue(inputVal) }
	get scannerForm() { return this.scannerFormGroup.controls; }
	get transducerForm() { return this.transducerFormGroup.controls; }
}
