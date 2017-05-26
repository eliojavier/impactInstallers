import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import {UserServiceService} from '../user-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserServiceService]
})
export class UsersComponent implements OnInit {

  public errorMsg: string;
  selected: any[] = [];
  rows = [];
  private body: any;
  private save: boolean;

  public registerForm = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    doc_id: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', [Validators.required]],
  });

  constructor(public formBuilder: FormBuilder, private userService: UserServiceService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        response => {
          if (response) {
            console.log(response);
            this.rows = response.data;
          }
        },
        error => this.errorMsg = error,
      );
  }

  submitForm() {
    console.log(this.registerForm.value);
    this.body = {
      name: this.registerForm.value.first_name,
      last_name: this.registerForm.value.last_name,
      id_document: this.registerForm.value.doc_id,
      email: this.registerForm.value.email,
      address: this.registerForm.value.address,
      phone: this.registerForm.value.phone
    };
    this.userService.saveUser(this.body)
      .subscribe(
        response => {
          console.log(response.status);
          this.registerForm.reset();
          this.getUsers();
        },
        error => this.errorMsg = error
      );
  }

  delete() {
    console.log('borrar ' + this.selected[0].id);
    this.userService.deleteUser(this.selected[0].id)
      .subscribe(
        response => {
          console.log(response.status);
          this.getUsers();
        },
        error => this.errorMsg = error
      );
  }

  getUser() {
    this.userService.getUser(this.selected[0].id)
      .subscribe(
        response => {
          console.log(response.data);
          this.registerForm = this.formBuilder.group({
              first_name: response.data.name,
              last_name: response.data.lastName,
              doc_id: response.data.documentId,
              email: response.data.email,
              address: response.data.address,
              phone: response.data.phone,
            },
            error => this.errorMsg = error
          );
        });
  }

  resetPassword() {
    this.userService.resetPassword(this.selected[0].id)
      .subscribe(
        response => {
          console.log(response.status);
        },
        error => this.errorMsg = error
      );
  }

  buttonTrue() {
    this.save = true;
    this.registerForm.reset();
  }

  buttonFalse() {
    this.save = false;
    this.registerForm.reset();
  }

  updateUser() {
    console.log(this.registerForm.value);
    this.body = {
      name: this.registerForm.value.first_name,
      last_name: this.registerForm.value.last_name,
      id_document: this.registerForm.value.doc_id,
      email: this.registerForm.value.email,
      address: this.registerForm.value.address,
      phone: this.registerForm.value.phone
    };
    this.userService.updateUser(this.selected[0].id, this.body)
      .subscribe(
        response => {
          console.log(response.status);
          this.registerForm.reset();
          this.getUsers();
        },
        error => this.errorMsg = error
      );
  }
}
