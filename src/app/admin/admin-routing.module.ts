import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from '../admin/admin.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EmptyComponent } from '../empty/empty.component';

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
            path: 'empty',
            component: EmptyComponent
          }
        ]
     }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
