import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-received',
  templateUrl: './request-received.component.html',
  styleUrls: ['./request-received.component.scss']
})
export class RequestReceivedComponent implements OnInit {
  fathomUserDetails: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.fathomUserDetails = JSON.parse(sessionStorage.fathomUserDetails);
		if (!this.fathomUserDetails.username){
			this.router.navigate(['/login']);
		}
  }

}
