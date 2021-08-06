import { Component, OnInit, ViewChild } from '@angular/core';
import {UserService} from '../../services/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

	columnDefs: any;
	rowData: any;
	modalTitle: any;
	addUser!: FormGroup;
	showEditModal = false;
	display = 'none';

	constructor(private userService:UserService) {

	}

	ngOnInit(): void {

		this.addUser = new FormGroup({
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

		this.rowData = [
			{
				Name: 'Rhodes, Simon',
				'Job Type': 'Manager',
				Facility: 'All',
				Email: '123@alohatechnologydev.com',
				'User Type': 'Manager',
			},
			{
				Name: 'Guzman, Crystal',
				'Job Type': 'Manager',
				Facility: 'All',
				Email: '458@alohatechnologydev.com',
				'User Type': 'Manager',
			},
			{
				Name: 'Knight, Vera',
				'Job Type': 'Tech',
				Facility: 'Leigh',
				Email: '789@alohatechnologydev.com',
				'User Type': 'Manager',
			},
			{
				Name: 'Chapman, Rick',
				'Job Type': 'Tech',
				Facility: 'Norfolk General',
				Email: '748@alohatechnologydev.com',
				'User Type': 'Manager',
			},
			{
				Name: 'Rice, Dominic',
				'Job Type': 'Tech',
				Facility: 'Beach General',
				Email: '749@alohatechnologydev.com',
				'User Type': 'Manager',
			},
			{
				Name: 'Freeman, Misty',
				'Job Type': 'Tech',
				Facility: 'Careplex',
				Email: '7125@alohatechnologydev.com',
				'User Type': 'Manager',
			},
			{
				Name: 'Houseton, Jasmine',
				'Job Type': 'Tech',
				Facility: 'Princess Anne',
				Email: 'nitinp@alohatechnologydev.com',
				'User Type': 'Manager',
			}
		]
	}

	onCellClicked(event: any) {
		if (event.colDef.field === 'Name') {
			const [first_name, last_name] = this.rowData[event.rowIndex].Name.split(',');
			const email_id = this.rowData[event.rowIndex].Email;
			this.setFirstName(first_name);
			this.setLastName(last_name);
			this.setEmail(email_id);
			this.setUserType(2);
			this.setFacility(1);
			this.display='block';
		}
	}

	modalClose(){
		this.display='none';
	}

	actionAddUser() {
		this.setFirstName('');
		this.setLastName('');
		this.setEmail('');
		this.setUserType(2);
		this.setFacility(1);
	}

	setFirstName(inputVal: any) {this.addUser.controls.first_name.setValue(inputVal)}
	setLastName(inputVal: any) {this.addUser.controls.last_name.setValue(inputVal)}
	setEmail(inputVal: any) {this.addUser.controls.email.setValue(inputVal)}
	setUserType(inputVal: any) {this.addUser.controls.user_type.setValue(inputVal)}
	setFacility(inputVal: any) {this.addUser.controls.facility.setValue(inputVal)}
}