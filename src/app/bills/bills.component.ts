import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  public billForm: FormGroup;
  selected: any[] = [];
  // public filterQuery = "";
  // public rowsOnPage = 10;
  // public sortBy = "age";
  // public sortOrder = "asc";
  rows = [
    { id: 1, billNumber: '123', clientName: 'Elio Acosta', total: '$120'},
    { id: 2, billNumber: '2233', clientName: 'Miguel Pérez', total: '$400' },
    { id: 3, billNumber: '4344', clientName: 'Jessica Pérez', total: '$200' }
  ];
  // columns = [
  //   { name: 'Bill Number' },
  //   { name: 'Client Name' },
  //   { name: 'Total' }
  // ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.billForm = this.formBuilder.group({
      client_name: ['', [Validators.required, Validators.minLength(5)]],
      bill_number: ['', [Validators.required, Validators.minLength(1)]],
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

  save() {
    // call API to save
    // ...
    console.log(this.billForm.value);
  }

  onSelect(event) {
    console.log('Event: select', event, this.selected);
  }

  delete() {
    console.log('delete');
  }
}
