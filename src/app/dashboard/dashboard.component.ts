import {Component, OnInit} from '@angular/core';
import {ReportsServiceService} from '../reports-service.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ReportsServiceService]
})
export class DashboardComponent implements OnInit {

  public errorMsg: string;
  reports: any[] = [];
  rows: any[] = [];
  commissions: any[] = [];
  doors: any[] = [];
  windows: any[] = [];
  report: any;
  private body: any;

  public commissionData = this.formBuilder.group({
    month: ['', Validators.required],
    year: ['', Validators.required],
  });

  public servicesData = this.formBuilder.group({
    month: ['', Validators.required],
    year: ['', Validators.required],
  });

  constructor(public formBuilder: FormBuilder, public reportsService: ReportsServiceService) {
  }

  ngOnInit() {
    this.getRankingInstallers();
    this.getRankingLocations();
  }

  getRankingLocations() {
    this.reportsService.getRankingLocations()
      .subscribe(
        response => {
          if (response) {
            // console.log(response);
            this.reports = response.markers;
          }
        },
        error => this.errorMsg = error,
      );
  }

  getRankingInstallers() {
    this.reportsService.getRankingInstallers()
      .subscribe(
        response => {
          if (response) {
            console.log(response);
            this.rows = response.installers;
          }
        },
        error => this.errorMsg = error,
      );
  }

  getRankingCommissions() {
    this.body = {
      month: this.commissionData.value.month,
      year: this.commissionData.value.year,
    };

    this.reportsService.getRankingCommissions(this.body)
      .subscribe(
        response => {
          if (response) {
            console.log(response);
            this.commissions = response.commissions;
          }
        },
        error => this.errorMsg = error,
      );
  }

  getQuantityServices() {
    this.body = {
      month: this.servicesData.value.month,
      year: this.servicesData.value.year,
    };

    this.reportsService.getQuantityServices(this.body)
      .subscribe(
        response => {
          if (response) {
            console.log(response);
            this.doors = response.doors[0].quantity;
            this.windows = response.windows[0].quantity;
          }
        },
        error => this.errorMsg = error,
      );
  }
}
