import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  rowData: any = {};
  columnDefs: any;
  selectedValue: any;
  selectedCar: any;
  showReport = false;
  constructor(private nav: NavbarService, private router: Router,private reportService: ReportService,private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.nav.show();
    this.rowData = this.reportService.reports;
  }

}
