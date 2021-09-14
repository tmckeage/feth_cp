import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-request-received',
  templateUrl: './request-received.component.html',
  styleUrls: ['./request-received.component.scss']
})
export class RequestReceivedComponent implements OnInit {

  constructor(private router: Router, private nav: NavbarService) { }

  ngOnInit(): void {
    this.nav.hide();
  }

}
