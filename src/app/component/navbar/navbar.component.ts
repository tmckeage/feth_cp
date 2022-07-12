import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { Auth } from '@aws-amplify/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(public nav: NavbarService, private auth:AuthService, private router: Router) { }

    ngOnInit(): void {

    }

    doLogout() {
        Auth.signOut().then(user => {
            sessionStorage.removeItem('fathomUserDetails');
            this.auth.removeToken();
            this.router.navigate(['/login']);
        })
        .catch(err => console.log(err));
    }
}
