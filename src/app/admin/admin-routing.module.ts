import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from '../admin/admin.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UsersComponent } from '../users/users.component';
import { UsersRegistryComponent } from '../users-registry/users-registry.component';

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
            path: 'registry',
            component: UsersRegistryComponent
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
