import {Component, OnInit} from '@angular/core';
import {ReportsServiceService} from '../reports-service.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from "@angular/router";

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

  constructor(public formBuilder: FormBuilder,
              public reportsService: ReportsServiceService,
              public router: Router) {
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
            this.reports = response.markers;
          }
        },
        error => {
          if(error.status == 401){
            this.router.navigateByUrl('login');
          }
        }
      );
  }

  getRankingInstallers() {
    this.reportsService.getRankingInstallers()
      .subscribe(
        response => {
          if (response) {
            this.rows = response.installers;
          }
        },
        error => {
          if(error.status == 401){
            this.router.navigateByUrl('login');
          }
        }
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
            this.commissions = response.commissions;
          }
        },
        error => {
          if(error.status == 401){
            this.router.navigateByUrl('login');
          }
        }
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
            this.doors = response.doors[0].quantity;
            this.windows = response.windows[0].quantity;
          }
        },
        error => {
          if(error.status == 401){
            this.router.navigateByUrl('login');
          }
        }
      );
  }
}
