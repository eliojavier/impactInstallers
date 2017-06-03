import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BillServiceService {

  public baseURI = 'http://localhost:8000/api/';
  auth_token: string;
  headers : Headers = new Headers();

  constructor(public http: Http) {
    this.auth_token = (localStorage.getItem('auth_token'));
    this.headers.append('Accept', 'application/json');
    this.headers.append('authorization', 'Bearer ' + this.auth_token);
  }

  getBills(auth_token) {
    return this.http.get(this.baseURI + 'bills', {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  saveBill(body) {
    return this.http.post(this.baseURI + 'bills', body, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    console.log(error.statusText);
    return Observable.throw(error || 'server error');
  }
}
