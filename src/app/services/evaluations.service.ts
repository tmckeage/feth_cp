import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EvaluationsService {
    
    constructor(private http: HttpClient) { }
    
    getEvaluations(): Observable<any> {
        return this.http.get(environment.api_url + '/api/v1/evaluations');
    }
    getScannerEvaluations(scannerEvaluationId:any): Observable<any> {
        return this.http.get(environment.api_url + '/api/v1/scanner_evaluations/' + scannerEvaluationId);
    }
}
