import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import 'rxjs/add/operator/do';
import { Auth } from '@aws-amplify/auth';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    [x: string]: any;
    JWTtoken: any;
    constructor(private auth: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: { Authorization: `Bearer ${this.auth.getJWTToken()}`, 'Content-Type': 'application/json' }
        });
        
        //return next.handle(request);

        return next.handle(request).do((event: HttpEvent<any>) => {
            
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.router.navigate(['/login']);
                    }
                }
            });
    }
}