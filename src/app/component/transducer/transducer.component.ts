import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-transducer',
  templateUrl: './transducer.component.html',
  styleUrls: ['./transducer.component.scss']
})
export class TransducerComponent implements OnInit {
	closeResult = '';
	scanners: any;
	showModalTitle: any = '';
	transducerModalTitle: any = ''
	viewData: any;
	makeObj: any;
	// transducerFormGroup: FormGroup;
	columnDefs: any;
	rowData: any;
	makeOptions: any[] = [];
	facilityOptions:any[] = [];
	modelOptions: any[] = [];
	roomOptions: any[] = [];
	scannerOptions: any[] = [];
	imageOptions: any[] = [];
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
	facilityName:any;
	roomName:any;
	public selectedRoom: any;
	public selectedFacility:any;
	public startDate:any;
	public EndDate:any;

  constructor() { }

  ngOnInit(): void {
    // this.filteredMakeTransducer = this.transducerFormGroup.controls.makeTransducer.valueChanges.pipe(
	// 		startWith(''),
	// 		map(value => typeof value === 'string' ? value : value.name),
	// 		map(name => name ? this._filterMakeTransducer(name) : this.makeOptions.slice())
	// 	);

	// 	this.filteredModelTransducer = this.transducerFormGroup.controls.modelTransducer.valueChanges.pipe(
	// 		startWith(''),
	// 		map(value => typeof value === 'string' ? value : value.name),
	// 		map(name => name ? this._filterModelTransducer(name) : this.modelOptions.slice())
	// 	);

	// 	this.filteredScanner = this.transducerFormGroup.controls.scanners.valueChanges.pipe(
	// 		startWith(''),
	// 		map(value => typeof value === 'string' ? value : value.name),
	// 		map(name => name ? this._filterScanner(name) : this.scannerOptions.slice())
	// 	);

	// 	this.filteredImageTransducer = this.transducerFormGroup.controls.image.valueChanges.pipe(
	// 		startWith(''),
	// 		map(value => typeof value === 'string' ? value : value.name),
	// 		map(name => name ? this._filterImageTransducer(name) : this.imageOptions.slice())
	// 	);
  }
 // autocomplete button filter
//  private _filterMake(name: string): any[] {
//   const filterValue = name.toLowerCase();
//   return this.makeOptions.filter(option => option.toLowerCase().includes(filterValue));
// }

// private _filterFacility(name: string): any[] {
//   const filterValue = name.toLowerCase();
//   return this.facilityOptions.filter(option => option.toLowerCase().includes(filterValue));
// }

// private _filterModel(name: string): any[] {
//   const filterValue = name.toLowerCase();
//   return this.modelOptions.filter(option => option.toLowerCase().includes(filterValue));
// }

// private _filterRoom(name: string): any[] {
//   const filterValue = name.toLowerCase();
//   return this.roomOptions.filter(option => option.toLowerCase().includes(filterValue));
// }

// private _filterScanner(name: string): any[] {
//   const filterValue = name.toLowerCase();
//   return this.roomOptions.filter(option => option.toLowerCase().includes(filterValue));
// }

// private _filterMakeTransducer(name: string): any[] {
//   const filterValue = name.toLowerCase();
//   return this.makeOptions.filter(option => option.toLowerCase().includes(filterValue));
// }

// private _filterModelTransducer(name: string): any[] {
//   const filterValue = name.toLowerCase();
//   return this.makeOptions.filter(option => option.toLowerCase().includes(filterValue));
// }

// private _filterSnTransducer(name: string): any[] {
//   const filterValue = name.toLowerCase();
//   return this.makeOptions.filter(option => option.toLowerCase().includes(filterValue));
// }

// private _filterImageTransducer(name: string): any[] {
//   const filterValue = name.toLowerCase();
//   return this.makeOptions.filter(option => option.toLowerCase().includes(filterValue));
// } 

}
