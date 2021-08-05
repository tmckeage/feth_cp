import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        // This is temp code, once Amazon cognito SDK gets integrate then this will be get remove
        sessionStorage.setItem('loggedIn', '');
    }
}
