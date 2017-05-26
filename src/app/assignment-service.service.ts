import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AssignmentServiceService {

  public baseURI = 'http://localhost:8000/api/';
  private body: any;
  constructor(public http: Http) {

  }

  getAssignments() {
    return this.http.get(this.baseURI + 'assignments')
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  saveAssignment(body) {
    return this.http.post(this.baseURI + 'assignments', body)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  updateAssignment(id) {
    return this.http.get(this.baseURI + 'assignments', {params: { assignment : id }})
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  updateStatus(id, body) {
    return this.http.put(this.baseURI + 'assignments/status/' + id, body)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error || 'server error');
  }

}
