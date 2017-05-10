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
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';




@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    BootstrapModalModule
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
