import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Fathom';
    authenticated = false;
    constructor(){}

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
