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
    // { id: 1, name: 'Elio', lastName: 'Acosta', documentId: '12221', email: 'eliojavier@gmail.com', address: 'San Martin', phone: '2782922' },
    // { id: 2, name: 'Jessica', lastName: 'Perez', documentId: '12223', email: 'jess@gmail.com', address: 'San Antonio', phone: '111111' }
  // ];

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
            this.rows = response.users;
          }
        },
        error => this.errorMsg = error,
      );
  }

  submitForm() {
    console.log(this.registerForm.value);
  }

  onSelect(event) {
    console.log('Event: select', event, this.selected);
  }

  delete() {
    console.log('delete');
  }

}
