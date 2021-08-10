import { Component } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    // title = 'Fathom';
    title = 'amplify-app';
    authenticated = false;
    public auth:object;
    constructor(public amplify: AmplifyService) {
      this.auth =  amplify.auth();
    }
    ngOnInit(): void {

        // This is temp code, once Amazon cognito SDK gets integrate then this will be get remove
        setTimeout(() => {
            const isAuthenticated = sessionStorage.getItem('loggedIn');
            if (isAuthenticated == 'ok') {
                this.authenticated = true;
            }
        }, 10);
    }
}
