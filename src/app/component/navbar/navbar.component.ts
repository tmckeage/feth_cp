import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { Auth } from '@aws-amplify/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    fathomUserDetails: any;
    constructor(public nav: NavbarService, private router: Router) { }

    ngOnInit(): void {
    	this.fathomUserDetails = this.fathomUserDetails = sessionStorage.fathomUserDetails;
		if (!this.fathomUserDetails.length){
			this.router.navigate(['/login']);
		} 
    }

    doLogout() {
        Auth.signOut().then(user => {
            sessionStorage.removeItem('userDetails');
            this.router.navigate(['']);
        })
        .catch(err => console.log(err));
    }
}
