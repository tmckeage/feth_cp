import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { Auth } from '@aws-amplify/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	username: any = '';
	password: any = '';
	showLoading = false;

  	constructor(private nav: NavbarService, private router: Router) {}

	ngOnInit(): void {
		this.nav.hide();
	}

	doLogin() {
		this.showLoading = true;
		Auth.signIn(this.username, this.password).then(user => {
			console.log(user);
			this.showLoading = false;
			sessionStorage.setItem('userDetails', user);
			this.router.navigate(['/users']);
		})
		.catch(err => {
			console.log(err);
			this.showLoading = false;
		});
	}
}
