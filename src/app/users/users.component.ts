import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { UserServiceService } from '../user-service.service';

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
          // if (response.status) {
            console.log(response.status);
          // }
        },
        error => this.errorMsg = error
      );
  }

  // onSelect(event) {
  //   // console.log(this.selected[0].id);
  //   // return this.selected[0].id;
  //   // console.log(this.selected[0].id);
  // }

  // delete() {
  //   console.log('borrar ' + this.selected[0].id);
  // }

  delete() {
    console.log('borrar ' + this.selected[0].id);
    this.userService.deleteUser(this.selected[0].id)
      .subscribe(
        response => {
          // if (response.status) {
          console.log(response.status);
          // }
        },
        error => this.errorMsg = error
      );
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

}
