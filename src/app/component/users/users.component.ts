import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavbarService } from '../../services/navbar.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
	closeResult = '';
	columnDefs: any;
	rowData: any = {}
	userForms: FormGroup;
	addModalTitle = '';
	viewData:any;
	viewName: any;
	fathomUserDetails: any;
	facilityOptions: any[] =  [
		{ value: '', name: 'SELECT' },
		{ value: 1, name: 'All' },
		{ value: 2, name: 'Leigh' },
		{ value: 3, name: 'Norfolk General' },
		{ value: 4, name: 'Beach General' },
		{ value: 5, name: 'Careplex' },
		{ value: 6, name: 'Princess Anne' },
	];
	userTypes: any[] =  [
		{ value: '', name: 'SELECT' },
		{ value: 1, name: 'Manger'},
		{ value: 2, name: 'Tech' },
		{ value: 3, name: 'Inactive' },
	];
	selectedItem: string | undefined;

	constructor(private nav: NavbarService, private userService:UserService, private modalService: NgbModal, private router: Router) {
		this.userForms = new FormGroup({
			"first_name": new FormControl(null, [Validators.required]),
			"last_name": new FormControl(null, [Validators.required]),
			"user_type": new FormControl(null, [Validators.required]),
			"facility": new FormControl(null, [Validators.required]),
			"email": new FormControl('',[Validators.required, Validators.email]),
			"reset_password": new FormControl(null, [Validators.required])
		});
	}

	ngOnInit(): void {
		// check login session
		// this.fathomUserDetails = sessionStorage.fathomUserDetails ? JSON.parse(sessionStorage.fathomUserDetails) : '';
		// if (!this.fathomUserDetails.username){
		// 	this.router.navigate(['']);
		// }
        // show nav bar 
		this.nav.show();

		// This is temp JSON, once API's gets integrate then this will be get remove

		// cellStyle: {textAlign: 'center'}, cellClass: "grid-cell-centered"
		this.columnDefs = [
			{ field: 'name', sortable: true, filter: true, width: '300%' },
			{ field: 'jobType', sortable: true, filter: true , width: '300%' },
			{ field: 'facility', sortable: true, filter: true , width: '280%' }
		];

		// get row data from service
		this.rowData = this.userService.usersList;
	}

	// Function on clicking table columns open view modal
	onCellClicked(event: any, view:any) {
		this.addModalTitle = 'Edit User';
		const [first_name, last_name] = this.rowData[event.rowIndex].name.split(',');
		const email_id = this.rowData[event.rowIndex].email;
		this.viewData = this.rowData[event.rowIndex];
		this.viewData.first_name = first_name;
		this.viewData.last_name = last_name;
		this.viewData.job_type = 'Tech';
		this.setFirstName(first_name);
		this.setLastName(last_name);
		this.setEmail(email_id);
		this.setUserType(2);
		this.setFacility(1);
		this.modalService.open(view, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}

    // Function on clicking edit button open modal
	onEdit(event: any, content:any){
		this.setFirstName(this.viewData.first_name);
		this.setLastName(this.viewData.last_name);
		this.setEmail(this.viewData.email);
		this.setUserType(2);
		this.setFacility(1);
		this.modalService.dismissAll();
		this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}

	// Function callback when clicking add user button
	actionAddUser(content: any) {
		this.addModalTitle = 'Add User';
		this.setFirstName('');
		this.setLastName('');
		this.setEmail('');
		this.setUserType(2);
		this.setFacility(1);
		this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, error => {});
	}

	setFirstName(inputVal: any) {this.userForms.controls.first_name.setValue(inputVal)}
	setLastName(inputVal: any) {this.userForms.controls.last_name.setValue(inputVal)}
	setEmail(inputVal: any) {this.userForms.controls.email.setValue(inputVal)}
	setUserType(inputVal: any) {this.userForms.controls.user_type.setValue(inputVal)}
	setFacility(inputVal: any) {this.userForms.controls.facility.setValue(inputVal)}
	get userForm() { return this.userForms.controls; }
}
