import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from '../users/users.component';
import { LocationsComponent } from '../locations/locations.component';
import { BillsComponent } from '../bills/bills.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { FullCalendarComponent } from '../full-calendar/full-calendar.component';
import {CalendarComponent} from 'ap-angular2-fullcalendar/src/calendar/calendar';

import { ChartsModule } from 'ng2-charts';



@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule

  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    UsersComponent,
    LocationsComponent,
    BillsComponent,
    BarChartComponent,
    FullCalendarComponent,
    CalendarComponent
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
