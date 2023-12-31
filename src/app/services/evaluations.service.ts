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
        return this.http.get(`${environment.api_url}/api/v1/evaluations`);
    }
    
    getScannerData(scannerId:any): Observable<any> {
        return this.http.get(`${environment.api_url}/api/v1/scanner/${scannerId}`);
    }

    getTransducerData(transducerId:any): Observable<any> {
        return this.http.get(`${environment.api_url}/api/v1/transducer/${transducerId}`);
    }
    
    getScannerEvaluations(scannerEvaluationId:any): Observable<any> {
        return this.http.get(`${environment.api_url}/api/v1/scanner_evaluations/${scannerEvaluationId}`);
    }
    
    scannerNote(scannerId: any, category: any, data: any): Observable<any>{
        return this.http.put(`${environment.api_url}/api/v1/scanner_evaluations/${scannerId}/${category}/note`, data);
    }
    scannerAssesment(scannerId: any, category: any, data: any): Observable<any>{
        return this.http.put(`${environment.api_url}/api/v1/scanner_evaluations/${scannerId}/${category}/assessment`, data);
    }
    
    transducerNote(scannerId: any, transducerId:any, category: any, data: any): Observable<any>{
        return this.http.put(`${environment.api_url}/api/v1/scanner_evaluations/${scannerId}/transducers/${transducerId}/${category}/note`, data);
    }
    transducerAssesment(scannerId: any, transducerId: any, category: any, data: any): Observable<any>{
        return this.http.put(`${environment.api_url}/api/v1/scanner_evaluations/${scannerId}/transducers/${transducerId}/${category}/assessment`, data);
    }
}
