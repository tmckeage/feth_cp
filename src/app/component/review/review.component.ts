import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  fathomUserDetails: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    // check login session
    this.fathomUserDetails = sessionStorage.fathomUserDetails ? JSON.parse(sessionStorage.fathomUserDetails) : '';
		if (!this.fathomUserDetails.username){
			this.router.navigate(['']);
		}
  }

}
