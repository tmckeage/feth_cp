import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

	columns: any;
	users: any;

  	constructor() { }

	ngOnInit(): void {
		// This is temp JSON, once API's gets integrate then this will be get remove
		this.columns = ['Name', 'Job Type', 'Facility'];
		this.users = [
			{
				name: 'Rhodes, Simon',
				job_type: 'Manager',
				facility: 'All',
			},
			{
				name: 'Guzman, Crystal',
				job_type: 'Manager',
				facility: 'All',
			},
			{
				name: 'Knight, Vera',
				job_type: 'Tech',
				facility: 'Leigh',
			},
			{
				name: 'Chapman, Rick',
				job_type: 'Tech',
				facility: 'Norfolk General',
			},
			{
				name: 'Rice, Dominic',
				job_type: 'Tech',
				facility: 'Beach General',
			},
			{
				name: 'Freeman, Misty',
				job_type: 'Tech',
				facility: 'Careplex',
			},
			{
				name: 'Houseton, Jasmine',
				job_type: 'Tech',
				facility: 'Princess Anne',
			}
		]
	}
}
