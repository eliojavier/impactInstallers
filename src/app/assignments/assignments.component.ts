import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {AssignmentServiceService} from '../assignment-service.service';
import {UserServiceService} from '../user-service.service';
import {LocationServiceService} from '../location-service.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BillServiceService} from "../bill-service.service";

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
  providers: [AssignmentServiceService, UserServiceService, LocationServiceService, BillServiceService]
})
export class AssignmentsComponent implements OnInit {

  public errorMsg: string;
  selected: any[] = [];
  rows = [];
  private body: any;
  private installers: any;
  private locations: any;
  private save: boolean;
  private done: boolean;

  public assignmentsForm = this.formBuilder.group({
    name: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    clientName: ['', Validators.required],
    clientEmail: ['', Validators.required],
    location: ['', Validators.required],
    address: ['', Validators.required],
  });

  public changeStatus = this.formBuilder.group({
    status: ['', Validators.required],
  });

  public billForm = this.formBuilder.group({
    clientName: ['', Validators.required],
    bill_number: ['', [Validators.required, Validators.minLength(1)]],
    clientEmail: ['', Validators.required],
    date: ['', Validators.required],
    details: this.formBuilder.array([
      this.initDetails(),
    ])
  });

  constructor(public formBuilder: FormBuilder, private assignmentService: AssignmentServiceService,
              private userService: UserServiceService, private  locationService: LocationServiceService,
              private billService: BillServiceService) {
  }

  ngOnInit() {
    this.getAssignments();
    this.getLocations();
  }

  getAssignments() {
    this.assignmentService.getAssignments()
      .subscribe(
        response => {
          if (response) {
            console.log(response);
            this.rows = response.assignments;
          }
        },
        error => this.errorMsg = error,
      );
  }

  getUsers() {
    this.body = {
      date: this.assignmentsForm.value.date,
      time: this.assignmentsForm.value.time,
    };

    this.userService.getAvailableUsers(this.body)

      .subscribe(
        response => {
          if (response) {
            console.log(response);
            this.installers = response.data;
          }
        },
        error => this.errorMsg = error,
      );
  }

  getLocations() {
    this.locationService.getLocations()
      .subscribe(
        response => {
          if (response) {
            console.log(response);
            this.locations = response.locations;
          }
        },
        error => this.errorMsg = error,
      );
  }

  submitForm() {
    console.log(this.assignmentsForm.value);
    this.body = {
      name: this.assignmentsForm.value.name,
      date: this.assignmentsForm.value.date,
      time: this.assignmentsForm.value.time,
      clientName: this.assignmentsForm.value.clientName,
      clientEmail: this.assignmentsForm.value.clientEmail,
      location: this.assignmentsForm.value.location,
      address: this.assignmentsForm.value.address,
    };

    this.assignmentService.saveAssignment(this.body)
      .subscribe(
        response => {
          console.log(response.status);
          this.assignmentsForm.reset();
          this.getAssignments();
        },
        error => this.errorMsg = error
      );
  }

  @ViewChild('childModal') public childModal: ModalDirective;

  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

  updateStatus() {
    console.log(this.selected[0].id);
    if (this.changeStatus.value.status === 'Done') {
      this.done = true;
      this.assignmentService.getAssignment(this.selected[0].id)
        .subscribe(
          response => {
            this.billForm = this.formBuilder.group({
              bill_number: 0,
              clientName: response.assignment[0].clientName,
              clientEmail: response.assignment[0].clientEmail,
              date: response.assignment[0].date,
              details: this.formBuilder.array([
                this.nullDetails(),
              ])
            });
          });
      }
    this.body = {
      status: this.changeStatus.value.status
    };

    this.assignmentService.updateStatus(this.selected[0].id, this.body)
      .subscribe(
        response => {
          console.log(response.status);
          this.assignmentsForm.reset();
          this.getAssignments();
        },
        error => this.errorMsg = error
      );

  }

  buttonTrue() {
    this.save = true;
    this.assignmentsForm.reset();
  }

  buttonFalse() {
    this.save = false;
    this.assignmentsForm.reset();
  }

  getAssignment() {
    this.assignmentService.getAssignment(this.selected[0].id)
      .subscribe(
        response => {
          console.log(response.assignment);
          this.assignmentsForm = this.formBuilder.group({
              name: response.assignment[0].name,
              date: response.assignment[0].date,
              time: response.assignment[0].time,
              clientName: response.assignment[0].clientName,
              clientEmail: response.assignment[0].clientEmail,
              location: response.assignment[0].location,
              address: response.assignment[0].address,
            },
            error => this.errorMsg = error
          );
        });
  }

  updateAssignment() {
    console.log(this.assignmentsForm.value);
    this.body = {
      name: this.assignmentsForm.value.name,
      date: this.assignmentsForm.value.date,
      time: this.assignmentsForm.value.time,
      clientName: this.assignmentsForm.value.clientName,
      clientEmail: this.assignmentsForm.value.clientEmail,
      location: this.assignmentsForm.value.location,
      address: this.assignmentsForm.value.address,
    };

    this.assignmentService.updateAssignment(this.selected[0].id, this.body)
      .subscribe(
        response => {
          console.log(response.status);
          this.assignmentsForm.reset();
          this.getAssignments();
        },
        error => this.errorMsg = error
      );
  }

  initDetails() {
    return this.formBuilder.group({
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      unitary_cost: ['', Validators.required],
    });
  }

  nullDetails() {
    return this.formBuilder.group({
      description: null,
      quantity: 0,
      unitary_cost: 0,
    });
  }

  addDetail() {
    const control = <FormArray>this.billForm.controls['details'];
    control.push(this.initDetails());
  }

  removeDetail(i: number) {
    const control = <FormArray>this.billForm.controls['details'];
    control.removeAt(i);
  }

  saveBill() {
    this.body = {
      assignment_id: this.selected[0].id,
      bill: this.billForm.value
    };
    console.log(this.body);
    this.billService.saveBill(this.body)
      .subscribe(
        response => {
          console.log(response);
          this.billForm.reset();
        },
        error => this.errorMsg = error
      );
  }
}


