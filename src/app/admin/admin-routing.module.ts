import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UsersComponent } from '../users/users.component';
import { LocationsComponent } from '../locations/locations.component';
import { BillsComponent } from '../bills/bills.component';
import { AssignmentsComponent } from '../assignments/assignments.component';
import { ProfileComponent } from '../profile/profile.component';
import { LoginComponent } from '../login/login.component';

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
            path: 'assignments',
            component: AssignmentsComponent
          },
          {
            path: 'profile',
            component: ProfileComponent
          },
          {
            path: 'login',
            component: LoginComponent
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
