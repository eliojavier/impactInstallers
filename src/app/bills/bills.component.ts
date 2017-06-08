import {Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild} from '@angular/core';
import {FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {BillServiceService} from '../bill-service.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
  providers: [BillServiceService],
})
export class BillsComponent implements OnInit {
  public errorMsg: string;
  public billForm: FormGroup;
  public form: FormGroup;
  public detailsForm: FormArray;
  private body: any;
  private details: any;
  private i: any;
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
    this.billService.getBills()
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
            this.showErrorModal();
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
          this.showSuccessfulModal();
          this.billForm.reset();
          this.getBills();
        },
        error => {
          if (error.status === 401) {
            this.router.navigateByUrl('login');
          }
          if (error.status === 500) {
            this.showErrorModal();
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

  getBill() {
    this.billService.getBill(this.selected[0].id)
      .subscribe(
        response => {
          this.billForm = this.formBuilder.group({
            details: this.formBuilder.array([])
          });
          console.log(response.data);
          this.billForm = this.formBuilder.group({
              bill_number: response.data.billNumber,
              clientName: response.data.clientName,
              clientEmail: response.data.clientEmail,
              date: response.data.date,
              details: this.getDetails(response)
            },
            error => {
              if (error.status === 500) {
                this.showErrorModal();
              }
            }
          );
        });
  }

  getDetails(response) {
    this.i = -1;
    for (const detail in response.data.details.data) {
      this.i++;
      console.log(response.data.details.data[this.i]);
      console.log(this.i);
      this.form = this.formBuilder.group({
        description: response.data.details.data[this.i].description,
        quantity: response.data.details.data[this.i].quantity,
        unitary_cost: response.data.details.data[this.i].cost,
      });
      const control = <FormArray>this.billForm.controls['details'];
      control.push(this.form);
    }
    return this.billForm.controls['details'];
  }

  showPdf() {
    this.billService.showPdf(this.selected[0].id)
      .subscribe(
        response => {
          console.log(response);
        },
        error => this.errorMsg = error
      );
  }

  updateBill() {
    this.body = {
      // bill_number: this.billForm.value.bill_number,
      // details: this.formBuilder.array([
      //   this.initDetails(),
      // ])
      bill: this.billForm.value
    };

    this.billService.updateBill(this.selected[0].id, this.body)
      .subscribe(
        response => {
          this.showSuccessfulModal();
          console.log(response.status);
          this.billForm.reset();
          this.getBills();
        },
        error => {
          if (error.status === 401) {
            console.log('inside if');
            this.router.navigateByUrl('login');
          }
          if (error.status === 500) {
            this.showErrorModal();
          }
        }
      );
  }

  @ViewChild('errorModal') public errorModal: ModalDirective;

  public showErrorModal(): void {
    this.errorModal.show();
  }

  public hideErrorModal(): void {
    this.errorModal.hide();
  }

  @ViewChild('successfulModal') public successfulModal: ModalDirective;

  public showSuccessfulModal(): void {
    this.successfulModal.show();
  }

  public hideSuccessfulModal(): void {
    this.successfulModal.hide();
  }
}
