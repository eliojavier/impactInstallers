import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AssignmentServiceService {

  public baseURI = 'http://localhost:8000/api/';
  auth_token: string;
  headers : Headers = new Headers();

  constructor(public http: Http) {
    this.auth_token = (localStorage.getItem('auth_token'));
    this.headers.append('Accept', 'application/json');
    this.headers.append('authorization', 'Bearer ' + this.auth_token);
  }

  getAssignments() {
    return this.http.get(this.baseURI + 'assignments', {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  saveAssignment(body) {
    return this.http.post(this.baseURI + 'assignments', body, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  updateAssignment(id, body) {
    return this.http.put(this.baseURI + 'assignments/' + id, body, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  updateStatus(id, body) {
    return this.http.put(this.baseURI + 'assignments/status/' + id, body, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getAssignment(id) {
    return this.http.get(this.baseURI + 'assignments/' + id, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error || 'server error');
  }

}
