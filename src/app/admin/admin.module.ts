import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from '../users/users.component';
import { LocationsComponent } from '../locations/locations.component';
import { BillsComponent } from '../bills/bills.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AssignmentsComponent } from '../assignments/assignments.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    UsersComponent,
    LocationsComponent,
    BillsComponent,
    AssignmentsComponent
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
