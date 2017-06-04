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

  private userName: any;

  auth_token: string;

  constructor(private userService: UserServiceService, private router: Router) {
    this.auth_token = (localStorage.getItem('auth_token'));
  }

  ngOnInit() {
  }

  getUser() {
    this.userService.getUser(this.auth_token)
      .subscribe(
        response => {
          if (response) {
            this.userName = response.name;
          }
        },
        error => {
          if (error.status === 401) {
            this.router.navigateByUrl('login');
          }
        }
      );
  }

}

