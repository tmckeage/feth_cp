import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient) {}

    RowData = [
        { Name: 'Rhodes, Simon', 'Job Type': 'Manager', Facility: 'All', Email: '123@alohatechnologydev.com', 'User Type': 'Manager', },
        { Name: 'Guzman, Crystal', 'Job Type': 'Manager', Facility: 'All', Email: '458@alohatechnologydev.com', 'User Type': 'Manager', },
        { Name: 'Knight, Vera', 'Job Type': 'Tech', Facility: 'Leigh', Email: '789@alohatechnologydev.com', 'User Type': 'Manager', },
        { Name: 'Chapman, Rick', 'Job Type': 'Tech', Facility: 'Norfolk General', Email: '748@alohatechnologydev.com', 'User Type': 'Manager', },
        { Name: 'Rice, Dominic', 'Job Type': 'Tech', Facility: 'Beach General', Email: '749@alohatechnologydev.com', 'User Type': 'Manager', },
        { Name: 'Freeman, Misty', 'Job Type': 'Tech', Facility: 'Careplex', Email: '7125@alohatechnologydev.com', 'User Type': 'Manager', },
        { Name: 'Houseton, Jasmine', 'Job Type': 'Tech', Facility: 'Princess Anne', Email: 'nitinp@alohatechnologydev.com', 'User Type': 'Manager', }
    ];
}
