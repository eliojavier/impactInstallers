import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class LocationServiceService {

  public baseURI = 'http://localhost:8000/api/';
  auth_token: string;
  headers : Headers = new Headers();

  constructor(public http: Http) {
    this.auth_token = (localStorage.getItem('auth_token'));
    this.headers.append('Accept', 'application/json');
    this.headers.append('authorization', 'Bearer ' + this.auth_token);
  }

  getLocations() {
    return this.http.get(this.baseURI + 'locations', {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  saveLocation(body) {
    return this.http.post(this.baseURI + 'locations', body, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  updateLocation(id, body) {
    return this.http.put(this.baseURI + 'locations/' + id, body, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  deleteLocation(id) {
    // return this.http.delete(this.baseURI + 'users', {params: { user : id }})
    return this.http.delete(this.baseURI + 'locations/' + id, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getLocation(id) {
    return this.http.get(this.baseURI + 'locations/' + id, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error || 'server error');
  }

}
