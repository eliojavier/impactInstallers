import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BillService } from '../bill.service'

declare var $:any;

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
  providers: [BillService]
})
export class BillsComponent implements OnInit {
  public billForm: FormGroup;
  public billsTable: FormGroup;

  flagSort: number = 0;

  bills = [];
  total : number;
  from: number;
  to: number;
  next: string;
  previous: string;

  data = [
    {
      id: 1,
      bill_number: "00058",
      client_name: "Bret",
      total: 150,
      details : [
        {
          description: 'fal;skjdflakdjfl;kaj',
          quantity: 3,
          unitary_price: 15,
          tax: 0.15,
          total: 100
        }
      ]
    },
    {
      id: 2,
      bill_number: "00059",
      client_name: "Elio Acosta",
      total: 350,
      details : [
        {
          description: 'fal;skjdflakdjfl;kaj',
          quantity: 3,
          unitary_price: 15,
          tax: 0.15,
          total: 100
        }
      ]
    },
    {
      id: 4,
      bill_number: "00060",
      client_name: "Javier Carmona",
      total: 600,
      details : [
        {
          description: 'fal;skjdflakdjfl;kaj',
          quantity: 3,
          unitary_price: 15,
          tax: 0.15,
          total: 100
        },
        {
          description: 'another one',
          quantity: 2,
          unitary_price: 15,
          tax: 0.15,
          total: 100
        },
        {
          description: 'third one',
          quantity: 1,
          unitary_price: 15,
          tax: 0.15,
          total: 100
        }
      ]
    },
    {
      id: 4,
      bill_number: "00061",
      client_name: "Jhon Doe",
      total: 50,
      details : [
        {
          description: 'fal;skjdflakdjfl;kaj',
          quantity: 3,
          unitary_price: 15,
          tax: 0.15,
          total: 100
        }
      ]
    },
  ];

  invoiceDetails = [];

  constructor(private formBuilder: FormBuilder,
              private billService: BillService) {
    this.billForm = this.formBuilder.group({
      client_name: ['', [Validators.required, Validators.minLength(5)]],
      details: this.formBuilder.array([
        this.initDetails(),
      ])
    });

    this.billsTable = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      username:[''],
      email:['']
    });

  }

  ngOnInit() {
    this.billService.getBills()
      .subscribe(
        response => {
          if (response) {
            this.bills = response.bills.data;
            this.total = response.bills.total;
            this.from = response.bills.from;
            this.to = response.bills.to;
            this.next = response.bills.next_page_url;
            this.previous = response.bills.prev_page_url;
          }
        },
        error => {
          if(error){
            console.log(error);
          }
        }
      );
  }

  showDetails(item){
    this.invoiceDetails = item.details;
    console.log(this.invoiceDetails);
    $("#details").modal()
  }

  getMoreResults(url){
    this.billService.getMoreResults(url)
      .subscribe(
        response => {
          if (response) {
            console.log(response.bills);
            this.bills = response.bills.data;
            this.total = response.bills.total;
            this.from = response.bills.from;
            this.to = response.bills.to;
            this.next = response.bills.next_page_url;
            this.previous = response.bills.prev_page_url;
          }
        },
        error => {
          if(error){
            console.log(error);
          }
        }
      );
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

  sortByBillNumber(){
    if (this.flagSort == 0){
      this.flagSort = 1;
      this.bills.sort( function(name1, name2) {
        if ( name1.bill_number < name2.bill_number ){
          return -1;
        }else if( name1.bill_number > name2.bill_number ){
          return 1;
        }else{
          return 0;
        }
      });
    }
    else{
      this.flagSort = 0;
      this.bills.sort( function(name1, name2) {
        if ( name1.bill_number > name2.bill_number ){
          return -1;
        }else if( name1.bill_number < name2.bill_number ){
          return 1;
        }else{
          return 0;
        }
      });
    }
  }

  sortByClientName(){
    if (this.flagSort == 0){
      this.flagSort = 1;
      this.bills.sort( function(name1, name2) {
        if ( name1.client_name < name2.client_name ){
          return -1;
        }else if( name1.client_name > name2.client_name ){
          return 1;
        }else{
          return 0;
        }
      });
    }
    else{
      this.flagSort = 0;
      this.bills.sort( function(name1, name2) {
        if ( name1.client_name > name2.client_name ){
          return -1;
        }else if( name1.client_name < name2.client_name ){
          return 1;
        }else{
          return 0;
        }
      });
    }
  }

  sortByTotal(){
    if (this.flagSort == 0){
      this.flagSort = 1;
      this.bills.sort( function(name1, name2) {
        if ( name1.total < name2.total ){
          return -1;
        }else if( name1.total > name2.total ){
          return 1;
        }else{
          return 0;
        }
      });
    }
    else{
      this.flagSort = 0;
      this.bills.sort( function(name1, name2) {
        if ( name1.total > name2.total ){
          return -1;
        }else if( name1.total < name2.total ){
          return 1;
        }else{
          return 0;
        }
      });
    }
  }
}
