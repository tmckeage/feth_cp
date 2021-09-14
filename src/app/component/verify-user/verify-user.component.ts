import { Component, OnInit } from '@angular/core';
import { Auth } from '@aws-amplify/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {
  userName: any;
  code: any;
  isMessage: any;
  fathomUserDetails: any;

  constructor(private actRoute: ActivatedRoute,  private router: Router) { }

  ngOnInit(): void {
    this.fathomUserDetails = JSON.parse(sessionStorage.fathomUserDetails);
		if (!this.fathomUserDetails.username){
			this.router.navigate(['/login']);
		}
    
    this.userName = this.actRoute.snapshot.params.userName;
    this.code = this.actRoute.snapshot.params.code;
    // check user name and code 
    if (this.userName && this.code) {
      Auth.confirmSignUp(this.userName, this.code).then(user => {
        console.log(user);
        this.isMessage = true;
      })
      .catch(err => {
        console.log(err);
        this.isMessage = false;
      });
    } 
  }
}
