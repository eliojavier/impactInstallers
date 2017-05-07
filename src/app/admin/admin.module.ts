import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {AdminComponent} from './admin.component';
import { EmptyComponent } from '../empty/empty.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    EmptyComponent
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
