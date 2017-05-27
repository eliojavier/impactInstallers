import {Component, OnInit} from '@angular/core';
import { ReportsServiceService } from '../reports-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ReportsServiceService]
})
export class DashboardComponent implements OnInit {

  public errorMsg: string;
  reports: any[] = [];
  json = [];
  report: any;


  constructor(public reportsService: ReportsServiceService) {
  }

  ngOnInit() {
    this.getRankingLocations();
  }

  getRankingLocations() {
    this.reportsService.getRankingLocations()
      .subscribe(
        response => {
          if (response) {
            console.log(response);
            this.reports = response.markers;
          }
        },
        error => this.errorMsg = error,
      );
  }
}
