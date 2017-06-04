import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserServiceService} from '../user-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserServiceService]
})
export class ProfileComponent implements OnInit {

  private body: any;
  private id: any;
  public errorMsg: string;

  public registerForm = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    doc_id: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', [Validators.required]],
    password: [''],
    confirm_password: ['']
  });

  constructor(public formBuilder: FormBuilder,
              private userService: UserServiceService,
              public router: Router) {
  }

  ngOnInit() {
    this.getUserByToken();
  }

  getUserByToken() {
    this.userService.getUserByToken()
      .subscribe(
        response => {
          this.id = response.data.id;
          console.log('getuser ' + this.id);
          this.registerForm = this.formBuilder.group({
              first_name: response.data.name,
              last_name: response.data.lastName,
              doc_id: response.data.documentId,
              email: response.data.email,
              address: response.data.address,
              phone: response.data.phone,
              password: response.data.password,
              confirm_password: response.data.password,
            },
            error => {
              if (error.status === 401) {
                this.router.navigateByUrl('login');
              }
            }
          );
        });
  }

  submitForm() {
    console.log('submit ' + this.id);
    this.body = {
      name: this.registerForm.value.first_name,
      last_name: this.registerForm.value.last_name,
      id_document: this.registerForm.value.doc_id,
      email: this.registerForm.value.email,
      address: this.registerForm.value.address,
      phone: this.registerForm.value.phone,
      password: this.registerForm.value.password,
      confirm_password: this.registerForm.value.confirm_password
    };
    this.userService.updateUser(this.id, this.body)
      .subscribe(
        response => {
          console.log(response.status);
          this.router.navigateByUrl('admin/dashboard');
        },
        error => {
          if (error.status === 401) {
            this.router.navigateByUrl('login');
          }
        }
      );
  }

  cancelButton() {
    this.router.navigateByUrl('admin');
  }

}
