import { Component, OnInit } from '@angular/core';
import { Auth } from '@aws-amplify/auth';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {
  userName: any;
  code: any;
  isMessage: any;

  constructor(private actRoute: ActivatedRoute, private nav: NavbarService) { }

  ngOnInit(): void {
    this.nav.hide();
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
