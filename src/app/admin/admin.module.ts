import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from '../users/users.component';
import { LocationsComponent } from '../locations/locations.component';
import { BillsComponent } from '../bills/bills.component';



@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    UsersComponent,
    LocationsComponent,
    BillsComponent
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
