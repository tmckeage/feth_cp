import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomAmplifyService } from '../../services/custom-amplify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  	constructor(private router: Router, private customAmplifyService: CustomAmplifyService) {
		// This is temp code, once Amazon cognito SDK gets integrate then this will be get remove
		sessionStorage.setItem('loggedIn', '');
	}

	ngOnInit(): void {
	}

	doLogin() {
		this.customAmplifyService.signIn('nitin', 'aloha@123');
		// sessionStorage.setItem('loggedIn', 'ok');
		// this.router.navigate(['/users']);
		// setTimeout(function(){ window.location.reload(); }, 10)
	}
}
