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
    {id: 1, billNumber: '123', clientName: 'Elio Acosta', total: '$120'},
    {id: 2, billNumber: '2233', clientName: 'Miguel Pérez', total: '$400'},
    {id: 3, billNumber: '4344', clientName: 'Jessica Pérez', total: '$200'}
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

  onClick() {
    this.modal.alert()
      .size('sm')
      .showClose(true)
      .title('Bill ')
      .body(`
              <h4>Client name: </h4>
              <h4>Details</h4>
                <!--<ul>-->
                  <!--<li>Quantity: </li>-->
                  <!--<li>Description: </li>-->
                  <!--<li>Cost: </li>-->
                <!--</ul>-->
                <!--<ul>-->
                  <!--<li>Quantity: </li>-->
                  <!--<li>Description: </li>-->
                  <!--<li>Cost: </li>-->
                <!--</ul>-->
                <table style="width:100%">
                  <tr>
                    <th>Quantity</th>
                    <th>Description</th>
                    <th>Cost</th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Windows</td>
                    <td>$100</td>
                  </tr>
                 </table>
                <h4>Tax: </h4>
                <h4>Total: </h4>
            `)
      .open();
  }
}
