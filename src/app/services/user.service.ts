import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient) {}

    usersList = [
        { name: 'Rhodes, Simon', jobType: 'Manager', facility: 'All', email: '123@alohatechnologydev.com', 'User Type': 'Manager', },
        { name: 'Guzman, Crystal', jobType: 'Manager', facility: 'All', email: '458@alohatechnologydev.com', 'User Type': 'Manager', },
        { name: 'Knight, Vera', jobType: 'Tech', facility: 'Leigh', email: '789@alohatechnologydev.com', 'User Type': 'Manager', },
        { name: 'Chapman, Rick', jobType: 'Tech', facility: 'Norfolk General', email: '748@alohatechnologydev.com', 'User Type': 'Manager', },
        { name: 'Rice, Dominic', jobType: 'Tech', facility: 'Beach General', email: '749@alohatechnologydev.com', 'User Type': 'Manager', },
        { name: 'Freeman, Misty', jobType: 'Tech', facility: 'Careplex', email: '7125@alohatechnologydev.com', 'User Type': 'Manager', },
        { name: 'Houseton, Jasmine', jobType: 'Tech', facility: 'Princess Anne', email: 'nitinp@alohatechnologydev.com', 'User Type': 'Manager', }
    ];
}
