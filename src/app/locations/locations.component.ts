import {Component, OnInit} from '@angular/core';
import {LocationServiceService} from '../location-service.service';
import {FormBuilder, Validators} from '@angular/forms';

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
  private save: boolean;

  public locationsForm = this.formBuilder.group({
    name: ['', Validators.required],
    state: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],
    lat: ['', Validators.required],
    long: ['', Validators.required],
  });

  constructor(public formBuilder: FormBuilder, private locationService: LocationServiceService) {
  }

  ngOnInit() {
    this.getLocations();
  }

  getLocations() {
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
          this.locationsForm.reset();
          this.getLocations();
        },
        error => this.errorMsg = error
      );
  }

  delete() {
    console.log('borrar ' + this.selected[0].id);
    this.locationService.deleteLocation(this.selected[0].id)
      .subscribe(
        response => {
          this.locationsForm.reset();
          this.getLocations();
        },
        error => this.errorMsg = error
      );
  }

  getLocation() {
    this.locationService.getLocation(this.selected[0].id)
      .subscribe(
        response => {
          console.log('locationssss' + response);
          this.locationsForm = this.formBuilder.group({
              name: response.name,
              state: response.state,
              city: response.city,
              postalCode: response.postalCode,
              lat: response.lat,
              long: response.lon,

            },
            error => this.errorMsg = error
          );
        });
  }

  buttonTrue() {
    this.save = true;
    this.locationsForm.reset();
  }

  buttonFalse() {
    this.save = false;
    this.locationsForm.reset();
  }

  updateLocation() {
    console.log(this.locationsForm.value);
    this.body = {
      name: this.locationsForm.value.name,
      state: this.locationsForm.value.state,
      city: this.locationsForm.value.city,
      postalCode: this.locationsForm.value.postalCode,
      lat: this.locationsForm.value.lat,
      long: this.locationsForm.value.long,
    };

    this.locationService.updateLocation(this.selected[0].id, this.body)
      .subscribe(
        response => {
          console.log(response.status);
          this.locationsForm.reset();
          this.getLocations();
        },
        error => this.errorMsg = error
      );
  }
}
