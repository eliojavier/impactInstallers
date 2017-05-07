import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {AdminComponent} from './admin.component';
import { UsersComponent } from '../users/users.component';
import { UsersRegistryComponent } from '../users-registry/users-registry.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    UsersComponent,
    UsersRegistryComponent
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
