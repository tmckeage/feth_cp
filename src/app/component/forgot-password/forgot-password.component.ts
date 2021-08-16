import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    linkSent = false;
    constructor(private router: Router) { }

    ngOnInit(): void {
        // This is temp code, once Amazon cognito SDK gets integrate then this will be get remove
        sessionStorage.setItem('loggedIn', '');
    }

    submitForgotPassword() {
        this.linkSent = true;
    }

    returnToLogin() {
        this.router.navigate(['/login']);
    }
}
