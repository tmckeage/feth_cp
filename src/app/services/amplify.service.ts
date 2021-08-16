import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';

@Injectable({
  	providedIn: 'root'
})
export class AmplifyService {

  constructor() { }

  	signOut() {
		try {
			Auth.signOut();
		} catch (error) {
			console.log('error signing out: ', error);
		}
	}

	signIn(username: any, password: any) {
		try {
			const user = Auth.signIn(username, password);
		} catch (error) {
			console.log('error signing in', error);
		}
	}

	resendConfirmationCode(username: any) {
		try {
			Auth.resendSignUp(username);
			console.log('code resent successfully');
		} catch (err) {
			console.log('error resending code: ', err);
		}
	}

	confirmSignUp(username: any, code: any) {
		try {
		  	Auth.confirmSignUp(username, code);
		} catch (error) {
			console.log('error confirming sign up', error);
		}
	}

	signUp(username: any, password: any, email: any) {
		try {
			Auth.signUp({
				username,
				password,
				attributes: {
					email,
				}
			})
		} catch (error) {
			console.log('error confirming sign up', error);
		}
	}
}
