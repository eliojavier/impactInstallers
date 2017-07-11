import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [UserServiceService]
})
export class AdminComponent implements OnInit {

  userName: any;
  role: any;
  supervisor: boolean;

  auth_token: string;

  constructor(public userService: UserServiceService, public router: Router) {
    this.auth_token = (localStorage.getItem('auth_token'));
  }

  ngOnInit() {
    this.getUserByToken();
  }

  getUserByToken() {
    this.userService.getUserByToken()
      .subscribe(
        response => {
          if (response) {
            this.userName = response.data.name + ' ' + response.data.lastName;
            this.role = response.data.role;
            console.log(this.role);
            if (this.role === 'Supervisor') {
              this.supervisor = true;
            }
            if (this.role === 'Employee') {
              this.supervisor = false;
            }
          }
        },
        error => {
          if (error.status === 401) {
            this.router.navigateByUrl('login');
          }
        }
      );
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigateByUrl('login');
  }
}

