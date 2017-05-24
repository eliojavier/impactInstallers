import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AssignmentServiceService } from '../assignment-service.service';
import { UserServiceService } from '../user-service.service';
import { LocationServiceService } from '../location-service.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
  providers: [AssignmentServiceService, UserServiceService, LocationServiceService]
})
export class AssignmentsComponent implements OnInit {

  public errorMsg: string;
  selected: any[] = [];
  rows = [];
  private body: any;
  private installers: any;
  private locations: any;

  public assignmentsForm = this.formBuilder.group({
    name: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    location: ['', Validators.required],
    address: ['', Validators.required],
  });

  constructor(public formBuilder: FormBuilder, private assignmentService: AssignmentServiceService,
              private userService: UserServiceService, private  locationService: LocationServiceService) { }

  ngOnInit() {
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

    this.userService.getUsers()
      .subscribe(
        response => {
          if (response) {
            console.log(response);
            this.installers = response.data;
          }
        },
        error => this.errorMsg = error,
      );

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

  // submitForm() {
  //   console.log(this.assignmentsForm.value);
  //   this.body = {
  //     name: this.assignmentsForm.value.name,
  //     date: this.assignmentsForm.value.date,
  //     time: this.assignmentsForm.value.time,
  //     location: this.assignmentsForm.value.location,
  //     address: this.assignmentsForm.value.address,
  //   };
  //
  //   this.assignmentService.saveAssignment(this.body)
  //     .subscribe(
  //       response => {
  //         // if (response.status) {
  //         console.log(response.status);
  //         // }
  //       },
  //       error => this.errorMsg = error
  //     );
  // }

  @ViewChild('childModal') public childModal: ModalDirective;

  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

}