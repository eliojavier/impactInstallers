import { Component, OnInit, ViewContainerRef, ViewEncapsulation , ViewChild} from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BillServiceService } from '../bill-service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
  providers: [BillServiceService],
})
export class BillsComponent implements OnInit {
  public errorMsg: string;
  public billForm: FormGroup;
  private body: any;
  selected: any[] = [];
  rows = [];
  auth_token: string;

  constructor(private formBuilder: FormBuilder,
              private billService: BillServiceService,
              private router: Router) {

    this.auth_token = (localStorage.getItem('auth_token'));
  }

  ngOnInit() {
    this.getBills();
  }

  getBills() {
    this.billService.getBills(this.auth_token)
      .subscribe(
        response => {
          if (response) {
            this.rows = response.data;
          }
        },
        error => {
          if(error.status == 401){
            this.router.navigateByUrl('login');
          }
        }
      );

    this.billForm = this.formBuilder.group({
      clientName: ['', Validators.required],
      bill_number: ['', [Validators.required, Validators.minLength(1)]],
      clientEmail: ['', Validators.required],
      date: ['', Validators.required],
      details: this.formBuilder.array([
        this.initDetails(),
      ])
    });
  }

  initDetails() {
    return this.formBuilder.group({
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      unitary_cost: ['', Validators.required],
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

  // save() {
  //   // call API to save
  //   // ...
  //   console.log(this.billForm.value);
  // }
  //
  // onSelect(event) {
  //   console.log('Event: select', event, this.selected);
  // }

  submitForm() {
    console.log(this.billForm.value);
    this.body = {
      bill_number: this.billForm.value.bill_number,
      details: this.formBuilder.array([
        this.initDetails(),
      ])
    };
    this.billService.saveBill(this.body)
      .subscribe(
        response => {
          this.billForm.reset();
          this.getBills();
        },
        error => {
          if(error.status == 401){
            this.router.navigateByUrl('login');
          }
        }
      );
  }

  @ViewChild('childModal') public childModal: ModalDirective;

  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }
}
