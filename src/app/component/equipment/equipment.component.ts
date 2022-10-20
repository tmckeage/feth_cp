import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map, startWith } from 'rxjs/operators';
import { EquipmentService } from 'src/app/services/equipment.service';
import { UtilitiesService } from 'src/app/services/utilities.services';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '@aws-amplify/auth';



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
	addingScanner: any;
	addingTransducer: any;
	transducerSpinner: any;
	scannerId: any = null;
	transducerId: any = null;

	constructor(
		private toastr: ToastrService,
		public modalService: NgbModal,
		private equipmentService: EquipmentService,
		private datePipe: DatePipe,
		private router: Router,
		private utilitiesService: UtilitiesService) {

		// Type list
		this.typeTransducerOption = [
			{ name: 'Linear', value: 'linear' },
			{ name: 'Endocavity', value: 'endocavity' },
			{ name: 'Phased Array', value: 'phased_array' },
			{ name: 'Abdominal', value: 'abdominal' },
		];

		// scanner form 
		this.scannerFormGroup = new FormGroup({
			"facility": new FormControl('', []),
			"make": new FormControl('', [Validators.required]),
			"model": new FormControl('', [Validators.required]),
			"room": new FormControl('', []),
			"serial_number": new FormControl('', [Validators.required]),
			"barcode_number": new FormControl('', [])
		});

		// due date calendar form
		this.dueDate = new FormGroup({
			start: new FormControl(),
			end: new FormControl()
		});

		// Transducer form 
		this.transducerFormGroup = new FormGroup({
			"barcode_number": new FormControl('', []),
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


		this.getAllEquipments();  // scanner API 
	}

	// type list finding
	getType(typeId: any) {
		if (typeId == '') return;
		return this.typeTransducerOption.find((type: any) => type.value == typeId).name;
	}

	// get scannerList  
	getAllEquipments() {
		this.equipmentService.getAllEquipments().subscribe(
				response => {
					this.loading = false;
					this.scanners = Object.values(response.scanners);
					this.unassignedTransducers = Object.values(response.unassigned_transducers);
					this.scanners.forEach((res: any) => {
						// facility list
						this.facilityList.push(res.facility);
						let result = this.facilityList.filter((val: any, index: any) => val !== null && this.facilityList.indexOf(val) == index);
						this.facilityOptions = Object.values(result);

						// room list
						this.roomList.push(res.room);
						let room = this.roomList.filter((val: any, index: any) => val !== null && this.roomList.indexOf(val) == index);
						this.roomOptions = Object.values(room);

						//make list
						this.makeNameList.push(res.make);
						let make = this.makeNameList.filter((val: any, index: any) => val !== null && this.makeNameList.indexOf(val) == index);
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
				},
				error => {
					console.log(error);
		});
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
				if(item.next_study_due === undefined) return;
				let start: any = this.datePipe.transform(item.next_study_due.date, 'MM/dd/yy');
				return start >= this.startDate;
			});
		}
		if (this.dueDate.value.end != null) {
			this.endDate = this.dueDate.value.end;
			this.endDate = this.datePipe.transform(this.endDate, 'MM/dd/yy');
			scannerList = scannerList.filter((item: any) => {
				let due: any = this.datePipe.transform(item.next_study_due.date, 'MM/dd/yy');
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
		return this.typeTransducerOption.filter((option: string) => option.toString().toLowerCase().indexOf(filterValue) === 0);
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
		this.setBarcode('');
		this.scannerId = null;
		let make = '';
		this.modelFilter(make);
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason)=>{ 
 
 		});
	}

	//save scanner 
	onSubmitScanner(scannerId: any) {
		this.addingScanner = true;
		let data = this.scannerFormGroup.value;
		let scannerModel = this.utilitiesService.prepareScannerModel(data);

		if (scannerId == null) {

			this.equipmentService.addScanner(scannerModel)
				.subscribe( response => {
					this.addingScanner = false;
					this.getAllEquipments();
					this.toastr.success('Scanner saved successfully', '');
					this.modalService.dismissAll();
				},
				error => {
					console.log(error);
				});
		} else {
			this.equipmentService.editScanner(scannerModel, scannerId)
				.subscribe( response => {
					this.scannerId = null;
					this.addingScanner = false;
					this.getAllEquipments();
					this.toastr.success('Scanner Updated successfully', '');
					this.modalService.dismissAll();
				},
				error => {
					console.log(error);
				});
		}
	}

	// save tranducer 
	onSubmitTranducer(transducerId: any) {
		this.addingTransducer =true;
		this.transducerSpinner = true;
		let data = this.transducerFormGroup.value;

		let transducerModel = this.utilitiesService.prepareTransducerModel(data);

			if (transducerId == null) {
				this.addingTransducer =false;
				this.equipmentService.addTranducer(transducerModel).subscribe( response => {
					this.transducerSpinner = false;
					this.getAllEquipments();
					this.toastr.success('Transducer saved successfully', '');
					this.modalService.dismissAll();
				},
				error => {
					console.log(error);
				});
			} else {
				this.equipmentService.editTranducer(transducerModel, transducerId).subscribe( response => {
					this.addingTransducer = false;
					this.transducerId = null;
					this.transducerSpinner = false;
					this.getAllEquipments();
					this.toastr.success('Transducer updated successfully', '');
					this.modalService.dismissAll();
				},
				error => {
					console.log(error);
				});
			}
	}

	// on scanner click open view modal
	scannerDetail(scanner: any, view: any) {
		this.viewData = scanner;
		this.scannerId = scanner.scanner_id;
		this.modalService.open(view, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason)=>{ 
 
		});
	}

	// view transducer modal
	onTransducerDetail(equipment: any, scanner: any, transducerView: any) {
		var scannerName: any;
		this.transducerId = equipment.transducer_id;
		this.scannerId = scanner.scanner_id;
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
			scanner_id: scanner.scanner_id,
			type: equipment.type,
			transducer_id :equipment.transducer_id
		};

		let imageAnalysis = equipment.analysis_parameters.image_quality_analysis;
		let uniformityAnalysis = equipment.analysis_parameters.uniformity_analysis;

		if (imageAnalysis == undefined || uniformityAnalysis == undefined) {
			this.modalService.dismissAll();
			this.modalService.open(transducerView, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
			}, (reason)=>{ 
 
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
		}, (reason)=>{ 
 
		});
	}

	// Edit scanner modal
	onScannerEdit(viewData: any, content: any) {
		this.addModalTitle = 'Edit Scanner';
		this.scannerFormGroup.controls['model'].enable();
		this.selectedMake = viewData.make;
		this.setMake(viewData.make);
		this.setModel(viewData.model);
		this.setFacility(viewData.facility);
		this.setRoom(viewData.room);
		this.setSN(viewData.serial_number);
		this.setBarcode(viewData.barcode);
		this.modalService.dismissAll();
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason)=>{ 
 
		});
	}

	confirmScannerDelete(viewData: any, deleteScanner: any) {
		this.modalService.open(deleteScanner, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason)=>{ 
 
		});
	}

	confirmTransducerDelete(viewTransducer: any, deleteScanner: any) {
		this.modalService.open(deleteScanner, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason)=>{ 
 
		});
	}

	// delete scanner  scanner_id
	removeScanner(id: any, deleteScanner: any) {
		let data = id.scanner_id;
		this.equipmentService.deleteScanner(data).subscribe(response => {
			this.getAllEquipments();
			this.toastr.success('Scanner delete successfully', '');
			this.modalService.dismissAll(); 
		},
		error => {
			console.log(error);
		});
	}

	// delete deleteTransducer
	removeTransducer(id: any) {
		this.equipmentService.deleteTranducer(id.transducer_id).subscribe(response => {
			this.getAllEquipments();
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
		}, (reason)=>{ 
 
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

		// debugger;
		this.transducerModalTitle = 'Edit Transducer';
		this.transducerFormGroup.controls['model'].enable();

		this.prepareScannerListForAutoComplete();
		this.setMakeTransducer(viewTransducer.make);
		this.setModelTransducer(viewTransducer.model);
		this.setSNTransducer(viewTransducer.serial_number);
		this.setScannerTransducer(viewTransducer.scanner_id);
		this.setTypeTransducer(viewTransducer.type);
		this.setBarcodeTransducer(viewTransducer.barcode);

		this.isModel = true;
		this.modalService.dismissAll();
		this.modalService.open(transducerModal, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason)=>{ 
 
		});
	}

	// add transducer modal
	onTransducer(transducerModal: any) {

		this.transducerModalTitle = 'New Transducer';
		this.scannerLists = [];

		this.prepareScannerListForAutoComplete();
		this.setMakeTransducer('');
		this.setModelTransducer('');
		this.setSNTransducer('');
		this.setScannerTransducer('');
		this.setTypeTransducer('');
		this.setBarcodeTransducer('');
		this.transducerId = null;
		this.isModel = false;
		this.modalService.open(transducerModal, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason)=>{ 
 
		});
	}

	// scanner id
	getScannerId(scanner_id: any) {	
		if (scanner_id == '' || scanner_id == undefined) return;
		return this.scannerLists.find((scanner: any) => scanner.scanner_id == scanner_id).scannerName;		
	}

	// Reports Cancel 
	reportsCancel(transducerModal: any) {
		this.modalService.dismissAll();
		this.modalService.open(transducerModal, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason)=>{ 
 
		});
	}

	prepareScannerListForAutoComplete() {
		// scanner list 
		this.scannersObject.forEach((res: any) => {
			let scannerNameList: any[] = [];
			scannerNameList.push(res.make + " " + res.model + "" + ' : ' + "" + res.serial_number);
			let result = scannerNameList.filter((val: any, index: any) => scannerNameList.indexOf(val) == index);
			let obj = { scanner_id: res.scanner_id, scannerName: result };
			this.scannerLists.push(obj);
		});
	}

	// Reports Error
	onReportsError(reportsError: any) {
		this.modalService.dismissAll();
		this.modalService.open(reportsError, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason)=>{ 
 
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
	setBarcode(inputVal: any) { this.scannerFormGroup.controls.barcode_number.setValue(inputVal) }
	setMakeTransducer(inputVal: any) { this.transducerFormGroup.controls.make.setValue(inputVal) }
	setModelTransducer(inputVal: any) { this.transducerFormGroup.controls.model.setValue(inputVal) }
	setSNTransducer(inputVal: any) { this.transducerFormGroup.controls.serial_number.setValue(inputVal) }
	setScannerTransducer(inputVal: any) { this.transducerFormGroup.controls.scanner.setValue(inputVal) }
	setTypeTransducer(inputVal: any) { this.transducerFormGroup.controls.type.setValue(inputVal) }
	setImageTransducer(inputVal: any) { this.transducerFormGroup.controls.image.setValue(inputVal) }
	setBarcodeTransducer(inputVal: any) { this.transducerFormGroup.controls.barcode_number.setValue(inputVal) }
	get scannerForm() { return this.scannerFormGroup.controls; }
	get transducerForm() { return this.transducerFormGroup.controls; }
}
