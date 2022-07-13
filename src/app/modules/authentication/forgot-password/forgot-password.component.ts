import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../../services/navbar.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    linkSent = false;

    constructor(private router: Router, private nav: NavbarService) { }

    ngOnInit(): void {
        this.nav.hide();
    }

    submitForgotPassword() {
        this.linkSent = true;
    }

    returnToLogin() {
        this.router.navigate(['/login']);
    }
}
