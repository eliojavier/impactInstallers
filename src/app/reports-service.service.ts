import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ReportsServiceService {
  public baseURI = 'http://localhost:8000/api/';
  auth_token: string;
  headers : Headers = new Headers();

  constructor(public http: Http) {
    this.auth_token = (localStorage.getItem('auth_token'));
    this.headers.append('Accept', 'application/json');
    this.headers.append('authorization', 'Bearer ' + this.auth_token);
  }

  getRankingLocations() {
    return this.http.get(this.baseURI + 'reports/rankingLocations', {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getRankingInstallers() {
    return this.http.get(this.baseURI + 'reports/rankingInstallers', {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getRankingCommissions(body) {
    return this.http.get(this.baseURI + 'reports/rankingCommissions/'+body.month+'/'+body.year, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getQuantityServices(body) {
    return this.http.get(this.baseURI + 'reports/quantityServices/'+body.month+'/'+body.year, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error || 'server error');
  }

}
