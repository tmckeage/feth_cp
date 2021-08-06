import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    rowData:any= [];
    constructor(private http: HttpClient) {
    }

    public getRow(): Observable<any> {
        return this.rowData;
    }
}
