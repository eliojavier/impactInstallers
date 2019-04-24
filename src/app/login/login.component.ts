import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginServiceService} from '../login-service.service';
import {Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap';


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
      client_secret: 'zCsLWFx3zFvpUW5DpUgq8gLRNR7VmD4rEJ0Gfo8P',
      grant_type: 'password',
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
        error => {
          // if (error.status === 500) {
          //   this.showErrorModal();
          // }
        },
      );
  }

  // @ViewChild('errorModal') public errorModal: ModalDirective;
  //
  // public showErrorModal(): void {
  //   this.errorModal.show();
  // }
  //
  // public hideErrorModal(): void {
  //   this.errorModal.hide();
  // }

}
