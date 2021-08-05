import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

	columnDefs: any;
	rowData: any;

  	constructor() { }

	ngOnInit(): void {
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
			},
			{
				Name: 'Guzman, Crystal',
				'Job Type': 'Manager',
				Facility: 'All',
			},
			{
				Name: 'Knight, Vera',
				'Job Type': 'Tech',
				Facility: 'Leigh',
			},
			{
				Name: 'Chapman, Rick',
				'Job Type': 'Tech',
				Facility: 'Norfolk General',
			},
			{
				Name: 'Rice, Dominic',
				'Job Type': 'Tech',
				Facility: 'Beach General',
			},
			{
				Name: 'Freeman, Misty',
				'Job Type': 'Tech',
				Facility: 'Careplex',
			},
			{
				Name: 'Houseton, Jasmine',
				'Job Type': 'Tech',
				Facility: 'Princess Anne',
			}
		]
	}

}
