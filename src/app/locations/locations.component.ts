import { Component, OnInit } from '@angular/core';
import {LocationServiceService} from '../location-service.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
  providers: [LocationServiceService]
})
export class LocationsComponent implements OnInit {

  public errorMsg: string;
  selected: any[] = [];
  rows = [];
  private body: any;

  public locationsForm = this.formBuilder.group({
    name: ['', Validators.required],
    state: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],
    lat: ['', Validators.required],
    long: ['', Validators.required],
  });

  constructor(public formBuilder: FormBuilder, private locationService: LocationServiceService) { }

  ngOnInit() {
    this.locationService.getLocations()
      .subscribe(
        response => {
          if (response) {
            console.log(response);
            this.rows = response.locations;
          }
        },
        error => this.errorMsg = error,
      );
  }

  submitForm() {
    console.log(this.locationsForm.value);
    this.body = {
      name: this.locationsForm.value.name,
      state: this.locationsForm.value.state,
      city: this.locationsForm.value.city,
      postalCode: this.locationsForm.value.postalCode,
      lat: this.locationsForm.value.lat,
      long: this.locationsForm.value.long,
    };

    this.locationService.saveLocation(this.body)
      .subscribe(
        response => {
          console.log(response.status);
        },
        error => this.errorMsg = error
      );
  }

  // onSelect(event) {
  //   console.log('Event: select', event, this.selected);
  // }

  delete() {
    console.log('borrar ' + this.selected[0].id);
    this.locationService.deleteLocation(this.selected[0].id)
      .subscribe(
        response => {
        },
        error => this.errorMsg = error
      );
  }
}
