import { Component, OnInit, ViewChild } from '@angular/core';
import {UserService} from '../../services/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
	closeResult = '';
	columnDefs: any;
	rowData: any = {};
	modalTitle: any;
	userForms!: FormGroup;
	showModalTitle = '';
	viewData:any;
	viewName: any;
    isView!: boolean;

	constructor(private userService:UserService, private modalService: NgbModal) {}

	ngOnInit(): void {
		this.userForms = new FormGroup({
			"first_name": new FormControl(null, [Validators.required]),
			"last_name": new FormControl(null, [Validators.required]),
			"user_type": new FormControl(null, [Validators.required]),
			"facility": new FormControl(null, [Validators.required]),
			"email": new FormControl('',[Validators.required, Validators.email]),
			"reset_password": new FormControl(false, [Validators.required])
		});

		// This is temp JSON, once API's gets integrate then this will be get remove
		this.columnDefs = [
			{ field: 'Name', sortable: true, filter: true },
			{ field: 'Job Type', sortable: true, filter: true },
			{ field: 'Facility', sortable: true, filter: true }
		];

		// get row data from service
		this.rowData = this.userService.RowData;
	}

	// on click table coloms open view modal
	onCellClicked(event: any, view:any) {
		this.showModalTitle = 'Edit User';
		this.isView = true;
		if (event.colDef.field === 'Name') {
			const [first_name, last_name] = this.rowData[event.rowIndex].Name.split(',');
			const email_id = this.rowData[event.rowIndex].Email;
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
	}
     // on clicking edit button open modal
	onEdit(event: any, content:any){ 
		this.isView = false;
		this.setFirstName(this.viewData.first_name);
		this.setLastName(this.viewData.last_name);
		this.setEmail(this.viewData.Email);
		this.setUserType(2);
		this.setFacility(1);
		this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}
	// Function callback when clicking add user button
	actionAddUser(content: any) {
		this.showModalTitle = 'Add User';
		this.setFirstName('');
		this.setLastName('');
		this.setEmail('');
		this.setUserType(2);
		this.setFacility(1);

		this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		});
	}

	setFirstName(inputVal: any) {this.userForms.controls.first_name.setValue(inputVal)}
	setLastName(inputVal: any) {this.userForms.controls.last_name.setValue(inputVal)}
	setEmail(inputVal: any) {this.userForms.controls.email.setValue(inputVal)}
	setUserType(inputVal: any) {this.userForms.controls.user_type.setValue(inputVal)}
	setFacility(inputVal: any) {this.userForms.controls.facility.setValue(inputVal)}
	get userForm() { return this.userForms.controls; }
}