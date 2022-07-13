import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navbar.service';
import { Auth } from '@aws-amplify/auth';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	usernameValue: any = '';
	passwordValue: any = '';
	loginForm = new FormGroup({
		"username": new FormControl(null, [Validators.required]),
		"password": new FormControl(null, [Validators.required])
	});
	showLoading = false;

  	constructor(private nav: NavbarService, private auth:AuthService, private router: Router) {}

	ngOnInit(): void {
		this.nav.hide();
	}

	// Function to login user
	doLogin() {
		this.usernameValue = this.loginForm.controls.username.value;
		this.passwordValue = this.loginForm.controls.password.value;
		if (this.usernameValue && this.passwordValue) {
			this.showLoading = true;
			Auth.signIn(this.usernameValue, this.passwordValue).then(user => {
				console.log(user);
				this.showLoading = false;
				sessionStorage.setItem('fathomUserDetails', JSON.stringify(user));
				this.router.navigate(['/users']);

				// Set token
				Auth.currentSession().then(res=> {
					let accessToken = res.getAccessToken();
					let jwtToken = accessToken.getJwtToken();
					this.auth.setJWTToken(jwtToken);
					this.auth.setAccessToken(JSON.stringify(accessToken));
				});
			})  
			.catch(err => {
				console.log(err);
				this.showLoading = false;
			});
		}
	}
}
