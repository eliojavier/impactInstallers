import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import{LoginServiceService} from '../login-service.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginServiceService]
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private body: any;
  private errorMsg: string;

  constructor(public formBuilder: FormBuilder,
              public loginService: LoginServiceService,
              public router: Router) {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {

  }

  login() {
    this.body = {
      client_id: 2,
      client_secret: "polIRjgxku2EG0Qw0BRIImGRG0bIIXj2cAjpEegJ",
      grant_type: "password",
      username: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.loginService.login(this.body)
      .subscribe(
        response => {
          if (response) {
            console.log(response);
            localStorage.setItem('auth_token', response.access_token);
            this.router.navigateByUrl('admin/dashboard');
          }
        },
        error => this.errorMsg = error,
      );
  }

}
