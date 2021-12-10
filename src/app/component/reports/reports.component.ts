import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  fathomUserDetails: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    // check login session
    // this.fathomUserDetails = sessionStorage.fathomUserDetails ? JSON.parse(sessionStorage.fathomUserDetails) : '';
		// if (!this.fathomUserDetails.username){
		// 	this.router.navigate(['']);
		// }
  }

}
