import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class LocationServiceService {

  public baseURI = 'http://localhost:8000/api/'
  constructor(public http: Http) {

  }

  getLocations() {
    return this.http.get(this.baseURI + 'locations')
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  saveLocation(body) {
    return this.http.post(this.baseURI + 'locations', body)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  updateLocation(id) {
    return this.http.get(this.baseURI + 'locations', {params: { location : id }})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  deleteLocation(id) {
    // return this.http.delete(this.baseURI + 'users', {params: { user : id }})
    return this.http.delete(this.baseURI + 'locations/' + id)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error || 'server error');
  }

}
