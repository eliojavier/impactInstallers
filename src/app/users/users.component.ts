import {Component, OnInit, ViewChild} from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import {UserServiceService} from '../user-service.service';
import {Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap';

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

  constructor(public formBuilder: FormBuilder,
              private userService: UserServiceService,
              public router: Router) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        response => {
          if (response) {
            this.rows = response.data;
          }
        },
        error => {
          if (error.status === 401) {
            this.router.navigateByUrl('login');
          }
          if (error.status === 500) {
            this.showChildModal();
          }
        }
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
          this.showSuccessfulModal();
          this.registerForm.reset();
          this.getUsers();
        },
        error => {
          if (error.status === 401) {
            this.showChildModal();
            this.router.navigateByUrl('login');
          }
          if (error.status === 400) {
            this.showEmailModal();
          }
          if (error.status === 500) {
            this.showChildModal();
          }
        }
      );
  }

  delete() {
    console.log('borrar ' + this.selected[0].id);
    this.userService.deleteUser(this.selected[0].id)
      .subscribe(
        response => {
          this.showSuccessfulModal();
          this.getUsers();
        },
        error => {
          if (error.status === 401) {
            this.router.navigateByUrl('login');
          }
          if (error.status === 500) {
            this.showChildModal();
          }
        }
      );
  }

  getUser() {
    this.userService.getUser(this.selected[0].id)
      .subscribe(
        response => {
          this.registerForm = this.formBuilder.group({
              first_name: response.data.name,
              last_name: response.data.lastName,
              doc_id: response.data.documentId,
              email: response.data.email,
              address: response.data.address,
              phone: response.data.phone,
            },
            error => {
              if (error.status === 401) {
                this.router.navigateByUrl('login');
              }
              if (error.status === 500) {
                this.showChildModal();
              }
            }
          );
        });
  }

  resetPassword() {
    this.userService.resetPassword(this.selected[0].id)
      .subscribe(
        response => {
          this.showSuccessfulModal();
        },
        error => {
          if (error.status === 401) {
            this.router.navigateByUrl('login');
          }
          if (error.status === 500) {
            this.showChildModal();
          }
        }
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
          this.showSuccessfulModal();
          this.registerForm.reset();
          this.getUsers();
        },
        error => {
          if (error.status === 401) {
            this.router.navigateByUrl('login');
          }
          if (error.status === 400) {
            this.showEmailModal();
          }
          if (error.status === 500) {
            this.showChildModal();
          }
        }
      );
  }

  cancelButton() {
    this.registerForm.reset();
  }

  @ViewChild('childModal') public childModal: ModalDirective;

  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

  @ViewChild('emailModal') public emailModal: ModalDirective;

  public showEmailModal(): void {
    this.emailModal.show();
  }

  public hideEmailModal(): void {
    this.emailModal.hide();
  }

  @ViewChild('successfulModal') public successfulModal: ModalDirective;

  public showSuccessfulModal(): void {
    this.successfulModal.show();
  }

  public hideSuccessfulModal(): void {
    this.successfulModal.hide();
  }
}
