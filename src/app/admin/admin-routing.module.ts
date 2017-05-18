import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UsersComponent } from '../users/users.component';
import { LocationsComponent } from '../locations/locations.component';
import { BillsComponent } from '../bills/bills.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { FullCalendarComponent } from '../full-calendar/full-calendar.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'admin',
        component: AdminComponent,
        children: [
          {
            path: 'dashboard',
            component: DashboardComponent
          },
          {
            path: 'users',
            component: UsersComponent
          },
          {
            path: 'locations',
            component: LocationsComponent
          },
          {
            path: 'bills',
            component: BillsComponent
          },
          {
            path: 'barchart',
            component: BarChartComponent
          },
          {
            path: 'full-calendar',
            component: FullCalendarComponent
          },
        ]
     }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
