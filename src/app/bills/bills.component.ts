import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  public billForm: FormGroup;
  selected: any[] = [];
  rows = [
    {id: 1, billNumber: '123', clientName: 'Elio Acosta', total: '$120', details: [{quantity: '1', desc: 'Windows', cost: '$100'}, {quantity: '2', desc: 'Door', cost: '$200'}, {quantity: '2', desc: 'Door', cost: '$200'}, {quantity: '2', desc: 'Door', cost: '$200'}, {quantity: '2', desc: 'Door', cost: '$200'}, {quantity: '2', desc: 'Door', cost: '$200'}, {quantity: '2', desc: 'Door', cost: '$200'}]},
    {id: 2, billNumber: '2233', clientName: 'Miguel Pérez', total: '$400', details: [{quantity: '1', desc: 'Windows', cost: '$100'}]},
    {id: 3, billNumber: '4344', clientName: 'Jessica Pérez', total: '$200', details: [{quantity: '1', desc: 'Windows', cost: '$100'}]}
  ];

  get version(): string {
    return (<any>window).angular2ModalVer;
  }

  constructor(private formBuilder: FormBuilder, vcRef: ViewContainerRef, public modal: Modal) {
    modal.overlay.defaultViewContainer = vcRef;
  }

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
